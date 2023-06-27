const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category:{
      type: String,
      required:[true,"Please enter your event product category!"],
    },
    tags: {
        type: String,
        required: true,
      },
    originalPrice:{
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Running",
    },
    start_Date: {
      type: Date,
      required: true,
    },
    Finish_Date: {
      type: Date,
      required: true,
    },
    stock:{
      type: Number,
      required: [true,"Please enter your event product stock!"],
    },
    sold_out:{
      type: Number,
      default: 0,
    },
    images:[
        {
            type: String,
        },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt:{
      type: Date,
        default: Date.now(),
    }
  });
  
  
module.exports = mongoose.model("Event", eventSchema);

  