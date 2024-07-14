'use strict';
var LINE_SDK = function(user) {
    this.created_at = new Date();
};

const { Client } = require('@line/bot-sdk');
const lingConfig = require('../../configs/lineConfig');
const client = new Client(lingConfig);

let response = {};

LINE_SDK.Webhook = function()
{
    return new Promise(async resolve => {
        const events = req.body.events;

        events.forEach(async (event) => {
          if (event.type === 'follow' || event.type === 'memberJoined') {
            const userId = event.source.userId;
            console.log('Follow | Member Joined (Event)');
            console.log('UserId: ', userId);
      
            // Check if the user is already a member
            const profile = await client.getProfile(userId);
            console.log('Profile Info: ', profile);
            const isMember = checkIfMember(profile);
      
            if (isMember) {
              await client.linkRichMenuToUser(userId, 'RICH_MENU_ID_FOR_MEMBERS');
            } else {
              await client.linkRichMenuToUser(userId, 'RICH_MENU_ID_FOR_NON_MEMBERS');
            }
          }
        });

        resolve();
    })
}

function checkIfMember(profile) {
    return true;
}


module.exports = LINE_SDK;