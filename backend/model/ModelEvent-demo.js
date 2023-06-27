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
    originalPrice:{
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Running",
    },
    tags:{
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    sold_out:{
      type: Number,
      default: 0,
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
  });
  
  const Event = mongoose.model('Event', eventSchema);
  