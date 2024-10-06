const cheerio = require('cheerio');

const request = require('request-promise');

const Article = require('../models/article');

const cron = require('node-cron');

// request('https://vnexpress.net/', (error, response, html) => {
//     if(!error && response.statusCode === 200) {
//         const $ = cheerio.load(html);
//
//         $('.item-news').each(async (index, el) => {
//             const title = $(el).find('h1.title-detail').text();
//             const link = $(el).attr('href');
//             const describe = $(el).find('p.description').text();
//             const Author = $(el).find('article.fck_detail p.Normal[style=text-align:right;]').text();
//
//             if (title && link) {
//                 const newArticle = new Article({
//                     title,
//                     link,
//                     describe,
//                     Author,
//                 });
//
//                 await newArticle.save();
//                 console.log(`Saved ${title}`);
//             }
//
//             // console.log(title, link, describe, Author); // hien thi duoi dinh dang json
//         })
//     }
//     else {
//         console.log(error);
//     }
// });

cron.schedule('* * */1 * * ', () => {
    console.log('Fetching news...');
    request('https://vnexpress.net/', (error, response, html) => {
        if(!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            $('.item-news').each(async (index, el) => {
                const title = $(el).find('h1.title-detail').text();
                const link = $(el).attr('href');
                const describe = $(el).find('p.description').text();
                const Author = $(el).find('article.fck_detail p.Normal[style=text-align:right;]').text();

                if (title && link) {
                    const newArticle = new Article({
                        title,
                        link,
                        describe,
                        Author,
                    });

                    await newArticle.save();
                    console.log(`Saved ${title}`);
                }

                // console.log(title, link, describe, Author); // hien thi duoi dinh dang json
            })
        }
        else {
            console.log(error);
        }
    });
})