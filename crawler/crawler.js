const cheerio = require('cheerio');

const request = require('request-promise');

const Article = require('../models/article');

const mongoose = require('mongoose');

const changeToSlug = require('../models/article')
mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error', err));

exports.fetchNhanDan = async (req, res) => {
    request('https://nhandan.vn/', (error, response, html) => {
        if(!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            $('.story').each(async (index, el) => {
                const title = $(el).find('h2.story__heading a').text();
                const slug = changeToSlug(title);
                const link = $(el).find('h2 a').attr('href');
                const describe = $(el).find('div.story__summary').text();
                const Author = $(el).find('div.info-author p').text();

                const existingNews = await Article.findOne({ slug });
                if (!existingNews){
                    if (title && link) {
                        const newArticle = new Article({
                            title,
                            slug,
                            link,
                            describe,
                            Author,
                        });

                        await newArticle.save();
                        console.log(`Saved ${title}`);
                    }
                }

                // console.log(title, link, describe, Author); // hien thi duoi dinh dang json
            })
        }
        else {
            console.log(error);
        }
    });
};

exports.fetchVnExpress = async (req, res) => {
    request('https://vnexpress.net/', (error, response, html) => {
        if(!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            $('.item-news').each(async (index, el) => {
                const title = $(el).find('h3.title-news').text();
                const slug = changeToSlug(title);
                const link = $(el).find('h3 a').attr('href');
                const describe = $(el).find('p.description').text();
                const Author = $(el).find('article.fck_detail p.Normal[style=text-align:right;]').text();

                const existingNews = await Article.findOne({ slug });
                if (!existingNews){
                    if (title && link) {
                        const newArticle = new Article({
                            title,
                            slug,
                            link,
                            describe,
                            Author,
                        });

                        await newArticle.save();
                        console.log(`Saved ${title}`);
                    }
                }

                // console.log(title, link, describe, Author); // hien thi duoi dinh dang json
            })
        }
        else {
            console.log(error);
        }
    });
};