const { fetchVNExpress } = require("../middleware/scrapper");
const schedule = require('node-schedule');

schedule.scheduleJob('*/1 * * * *', async () => {
    console.log('Starting auto fetch news...');
    await fetchVNExpress();
    // await fetchTuoiTre();
    console.log('Completed auto fetch.');
});