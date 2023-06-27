
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    groupTitle:{ // nhóm tiêu đề
        type: String,
    },
    members: { // thành viên
      type: Array,
    },
    lastMessage: { // tin nhắn cuối cùng 
      type: String,
    },
    lastMessageId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);


// Trong các model của Mongoose, tùy chọn { timestamps: true } 
// được sử dụng để tự động thêm hai trường createdAt và updatedAt 
// vào mỗi bản ghi trong cơ sở dữ liệu.

// createdAt: Trường này lưu trữ thời gian tạo bản ghi, tức là 
// thời gian mà bản ghi được lưu vào cơ sở dữ liệu.
// updatedAt: Trường này lưu trữ thời gian cập nhật bản ghi gần 
// nhất, tức là thời gian mà bản ghi được cập nhật lần cuối.
// Khi tạo hoặc cập nhật một bản ghi, các trường createdAt và updatedAt 
// sẽ được tự động cập nhật bởi Mongoose. Việc sử dụng 
// tùy chọn { timestamps: true } giúp dễ dàng theo dõi thời gian
//  tạo và cập nhật của các bản ghi trong cơ sở dữ liệu.





