const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: { 
        type: String, 
        required: [true,"please Enter product Category"] 
    },
    tag: { 
        type: String, 
        required: [true,"please Enter product tag"] 
    },
    originalPrice: {
        type: Number,
        required: true,
      },
    price:{
      type: Number,
      required: true,
    },
    images:
    [
        {
          type: String,
          required: true,
        }
    ], 
    ratings: { 
      type: Number,
      default:0 
  },
    reviews:[
      {
        user: {
          type: Object,
        },
        //kiểu dữ liệu của trường user là Object. Điều này đặt giới hạn rằng user có thể là bất kỳ đối tượng nào và không cần tham chiếu đến bất kỳ mô hình người dùng nào.
        //kiểu dữ liệu của trường user được chỉ định là mongoose.Schema.ObjectId và tham chiếu đến mô hình người dùng (ref: "User"). Điều này đảm bảo rằng user phải là một đối tượng ObjectId hợp lệ tham chiếu đến mô hình người dùng. 
          productId: {
            type: String,
          },
          rating:{
              type:Number,
              require:true
          },
          comment:{
              type:String,
              required:true
          },
          createdAt:{
            type: Date,
            default: Date.now(),
          }
      }
    ],
    stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
    },
    numOfReviews: { 
        type: Number,
        default:0
    },
    sold_out:{
        type:Number,
        default:0
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
  });
  

module.exports = mongoose.model("Product", productSchema);
  