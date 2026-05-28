import { model, Schema } from "mongoose";


const noteSchema = new Schema({
  title:{
    type: String,
    trim:true,
  },
  content:{
    type: String,
    trim: true,
  },
  tag:{
     type: String,
     enum:["Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important", "Todo"],
      require:true,
      default: "Todo",
  }
},
{
  timestamps:true,
  versionKey: false,
});

const Note = model("note", noteSchema);

export default Note;
