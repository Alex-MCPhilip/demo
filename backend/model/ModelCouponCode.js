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
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selectedProduct:{
     type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
  });
  
  const CouponCode = mongoose.model('CouponCode', couponCodeSchema);
  