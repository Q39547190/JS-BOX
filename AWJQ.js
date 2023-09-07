/*
2023年9月6日更新



by：中车大神🚄
*/


// 声明一个数组channelList，包含6个对象，每个对象有一个名称和一个ID
var channelList = [
    {"category_id":"765","title":"全部分类"},{"category_id":"668","title":"热门"},{"category_id":"669","title":"校园霸凌"},{"category_id":"670","title":"迷奸强奸"},{"category_id":"671","title":"暗网萝莉"},{"category_id":"672","title":"人兽重口"},{"category_id":"673","title":"摄像破解"},{"category_id":"674","title":"真实破处"},{"category_id":"675","title":"多人群P"},{"category_id":"676","title":"黑料吃瓜"},{"category_id":"677","title":"色情综艺"},{"category_id":"678","title":"公共性爱"},{"category_id":"679","title":"AI换脸"},{"category_id":"680","title":"港台三级"},{"category_id":"681","title":"SM调教"},{"category_id":"682","title":"人妖男同"},{"category_id":"683","title":"偷情奸情"},{"category_id":"684","title":"偷欢黑人"},{"category_id":"685","title":"夫妻交换"},{"category_id":"686","title":"母子父女"},{"category_id":"687","title":"绿奴绿帽"},{"category_id":"688","title":"小姨嫂子"},{"category_id":"689","title":"兄妹姐弟"},{"category_id":"690","title":"真实抓奸"},{"category_id":"691","title":"淫荡孕妇"},{"category_id":"692","title":"淫乱情侣"},{"category_id":"693","title":"儿媳岳母"},{"category_id":"694","title":"国产精品"},{"category_id":"695","title":"家庭乱伦"},{"category_id":"696","title":"师生畸恋"},{"category_id":"697","title":"素质单男"},{"category_id":"698","title":"网红主播"},{"category_id":"699","title":"颜值美女"},{"category_id":"700","title":"精品探花"},{"category_id":"701","title":"原创自拍"},{"category_id":"702","title":"自慰喷水"},{"category_id":"703","title":"百合女同"},{"category_id":"704","title":"网黄精选"},{"category_id":"705","title":"偷窥偷拍"},{"category_id":"706","title":"国产最新"},{"category_id":"707","title":"直播大秀"},{"category_id":"708","title":"勾引搭讪"},{"category_id":"709","title":"按摩会所"},{"category_id":"710","title":"熟女少妇"},{"category_id":"711","title":"车震野战"},{"category_id":"712","title":"户外露出"},{"category_id":"713","title":"韩国主播"},{"category_id":"714","title":"麻豆传媒"},{"category_id":"715","title":"91制片厂"},{"category_id":"716","title":"果冻传媒"},{"category_id":"717","title":"精东影业"},{"category_id":"718","title":"天美传媒"},{"category_id":"719","title":"皇家华人"},{"category_id":"720","title":"其它传媒"},{"category_id":"721","title":"台湾JVID"},{"category_id":"722","title":"台湾SWAG"},{"category_id":"723","title":"兔子先生"},{"category_id":"724","title":"SA国际传媒"},{"category_id":"725","title":"杏吧传媒"},{"category_id":"726","title":"星空无限"},{"category_id":"727","title":"糖心Vlog"},{"category_id":"728","title":"扣扣传媒"},{"category_id":"729","title":"素人约拍"},{"category_id":"730","title":"无码FC2"},{"category_id":"731","title":"无码一本道"},{"category_id":"732","title":"无码东京热"},{"category_id":"733","title":"中文字幕"},{"category_id":"734","title":"多P群交"},{"category_id":"735","title":"母女双飞"},{"category_id":"736","title":"按摩SPA"},{"category_id":"737","title":"出轨侵犯"},{"category_id":"738","title":"丝袜制服"},{"category_id":"739","title":"时间静止"},{"category_id":"740","title":"强奸轮奸"},{"category_id":"741","title":"潮吹放尿"},{"category_id":"742","title":"巨根黑人"},{"category_id":"743","title":"有码新作"},{"category_id":"744","title":"无码流出"},{"category_id":"745","title":"欧美剧情"},{"category_id":"746","title":"4"},{"category_id":"747","title":"H动漫"},{"category_id":"748","title":"剧场番剧"},{"category_id":"749","title":"3D动画"},{"category_id":"750","title":"同人COS"},{"category_id":"751","title":"角色扮演"},{"category_id":"752","title":"次元女神"},{"category_id":"753","title":"漫改作品"},{"category_id":"754","title":"黑丝白丝"},{"category_id":"755","title":"蕾丝网袜"},{"category_id":"756","title":"口交足交"},{"category_id":"757","title":"JK"},{"category_id":"758","title":"OL"},{"category_id":"759","title":"空姐"},{"category_id":"760","title":"护士"},{"category_id":"761","title":"旗袍"},{"category_id":"762","title":"女仆"},{"category_id":"763","title":"学生装"},{"category_id":"764","title":"泳衣"}
];

// 声明一个对象myHeaders，包含一个User-Agent字段，用于在HTTP请求中标识客户端信息
var myHeaders = {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
    "Authorization" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbGllbnQueGhhZG1pbiIsImF1ZCI6InNlcnZlci54aGFkbWluIiwiaWF0IjoxNjkzODkwMjQ4LCJleHAiOjE3OTM4OTAyNDcsInVpZCI6IjI0MzMzIn0.cljbxxB_DRHZeRipc7vIt24aS7pQAnbul40HlJH00HM",
    
    "Content-Type" : "application/json"
};

