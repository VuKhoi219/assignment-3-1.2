// const Article = require("../../models/article");

// module.exports = {
//     getAllArticle: async () => {
//         return await Article.find({status : {$in : [0,1]} });
//     },
//     getArticleByField: async (field, value) => {
//         return await Article.find({ [field]: value, status: { $in: [0, 1] } });
//     },
//     updateArticle : async (id, data) => {
//         return await Article.findOneAndUpdate({_id : id}, data);
//     },

//     browseAndLock : async (id,type) => {
//         if(type == 'browse'){
//              return await Article.findOneAndUpdate({_id : id},{status : 1});
//             }
//         return await Article.findOneAndUpdate({_id : id},{status : 0});
//     },
//     deleteArticle : async (id) => {
//         return await Article.findOneAndUpdate({_id : id},{status : -1});
//     },
//     createArticle : async (data) => {
//         let article = new Article(data); 
//         return await article.save();
//     },
// }
const adminRepository = require("../../repository/admin/admin-repository");

module.exports = {
  getAllArticle: async () => {
      const result = await adminRepository.getAllArticle();
      return result
  },
  getArticleById : async (id) => {
      const result = await adminRepository.getArticleById(id);
      return result
  },
  
  getArticleByField: async (field,searchValue) => {
      let result;
      console.log(">> key : " + searchValue);
      result = await adminRepository.getArticleByField(field, searchValue);
      if (result && result.length > 0) {
        return result;
    }
      result = await adminRepository.getArticleByField(field, searchValue);
      if (result && result.length > 0) {
        return result;

      }
      result = await adminRepository.getArticleByField(field, searchValue);
      if (result && result.length > 0) {
        return result;
      }
    return result;
  },
  createArticle: async (data) => {
      if (!data) {
        return data
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
        return data.link
      }
      const result = await adminRepository.createArticle(data);
      if (!result) {
        return result
      }
      return result
  },

  updateArticle: async (id, data) => {
    data.update_at = new Date();
    const result = await adminRepository.updateArticle(id, data);
    return result ? result : []
  },

  deleteArticle: async (id) => {
      const result = await adminRepository.deleteArticle(id);
      return result ? result : []
  },
  browseAndLock : async (type,id) => {
      if(type == 'browse'){
           return await adminRepository.browseAndLock(id,'browse');
      }
      return await adminRepository.browseAndLock(id,'lock');
  }
};
