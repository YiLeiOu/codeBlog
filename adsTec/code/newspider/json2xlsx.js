const sd = require('silly-datetime');   //日期时间依赖
const fs = require("fs");  
const path = require("path");
const Excel = require("exceljs");  
const workbook = new Excel.Workbook();


let FSname = sd.format(new Date(), "YYYYMMDD");

// Excel config
workbook.views = [
    {
        x: 0,
        y: 0,
        width: 1000,
        height: 2000,
        firstSheet: 0,
        activeTab: 1,
        visibility: "visible"
    }
];
// worksheet name
var worksheet = workbook.addWorksheet("apkpure");


// init the worksheet
worksheet.columns = [
    { header: 'AppName', key: 'app_name', width: 20 },
    { header: 'APK(Yes/NO)', key: 'apk', width: 20 },
    { header: 'link', key: 'link', width: 60 }
];

// list 是短链接
var videoJsonString = fs.readFileSync(path.resolve(__dirname,`./txt/${FSname}_appInfo.txt`),'utf-8');
var videoJsonArr = videoJsonString.split('\n');
(/\S/g).test(videoJsonArr[videoJsonArr.length-1]) === false ? videoJsonArr.pop() : null;
// videoJson = videoJson.reverse();
videoJsonArr = videoJsonArr.map((item) => {
    return JSON.parse(item)
});
// console.log(videoJsonArr);
save2Json(videoJsonArr);

function save2Json(arr){
    for(let i=0 ; i< arr.length; i++ ){
        let data = arr[i];
        if( data.app_name && data.apk ) {
            // add one row data to the worksheet
            worksheet.addRow({
                "app_name": data.app_name,
                "apk": data.apk,
                "link": data.link
            });

        }
        i === data.length-1 ? console.log('表格转化结束！') : null;
    }
    var filename='apkpure_'+FSname+'.xlsx';//file name
    var fpath = path.join(__dirname,'./download/'+filename)//file path to save
    // save excel to localstore
    workbook.xlsx.writeFile(fpath).then(function() {
        console.log("saved");
    }).catch((err)=>{
        console.log(err)
    });
}