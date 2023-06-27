const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ratings: { 
      type: Number,
      default:0 
  },
    reviews:[
      {
          user: {
              type: mongoose.Schema.ObjectId,
              ref: "User",
              required: true
          },
          name:{
              type:String,
              required: true
          },
          rating:{
              type:Number,
              require:true
          },
          comment:{
              type:String,
              required:true
          }
      }
    ],
    category: { 
      type: String, 
      required: [true,"please Enter product Category"] 
    },
    Stock: { 
        type: Number, 
        required: [true,"please Enter product Stock"],
        maxLength: [4,"Stock cannot exceed 4 characters"],
        default:1 
    },
    numOfReviews: { 
        type: Number,
        default:0
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  });
  
  const Product = mongoose.model('Product', productSchema);
  