/*
2023年10月8日更新



by：中车大神🚄
*/
var isRefreshing = false;

// 声明一个对象myHeaders，包含一个User-Agent字段，用于在HTTP请求中标识客户端信息
var myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    "Authorization" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbGllbnQueGhhZG1pbiIsImF1ZCI6InNlcnZlci54aGFkbWluIiwiaWF0IjoxNjkzODkwMjQ4LCJleHAiOjE3OTM4OTAyNDcsInVpZCI6IjI0MzMzIn0.cljbxxB_DRHZeRipc7vIt24aS7pQAnbul40HlJH00HM",
    
    "Content-Type" : "application/json"
};

var myHeaders2 = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/117.0.5938.117 Mobile/15E148 Safari/604.1",
    "Referer" : "https://www.lzltool.com/AES",
    
    "Content-Type" : "application/json",
    "X-Requested-With" : "XMLHttpRequest",
    "RequestSignature" : getCurrentTimestamp()
};
// 使用$text模块的base64Decode方法解码字符串，将结果赋值给urlt变量
var urlt = $text.base64Decode("aHR0cHM6Ly9qaWVrb3UuYXBpc2FwaXMueHl6OjE4ODgvYXBpL3ZpZGVvL2xpc3Q/dmVyc2lvbj0xLjEuMQ==");
var urlt2 = $text.base64Decode("aHR0cHM6Ly9qaWVrb3UuYXBpc2FwaXMueHl6OjE4ODgvYXBpL3ZpZGVvL3BsYXk/dmVyc2lvbj0xLjEuMQ==");



var CryptoJS = require("crypto-js");

function suanfa() {                                
var image_type = $cache.get("image_type");
console.log("算法特征"+image_type)
var AES_encryptionMode;
var secretKey;
var iv;

if (image_type == 2) {
    AES_encryptionMode = 'CBC';
    secretKey = 'f5d965df75336270';
    iv = '97b60394abc2fbe1';
} else if (image_type == 4) {
    AES_encryptionMode = 'ECB';
    secretKey = '525202f9149e061d';
    iv = '';
}
$cache.set("AES_encryptionMode",AES_encryptionMode);
var key = CryptoJS.enc.Utf8.parse(secretKey);
var iv = iv ? CryptoJS.enc.Utf8.parse(iv) : ''
$cache.set("ASEkey",key);
$cache.set("AESiv",iv);
}                
                
//请求app
//function appdata() {
//    return new Promise((resolve, reject) => {
//        var platform_id = $cache.get("platform_id");
//        $http.post({
//            url: urlt,
//            header: myHeaders,
//            body: {
//                "page": 1,
//                "limit": 1,
//                "platform_id": platform_id
//            },
//            handler: function(resp) {
//                $ui.loading(false);
//                if (resp.error) {
//                    reject(resp.error);
//                } else {
//                    var channelList = resp.data.data.video_category;
//                    console.log("请求速度");
//                    $cache.set("channelList",channelList)
//                     resolve(channelList);
//                }
//            }
//        });
//    });
//}   


