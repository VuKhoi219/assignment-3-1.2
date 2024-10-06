const cheerio = require('cheerio');

const request = require('request-promise');

const Article = require('../models/article');

const cron = require('node-cron');

// request('https://nhandan.vn/', (error, response, html) => {
//     if(!error && response.statusCode === 200) {
//         const $ = cheerio.load(html);
//
//         $('.story').each(async (index, el) => {
//             const title = $(el).find('h2.story__heading a').text();
//             const link = $(el).attr('href');
//             const describe = $(el).find('div.story__summary').text();
//             const Author = $(el).find('div.info-author p').text();
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
    request('https://nhandan.vn/', (error, response, html) => {
        if(!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            $('.story').each(async (index, el) => {
                const title = $(el).find('h2.story__heading a').text();
                const link = $(el).attr('href');
                const describe = $(el).find('div.story__summary').text();
                const Author = $(el).find('div.info-author p').text();

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