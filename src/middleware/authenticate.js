import Session from "../models/session.js";
import { User } from "../models/user.js";
import createHttpError from "http-errors";
export const authenticate = async(req, resizeBy, next)=>{
  const {accessToken} = req.cookies;
  const session = await Session.findOne({accessToken});
  if(!session){
    throw createHttpError(401, "Session not found");
  }
  if(session.accessTokenValidUntil < new Date()){
    throw createHttpError(401, "Access  token expired");
  }
  const user= await User.findOne({_id: session.userId});
  if(!user){
    throw createHttpError(401, "User not found");
  }
  req.user = user;
  next();
};