// 调用ui模块的render方法来渲染界面
function jiemian() {
//  var channelList = $cache.get("channelList")
  var appname = $cache.get("appname");
$ui.push({
    props: {
        // 设置页面标题
        title: appname
    },
    views: [
        // 创建一个输入框视图
        {
            type:"input",
            props:{
                // 设置输入框的id
                id:"searchbar",
                // 设置输入框的占位符
                placeholder:"搜索🔍"
            },
            layout:function(make){
                // 设置输入框的布局，位于页面顶部，占据全宽，高度为50
                make.top.left.right.inset(0);
                make.height.equalTo(50);
            },
            events:{
                // 当输入框中按下回车键时触发
                returned:function(sender){
                    // 让输入框失去焦点
                    sender.blur();
                    // 调用search函数，传入输入的文本
                    search(sender.text);
                }
            }
        },
        // 创建一个菜单视图
        {
            type:"menu",
            props:{
                // 设置菜单的id
                id:"menu",
                // 通过映射channelList数组来创建菜单项
                items:[],
                },
                
            layout:function(make){
                // 设置菜单的布局，位于输入框的下方，占据全宽，高度为50
                make.left.right.equalTo(0);
                make.top.equalTo($("searchbar").bottom);
                make.height.equalTo(50);
            },
            events:{
                // 当选择菜单项时触发
                changed:function(sender){
                    // 将所选菜单项的id存入缓存
      console.log("选择菜单:"+JSON.stringify(sender.data));
       var channelList = $cache.get("channelList")               
var obj = channelList[sender.index].category_id;                    
                    
 var output = {"category_id": obj };
 console.log("菜单:"+output);
                  
                     
  var channelLists = JSON.stringify(output);
                     $cache.set("type",channelLists);
                    // 将页面数pg设置为1，存入缓存
                 $cache.set("pg",1);
                    // 调用getdata函数
                    $("Video").data = []; // 清空 "Video" 矩阵的数据
//加载自动刷新函数                 
                                        shuaxin();
//                                        
                }
            }
        },
        // ...
            
      //...
{
    type: "matrix",
    props: {
        id: "Video",
        itemHeight: 180,
        columns: 2,
        spacing: 7,
        template: [
            {
                type: "image",
                props: {
                    id: "img",
                    radius: 3
                },
                layout: function(make, view) {
                    make.centerX.equalTo(view.super);
                    make.height.equalTo(90);
                    make.width.equalTo(180);
                }
            },
//...

//...            
            {
                type: "label",
                props: {
                    id: "pm",
                    align: $align.center,
                    lines: 0,
                    font: $font("bold", 15)
                },
                layout: function(make, view) {
                    make.top.equalTo($("img").bottom).offset(10);
                    make.right.left.inset(0);
                }
            }
        ]
    },
    layout: function(make) {
        make.top.equalTo($("menu").bottom);
        make.bottom.left.right.inset(0);
    },
    events: {
        didSelect: function(sender, indexPath, data) {
            geturl(data.url, data.pm.text);
        },
        didReachBottom: function(sender) {
            sender.endFetchingMore();
            
//            $ui.loading(true);
//            shuaxin();
    if (!isRefreshing) {
        $ui.loading(true);
        isRefreshing = true;  // 在调用shuaxin()之前将标记设置为true
        var page = $cache.get("pg") + 1;
                    $cache.set("pg", page);
        shuaxin();
    }
            
        },
        didLongPress: function(sender, indexPath, data) {
              // 获取已保存的数据
                let savedData = $cache.get("shoucang") || [];
                
                // 添加新的数据到数组的前端
                savedData.unshift(data);
                
                // 保存数据
                $cache.set("shoucang", savedData);
                
                $ui.toast("收藏成功✅");
        }
    }
},
//...

{
            type: "button",
            props: {
                id: "hb_img",
                src: "https://icon-icons.com/downloadimage.php?id=79718&root=1128/ICO/512/&file=1486164750-love08_79718.ico",
            },
            events: {
                tapped: function (sender) {
              shoucangJM();      
                }
            },
            layout: function (make, view) {
                make.bottom.inset(30)
                make.width.height.equalTo(60)
                make.right.inset(15)
                //shoucangJM();
            }
        }
                                                                                                                                                                                                                                                                                                                                                                                                                                    
//...
                                                                                                         ]
                                                                                                 });
                                                                                                 }
                                                                                                 
//收藏夹视图
function shoucangJM(){

 $ui.push({
  props: {
    title: "收藏夹"
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "matrix",
        itemHeight: 180,
        columns: 2,
        spacing: 7,
        template: [
          {
            type: "image",
            props: {
              id: "img",
              radius: 3
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.height.equalTo(90);
              make.width.equalTo(180);
            }
          },
          {
            type: "label",
            props: {
              id: "pm",
              align: $align.center,
              lines: 0,
              font: $font("bold", 15)
            },
            layout: function(make, view) {
              make.top.equalTo($("img").bottom).offset(10);
              make.right.left.inset(0);
            }
          }
        ]
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          // Handle item selection
          geturl(data.url, data.pm.text)
        },
        didLongPress: function(sender, indexPath, data) {
          //JSON.stringify` 方法将每个项和 `data` 转换为 JSON 字符串对比删除包含data数据
                      let savedData = $cache.get("shoucang") || [];
                      savedData = savedData.filter(item => JSON.stringify(item) !== JSON.stringify(data));
                      $cache.set("shoucang", savedData);
                        
                      
           //刷新收藏夹             
          
          $ui.toast("收藏删除成功❌");
          $("matrix").data = savedData;
                }
      }
    }
  ]
});
  var shoucang = $cache.get("shoucang");
  
  $("matrix").data = shoucang;
  //console.log("收藏" + JSON.stringify(shoucang));
  //菜单
     
  //

}

                                                                                                                                                                        
                                                                                                 

