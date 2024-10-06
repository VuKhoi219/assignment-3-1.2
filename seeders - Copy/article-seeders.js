const mongoose = require("mongoose");
const Article = require("../models/article");
const { faker } = require("@faker-js/faker");
require("dotenv").config();

mongoose
  .connect(process.env.MONGOOSE_URL, {})
  .then(() => {
    console.log(process.env.MONGOOSE_URL, "Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });

const seedArticle = async (req, res) => {
  try {
    await Article.deleteMany();
    for (let i = 0; i < 100; i++) {
      let title;
      do {
        title = faker.lorem.sentence(); // Tạo một câu
      } while (title.length < 20 || title.length > 100); // Lặp lại cho đến khi tiêu đề hợp lệ

      const article = new Article({
        title: title, // Tạo tiêu đề có ít nhất 2 câu
        slug: faker.lorem.slug(),
        link: faker.internet.url(),
        category: faker.lorem.word(),
        describe: faker.lorem.paragraph(),
        avatar: faker.image.url(),
        detailed_information: faker.lorem.paragraph(), // Tạo đoạn văn mô tả chi tiết
        author: faker.person.fullName(), // Tạo tên đầy đủ cho tác giả
        status: faker.number.int({ min: -1, max: 1 }),
      });
      await article.save();
    }
    console.log("Inserted article");
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error insert to MongoDB", error);
  }
};
seedArticle();
