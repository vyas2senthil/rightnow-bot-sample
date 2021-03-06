'use strict';

let Promise = require('bluebird');
let striptags = require('striptags');
let debug = require('debug')('skill');
let rightnow = require('../service/rightnow');

module.exports = class SkillFaq {

    finish(bot, bot_event, context){
        let message_text = bot.extract_message_text(bot_event);
        return rightnow.search_answer(message_text, "LGBT").then(
            (response) => {
                let messages;
                if (!response || !response.Solution){
                    messages = [{
                        text: "ごめんなさい、ちょっと分かりませんでした。"
                    }];
                } else {
                    messages = [{
                        text: striptags(response.Solution)
                    }];
                }
                return bot.reply(bot_event, messages);
            },
            (response) => {
                debug(response);
                return Promise.reject("Failed to get answer from rightnow.");
            }
        );
    }
};