async function getdata() {
  try {
    $ui.loading(true);  
    var AES_encryptionMode = $cache.get("AES_encryptionMode");
    var key = $cache.get("ASEkey");
    var iv = $cache.get("AESiv");
    console.log("算法模式"+AES_encryptionMode)
    var platform_id = $cache.get("platform_id", platform_id);
    var image_type = $cache.get("image_type");
    var page = $cache.get("pg");
    console.log("页数" + page);
    var typeStr = $cache.get("type");
    var type = JSON.parse(typeStr);
    $ui.loading(true);
    let resp = await $http.post({
      url: urlt,
      header: myHeaders,
      body: { "page": page, ...type, "limit": 16, "platform_id": platform_id }
    });
    $ui.loading(false);
    let li = resp.data.data.list;
    for (let dli of li) {
      $http.get({ url: dli.image }).then(async (resp) => {
        if (resp.error) {
          throw resp.error;
        } else {
          let data;
          if (image_type == 0) {
            data = { img: { src: dli.image }, pm: { text: dli.title }, url: dli.video_id };
            $("Video").insert({ indexPath: $indexPath(0, $("Video").data.length), value: data });
          } else {
            var base64Data = $text.base64Encode(resp.data);
                        //console.log(base64Data);
                        var size = base64Size(base64Data);

                                    console.log(dli.title+"前图片大小"+size/1024);

if (size > 270 * 1024) { // 380KB = 380 * 1024 bytes
    $thread.background({
      //delay: 2,
      handler: function() {
        // 执行解密操作
        let imagebase = CryptoJS.AES.decrypt(base64Data, key, { iv: iv, mode: CryptoJS.mode[AES_encryptionMode], padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Base64);
    
        $thread.background({
          //delay: 2.1,
          handler: function() {
            // 更新 UI
            let imgData = $data({"base64": imagebase});
                                       let img = $image(imgData);
                                        //const resized = img.resized($size(400, 250));
                                        let compressedImgData = img.jpg(0.1);
                                        // 转换为Base64
                                        let compressedBase64Image = $text.base64Encode(compressedImgData);
                      var size = base64Size(compressedBase64Image);
            let data = { img: { src: "data:image/png;base64,"+compressedBase64Image  }, pm: { text: dli.title }, url: dli.video_id };
            $("Video").insert({ indexPath: $indexPath(0, $("Video").data.length), value: data });
          }
        });
      }
    });
} else {
    $http.post({
        url: "https://www.lzltool.com/Encrypt/AesDecrypt",
        header: myHeaders2,
        body: {
            "Content":base64Data,
            "Encoding":"utf-8",
            "PrivateKey":"f5d965df75336270",
            "Iv":"97b60394abc2fbe1",
            "InputDataType":"Text",
            "PaddingMode":"PKCS7",
            "CipherMode":"CBC",
            "OutputDataType":"Base64",
            "KeyIvDataType":"Text"
        },
        handler: function(resp) {
            if (resp.error) {
                reject(resp.error);
            } else {
                var base64String = resp.data.Data;
//let imgData = $data({"base64": base64String});
//                            let img = $image(imgData);
//                            const resized = img.resized($size(800, 400));
//                            let compressedImgData = resized.jpg(0.1);
                               
                            
                            // 转换为Base64
//                            let compressedBase64Image = $text.base64Encode(compressedImgData);
          var size = base64Size(base64String);
          
                                              console.log(dli.title+"图片大小"+size/1024+"KB");                  
                data = { img: { src: "data:image/png;base64,"+base64String}, pm: { text: dli.title }, url: dli.video_id };
                $("Video").insert({ indexPath: $indexPath(0, $("Video").data.length), value: data });
            }
        }
    });
}


          }
          
        }
      });
    }
    $("Video").endRefreshing();
    isRefreshing = false;
  } catch (err) {
    console.error(err);
    $("Video").endRefreshing();
  }
  $ui.loading(false);  
}

//这段代码的不同之处在于，我们没有等待所有的图片请求都完成后再更新视图，而是在每次图片请求完成时就立即更新视图。这样，用户可以更早地看到结果。
//计算大小
function base64Size(base64Data) {
    var length = base64Data.length;
    return Math.ceil((length / 4) * 3);
}
//时间
function getCurrentTimestamp() {
    var date = new Date();
    var timestamp = Math.floor(date.getTime() / 1000);
    return timestamp;
}




function geturl(url, pm) {
    $ui.loading(true);
    $http.post({
             url:urlt2,
             header: myHeaders,
             body:{"id":url},
            handler: function (resp) {
                $ui.loading(false);
                var playurl = resp.data.data;
            
            //playurlt = playurl.substring(playurl.indexOf("url=") + 4);
            console.log(playurl);
            play(playurl, pm)
        }
    })
}

function play(url, mc) {
    $ui.push({
        props: {
            title: mc
        },
        views: [{
            type: "web",
            props: {
                id: "bof",
                url: url,
            },
            layout: $layout.fill
        }]
    })
}


//第一次运行弹窗提示







function search(query) {
  console.log(query);
  //var output = {"title": encodeURIComponent(query)};  // 使用 encodeURIComponent 函数来确保 query 是一个有效的 URL 组件
  var output = {"title": query};
  var channelLists = JSON.stringify(output);
  $cache.set("type", channelLists);
  $cache.set("pg",1);
  $("Video").data = []; // 清空 "Video" 矩阵的数据
  //加载自动刷新函数                 
                                          shuaxin();
}

  //自动刷新函数

async function shuaxin() {
  for (let i = 0; i < 1; i++) {
    let videoView = $("Video");
    //防止多次下滑秒退报错
    if (!videoView) {
      console.log('找不到界面2');
      break;
    }
    await getdata();
    //var page = $cache.get("pg") + 1;
    //$cache.set("pg", page);
  }
}




//分割线***************
//启动界面


let applist = [];

// 定义矩阵视图
const IMAGE_SIZE = $device.info.screen.width / 5;//字体数量
const LABEL_HEIGHT = 50;//高度
const GAP = 10;
let matrix = {
  type: "matrix",
  props: {
    columns: 5,
    itemHeight: IMAGE_SIZE + LABEL_HEIGHT,
    spacing: GAP,
    square: false,
    template: [
      {
        type: "image",
        props: {
          id: "image",
          contentMode: $contentMode.scaleAspectFit,
        },
        layout: (make, view) => {
          make.centerX.equalTo(view.super);
          make.top.inset(GAP);
          make.size.equalTo($size(IMAGE_SIZE - 2 * GAP, IMAGE_SIZE - 2 * GAP));
        },
      },
      {
        type: "label",
        props: {
          id: "label",
          align: $align.center,
          lines:2
        },
        layout: (make, view) => {
          make.centerX.equalTo(view.super);
          make.top.equalTo(view.prev.bottom);
          make.width.equalTo(view.super);
          make.height.equalTo(LABEL_HEIGHT);
        },
      }
    ],
    data: [], // 初始时数据为空
  },
  layout: $layout.fill,
  events: {
    didSelect: (sender, indexPath, data) => {
      let types = applist[indexPath.item].type;
      if (types == 1) {
          let url = applist[indexPath.item].url;
          let appname = applist[indexPath.item].name;
          loufengplays(url, appname);
      } else if (types == 2) {
          let url = applist[indexPath.item].url;
          let appname = applist[indexPath.item].name;
          shipinplays(url, appname);
      } else if (types == 3) {
          let url = applist[indexPath.item].url;
          let appname = applist[indexPath.item].name;
          jihuoplays(url, appname);
      } else if (types == 4) {
           let url = applist[indexPath.item].url;
           let appname = applist[indexPath.item].name;
           baoliaopalys(url,appname);
       }else if (types == 5) {
           yinyuehezi();
           
       }else if (types == 6) {
           aituoyiapp();
           
       }else {
          console.log("错误🙅");
          let platform_id = applist[indexPath.item].platform_id;
          $cache.set("platform_id", platform_id);
          let appname = applist[indexPath.item].name;
          $cache.set("appname", appname);
          let image_type = applist[indexPath.item].image_type;
          $cache.set("image_type", image_type);
          suanfa();
          jiemian();
          //
                    async function main() {
          var platform_id = $cache.get("platform_id");
                  $http.post({
                      url: urlt,
                      header: myHeaders,
                      body: {
                          "page": 1,
                          "limit": 1,
                          "platform_id": platform_id
                      },
                      handler: function(resp) {
                          $ui.loading(false);
                          if (resp.error) {
                              reject(resp.error);
                          } else {
                              var channelList = resp.data.data.video_category;
                              $cache.set("channelList",channelList)
                              console.log("请求速度");
          $ui.loading(true);
                            
                                
                            
                                // 使用 $("menu") 来获取 menu 元素，并使用 .items 来更新其值
                                $("menu").data =channelList 
                                $("menu").items = channelList.map(function (item) {
                                    return item.title;
                                });
                            
                                // 关闭加载指示器
                                $ui.loading(false);                        
                              
                               //resolve(channelList);
                          }
                      }
                  });            
                        
                
                            //var channelList = await appdata();
          // 开始加载指示器
                                              
                               
                            
                        
                    }
                    main();
                    //
                    
                                      var output = {"category_id": ""};
                                      var channelLists = JSON.stringify(output);
                                      console.log(channelLists);
                                      $cache.set("type", channelLists);
                                      $cache.set("pg", 1);
                    //                  //启动app界面
                                      //jiemian();
                                      //启动获取界面数据
                                      shuaxin();
                    
          
      }
      //
    },
  },
};

// 渲染界面
function zhongchehezi () {
$ui.render({
  props: { title: "中车聚合盒子🚄(持续更新中...)" },
  views: [matrix]
});


// 获取应用列表
$http.get({
  url: "https://ghproxy.com/https://raw.githubusercontent.com/Q39547190/JS-BOX/main/ZCZHSP.json",
  handler: function(resp) {
    applist = resp.data.applist;
    $cache.set("applist", applist);
    
    // 更新矩阵视图的数据
    $("matrix").data = applist.map(item => {
      return {
        image: { src: item.pic_url },
        label: { text: item.name },
      };
    });
  }
});
//启动更新函数
get_updata()
}

//自动更新
async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9naHByb3h5LmNvbS9odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUTM5NTQ3MTkwL0pTLUJPWC9tYWluL0FXSlEtZ3guanNvbg=="));
    if(resp.response.statusCode === 200){
        if (resp.data.version != "9.0") {
            $ui.alert({
                title: "发现新版本 - " + resp.data.version,
                message: resp.data.upexplain,
                actions: [
                    {
                        title: "立即更新",
                        handler: function () {
                            download(resp.data.updata,resp.data.name)
                        }
                    }, {
                        title: "取消"
                    }
                ]

            });
            
        }else{
          let today = new Date().toLocaleDateString();
          console.log (today);
          let key = "dismissedAt";
          
          let dismissedAt = $cache.get(key);
          
          
          if (dismissedAt != today) {
            $ui.alert({
              title: "公告",
              message: resp.data.Bulletin,
              actions: [
                {
                  title: "进入软件",
                  handler: function() {
                    // 在这里添加进入软件的代码
                  }
                },
                {
                  title: "今天不再提示",
                  handler: function() {
                    $cache.set(key, today);
                  }
                }
              ]
            });
          }
          //..
        
        }
        //..
    }
}


