const adminServices = require("../../services/admin/admin-services");
const crawl = require("../../services/admin/crawl");

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
  getArticleById : async (req, res) => {
    try {
      const result = await adminServices.getArticleById(req.params.id);
      console.log(result);
      if (result) {
        return res.render("admin/edit", {result});
      }
      return res.render("admin/edit", { result: {} });
    }catch(e){
      console.error("Error while creating article:", e);
      return res.render("admin/edit");
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
        res.render("admin/list", {
          articles: [], // hoặc null
          searchValue: searchValue,
          message: "Lỗi hệ thóng",
        });
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
        return res.redirect(`/admin/create1`);
      }
      data.slug = data.title.trim().replace(/ /g, "-").toLowerCase().replace(/[\u0300-\u036f]/g, '').replace(/[^\w-]+/g, '');;
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
        return res.redirect("/admin/create1", { message: "Vui lòng nhập link" });
      }
      const result = await adminServices.createArticle(data);
      if (!result) {
        return res.redirect(
          `/admin/create1`
        );
      }
      return res.redirect(`/admin/list`);
    } catch (e) {
      console.error("Error while creating article:", e);
      return res.redirect(`/admin/create1`);
    }
  },
  updateArticle: async (req, res) => {
    try {
      let data = req.body;
      // console.log(req.body)
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
        return  res.redirect("/admin/list")
      }
      const result = await adminServices.updateArticle(req.params.id, data);
      if (!result) {
        return  res.redirect("/admin/list")
      }
      return  res.redirect("/admin/list")
    } catch (e) {
      console.error("Error while creating article:", e);
      return  res.redirect("/admin/list")
    }
  },
  deleteArticle: async (req, res) => {
    try {
      const result = await adminServices.deleteArticle(req.params.id);
      console.log(result)
      if (!result) {
        return  res.type('json').send({ message: 'Xoá thất bại' });
      }
      return  res.type('json').send({ message: 'Xoá thành công bại' });

    } catch (e) {
      console.error("Error while creating article:", e);
      return  res.type('json').send({ message: 'Lỗi hệ thống' });
    }
  },
  browseAndLock : async ( req,res) => {
    try {
      const result = await adminServices.browseAndLock(req.params.type,req.params.id);
      console.log(result)
      if (!result) {
        return  res.type('json').send({ message: 'Chỉnh trạng thái thất bại' });
      }
      return  res.type('json').send({ message: 'Chỉnh trạng thái thành công' });

    } catch (e) {
      console.error("Error while creating article:", e);
      return  res.type('json').send({ message: 'Lỗi hệ thống' });
    }
  },
  // vnexpressCrawler : async (res) => {
  //   try {
  //     const result = await crawl.fetchVNExpress();
  //     console.log(result)
  //     if (!result) {
  //       return res.type('json').send({ message: 'Lấy tin từ VnExpress thất bại'});
  //     }
  //     else {
  //       return res.type('json').send({ message: 'Lấy tin từ VnExpress thành công'});
  //     }
  //   } catch (e) {
  //     console.error("Error while creating article:", e);
  //     return  res.type('json').send({ message: 'Lỗi hệ thống' });
  //   }
  // },
  // baotuoitreCrawler : async (res) => {
  //   try {
  //     const result = await crawl.fetchVNExpress();
  //     console.log(result)
  //     if (!result) {
  //       return res.send('abc');
  //       // return res.type('json').send({message: 'Lấy tin từ VnExpress thất bại'});
  //     } else {
  //       return res.send('abc');
  //       // return res.type('json').send({message: 'Lấy tin từ VnExpress thành công'});
  //     }
  //   } catch (e) {
  //     console.error("Error while creating article:", e);
  //     return res.send("abc");
  //   }
  // }
}