const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");

const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();
const fs = require("fs");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {

      const { name, description, category, tags, originalPrice, price, start_Date, Finish_Date, stock, createdBy } = req.body;
      const files = req.files;
      const imageUrls = files.map((file) => `${file.filename}`);


        const eventData = {
            name,
            description,
            category,
            tags,
            originalPrice,
            price,
            start_Date,
            Finish_Date,
            stock,
            images: imageUrls,
            createdBy
          };

        const product = await Event.create(eventData);

        res.status(201).json({
          success: true,
          product,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
// router.get("/get-all-events", async (req, res, next) => {
//   try {
//     const events = await Event.find();
//     res.status(201).json({
//       success: true,
//       events,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error, 400));
//   }
// });

// get all events of a shop
// router.get(
//   "/get-all-events/:id",
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const events = await Event.find({ shopId: req.params.id });

//       res.status(201).json({
//         success: true,
//         events,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// delete event of a shop

router.delete(
  "/delete-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const eventData = await Event.findById(productId);

      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });

      const event = await Event.findByIdAndDelete(productId);

      if (!event) {
        return next(new ErrorHandler("Event not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);



// all events --- for admin
router.get(
  "/admin-all-events",
//   isAuthenticated,
//   isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find()
      // .sort({
        // createdAt: -1,
      // });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