function download(url,name) {
    $ui.toast("正在安装中 ...");
    $http.download({
        url: url,
        handler: function (resp) {
            $addin.save({
                name: name,
                data: resp.data,
                handler: function () {
                    $ui.alert({
                        title: "安装完成",
                        message: "\n是否打开？\n" + name,
                        actions: [
                            {
                                title: "打开",
                                handler: function () {
                                    $app.openExtension(name)
                                }
                            },
                            {
                                title: "不了"
                            }]
                    });
                }
            })
        }
    })
}


//楼凤网页
function loufengplays(url,appname) {
    $ui.push({
        props: {
            title: appname
        },
        views: [{
            type: "web",
            props: {
                id: "webview",
                url: url
            },
            layout: $layout.fill
        }]
    });
}
//视频网页
function shipinplays(url,appname) {
$ui.push({
    props: {
        title: appname,
        bgcolor: $color("#9C64A7")//背景颜色
    },
    views: [{
        type: "label",
        props: {
            text: "收藏的视频在右侧❤️按钮\n⬇️返回请点击下方'<'按钮      点击下方⭐️收藏视频",
            textColor: $color("black"),
            font: $font(19),
            align: $align.left,
            lines:2,
            
        },
        layout: function(make, view) {
            make.left.equalTo($("hb_img").right);
                        make.centerY.equalTo($("hb_img"));
        }
    },{
        type: "button",
        props: {
            id: "hb_img",
            src: "https://icon-icons.com/downloadimage.php?id=79718&root=1128/ICO/512/&file=1486164750-love08_79718.ico"
        },
        events: {
            tapped: function(sender) {
                
                //
                shoucangpalys();
            }
        },
        layout: function(make, view) {
            make.top.inset(-5);
            make.width.height.equalTo(60);
            make.right.inset(20);
        }
    },
      
      {
        type: "web",
        props: {
            id: "webview",
            url: url,
            script: `
                var script = document.createElement('script');
                script.src = 'https://h5.kdes.autos/static/js/pages-baoliao-baoliao~pages-baoliao-baoliaoDetail~pages-comics-comics~pages-comics-comicsView~pages-~b98920ef.19dbb9ca.js';
                document.body.appendChild(script);
            `
        },
        layout: function(make, view) {
          make.top.inset(50);  // 将网页向下移动20个像素
            make.width.equalTo($device.info.screen.width);
            make.height.equalTo($device.info.screen.height - 200);//底部上拉
make.top.equalTo($("hb_img").bottom).offset(0); // 使网页视图的顶部对齐按钮的底部，且中间留10个像素的间距            
          }
    },
    
    
    ]
});
}


