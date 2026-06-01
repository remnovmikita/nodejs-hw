import { model, Schema } from "mongoose";
import { TAGS } from "../constans/tags.js";



const noteSchema = new Schema({
  title:{
    type: String,
    required:true,
    trim:true,
  },
  content:{
    default:"",
    type: String,
    trim: true,
  },
  tag:{
    type: String,
    required: false,
    enum:TAGS,
    default: "Todo",
  }
},
{
  timestamps:true,
  versionKey: false,
});
noteSchema.index({tag: 1});

const Note = model("note", noteSchema);

export default Note;
