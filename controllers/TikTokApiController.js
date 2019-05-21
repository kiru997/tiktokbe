'use strict';
var tiktokApi = require("tiktok-api");
var region = require("../constants/regions");
const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
const callApi = (region) => {
    const signURL = async (url, ts, deviceId) => {
        const as = 'a1a5428b4fa28cf2784355';
        const cp = '2e2ec35afb8bbe2ce1_sMa'
        const mas = '01042d75456a26745ef7bba8e57e5d18aeacaccc2c1cec4c66c61c';
        return `${url}&as=${as}&cp=${cp}&mas=${mas}`;
    }
    let randomID = getRandomIntInclusive(1000, 9999);
    randomID = "1234";
    const params = tiktokApi.getRequestParams(Object.assign({
        device_id: '6597408310473934338',
        // fp: 'PrT_c2LZLMwbFlqMFlU1LSFIJzQZ',
        iid: '6652982632757020421',
        // openudid: '4617150637217100',
        carrier_region_v2: 452
    }, region));
    params.region = "vn";
    const api = new tiktokApi.default(params, {
        signURL
    });
    return api;
}
exports.listForYouFeed = async function (req, res) {

    let defaultRegion = region.VN;
    if (req.body && req.body.region) {
        defaultRegion = region[req.body.region];
    }
    const api = callApi(defaultRegion);
    res.json(await api.listForYouFeed()
        .then(res => {
            return res.data.aweme_list;
        })
        .catch((error) => console.log(error)));
};
exports.listComments = async (req, res) => {
    let defaultRegion = region.VN;
    if (req.body && req.body.region) {
        defaultRegion = region[req.body.region];
    }
    const api = callApi(defaultRegion);
    res.json(await api.listComments({
            aweme_id: req.body.aweme_id,
            cursor: req.body.cursor,
            count: req.body.count,
        })
        .then(res => {
            return res.data.comments;
        })
        .catch((error) => console.log(error)));
}
exports.userDetail = async (req, res) => {
    let defaultRegion = region.VN;
    if (req.body && req.body.region) {
        defaultRegion = region[req.body.region];
    }
    let userUid = req.body.userUid;
    const api = callApi(defaultRegion);
    res.json(await api.getUser(userUid)
        .then(res => {
            return res.data.user;
        })
        .catch((error) => console.log(error)));
}
exports.listVideoOfUser = async (req, res) => {
    let defaultRegion = region.VN;
    if (req.body && req.body.region) {
        defaultRegion = region[req.body.region];
    }
    let userUid = req.body.userUid;
    const api = callApi(defaultRegion);
    res.json(await api.listPosts({
            user_id: userUid
        })
        .then(res => {
            return res.data.aweme_list;
        })
        .catch((error) => console.log(error)));
}