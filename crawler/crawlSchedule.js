const crawler = require('../crawler/crawler');

const cron = require('node-cron');

cron.cronJob('0 7,18 * * *', async () => {
    console.log('Fetching news...');
    await crawler.fetchNhanDan();
    await crawler.fetchVnExpress();
    console.log('Fetching successful!');
});