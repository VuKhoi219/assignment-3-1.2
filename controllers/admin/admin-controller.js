const adminServices = require("../../services/admin/admin-services");

module.exports = {
  getAllArticle: async (req, res) => {
    let searchValue = ""; // Bạn có thể thay đổi cách lấy giá trị tìm kiếm ở đây (ví dụ: từ req.body)
    try {
      const result = await adminServices.getAllArticle();
      if (result) {
        return res.render("admin/list", {
          articles: result,
          searchValue: searchValue,
          message: " Truy xuất danh sách bài viết thành công",
        });
      }
      return res.render("admin/list", searchValue, {
        searchValue: searchValue,
        message: "Không tìm thấy danh sách bài viết",
      });
    } catch (e) {
      console.error("Error while creating article:", e);
      res.render("admin/list", {
        searchValue: searchValue,
        message: "Lỗi hệ thóng",
      });
    }
  },
  getArticleByField: async (req, res) => {
    const searchValue = req.body.search ? req.body.search.trim() : "";

    try {
      let result;
      console.log(">> key : " + searchValue);
      result = await adminServices.getArticleByField("title", searchValue);
      if (result && result.length > 0) {
        return res.render("admin/list", {
            articles: result,
            searchValue: searchValue,
            message: "Truy xuất danh sách bài viết thành công",
        });
    }
      result = await adminServices.getArticleByField("author", searchValue);
      if (result && result.length > 0) {
        return res.render("admin/list", {
          articles: result,
          searchValue: searchValue,
          message: "Truy xuất danh sách bài viết của tác giả",
        });
      }
      result = await adminServices.getArticleByField("create_at", searchValue);
      if (result && result.length > 0) {
        return res.render("admin/list", {
          articles: result,
          searchValue: searchValue,
          message: "Truy xuất danh sách bài viết của ngày" + req.body,
        });
      }
      res.render("admin/list", {
        articles: [], // hoặc null
        searchValue: searchValue,
        message: "Không tìm thấy yêu cầu",
      });
    } catch (e) {
      console.log("Error while creating article:", e);
      res.send("Lỗi hệ thống");
      //   res.render("admin/list", {
      //     articles: [], // hoặc null
      //     searchValue: searchValue,
      //     message: "Lỗi hệ thóng",
      //   });
    }
  },

  createArticleForm: async (req, res) => {
    const message = req.query.message || "";
    console.log("Message:", message); // Lấy thông điệp từ query
    res.render("admin/create", { message: message }); // Gửi thông điệp cho view
  },
  createArticle: async (req, res) => {
    try {
      let data = req.body;
      // console.log("data :" + data)
      if (!data) {
        return res.redirect(`/admin/create1?message=Dữ lệu không hợp lệ`);
      }
      if (data.link) {
        data.link = data.link.trim();
        // Kiểm tra nếu link không bắt đầu bằng 'http://' hoặc 'https://'
        if (
          !data.link.startsWith("http://") &&
          !data.link.startsWith("https://")
        ) {
          data.link = "https://" + data.link;
        }
      } else {
        return res.redirect("admin/create", { message: "Vui lòng nhập link" });
      }
      const result = await adminServices.createArticle(data);
      if (!result) {
        return res.redirect(
          `/admin/create1?message=Tạo bài viết không thành công`
        );
      }
      return res.redirect(`/admin/create1?message=Tạo bài viết thành công`);
    } catch (e) {
      console.error("Error while creating article:", e);
      return res.redirect(`/admin/create1?message=Lỗi hệ thống `);
    }
  },

  updateArticle: async (req, res) => {
    try {
      let data = req.body;
      if (!data) {
        return res.redirect("/admin/create");
      }
      if (data.link) {
        data.link = data.link.trim();
        // Kiểm tra nếu link không bắt đầu bằng 'http://' hoặc 'https://'
        if (
          !data.link.startsWith("http://") &&
          !data.link.startsWith("https://")
        ) {
          data.link = "https://" + data.link;
        }
      } else {
        return res.render("admin/create", { message: "Vui lòng nhập link" });
      }
      const result = await adminServices.updateArticle(req.params.id, data);
      if (!result) {
        return res.render("admin/create", {
          message: " Cập nhật bài viết không thành công",
        });
      }
      return res.render("admin/create", {
        message: " Tạo bài viết thanh cong",
      });
    } catch (e) {
      console.error("Error while creating article:", e);
      res.render("admin/list", { message: "Lỗi hệ thóng" });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const result = await adminServices.deleteArticle(req.params.id);
      if (!result) {
        return res.redirect("/admin/list", {
          message: "Xóa bài viết không thành công",
        });
      }
      return res.redirect("/admin/list", {
        message: "Xóa bài viết thanh cong",
      });
    } catch (e) {
      console.error("Error while creating article:", e);
      res.render("admin/list", { message: "Lỗi hệ thóng" });
    }
  },
};
