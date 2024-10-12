const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // tên danh mục bắt buộc
    unique: true, // mỗi tên danh mục là duy nhất
  },
  slug: {
    type: String,
    required: true, // slug bắt buộc
    unique: true, // slug phải là duy nhất
  },
  describe: {
    type: String,
    required: false, // mô tả không bắt buộc
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;