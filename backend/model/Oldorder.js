const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    shippingInfo: [
  {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      country: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    }
  ],
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveredAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'delivered', 'canceled'],
      default: 'pending',
    },
  });

module.exports = mongoose.model("oldOrder", orderSchema);

    
  