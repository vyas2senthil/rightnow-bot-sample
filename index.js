'use strict';

// パッケージをインポート
let express = require("express");
let app = express();
let bot_express = require("bot-express");
let logger = require("morgan");
let app_env = require("./environment_variables");

// ミドルウェアの設定とサーバープロセスの起動設定
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running...`);
});

// Webhookの設定。bot-expressの設定パラメータはすべて環境変数からセットできるようにします
app.use('/webhook', bot_express({
    apiai_client_access_token: app_env.APIAI_CLIENT_ACCESS_TOKEN,
    line_channel_id: app_env.LINE_CHANNEL_ID,
    line_channel_secret: app_env.LINE_CHANNEL_SECRET,
    line_channel_access_token: app_env.LINE_CHANNEL_ACCESS_TOKEN,
    facebook_app_secret: app_env.FACEBOOK_APP_SECRET,
    facebook_page_access_token: app_env.FACEBOOK_PAGE_ACCESS_TOKEN,
    default_skill: "faq"
}));

module.exports = app;
