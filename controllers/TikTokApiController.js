"use strict";
var tiktokApi = require("tiktok-api");
var region = require("../constants/regions");
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};
const callApi = (region, device_id = "", iid = "") => {
  const signURL = async (url, ts, deviceId) => {
    const as = "a1a5428b4fa28cf2784355";
    const cp = "2e2ec35afb8bbe2ce1_sMa";
    const mas = "01042d75456a26745ef7bba8e57e5d18aeacaccc2c1cec4c66c61c";
    return `${url}&as=${as}&cp=${cp}&mas=${mas}`;
  };
  const flag = getRandomIntInclusive(0, 1);
  const arrayDevides = [
    {
      device_id: "6597408310473934338",
      iid: "6652982632757020421",
      openudid: "4617150637217100"
    },
    {
      iid: "6620659482206930694",
      device_id: "6594726280552547846",
      openudid: "b307b864b574e818"
    }
  ];

  const params = tiktokApi.getRequestParams(
    Object.assign(
      {
        ...arrayDevides[flag],
        app_language: "en",
        language: "en",
        region: "US",
        app_type: "normal",
        sys_region: "US",
        carrier_region: "AU",
        carrier_region_v2: "505",
        build_number: "9.9.0",
        timezone_offset: 28800,
        timezone_name: "Asia/Shanghai",
        mcc_mnc: "23001",
        is_my_cn: 0,
        // fp: 'PrT_c2LZLMwbFlqMFlU1LSFIJzQZ',
        account_region: "US",
        // iid: '6620659482206930694',
        ac: "wifi",
        channel: "googleplay",
        aid: "1233",
        app_name: "musical_ly",
        version_code: 990,
        version_name: "9.1.0",
        // device_id: '6594726280552547846',
        device_platform: "android",
        ssmix: "a",
        device_type: "Pixel",
        device_brand: "Google",
        os_api: "26",
        os_version: "8.0.0",
        // openudid: 'b307b864b574e818',
        manifest_version_code: "2019011531",
        resolution: "1080*1920",
        dpi: 420,
        update_version_code: "2019011531",
        "pass-region": 1,
        "pass-route": 1,
        _rticket: parseInt(Math.round(+new Date() * 1000)),
        ts: parseInt(Math.round(+new Date() * 1000)),
        as: "a145cac75e153c5ef36066",
        cp: "ab5ac054ec3175e3e1Yaae",
        items: "016d48633d67d491135bc9b025d80be9d56c6c0c6ccc66a6acc6cc"
      },
      region
    )
  );
  const api = new tiktokApi.default(params, {
    signURL
  });
  return api;
};
exports.listForYouFeed = async function(req, res) {
  let defaultRegion = region.VN;
  if (req.body && req.body.region) {
    defaultRegion = region[req.body.region];
  }
  const api = callApi(defaultRegion);
  res.json(
    await api
      .listForYouFeed()
      .then(res => {
        return res.data.aweme_list;
      })
      .catch(error => console.log(error))
  );
};
exports.listComments = async (req, res) => {
  let defaultRegion = region.VN;
  if (req.body && req.body.region) {
    defaultRegion = region[req.body.region];
  }
  const api = callApi(defaultRegion);
  res.json(
    await api
      .listComments({
        aweme_id: req.body.aweme_id,
        cursor: req.body.cursor,
        count: req.body.count
      })
      .then(res => {
        return res.data.comments;
      })
      .catch(error => console.log(error))
  );
};
exports.userDetail = async (req, res) => {
  let defaultRegion = region.VN;
  if (req.body && req.body.region) {
    defaultRegion = region[req.body.region];
  }
  let userUid = req.body.userUid;
  const api = callApi(defaultRegion);
  res.json(
    await api
      .getUser(userUid)
      .then(res => {
        return res.data.user;
      })
      .catch(error => console.log(error))
  );
};
exports.listVideoOfUser = async (req, res) => {
  let defaultRegion = region.VN;
  if (req.body && req.body.region) {
    defaultRegion = region[req.body.region];
  }
  let userUid = req.body.userUid;
  const api = callApi(defaultRegion);
  res.json(
    await api
      .listPosts({
        user_id: userUid
      })
      .then(res => {
        return res.data.aweme_list;
      })
      .catch(error => console.log(error))
  );
};