//激活图片加载

function jihuoplays(url,appname) {
    $ui.push({
    props: {
        title: "请点依次击下方4个app等待加载图片"
    },
    views: [{
        type: "web",
        props: {
            id: "webview",
            url: url,
            script: `
            //js代码注入隐藏顶部
                var style = document.createElement('style');
                style.innerHTML = 'body { margin-top: -750px; }';
                document.head.appendChild(style);
            `
        },
        layout: function(make, view) {
            make.width.equalTo($device.info.screen.width);
        
            make.height.equalTo($device.info.screen.height);
            make.top.equalTo(0);
        }
    }]
});
}

//网页收藏夹

function shoucangpalys(url,appname) {
    $ui.push({
    props: {
        title: "收藏夹2"
    },
    views: [{
        type: "web",
        props: {
            id: "webview",
            url: "https://h5.kdes.autos/#/pages/collect/collect",
            script: `
                var script = document.createElement('script');
                script.src = 'https://h5.kdes.autos/static/js/pages-baoliao-baoliao~pages-baoliao-baoliaoDetail~pages-comics-comics~pages-comics-comicsView~pages-~b98920ef.19dbb9ca.js';
                document.body.appendChild(script);
            `
        },
        layout: function(make, view) {
            make.width.equalTo($device.info.screen.width);
//隐藏底部信息            
            make.height.equalTo($device.info.screen.height - 0);
          }
    }]
});
}
//51爆料界面
function baoliaopalys(url,appname) {
    $ui.push({
    props: {
        title: appname
    },
    views: [{
        type: "web",
        props: {
            id: "webview",
            url: url,
            script: `
                var script = document.createElement('script');
                script.src = 'https://h5.kdes.autos/static/js/pages-baoliao-baoliao~pages-baoliao-baoliaoDetail~pages-comics-comics~pages-comics-comicsView~pages-~b98920ef.19dbb9ca.js';
                document.body.appendChild(script);
            `
        },
        layout: function(make, view) {
            make.width.equalTo($device.info.screen.width);
//隐藏底部信息            
            make.height.equalTo($device.info.screen.height - 15);
          }
    }]
});
}

