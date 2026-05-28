import { model, Schema } from "mongoose";


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
    enum:["Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important", "Todo"],
    default: "Todo",
  }
},
{
  timestamps:true,
  versionKey: false,
});

const Note = model("note", noteSchema);

export default Note;
