const routers = require("express").Router();
const adminController = require("../../controllers/admin/admin-controller");

routers.get("/test",(req,res)=>{
    res.render("admin/create")
})
routers.get("/list",async (req,res)=>{
    await adminController.getAllArticle(req,res)
})
routers.get("/create1",async(req,res)=>{
    res.render('admin/create',{message : ""});})

routers.post('/create-post',async (req,res)=>{
    // res.send(req.body)
    await adminController.createArticle(req,res)
})

module.exports = routers