//AI脱衣界面
function aituoyiapp (){
var MYheaders = {
 'Accept' : `*/*`,
 'Origin' : `https://huanlianapp.com`,
 'Accept-Encoding' : `gzip, deflate, br`,
 'Content-Type' : `multipart/form-data; boundary=----WebKitFormBoundaryPvc5QqLJV5BvEPjr`,
 'Connection' : `keep-alive`,
 'Host' : `101.43.71.220:15002`,
 'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1`,
 'Authorization' : `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbGllbnQudnVlYWRtaW4iLCJhdWQiOiJzZXJ2ZXIudnVlYWRtaW4iLCJpYXQiOjE2OTUyNTc0MjcsImV4cCI6MTE2OTUyNTc0MjYsInVpZCI6NTY3NX0.xC9VjjGdrB_aMnwTP_IhJWrKV2jnKCYgkO17GCikBzI`,
 'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
 'Referer' : `https://huanlianapp.com/`
 };
 
 var MYheaders2 = {
  'Accept' : `*/*`,
  'Origin' : `https://huanlianapp.com`,
  'Accept-Encoding' : `gzip, deflate, br`,
  'Content-Type' : `application/json`,
  'Connection' : `keep-alive`,
  'Host' : `101.43.71.220:15002`,
  'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1`,
  'Authorization' : `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbGllbnQudnVlYWRtaW4iLCJhdWQiOiJzZXJ2ZXIudnVlYWRtaW4iLCJpYXQiOjE2OTUyNTc0MjcsImV4cCI6MTE2OTUyNTc0MjYsInVpZCI6NTY3NX0.xC9VjjGdrB_aMnwTP_IhJWrKV2jnKCYgkO17GCikBzI`,
  'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
  'Referer' : `https://huanlianapp.com/`
  };
 

const CryptoJS = require('crypto-js');

function decrypt(encryptedBase64Str) {
    console.log(encryptedBase64Str);
    var AES_encryptionMode = 'ECB';
    var secretKey = '1111111111111111';

    var key = CryptoJS.enc.Utf8.parse(secretKey);

    try {
        let decrypted = CryptoJS.AES.decrypt(encryptedBase64Str, key, { mode: CryptoJS.mode[AES_encryptionMode], padding: CryptoJS.pad.Pkcs7 });
        let imagebase = decrypted.toString(CryptoJS.enc.Base64);
        console.log(imagebase);
        return imagebase;
    } catch (error) {
        console.error(error);
        return '';
    }
}


function generateRandomFilename() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4() + ".jpeg";
}

let randomFilename = generateRandomFilename(); // 生成一个随机文件名

$ui.push({
  props: { title: "AI脱衣" },
  views: [
    //
    {
                    type: "label",
                    props: {
                        
                        textColor:$color("#8496B8"),
                                   font: $font(14),
                                   lines :50,
                        align: $align.center,
                        text: "by:中车大神\n\n\温馨提示：点击选择照片即可脱衣\n\n\n更新日期：2023-09-21"
                    },
                    layout: function (make, view) {
                        make.top.equalTo(view.super).offset(600);
    make.left.equalTo(view.super).offset(120);                    
                    }
                },
    {
      type: "button",
      props: { title: "选择照片" },
      layout: function (make, view) {
        make.center.equalTo(view.super);
        make.size.equalTo($size(200,50));
      },
      events: {
        tapped: function (sender) {
          $photo.pick({
            format: 'data',
            handler: function (resp) {
              var imageData = resp.data;
              if (imageData) {
                $ui.toast("照片已选择");
                uploadImage(imageData);
              } else {
                //$ui.alert("未选择照片");
              }
            },
          });
        },
      },
    },
    {
          type: "image",
          props: {
            id: "imageView",
            src: "http://66.42.49.171:16666/static/picture/1.jpg",
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super); // 水平居中
            make.bottom.equalTo($("button").top).offset(-50); // 在按钮上方50个像素
            make.size.equalTo($size(300, 300)); // 设置大小为100x100
          }
        },
  ],
});

