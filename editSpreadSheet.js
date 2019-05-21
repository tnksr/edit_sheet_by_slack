const Spreadsheet = require("edit-google-spreadsheet");
 
exports.editSpreadSheet = async function (requestTime, inputValue) {
    // スプレッドシートの編集権限
    console.log(process.env.SPREADSHEET_ID);
    let spreadsheet = await Spreadsheet.load({
        debug: true,
        spreadsheetId:process.env.SPREADSHEET_ID,
        spreadsheetName:process.env.SPREADSHEET_NAME,
        worksheetId:process.env.WORKSHEET_ID,
        worksheetName: process.env.WORKSHEET_NAME,
        oauth2: {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: process.env.REFRESH_TOKEN
        },
        accessToken: {
            type: process.env.ACCESS_TYPE,
            token: process.env.ACCESS_TOKEN
        },
         
    });
    // 最後の行数を取得
    let [row, info] = await spreadsheet.receive({getValues: false});
    var nextRow = info.nextRow;
    var output = {};
    output[nextRow] = {
      // commandを受け取った時間
      1: requestTime,
    };
    for (var i=0; i<inputValue.length; i++){
        output[nextRow][i+2] = inputValue[i];
    }
    await spreadsheet.add(output);
    await spreadsheet.send(function(err) {
      if(err) throw err;
    });
}
