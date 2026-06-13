import createHttpError from "http-errors";
import { User } from "../models/user.js";
import {Session} from "../models/session.js";
import bcrypt from "bcrypt";
import { createSession, setSessionCookies } from "../services/auth.js";



export const registerUser = async (req, res)=>{
  const {email, password} = req.body;
  const existingUser = await User.findOne({email});
  if(existingUser){
    throw createHttpError(400, 'Email in use');
  };
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password:hashedPassword,
  });

const session = await createSession(newUser._id);
setSessionCookies(res, session);

  res.status(201).json(newUser);
};
export const loginUser = async(req,res)=>{
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if(!user){
    throw createHttpError(401, 'invalid credentials');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if(!isValidPassword){
    throw createHttpError(401, 'invalid credentials');
  }
  await Session.deleteOne({userId:user._id});
  const session = await createSession(user._id);
  setSessionCookies(res, session);
  res.json(user);
};

export const refreshUserSession = async (req,res)=>{
  const {refreshToken, sessionId} = req.cookies;
  const session = await Session.findOne({_id: sessionId, refreshToken});
  if(!session){
    throw createHttpError(401, "Session not found");
  }
  if(session.refreshTokenValidUntil < new Date()){
    throw createHttpError(401, "Session token expired");
  }

  await Session.deleteOne({userId:session.userId});
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.json({
    message: "Session refreshed",
  });
};
export const logoutUser = async(req,res)=>{
  const {sessionId} = req.cookies;
  if(sessionId){
    await Session.deleteOne({_id: sessionId});
  }
  res.clearCookie("sessionId");
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(204).send();
};