// 使用$text模块的base64Decode方法解码字符串，将结果赋值给urlt变量
var urlt = $text.base64Decode("aHR0cHM6Ly9qaWVrb3UuYXBpc2FwaXMueHl6OjE4ODgvYXBpL3ZpZGVvL2xpc3Q/dmVyc2lvbj0xLjEuMQ==");
var urlt2 = "https://jiekou.apisapis.xyz:1888/api/video/play?version=1.1.1";



// 调用ui模块的render方法来渲染界面
function jiemian() {
$ui.render({
    props: {
        // 设置页面标题
        title: "👨‍💻暗网禁区1.0"
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
                    getdata();
                }
            }
        },
        // ...
            
      
      {
            type: "matrix",
            props: {
                id: "Video",
                itemHeight: 180,
                columns: 2,
                spacing: 7,
                template: [{
                    type: "image",
                    props: {
                        id: "img",
                        radius: 3
                    },
                    layout: function (make, view) {
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
                    layout: function (make, view) {
                        make.top.equalTo($("img").bottom).offset(10);
                        make.right.left.inset(0)
                    }
                },
                ]
            },
            layout: function (make) {
                make.top.equalTo($("menu").bottom);
                make.bottom.left.right.inset(0)
            },
            events: {
                didSelect: function (sender, indexPath, data) {
                    geturl(data.url, data.pm.text)
                },
                didReachBottom: function (sender) {
                    sender.endFetchingMore();
                    var page = $cache.get("pg") + 1;
                    $cache.set("pg", page);
    var typeStr = $cache.get("type");
    var type = JSON.parse(typeStr);
                     console.log("搜索内容:"+type)
                    
                    $ui.loading(true);

  // 创建一个名为 bodyObj 的对象，该对象包含你想要在请求体中发送的一些基本属性
  //var bodyObj = { "page": page, "limit": 20, "platform_id": "18" };
  
  // 使用 Object.assign() 方法将 type 对象的所有属性复制（或合并）到 bodyObj 对象中。
  // 结果赋值给 requestBody，它将包含 bodyObj 和 type 的所有属性
  //var requestBody = Object.assign(bodyObj, type);
                                           
                      
                     $http.post({
                              url:urlt,
                              header: myHeaders,
                              body:{"page":page,...type,"limit":20,"platform_id":"18"},
                             handler: function (resp) {
                                 $ui.loading(false);
                                                             var li = resp.data.data.list;
                                                             for (var i = 0; i < li.length; i++) {
                                                                 var dli = li[i];
                                                                 
                                $("Video").insert({
                                    indexPath: $indexPath(0, $("Video").data.length),
                                    value: {
                                        img: {
                                            src: dli.image
                                        },
                                        pm: {
                                            text: dli.title
                                        },
                                        url: dli.video_id
                                    }
                                })
                            }

                        }
                    })

                }

            }
        }]
});
}


function getdata() {
    var typeStr = $cache.get("type");
    var type = JSON.parse(typeStr);
    
    $ui.loading(true);
    $http.post({
         url:urlt,
         header: myHeaders,
         body:{"page":1,...type,"limit":20,"platform_id":"18"},
        handler: function (resp) {
            $ui.loading(false);
            var li = resp.data.data.list;
            
            
            var data = [];
            
            for (var i = 0; i < li.length; i++) {
                dli = li[i];
              
                
                data.push({
                    img: {
                            src: dli.image
                        },
                        pm: {
                            text: dli.title
                        },
                        url: dli.video_id
                })
                
            }
            $("Video").data = data;
            //console.log($("Video").data);
            $("Video").endRefreshing()
        }
    });
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

var obj = channelList[0].category_id;

var output = {"category_id": obj };
                 
                    
 var channelLists = JSON.stringify(output);

                                       $cache.set("type",channelLists);

$cache.set("pg", 1);
getdata();
jiemian();
//第一次运行弹窗提示
if (!$cache.get("alertShown")) {
  $ui.alert({
    title: "温馨提示😀",
    message: "•修复一些bug✅\n•新增自动更新功能✅\n•作者:中车大神🔥",
    actions: [
      {
        title: "知道了",
        handler: function() {
          $cache.set("alertShown", true);
        }
      }
    ]
  });
}

function I(r) {
    var n = "";
    for (i = 0; i < r.length; ++i) n += String.fromCharCode(128 ^ r.charCodeAt(i));
    return n
}


function search(query) {
  console.log(query);
  //var output = {"title": encodeURIComponent(query)};  // 使用 encodeURIComponent 函数来确保 query 是一个有效的 URL 组件
  var output = {"title": query};
  var channelLists = JSON.stringify(output);
  $cache.set("type", channelLists);
  $cache.set("pg",1);
  
  getdata();
}
//自动更新
async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9naHByb3h5LmNvbS9odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUTM5
NTQ3MTkwL0pTLUJPWC9tYWluL0FXSlEuanM="));
    if(resp.response.statusCode === 200){
        if (resp.data.version != "1.1") {
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
            
        }
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
