const routers = require("express").Router();

routers.get("/list",(rep,res)=>{
    res.render("admin/list")
})

routers.get('/create',(rep,res)=>{
    res.render('admin/create')
})

module.exports = routers