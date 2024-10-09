const routers = require("express").Router();
const adminController = require("../../controllers/admin/admin-controller");

routers.get("/test",(req,res)=>{
    res.render("admin/create")
})
routers.get("/list",async (req,res)=>{
    await adminController.getAllArticle(req,res)
})
routers.post("/list/sreach", async (req,res)=>{
    await adminController.getArticleByField(req,res)
})
routers.get("/create1",async(req,res)=>{
    res.render('admin/create',{message : ""});
})

routers.post('/create-post',async (req,res)=>{
    // res.send(req.body)
    await adminController.createArticle(req,res)
})
routers.get("/edit/:id" ,async(req,res)=>{
    await adminController.getArticleById(req,res)
})

routers.get("/edit/:id",async(req,res)=>{
    await adminController.getArticleById(req,res)
})

routers.post("/edit/:id",async(req,res)=>{
    console.log(req.body)
    await adminController.updateArticle(req,res)
})

routers.delete("/delete/:id",async(req,res)=>{
    await adminController.deleteArticle(req,res)
})

routers.patch("/browse-and-lock/:type/:id",async(req,res)=>{
    console.log("test")
    await adminController.browseAndLock(req,res)
})


module.exports = routers