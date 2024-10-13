const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/admin/category-controller");

// Route để lấy danh sách tất cả các danh mục
router.get("/", categoryController.getCategories);

// Route để thêm mới danh mục
router.post("/", categoryController.createCategory);

// Route để sửa danh mục
router.put("/:id", categoryController.updateCategory);

// Route để xóa danh mục
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;