const dbDateformat = 'YYYY-MM-DD HH:mm:ss';
const moment = require('moment-timezone');

const getNowUtc = ()=> { return moment.utc().format(dbDateformat)};

export {
    getNowUtc
}