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

function ChangeToSlug()
{
  var title, slug;

  //Lấy text từ thẻ input title
  title = document.getElementById("title").value;

  //Đổi chữ hoa thành chữ thường
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  //Xóa các ký tự đặt biệt
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, " - ");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  //In slug ra textbox có id “slug”
  document.getElementById('slug').value = slug;
}

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
module.exports = ChangeToSlug;