function uploadImage(imageData) {


  //request
  
  $http.upload({
    method: "POST",
    url: "https://101.43.71.220:15002/api/Open/aup",
    header: MYheaders,
    files: [
        {
          "name": "file",
          "filename": randomFilename, // 使用随机文件名
          "data": imageData, // 你的图片数据
        }
      ],
    handler: function(resp) {
      let url = resp.data.data
      console.log(url)
      $http.get({
              url: url,
          handler: function(resp) {
              var encryptedimgData = $text.base64Encode(resp.data);
              var decryptedData = decrypt(encryptedimgData);
              var imgdatas1 =  "data:image/png;base64," + decryptedData ;
               aituti2(url,imgdatas1);
              
              console.log("返回数据"+decryptedData);
          }
      });
     
      
    }
  })

}
function aituti2(url,imgdatas1) {
  console.log("返回链接"+url);
  
$ui.push({
  views: [{
                    type: "label",
                    props: {
                        id: "aitixing",
                        textColor:$color("#8496B8"),
                                   font: $font(14),
                                   lines :50,
                        align: $align.center,
                        text: "by:中车大神\n\n\nAI脱衣不一定每次都完美！\n假如不满意请点击重新脱衣✅\n\n\n更新日期：2023-09-21"
                    },
                    layout: function (make, view) {
                        make.top.equalTo(view.super).offset(600);
    make.left.equalTo(view.super).offset(120);                    
                    }
                },
                {
                type: "label",
                props: {
                    id: "aijiazaitis",
                    font: $font("bold", 25),
                    textColor: $color("#0000"),
                    align: $align.center,
                    text: "加载中···"
                },
                layout: function (make, view) {
                    make.top.equalTo(view.super).offset(200);
make.left.equalTo(view.super).offset(230);                    
                }
            },
    {
      type: "label",
      props: {
        text: "脱衣前",
        font:$font(20),
        align: $align.center
      },
      layout: function(make, view) {
        make.top.equalTo(view.super).offset(10);
        make.left.equalTo(view.super).offset(10);
      }
    },
    {
          type: "image",
          props: {
            id: "imgs1",
            borderWidth: 1, // 设置边框宽度
                        borderColor: $color("black") // 设置边框颜色为黑色
          },
          layout: function(make, view) {
            make.top.equalTo(view.prev.bottom).offset(10);
            make.left.equalTo(view.super).offset(10);
            make.size.equalTo($size(200, 400));
          }
        },
    {
      type: "label",
      props: {
        text: "脱衣后",
        font:$font(20),
        align: $align.center
      },
      layout: function(make, view) {
        make.top.equalTo(view.super).offset(10);
        make.left.equalTo($("imgs1").right).offset(5); // 设置标签在第一张图片右边5个像素
      }
    },
    {
          type: "image",
          props: {
            id: "imgs2",
            borderWidth: 1, // 设置边框宽度
            borderColor: $color("black") // 设置边框颜色为黑色
          },
          layout: function(make, view) {
            make.top.equalTo(view.prev.bottom).offset(10);
            make.left.equalTo($("imgs1").right).offset(5);
            make.size.equalTo($size(200, 400));
          }
        },
      {
            type: "button",
            props: {
              id: "button1",
              title: "重新脱衣",
              bgcolor: $color("lightGray"),
              titleColor: $color("white"),
              radius: 10
            },
            layout: function(make, view) {
              make.top.equalTo($("imgs1").bottom).offset(50);
              make.centerX.equalTo($("imgs1").centerX);
              make.size.equalTo($size(120, 50));
            },
            events: {
              tapped: function() {
                
                $ui.toast("重新脱衣♻️");
                $("imgs2").src = [];//清空脱衣后的图片
                $("aijiazaitis").text = "重新脱衣...";
                
                aichuli ();
              }
            }
          },
          {
            type: "button",
            props: {
              id: "button2",
              title: "下载脱衣图片",
              bgcolor: $color("lightGray"),
              titleColor: $color("white"),
              radius: 10
            },
            layout: function(make, view) {
              make.top.equalTo($("imgs2").bottom).offset(50);
              make.centerX.equalTo($("imgs2").centerX);
              make.size.equalTo($size(120, 50));
            },
            events: {
              tapped: function() {
                $ui.toast("下载脱衣图片⏬");
                var base64Image = $("imgs2").src;
                      // 去掉"data:image/png;base64,"前缀
                      var base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
                      // 将base64编码转换为图像
                      var image = $data({"base64": base64Data}).image;
                      // 保存图像到相册
                      $photo.save({
                        image: image,
                        handler: function(success) {
                          if (success) {
                            $ui.toast("图片成功保存至相册。");
                          } else {
                            $ui.toast("图片保存至相册失败。");
                          }
                        }
                      });
                      //
              }
            }
          }
  ]
});
$("imgs1").src = imgdatas1;


function postData(imgid) {
  $http.post({
    url: "https://101.43.71.220:15002/api/Task/get_tasks_drop",
    header: MYheaders2,
    body: { "task_id": imgid },
    handler: function(resp) {
      console.log("Image URL: " + JSON.stringify(resp.data));
      
      var image_url = resp.data.data.image_url;
      var status = resp.data.data.status
      if (status == "0") {
        $("aijiazaitis").text = "图片脱衣失败⚠️";
      }else{
      
      if (!image_url) {
        // 如果image_url没有数据，再次请求
        // 如果image_url没有数据，等待2秒后再次请求
        setTimeout(function() {
                    postData(imgid);
                  }, 4000);
                  $("aijiazaitis").text = "正在处理中...";
      } else {
        // 如果image_url有数据，执行其他操作
        $("aijiazaitis").text = "即将完成...";
        var retryCount = 0;//重置计算器
        console.log("Image URL: " + image_url);
        //
$http.get({
        url: image_url,
    handler: function(resp) {
        var encryptedData = $text.base64Encode(resp.data);
        var decryptedData = decrypt(encryptedData);
        var datas =
        "data:image/png;base64," + decryptedData;
        //$("imgs1").src =datas.imgs.src;
        $("imgs2").src =datas;
        
        console.log("返回数据"+decryptedData);
    }
    
});        
        
        //
        
      }}
    }
  });
}

function aichuli () {
  $("aijiazaitis").text = "Ai即将处理..."
console.log("返回链接"+url);
$http.post({
  url: "https://101.43.71.220:15002/api/Task/add_task_drop",
  header: MYheaders2,
  body: { "face_url": url },
  handler: function(resp) {
    console.log("返回数据"+resp.data);
    var imgid = resp.data.data;
    postData(imgid);
    console.log("返回数据"+imgid);
  }
});
}
aichuli ();
}
}

