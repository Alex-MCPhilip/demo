const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/order");
const Product = require("../model/product");



// Controller để lấy tổng tiền bán theo từng danh mục
router.get("/sales-by-category",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categorySales = await Order.aggregate([
        { $unwind: "$cart" },
        {
          $group: {
            _id: "$cart.category",
            totalSales: { $sum: { $multiply: ["$cart.qty", "$cart.price"] } },
          },
        },
        { $sort: { totalSales: -1 } },
      ]);

      res.status(200).json({
        success: true,
        categorySales,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



// tính tổng tiền của tất cả sản phẩm
router.get("/sales-by-ALL-product", catchAsyncErrors(async (req, res, next) => {
  try {
    const productSales = await Order.aggregate([
      { $unwind: "$cart" },
      { $group: {
          _id: "$cart.productId",
          totalSales: { $sum: { $multiply: ["$cart.qty", "$cart.price"] } }
        }
      },
      {
        $lookup: {
          from: "Product", // Collection name
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $project: {
          _id: 0,
          productName: { $arrayElemAt: ["$product.name", 0] },
          totalSales: 1
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    res.status(200).json({
      success: true,
      productSales
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));




//  tính tất cả tiền của sản phẩm từ trước tới giờ
router.get("/sales-by-product", catchAsyncErrors(async (req, res, next) => {
  try {
    const productSales = await Order.aggregate([
      {
        $unwind: "$cart"
      },
      {
        $group: {
          _id: "$cart.name",
          // name:"$cart.name",
          Tổng_Tiền: {
            $sum: {
              $multiply: ["$cart.qty", "$cart.price"]
            }
          }
        }
      },
      // {
      //   $lookup: {
      //     from: "Product",
      //     localField: "_id",
      //     foreignField: "_id",
      //     as: "product"
      //   }
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     productName: { $arrayElemAt: ["$product.name", 0] },
      //     totalSales: 1
      //   }
      // },
      { $sort: { totalSales: -1 } }
    ]);

    res.status(200).json({
      success: true,
      productSales
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));


module.exports = router;
