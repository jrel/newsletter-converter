"use strict";
exports.__esModule = true;
var news_parser_1 = require("main/factories/usescases/news-parser");
var mail_webhook_1 = require("presentation/controllers/mail-webhook");
exports.makeMailWebhook = function () {
    var newsParser = news_parser_1.makeNewsParser();
    return new mail_webhook_1.MailWebhook(newsParser);
};
