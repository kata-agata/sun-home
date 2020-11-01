const moment = require('moment');

const dateFormat = function(date, options){
    const formatToUse = 'DD/MM/YYYY HH:mm'
    return moment(date).format(formatToUse);
}

module.exports = dateFormat;
