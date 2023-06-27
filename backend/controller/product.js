const express = require("express");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");

const Order = require("../model/order");
const User = require("../model/user");

const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");


// create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, category, tag, originalPrice, price, stock, seller } = req.body;
      const files = req.files;
      
      const imageUrls = files.map((file) => `${file.filename}`);
      

      const productData = {
        name,
        description,
        category,
        tag,
        originalPrice,
        price,
        stock: stock || 1, // Default value if stock is not provided
        images: imageUrls,
        seller
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


// get all product 
router.get(
     "/get-all-products",
    // "/admin-all-products",
    // isAuthenticated,
    // isAdmin("Admin"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const products = await Product.find().sort({
          createdAt: -1,
        });
        res.status(201).json({
          success: true,
          products,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
  

  // delete product 
router.delete(
  "/delete-product/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      if (productData && productData.images) {
        productData.images.forEach((imageUrl) => {
          const filename = imageUrl;
          const filePath = `uploads/${filename}`;
  
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      }
      

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("khôm tìm thấy id sản phẩm!", 500));
      }

      res.status(201).json({
        success: true,
        message: "xóa thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);



// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      // người dùng đã đánh giá sp chưa
      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id //Kiểm tra xem người dùng đã đánh giá sản phẩm này trước đó chưa. Sử dụng phương thức find để tìm một đánh giá trong mảng reviews của sản phẩm, với điều kiện là user._id của đánh giá phải trùng khớp với req.user._id (id của người dùng đang xác thực). 
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {// lọc đánh giá trước đó 
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }// thêm 
        });
      } else {
        product.reviews.push(review);// cập nhật
      }

      let avg = 0;
      
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });// lấy ra all product trong mảng review

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false }); // vô hiệu hóa việc kiểm tra trước khi lưu


      // Cập nhật đơn hàng (Order) để đánh dấu rằng sản phẩm có productId đã được đánh giá
      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } }, //Với $set, thuộc tính "cart.$[elem].isReviewed" được đặt thành true.
        { arrayFilters: [{ "elem._id": productId }], new: true } //  Cụ thể, thông qua arrayFilters, chỉ các phần tử trong mảng cart có trường _id trùng khớp với productId mới được cập nhật. Tùy chọn { new: true } đảm bảo rằng đơn hàng đã được cập nhật mới nhất sẽ được trả về.
      );

      res.status(200).json({
        success: true,
        message: "đánh giá thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);





  module.exports = router;
  