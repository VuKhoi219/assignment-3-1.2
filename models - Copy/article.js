const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose)

const articleSchema = new mongoose.Schema({

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
  author: {
    type: String,
    required: true, // bắt buộc
  },
  create_at: {
    type: Date,
    default: () => new Date().toLocaleDateString('vi-VN') // Định dạng ngày tháng năm Việt Nam
  },
  update_at: {
    type: Date,
    default: () => new Date().toLocaleDateString('vi-VN') // Định dạng ngày tháng năm Việt Nam
  },
  status: {
    type: Number,
    enum: [-1, 0, 1], // chỉ cho phép các giá trị -1, 0, 1
    default: 0, // mặc định là 0 (chưa duyệt)
  },
});
articleSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Article = mongoose.model("article", articleSchema,"artile");
module.exports = Article;
