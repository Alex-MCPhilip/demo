const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/order")
const Product = require("../model/product");
const User = require("../model/user")
const Event = require("../model/event")

// const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");






// // update order status for seller
// router.put(
//   "/update-order-status/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const orderId = req.params.id;
//       const { status } = req.body;

//       const order = await Order.findById(orderId);

//       if (!order) {
//         return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
//       }

//       if (status === 'Đã chuyển cho đối tác giao hàng') {
        
//         order.cart.forEach(async (o) => {
//           await updateProduct(o._id, o.qty);
//         });

        
//       }

//       order.status = status;

//       if (status === 'Đã giao hàng') {
//         order.deliveredAt = Date.now();
//         order.paymentInfo.status = 'Thành công';
//         const serviceCharge = order.totalPrice * 0.1;
//         await updateUserInfo(order.user._id, order.totalPrice - serviceCharge);
//       }

//       await order.save({ validateBeforeSave: false });

//       res.status(200).json({
//         success: true,
//         order,
//       });

//       async function updateProduct(id, qty) {

//         const product = await Product.findById(id);

//         if (!product) {
//           throw new ErrorHandler('Không tìm thấy sản phẩm', 404);
//         }

//         if (isNaN(qty) || qty <= 0) {
//           throw new ErrorHandler('Số lượng sản phẩm không hợp lệ', 400);
//         }

//         product.stock -= parseInt(qty);
//         product.sold_out += parseInt(qty);

//         await product.save();

//         const event = await Event.find(product.id);

//         if (!event) {
//           throw new ErrorHandler('Không tìm thấy sự kiện', 404);
//         }

//         event.stock -= parseInt(qty);
//         event.sold_out += parseInt(qty);

//         await event.save();
//       }

//       async function updateUserInfo(userId, amount) {
//         const user = await User.findById(userId);

//         if (!user) {
//           throw new ErrorHandler('Không tìm thấy người dùng', 404);
//         }

//         user.availableBalance = amount;

//         await user.save();
//       }

//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );


