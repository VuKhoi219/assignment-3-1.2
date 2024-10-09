const Article = require("../../models/article");

module.exports = {
    getAllArticle: async () => {
        return await Article.find({status : {$in : [0,1]} });
    },
    getArticleById : async (id) => {
        return await Article.findById(id);
    },
    getArticleByField: async (field, value) => {
        return await Article.find({ [field]: value, status: { $in: [0, 1] } });
    },
    updateArticle : async (id, data) => {
        return await Article.updateOne({_id : id}, data);
    },
    browseAndLock : async (id,type) => {
        if(type == 'browse'){
             return await Article.updateOne({_id : id},{status : 1});
            }
        return await Article.updateOne({_id : id},{status : 0});
    },
    deleteArticle : async (id) => {
        return await Article.updateOne({_id : id},{status : -1},{ new: true });
    },
    createArticle : async (data) => {
        let article = new Article(data); 
        return await article.save();
    },
}