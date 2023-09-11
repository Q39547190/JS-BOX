/*
2023年9月11日更新



by：中车大神🚄
*/


// 声明一个对象myHeaders，包含一个User-Agent字段，用于在HTTP请求中标识客户端信息
var myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    "Authorization" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbGllbnQueGhhZG1pbiIsImF1ZCI6InNlcnZlci54aGFkbWluIiwiaWF0IjoxNjkzODkwMjQ4LCJleHAiOjE3OTM4OTAyNDcsInVpZCI6IjI0MzMzIn0.cljbxxB_DRHZeRipc7vIt24aS7pQAnbul40HlJH00HM",
    
    "Content-Type" : "application/json"
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
function appdata() {
  return new Promise((resolve, reject) => {
    var platform_id = $cache.get("platform_id");
    $http.post({
      url:urlt,
      header: myHeaders,
      body:{"page":1,"limit":1,"platform_id":platform_id},
      handler: function (resp) {
        $ui.loading(false);
        if (resp.error) {
          reject(resp.error);
        } else {
          var  channelList = resp.data.data.video_category;
          $cache.set("channelList",channelList);
          //console.log(channelList);
          resolve(channelList);
        }
      }
    });
  });
}             


// 调用ui模块的render方法来渲染界面
function jiemian() {
  var channelList = $cache.get("channelList")
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
                items:channelList.map(function(item){return item.title}),
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
var obj = channelList[sender.index].category_id;                    
                    
 var output = {"category_id": obj };
                  
                     
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
            var page = $cache.get("pg") + 1;
            $cache.set("pg", page);
            shuaxin();
            $ui.loading(true);
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

}

                                                                                                                                                                        
                                                                                                 

async function getdata() {
  try {
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
          } else {
            let base64Data = $text.base64Encode(resp.data);
            //AES_encryptionMode是变量名必须[]动态获取
            let imagebase = CryptoJS.AES.decrypt(base64Data, key, { iv: iv, mode: CryptoJS.mode[AES_encryptionMode], padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Base64);
            data = { img: { src: "data:image/png;base64," + imagebase }, pm: { text: dli.title }, url: dli.video_id };
          }
          $("Video").insert({ indexPath: $indexPath(0, $("Video").data.length), value: data });
        }
      });
    }
    $("Video").endRefreshing();
  } catch (err) {
    console.error(err);
    $("Video").endRefreshing();
  }
}

//这段代码的不同之处在于，我们没有等待所有的图片请求都完成后再更新视图，而是在每次图片请求完成时就立即更新视图。这样，用户可以更早地看到结果。




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


//自动更新
async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9naHByb3h5LmNvbS9odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUTM5NTQ3MTkwL0pTLUJPWC9tYWluL0FXSlEtZ3guanNvbg=="));
    if(resp.response.statusCode === 200){
        if (resp.data.version != "4.7") {
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
get_updata()

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

//分割线***************
//启动界面


let applist = [];

// 定义矩阵视图
const IMAGE_SIZE = $device.info.screen.width / 5;
const LABEL_HEIGHT = 20;
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
      let platform_id = applist[indexPath.item].platform_id;
            $cache.set("platform_id", platform_id);
            let appname = applist[indexPath.item].name;
            $cache.set("appname", appname);
            let image_type = applist[indexPath.item].image_type;
                  $cache.set("image_type", image_type);
//启动算法
suanfa();
            
            //启动app请求
            async function main() {
              try {
                var channelList = await appdata();
                // 启动视频界面
                var obj = channelList[0].category_id;
                var output = {"category_id": obj };
                var channelLists = JSON.stringify(output);
                $cache.set("type",channelLists);
                $cache.set("pg", 1);
                jiemian();
                //加载自动刷新函数                 
                shuaxin();
              } catch (error) {
                console.error(error);
              }
            }
            
            main();
      // 你的 didSelect 事件的代码
    },
  },
};

// 渲染界面
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

