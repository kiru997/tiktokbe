'use strict';
module.exports = function (app) {
    var tikTok = require('./controllers/TikTokApiController');
    app.route('/listForYouFeed')
        .get(tikTok.listForYouFeed)
        .post(tikTok.listForYouFeed);
    app.route('/listComments')
        .get(tikTok.listComments)
        .post(tikTok.listComments);
    app.route('/userDetail')
        .get(tikTok.userDetail)
        .post(tikTok.userDetail);
    app.route('/listVideoOfUser')
        .get(tikTok.listVideoOfUser)
        .post(tikTok.listVideoOfUser);
};