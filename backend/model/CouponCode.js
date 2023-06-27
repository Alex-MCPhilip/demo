const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    minAmount:{
      type: Number,
    },
    maxAmount:{
      type: Number,
    },
 
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt:{
      type: Date,
      default: Date.now(),
    }
    // selectedProduct:{
    //  type: String,
    // },
  });
  

  
module.exports = mongoose.model("CouponCode", couponCodeSchema);

     // validFrom: {
    //   type: Date,
    //   required: true,
    // },
    // validUntil: {
    //   type: Date,
    //   required: true,
    // },