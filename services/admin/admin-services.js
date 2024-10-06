const Article = require("../../models/article");

module.exports = {
    getAllArticle: async () => {
        return await Article.find({status : {$in : [0,1]} });
    },
    getArticleByField: async (field, value) => {
        return await Article.find({ [field]: value },{status :{$in : [0,1]}});
    },
    updateArticle : async (id, data) => {
        return await Article.findOneAndUpdate({_id : id}, data);
    },
    deleteArticle : async (id) => {
        return await Article.findOneAndUpdate({_id : id},{status : -1});
    },
    createArticle : async (data) => {
        let article = new Article(data); 
        return await article.save();
    },
}