const urlencode = require('urlencode');

const gsp = require('getSlackPost');
const ess = require('editSpreadSheet');

exports.handler = async (event, context, callback) => {
  let response;
 
  if(verify(event.token)){
    // slash commandから受け取った時間
    let requestContext = event.requestContext;
    let requestTime = requestContext.requestTimeEpoch;
    // 入力値
    let body = urlencode.parse(event.body, {charset: 'utf-8'});
    let inputValue = await gsp.getSlackPost(body);
    // spread sheetに記入
    await ess.editSpreadSheet(requestTime, inputValue);
    response = {statusCode: 200};
  } else {
    //token doesn't match or wasn't sent, 
    response = {statusCode: 403};
  }
  return response
};

/*
slacktoken must be set as an environment variable and
must match the Token value from the Slack integration
setup page
*/
function verify(token) {
  if(token === process.env.VERIFICATION_TOKEN){
    return true;
  }
  return false;
}
