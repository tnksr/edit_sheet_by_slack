
exports.getSlackPost = function (body) {
    
    let inputUserId = "";
    let channelId = "";
    let text = null;
 
    inputUserId += body["user_name"]
    channelId += body["channel_id"]
    text = body["text"]

    if (text) {
        text = text.split(/[\u{20}\u{3000}]/u);
    } else {
        text = [];
    }
    return [inputUserId, channelId] + text;
};
