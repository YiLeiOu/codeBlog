const puppeteer = require('puppeteer');
const path = require("path");
const fs = require('fs');
const https = require('https');
const cheerio = require('cheerio');
const request = require('request');
const pictureDownload = require('./pictureDownload')

const newsTotalCount = 1000;

/*
* 1，open Beowser
* 2，scroll current page
* 3，collect news list
*/
let collectNewsList = async(browser)=>{

    // 1，open Beowser
    let page = await browser.newPage();

    await page.setJavaScriptEnabled(true);

    await page.goto('https://oksnews.me/#');

    let scrollEnable = true;

    let scrollStep = 500;

    await page.waitFor('#load_main li:nth-child(2)');
    await page.waitFor(1000);

    // 2，scroll current page
    while(scrollEnable){

        scrollEnable = await page.evaluate((scrollStep,newsTotalCount)=>{

            let scrollTop = document.scrollingElement.scrollTop;

            document.scrollingElement.scrollTop = scrollTop + scrollStep;

            return document.querySelector('#load_main').childElementCount < newsTotalCount ? true: false;

        }, scrollStep,newsTotalCount);

        await page.waitFor(500);

        console.log('scrolling...');
    }

    let newsList = [];
    // 3，collect news list
    if(!scrollEnable){

        newsList = await page.$$eval('#load_main li > a',(list)=>{

            console.log('list de len :',list.length);

            let hrefList = []

            for(var i = 0; i< list.length; i++ ){

                hrefList.push(list[i].href);

            }

            return hrefList

        },fs);

        for(var i = 0; i< newsList.length; i++ ){

            fs.writeFileSync( path.join(`./txt/listUrl-${newDay()}.txt`), newsList[i] + '\n',{flag:'a'});

        }
        console.log("newsList len:",newsList.length);
    }

    return newsList

}


if ( fs.existsSync(path.join(__dirname,'/images')) ) {

    console.log('file exists');

}else{

    fs.mkdir( path.join(__dirname,'/images') ,function(error){

        if(error){

            console.log(error);

            return false;
        }
        console.log('file create success');

    })
}


puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
    slowMo: 100,
    timeout: 60000,
}).then(async browser => { // get news list

    let newsList = await collectNewsList(browser);

    await browser.close();

    return newsList

}).then((dataLists)=>{  // get full news url

    console.log('dataLists.length ===========',dataLists.length);

    return mapLimit(dataLists, 10, (curItem)=>{

        return new Promise(resolve => {

            console.log('getting full url...');

            https.get(curItem, (res) => {

                if( !!!res.headers.location ) return;

                let uri = (res.headers.location).replace('short','full');

                fs.writeFileSync( path.join(`./txt/newsList-${newDay()}.txt`), uri + '\n',{flag:'a'});

                resolve(uri);

            }).on('error', (e) => {

                console.error(e);

            });

        });
    })
}).then((fullNewsList)=>{  // get news contents
    console.log('fullNewsList ===========',fullNewsList[0].length);

    return mapLimit(fullNewsList[0], 10, (curItem)=>{

        return new Promise(resolve => {

            console.log('saving contents to txt...');

            https.get( curItem, (resp) => {

                if( resp.statusCode != 200  ) return;
            
                let data = '';
                
                let urlObj = parseQueryString(curItem); 
            
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    
                    let formatData = {
                        id: urlObj.id,
                        title:'',
                        images: [],
                        text: ''
                    };

                    let imgsData = [];
            
                    let $ = cheerio.load(data);
                    
                    let imgs = $('.container').find('img');
            
                    let rexEmpty = /(\n+(\s|\n)*)/ig,
                        rex = /\.(png|jpg)/ig;
            
                    let pathName = '',
                        imgUrl = '';
            
                    formatData.title = $('.item-main__title').text();
                    formatData.text = ($('.item-text__body').text()).replace(rexEmpty,'\n');
            
                    
                    for(var i in imgs){

                        if ( isNaN( Number(i) ) ) break; 

                        imgUrl = (/http/ig).test(imgs[i].attribs.src) === false ? 'https://oksnews.me'+ imgs[i].attribs.src : imgs[i].attribs.src;

                        let imgFormat = '';

                        try{

                            imgFormat = !!imgUrl.match(rex) ? imgUrl.match(rex)[0]: '.png';

                            pathName = path.join('images',`${formatData.id}-${i}${imgFormat}` );


                            formatData.images.push(pathName);

                            let imgData = {
                                i: i,
                                id: formatData.id,
                                origin: imgUrl,
                            };

                            imgsData.push(imgData);

                            fs.writeFileSync( path.join(`./txt/imgsDataList-${newDay()}.txt`), JSON.stringify(imgData) + '\n',{flag:'a'});

                
                        }catch(e){
                            console.log(e);
                        }
                        
                    }

                    
                    fs.writeFileSync( path.join(`./txt/newsDataList-${newDay()}.txt`), JSON.stringify(formatData) + '\n',{flag:'a'});
            
                    resolve(imgsData); // 回传promise对象 resolve(res); 把res解析成promise对象并回传到上一层级
                    
                });
            
            }).on('error', (e) => {
                console.error(e);
            });
        });
    })
}).then((imgList)=>{

    if ( imgList[0].length <= 0 ) return;
    
    let allImgList = [];
    
    allImgList = imgList[0].reduce((acc,cur)=>{

        return [].concat(acc).concat(cur);

    });

    let rex = /\.(png|jpg)/ig;

    let imgFormat = '';
        
    mapLimit( allImgList, 10, (curItem)=>{
        
        return new Promise(resolve => {
            try{

                imgFormat = !!curItem.origin.match(rex) ? curItem.origin.match(rex)[0]: '.png';

                pictureDownload( curItem.origin, path.join('images',`${curItem.id}-${curItem.i}${imgFormat}`),3*60*100,2,(url)=>{

                    console.log(url,'============download completed!');

                });

                resolve();

            }catch(e){

                console.log(e);

            }
        });

    }).then(response => {

        console.log('finish')

    })

}).then(()=>{

    console.log('all download completed!')

});


var mapLimit = (list, limit, asyncHandle) => {

    let resList = [];

    let recursion = (arr) => {

        return asyncHandle(arr.shift())

            .then((res)=>{

                resList.push( res );

                if (arr.length!==0) return recursion(arr)   // 数组还未迭代完，递归继续进行迭代

                else return resList;

            })
    };
    
    let listCopy = [].concat(list);

    let asyncList = []; // 正在进行的所有并发异步操作

    while(limit--) {

        asyncList.push( recursion(listCopy) ); 

    }

    return Promise.all(asyncList);  // 所有并发异步操作都完成后，本次并发控制迭代完成
}


function newDay(){

    let current = new Date();

    return (current.getFullYear().toString()+(current.getMonth()+1).toString()+current.getDay()/10 > 1 ? current.getDay().toString() : '0'+current.getDay().toString() );

}


function parseQueryString(url) {
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    for (var i of paraString) {
        keyvalue = i.split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