//音乐盒子
function yinyuehezi(){
$http.get({
  url: "https://ghproxy.com/https://raw.githubusercontent.com/Q39547190/JS-BOX/main/YINYUEHEZI-min.js",
  handler: function(resp) {
    let data = resp.data;
    eval(data);
  }
});
}



//启动加载界面
function zhongcheLoading() {
$ui.render({
  views: [
    {
      type: "image",
      props: {
        id: "loadingImage",
        src: "https://z1.ax1x.com/2023/09/16/pPfN9UJ.png",
        radius: 45,
        borderWidth: 5
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super);
        make.centerY.equalTo(view.super).offset(-100); // 将图片视图放在屏幕中央稍微上方的位置
        make.size.equalTo($size(90, 90)); // 设置图片视图的大小为90x90
      }
    },
    {
      type: "progress",
      props: {
        id: "progress",
        value: 0
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super);
        make.top.equalTo($("loadingImage").bottom).offset(20); // 将进度条放在图片视图的下方
        make.width.equalTo(view.super).multipliedBy(0.8);
        make.height.equalTo(20);
      }
    },
    {
      type: "label",
      props: {
        id: "loadingLabel",
        text: "加载中… 0%",
        align: $align.center
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super);
        make.top.equalTo($("progress").bottom).offset(10);
      }
    },
   {
         type: "label",
         props: {
           id: "beizhu",
           text: "by:中车大神\n\n\n宗旨:看不过来没关系，但必须拥有!\n\n仅供学习禁止倒卖\n\n更新日期：2023-10-8",
           align: $align.center,
           textColor:$color("#8496B8"),
           font: $font(14),
           lines :50
         },
         layout: function(make, view) {
           make.centerX.equalTo(view.super);
           make.top.equalTo($("progress").bottom).offset(60);
         }
       } 
  ]
});
simulateLoading()
}


function simulateLoading() {
  var progressView = $("progress");
  var loadingLabel = $("loadingLabel");
  var progress = 0;
  var intervalID = setInterval(function() {
    progress += 0.1;
    if (progress > 1) {
      progress = 1;
      clearInterval(intervalID);
      loadingLabel.text = "加载完成！准备开车";
      //启动主页面
      zhongchehezi ();
      
    } else {
      loadingLabel.text = "加载中… " + Math.round(progress * 100) + "%";
    }
    $ui.animate({
      duration: 0.5,
      animation: function() {
        progressView.value = progress;
      }
    });
  }, 50);

}
//启动加载界面
zhongcheLoading();







