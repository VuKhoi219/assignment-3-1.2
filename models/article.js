const mongoose = require("mongoose");

// Tạo hàm tự động tăng ID (không có tự động tăng trong MongoDB giống như SQL, bạn cần tự quản lý nó)
const autoIncrement = require("mongoose-auto-increment"); // cài package này để quản lý tự tăng

const articleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  }, // tự tăng
  title: {
    type: String,
    required: true, // bắt buộc
    minlength: 20, // dài tối thiểu 20 ký tự
    maxlength: 100, // dài tối đa 100 ký tự
  },
  slug: {
    type: String,
    required: true, // bắt buộc
    unique: true, // slug phải là duy nhất cho mỗi bài viết
  },
  link: {
    type: String,
    required: true, // bắt buộc (link gốc của bài viết)
  },
  category: {
    type: String,
    required: false, // không bắt buộc
  },
  describe: {
    type: String,
    required: false, // không bắt buộc
  },
  avatar: {
    type: String,
    required: false, // không bắt buộc
  },
  detailed_information: {
    type: String,
    required: true, // bắt buộc
  },
  Author: {
    type: String,
    required: true, // bắt buộc
  },
  create_at: {
    type: Date,
    default: Date.now, // mặc định là ngày hiện tại
  },
  update_at: {
    type: Date,
    default: Date.now, // mặc định là ngày hiện tại
  },
  status: {
    type: Number,
    enum: [-1, 0, 1], // chỉ cho phép các giá trị -1, 0, 1
    default: 0, // mặc định là 0 (chưa duyệt)
  },
});

// Áp dụng tự động tăng ID
autoIncrement.initialize(mongoose.connection);
articleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