// update order status
router.put(
  "/update-order-status/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      const order = await Order.findById(orderId);

      if (!order) {
        return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
      }

      if (status === 'Đã chuyển cho đối tác giao hàng') {
        // for (const item of order.cart) { vòng lặp duyệt qa mỗi phần tử order.cart được gán với biến item
          for (const item of order.cart) {
            if (!item.start_Date || !item.Finish_Date) {
              await updateProduct(item._id, item.qty);
            }
            if (item.start_Date || item.Finish_Date) {
              await updateEvent(item._id, item.qty);
            }
          }
          // await updateProduct(item._id, item.qty);
        // }
      }

      order.status = status; // cập nhật trạng thái đơn hàng thành giá trị của status 

      if (status === 'Đã giao hàng') {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = 'Thành công'; // gán
        // const serviceCharge = order.totalPrice * 0.1;
        // await updateUserInfo(order.user._id, order.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateProduct(productId, qty) {

        const product = await Product.findById(productId);

        if (!product) {
          throw new ErrorHandler('Không tìm thấy sản phẩm', 404);
        }

        if (isNaN(qty) || qty <= 0) {
          throw new ErrorHandler('Số lượng sản phẩm không hợp lệ', 400);
        }

        product.stock -= parseInt(qty);
        product.sold_out += parseInt(qty);

        await product.save();

      }

      async function updateEvent(eventId, qty) {

        const event = await Event.findOne();

        if (!event) {
          throw new ErrorHandler('Không tìm thấy sự kiện', 404);
        }

        if (isNaN(qty) || qty <= 0) {
          throw new ErrorHandler('Số lượng sự kiện không hợp lệ', 400);
        }

        event.stock -= parseInt(qty);
        event.sold_out += parseInt(qty);

        await event.save();
      }


      // async function updateUserInfo(userId, amount) {
      //   const user = await User.findById(userId);

      //   if (!user) {
      //     throw new ErrorHandler('Không tìm thấy người dùng', 404);
      //   }

      //   user.availableBalance = amount;

      //   await user.save();
      // }

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



//       // phải xem kí từ trong monggo nó là gì
//       // phải giống nếu ko sẽ bị lỗi





// // update order status for seller
// router.put(
//   "/update-order-status/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const orderId = req.params.id;
//       const { status } = req.body;

//       const order = await Order.findById(orderId);

//       if (!order) {
//         return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
//       }

//       if (status === 'Đã chuyển cho đối tác giao hàng') {
//         const updateProductPromises = order.cart
//           .filter(item => item.product)
//           .filter(item => !item.start_Date || !item.Finish_Date)
//           .map(async item => {
//             const product = await Product.findById(item._id);
//             if (!product) {
//               throw new ErrorHandler('Không tìm thấy sản phẩm', 404);
//             }
//             await updateProduct(product, item.qty);
//           });

//         const updateEventPromises = order.cart
//           .filter(item => item.event)
//           .map(async item => {
//             const event = await Event.findById(item._id);
//             if (!event) {
//               throw new ErrorHandler('Không tìm thấy sự kiện', 404);
//             }
//             await updateEvent(event, item.qty);
//           });

//         await Promise.all([...updateProductPromises, ...updateEventPromises]);
//       }

//       order.status = status;

//       if (status === 'Đã giao hàng') {
//         order.deliveredAt = Date.now();
//         order.paymentInfo.status = 'Thành công';
//         const serviceCharge = order.totalPrice * 0.1;
//         await updateUserInfo(order.user._id, order.totalPrice - serviceCharge);
//       }

//       await order.save({ validateBeforeSave: false });

//       res.status(200).json({
//         success: true,
//         order,
//       });

//       async function updateProduct(product, qty) {
//         if (isNaN(qty) || qty <= 0) {
//           throw new ErrorHandler('Số lượng sản phẩm không hợp lệ', 400);
//         }

//         product.stock -= parseInt(qty);
//         product.sold_out += parseInt(qty);

//         await product.save();
//       }

//       async function updateEvent(event, qty) {
//         if (isNaN(qty) || qty <= 0) {
//           throw new ErrorHandler('Số lượng sự kiện không hợp lệ', 400);
//         }

//         event.stock -= parseInt(qty);
//         event.sold_out += parseInt(qty);

//         await event.save();
//       }

//       async function updateUserInfo(userId, amount) {
//         const user = await User.findById(userId);

//         if (!user) {
//           throw new ErrorHandler('Không tìm thấy người dùng', 404);
//         }

//         user.availableBalance = amount;

//         await user.save();
//       }

//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );










// // update order status for seller
// router.put(
//   "/update-order-status/:id",
//   catchAsyncErrors(async (req, res, next) => {
    
//   try {
//     const orderId = req.params.id;
//     const { status } = req.body;

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return next(new ErrorHandler('Không tìm thấy đơn hàng', 404));
//     }

//     if (status === 'Transferred to delivery partner') {
//       for (const item of order.cart) {
//         await updateProduct(item.productId, item.quantity);
//       }
//     }

//     order.status = status;

//     if (status === 'Delivered') {
//       order.deliveredAt = Date.now();
//       order.paymentInfo.status = 'Succeeded';
//       const serviceCharge = order.totalPrice * 0.1;
//       await updateUserInfo(order.user._id, order.totalPrice - serviceCharge);
//     }

//     await order.save({ validateBeforeSave: false });

//     res.status(200).json({
//       success: true,
//       order,
//     });


//     async function updateProduct(productId, quantity) {
//       const product = await Product.findOne(productId);
  
//       if (!product) {
//         throw new ErrorHandler('Không tìm thấy sản phẩm', 404);
//       }
  
//       product.stock -= quantity;
//       product.sold_out += quantity;
  
//       await product.save({ validateBeforeSave: false });
//     }
  
//     async function updateUserInfo(userId, amount) {
//       const user = await User.findById(userId);
  
//       if (!user) {
//         throw new ErrorHandler('Không tìm thấy người dùng', 404);
//       }
  
//       user.availableBalance = amount;
  
//       await user.save();
//     }



//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }


//   })
// );









// // all orders --- for admin
// router.get(
//   "/admin-all-orders",
//   catchAsyncErrors(async (req, res, next) => {
    
//   try {
    
//     const orders = await Order.find().sort({
//       deliveredAt: -1,
//       createdAt: -1,
//     });

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message, 500));
//   }

//   })
// );





// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

        const newOrder = await Order.create({
          cart,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        
    
      res.status(201).json({
        success: true,
        order: newOrder,
        
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// update order status
// router.put(
//   "/update-order-status/:id",
//   // isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const order = await Order.findById(req.params.id);

//       if (!order) {
//         return next(new ErrorHandler("không có đơn hàng", 400));
//       }
//       if (req.body.status === "Đã chuyển cho đối tác giao hàng") {
//         order.cart.forEach(async (o) => {
//           await updateOrder(o._id, o.qty);
//         });
//       }

//       order.status = req.body.status;

//       if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//         order.paymentInfo.status = "Succeeded";
//         const serviceCharge = order.totalPrice * .10;
//         await updateSellerInfo(order.totalPrice - serviceCharge);
//       }

//       await order.save({ validateBeforeSave: false });

//       res.status(200).json({
//         success: true,
//         order,
//       });

//       async function updateOrder(id, qty) {
//         const product = await Product.findById(id);

//         product.stock -= qty;
//         product.sold_out += qty;

//         await product.save({ validateBeforeSave: false });
//       }

//       // async function updateSellerInfo(amount) {
//       //   const seller = await Shop.findById(req.seller.id);
        
//       //   seller.availableBalance = amount;

//       //   await seller.save();
//       // }
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Không tìm thấy đơn đặt hàng với id này", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Yêu cầu hoàn tiền đặt hàng thành công!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- 
router.put(
  "/order-refund-success/:id",
  // isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Không tìm thấy đơn đặt hàng với id này", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Hoàn tiền đặt hàng thành công!",
      });

      if (req.body.status === "Hoàn tiền thành công") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty; // cập nhật stock bằng + qty
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


// all orders --- for admin
router.get(
  "/admin-all-orders",
  // isAuthenticated,
  // isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        // deliveredAt: -1,
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


















// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
