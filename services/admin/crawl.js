const Article = require("../../models/article");
const cheerio = require('cheerio');
const axios = require('axios');
const schedule = require('node-schedule');
require('dotenv').config(); // Load .env file

const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/ /g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')  // Loại bỏ dấu tiếng Việt
        .replace(/[^\w-]+/g, '');  // Loại bỏ ký tự không hợp lệ
};

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

async function fetchVNExpress() {
    const response = await axios.get('https://vnexpress.net/');
    const $ = cheerio.load(response.data);

    $('article.item-news').each(async (index, element) => {
        const title = $(element).find('h3.title-news a').text().trim();
        if(title.length <20 || title.length >100){
            return
        }
        const link = $(element).find('h3.title-news a').attr('href');
        const slug = generateSlug(title);
        const describe = $(element).find('p.description').text().trim();
        const avatar = $(element).find('img').attr('data-src');

        const existingArticle = await Article.findOne({ slug });
        if (!existingArticle) {
            const newArticle = new Article({
                title,
                slug,
                link,
                describe,
                avatar,
                content: describe,
                author: 'VNExpress',
                status: 1,
                detailed_information: '123'
            });
            await newArticle.save();
            console.log(`Saved article: ${title}`);
        }
    });
}

async function fetchTuoiTre() {
    const response = await axios.get('https://tuoitre.vn/');
    const $ = cheerio.load(response.data);

    $('article').each(async (index, element) => {
        const title = $(element).find('h3 a').text().trim();
        const link = 'https://tuoitre.vn' + $(element).find('h3 a').attr('href');
        const slug = generateSlug(title);
        const description = $(element).find('p.sapo').text().trim();
        const thumbnail = $(element).find('img').attr('src');

        const existingArticle = await Article.findOne({ slug });
        if (!existingArticle) {
            const newArticle = new Article({
                title,
                slug,
                link,
                describe: description,
                avatar: thumbnail,
                content: description,
                author: 'Tuổi Trẻ',
                status: 1,
                detailed_information: '123'
            });
            await newArticle.save();
            console.log(`Saved article from Tuổi Trẻ: ${title}`);
        }
    });
}

// Hàm chạy tất cả
async function run() {
    console.log('Fetching articles...');
    await fetchVNExpress();
    console.log("///////////////////////////////////////////")
    await fetchTuoiTre();
    console.log('Completed fetching articles.');
}

// Gọi hàm run ngay lập tức
run();

// Lập lịch fetch
schedule.scheduleJob('0 7,18 * * *', async () => {
    console.log('Starting auto fetch news...');
    await fetchVNExpress();
    await fetchTuoiTre();
    console.log('Completed auto fetch.');
});

module.exports = {
    fetchVNExpress,
    fetchTuoiTre,
    run // Xuất hàm run nếu cần
};
