//by:中车大神

//音乐进度条
// 创建滑动条并添加事件处理器

// 创建定时器
//第一次播放歌曲
let isPlaying = false;

var myHeaders = {
    'Origin' : `https://mu-jie.cc`,
    'Accept' : `*/*`,
    'Connection' : `keep-alive`,
    'Referer' : `https://mu-jie.cc/`,
    'Accept-Encoding' : `gzip, deflate, br`,
    'Host' : `kwapi-api-iobiovqpvk.cn-beijing.fcapp.run`,
    'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1`,
    'Accept-Language' : `zh-CN,zh-Hans;q=0.9`
};

//下载的请求头
var myHeaders2 = {
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate, br`,
'channel' : `appstore`,
'plat' : `ip`,
'net' : `mobile`,
'Cache-Control' : `no-cache`,
'User-Agent' : `bodian/56 CFNetwork/1331.0.7 Darwin/21.4.0`,
'ver' : `3.1.0`,
'Host' : `bd-api.kuwo.cn`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
'devId' : `59CCB0DC-6D61-449D-A69F-11A4F6D461BA`,
'Accept' : `*/*`
};

// 使用$text模块的base64Decode方法解码字符串，将结果赋值给urlt变量
var urlt = 'https://kwapi-api-iobiovqpvk.cn-beijing.fcapp.run/search?key=';




//var songData = $cache.get("songData");
$ui.render({
  props: {
    title: "中车音乐🎵盒子"
  },
  views: [
    {
      type: "input",
      props: {
        id: "searchBar",
        placeholder: "歌手/歌曲/专辑🔍",
        bgcolor: $color("#F0F0F0"),
        radius: 15
      },
      layout: function(make) {
        make.left.top.right.inset(10);
        make.height.equalTo(30);
      },
      events: {
        returned: function(sender) {
          // 处理搜索
          
          sender.blur();
          search(sender.text);
        }
      }
    },
    //..
 
    {
      type:"list",
      props:{
        id:"songList",
        rowHeight:80,
        template:[
          {
            type:"image",
            props:{
              id:"cover",
              radius:10
            },
            layout:function(make,view){
              make.left.top.bottom.inset(10);
              make.width.equalTo(view.height)
            }
          },
          {
            type:"label",
            props:{
              id:"songInfo",
              textColor:$color("#000"),
              font:$font(16),
              align:$align.left,
              lines:2,
            },
            layout:function(make,view){
              make.left.equalTo($("cover").right).offset(10);
              make.centerY.equalTo(view.super).offset(0);
              make.right.inset(10)
            }
          },
          //
     {
                 type:"label",
                 props:{
                   id:"shijian",
                   //text :"8889",
                   textColor:$color("#000"),
                   font:$font(16),
                   align:$align.left,
                   lines:2,
                 },
                 layout:function(make,view){
                   
 make.left.equalTo($("cover").right).offset(200);                  
                   make.centerY.equalTo(view.super).offset(20);
                   make.right.inset(10)
                 }
               },
          //
          {
            type:"button",
            props:{
              id:"download",
              title:"下载",
              bgcolor:$color("black"),
              tintColor: $color("white"),
              icon: $icon("104", $color("white")),
              radius:10
            },
            layout:function(make,view){
              make.right.inset(10);
              make.centerY.equalTo(view.super);
              make.size.equalTo($size(80, 30))
            },
            events:{
                    tapped: function(sender) {
                //$ui.toast("开始下载");
                var datas =sender.info;
 console.log(sender.info);               


createPopupView(datas);
                // 这里是你的下载代码
              }
            }
          },
          //
   
          //
        ],
      },

      layout:function(make,view){
        make.left.right.bottom.equalTo(0);
        make.top.equalTo($("searchBar").bottom).offset(10)
      },
      events:{
        didSelect:function(sender,indexPath,data){
          console.log("点击的数据"+JSON.stringify(data))   
          //获取id获取歌词
          var rid = data.rid
          console.log(rid);
          $cache.set("rid",rid)
          //启动获取歌词函数
          songgeci();
          songinfodata();
          //
          
          $("songname").text=data.songInfo.text;
          $("songimg").src=data.cover.src;

//




          //
          console.log(data)
        },
        didLongPress: function(sender, indexPath, data) {
          var datas ={
            "rid" : data.rid,
            "info": {
            		"text": data.songInfo.text
            	},
            	"pic": {
		"src": data.cover.src
	}
          }
                      // 获取已保存的数据
                        let savedData = $cache.get("shoucang") || [];
                        
                        // 检查新的数据是否已经存在于数组中
                        let index = savedData.findIndex(item => item.rid === datas.rid);
                        if (index !== -1) {
                            // 如果存在，就更新这个数据
                            savedData[index] = datas;
                        } else {
                            // 如果不存在，就添加这个数据
                            savedData.unshift(datas);
                        }
                        
                        console.log("收藏" + JSON.stringify(savedData));
                        
                        // 保存数据
                        $cache.set("shoucang", savedData);
           //更新新收藏视图             
          $("infoLists").data = savedData;
                        
                        $ui.toast("收藏成功✅");
                },
        didReachBottom:function(sender){
          sender.endFetchingMore();
          var page=$cache.get("pg")+1;
          $cache.set("pg",page);
          $ui.loading(true)
          songdata();
          console.log("下滑……")
        }
      }
    },

        
            
            //...
    {
      type: "view",
      props: {
        id: "player",
        bgcolor: $color("#F0F0F0"),
        radius: 15
      },
      layout: function(make) {
        make.left.bottom.right.inset(10);
        make.height.equalTo(200);
      },
      views: [
        {
          type: "image",
          props: {
            id: "songimg",
            src: "https://telegraph-image.pages.dev/file/926a64c523b8cda30818a.jpg",
            radius: 35,
            borderWidth: 5, // 设置边框宽度
            borderColor: $color("black") // 设置边框颜色为黑色
          },
          layout: function(make, view) {
            make.left.equalTo(10);
         make.centerY.equalTo(view.super).offset(0);
            make.centerY.equalTo(view.super)
            make.size.equalTo($size(70, 70));
          }
        },
        {
          type: "label",
          props: {
            id: "songname",
            text: "中车专属破解",
            // text: song.info
            textColor: $color("#000"),
            font: $font(14),
            lines :2
          },
          layout: function(make, view) {
            make.left.equalTo($("songimg").right).offset(10);
            make.centerY.equalTo(view.super).offset(-5);
            //make.right.equalTo($("playPause").left).offset(-20);
          }
        },

        {
          type: "slider",
          props: {
            id: "slider",
            
            // value: song.progress
            thumbTintColor: $color("#000"),
            minimumTrackTintColor: $color("#000"),
            maximumTrackTintColor: $color("#F0F0F0")
          },
          layout: function(make, view) {
            make.left.right.equalTo(0);
            make.bottom.equalTo(view.super).offset(-20);
          },
          events: {
            changed: function(sender) {
                // 创建滑动条并添加事件处理器
                
 $audio.seek(sender.value * $audio.duration);
 // 打印滑动条的值
       

                  
                
                
                
                
                              //...
            }
          }
        },
        //收藏按钮
        {
                  type: "button",
                  props: {
                    id: "previous",
                    title: "👁‍🗨",
                    titleColor: $color("#000"),
                    bgcolor: $color("clear"),
                    font: $font(40)
                  },
                  layout: function(make, view) {
                    //高度
                    make.bottom.equalTo($("slider").top).offset(-60);
                    //右偏移
                    make.left.equalTo(365);
                  },
                  events: {
                    tapped: function(sender) {
                    var datas = $cache.get("shoucang");
                    
                    
                    shoucangshitu(datas);
                    $("infoLists").data = datas;
                      
                    }
                  }
                },
        //
        {
          type: "button",
          props: {
            id: "previous",
            title: "⏮",
            titleColor: $color("#000"),
            bgcolor: $color("clear"),
            font: $font(30)
          },
          layout: function(make, view) {
            //高度
            make.bottom.equalTo($("slider").top).offset(-10);
            //右偏移
            make.left.equalTo(200);
          },
          events: {
            tapped: function(sender) {
            //上一首歌
            playPrevious();
              
            }
          }
        },
        {
          type: "button",
          props: {
            id: "playPause",
            title: "▶️",
            titleColor: $color("#000"),
            bgcolor: $color("clear"),
            font: $font(30)
          },
          layout: function(make, view) {
            make.bottom.equalTo($("slider").top).offset(-10);
            //make.centerX.equalTo(view.super);
            make.left.equalTo(270);
          },
          events: {
            tapped: function(sender) {
              
              // 切换播放/暂停
              //播放歌曲样品
              
                      // 切换播放/暂停
 if (sender.title == "⏸️") {
                          $("playPause").title = "▶️";
                          $audio.pause(); // 暂停
stopRotation(); //暂停封面旋转                          
                      } else {
                          $("playPause").title = "⏸️";                                                    
                          $audio.resume(); // 恢复播放
startRotation();// 开始封面旋转
                                                    
                      }
                      console.log("音频进度: " + $audio.status);
                                              

                          
              
                          //...
            }
          }
        },
        {
          type: "button",
          props: {
            id: "next",
            title: "⏭",
            titleColor: $color("#000"),
            bgcolor: $color("clear"),
            font: $font(30)
          },
          layout: function(make, view) {
            make.bottom.equalTo($("slider").top).offset(-10);
            make.right.equalTo(-40);
          },
          events: {
            tapped: function(sender) {
              // 播放下一首歌曲
              
              playNext();
            }
          }
        },
        //音乐动态时间
 {
                  type:"label",
                  props:{
                    id:"dtshijian",
                    text :"00:00/00:00",
                    textColor:$color("#000"),
                    font:$font(16),
                    align:$align.left,
                    lines:1,
                  },
                  layout:function(make,view){
            make.bottom.equalTo($("slider").top).offset(5);
            make.right.equalTo(-150);
          }
                },
        //
        {
                          type:"label",
                          props:{
                            id:"geci",
                            text :"暂无歌词",
                            textColor:$color("#8496B8"),
                            font:$font(20),
                            align:$align.left,
                            lines:1,
                          },
                          layout:function(make,view){
                    make.left.equalTo($("songimg").right).offset(-40);
                                make.centerY.equalTo(view.super).offset(-65);
                  }
                        },
                        //
{
                          type:"label",
                          props:{
                            id:"wgeci",
                            text :"",
                            textColor:$color("#D3D3D3"),
                            font:$font(18),
                            align:$align.left,
                            lines:1,
                          },
                          layout:function(make,view){
                    make.left.equalTo($("songimg").right).offset(-38);
                                make.centerY.equalTo(view.super).offset(-45);
                  }
                        },
                        //
{
                          type:"label",
                          props:{
                            id:"ggeci",
                            text :"",
                            textColor:$color("#D3D3D3"),
                            font:$font(18),
                            align:$align.left,
                            lines:1,
                          },
                          layout:function(make,view){
                    make.left.equalTo($("songimg").right).offset(-38);
                                make.centerY.equalTo(view.super).offset(-85);
                  }
                        }                                              
                        //
      ]
    }
  ],
          props: {
              id: "mainView"
            },
});
//获取搜索结果
function search(query) {
  
  //var output = {"title": encodeURIComponent(query)};  // 使用 encodeURIComponent 函数来确保 query 是一个有效的 URL 组件
  
  $("songList").data = [];//清除数据
  $cache.set("pg", 1);
  var output = query;
  $cache.set("output",output);
  songdata();
  
  //$cache.set("type", channelLists);
 // $cache.set("pg",1);
  //$("Video").data = []; // 清空 "Video" 矩阵的数据
  //加载自动刷新函数                 
                                          
}
//


console.log("音频进度: " + $audio.offset);

//歌曲信息


function songdata(){
  var page = $cache.get("pg");
  var output =$cache.get("output")
  var encodedoutput = encodeURIComponent(output);
  console.log(urlt);
$http.get({
         url:urlt+encodedoutput+"&pn="+page,
         header: myHeaders,
        handler: function (resp) {
            $ui.loading(false);
            var li = resp.data;
            console.log(li)
            
            var data = [];
            
            for (var i = 0; i < li.length; i++) {
                dli = li[i];
              
                
                data.push({
                    cover: {
                            src: dli.pic
                        },
                        songInfo: {
                            text: dli.name+"\n"+dli.artist
                        },
                        shijian: {
                                                    text: dli.play_time
                                                },
                        rid: dli.rid,
                        
                        play_time:dli.play_time,
                        
download: {
                                                    info: {
                         id:dli.rid,
                         geqv:dli.name ,
                         geshou:dli.artist                           
                                                      
                                                    }
                                                }                        
                        
                        
                })
                
            }
            //
            $("songList").data = $("songList").data.concat(data);
            console.log($("songList").data);
                  $("songList").endRefreshing();
            //
            }
            })
            }
            
//获取歌曲
function songinfodata(){
  var rid = $cache.get("rid");
$http.get({
         url:"https://kwapi-api-iobiovqpvk.cn-beijing.fcapp.run/mp3?rid="+rid,
         header: myHeaders,
        handler: function (resp) {
            $ui.loading(false);
            var songgeqv = resp.data;
            songgeqv = songgeqv.replace(/\r/g, '');
            //console.log(songgeqv)
            
//停止封面旋转
stopRotation();
 //重置封面旋转
resetRotation();
//播放音乐
                    $audio.play({
                      url: songgeqv,
                      events: {
                            didPlayToEndTime: playNext //歌曲播放完毕自动切换收藏循环
                          }
                    })
                    
                 
                                   
              // 启动定时器检测歌曲状态         
          var checkAudioStatus=setInterval(function(){
            if($audio.status==2){
              $ui.toast("歌曲加载成功😃✅");
              $("playPause").title="⏸️";
              
             
              //停止封面旋转
              stopRotation();
              //重置封面旋转
              resetRotation();
              //启动定时器
              dingshiqi();
               //启动封面旋转
               startRotation();   
             
              
              clearInterval(checkAudioStatus)
            }else{
              $ui.toast("歌曲正在加载中……🥱")
              console.log("歌曲"+songgeqv)
              
              //停止封面旋转
              stopRotation();
              //重置封面旋转
              resetRotation();

            }
          },1000);            
            
            }
            })
            }            
            
            
            
            
//获取歌词
function songgeci(){
  var rid = $cache.get("rid");
$http.get({
         url:"https://kwapi-api-iobiovqpvk.cn-beijing.fcapp.run/lrc?rid="+rid,
         header: myHeaders,
        handler: function (resp) {
            $ui.loading(false);
            var lyricsString = resp.data;
            
$cache.set("geci",lyricsString);
console.log(lyricsString)             
            //分割线
                }
                })
                
            }
            
//获取下载链接            
function download(xuanze, yinze,datas) {
  var name = datas.geqv;
  var artist = datas.geshou;
  var rid = datas.id;
  console.log ("歌曲链接:"+rid);
   
  $ui.toast(name+"-"+artist+"正在下载中 ...");
  $ui.loading(true);
  $http.get({
    url: "https://bd-api.kuwo.cn/api/service/music/audioUrl/"+rid+"?format=mp3&br="+yinze,
    header: myHeaders2,
    handler: function (resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        console.log ("歌曲链接:"+resp.data.data.audioUrl);
        var url = resp.data.data.audioUrl;
        download2(url, name,artist,xuanze);
        
        //$share.sheet([name +"-"+artist+ ".mp3("+xuanze+")", resp.data.data.audioUrl]);
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}

//下载歌曲
function download2(url, name,artist,xuanze) {
  $ui.toast(name+"-"+artist+"正在下载中 ...");
  $ui.loading(true);
  $http.download({
    url: url,
    handler: function (resp) {
      $ui.loading(false);
      if (resp.response.statusCode == "200") {
        $share.sheet([name +"-"+artist+ "("+xuanze+").mp3", resp.data]);
      } else {
        $ui.alert("下载失败");
      }
    }
  });
}
                        
//自动更新
async function get_updata() {
    const resp = await $http.get($text.base64Decode("aHR0cHM6Ly9naHByb3h5LmNvbS9odHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vUTM5NTQ3MTkwL0pTLUJPWC9tYWluL1lJTllVRUhFWkktZ3guanNvbg=="));
    if(resp.response.statusCode === 200){
        if (resp.data.version != "4.0") {
            $ui.alert({
                title: "发现新版本 - " + resp.data.version,
                message: resp.data.upexplain,
                actions: [
                    {
                        title: "立即更新",
                        handler: function () {
                            gengxin(resp.data.updata,resp.data.name)
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
function gengxin(url,name) {
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
          
                              // 启动定时器
function dingshiqi(){                              
timer = $timer.schedule({
                                  interval: 1,  // 定时器的间隔为1秒
                                  handler: function() {
                                      
if ($audio.status == 2) {
                                                                                
//
var duration2 = $audio.duration;
var duration = $audio.offset;  // 获取音频总长
var formattedDuration = formatDuration(duration);  // 转换音频总长
var formattedDuration2 = formatDuration(duration2);
var datas = formattedDuration+"/"+formattedDuration2;

$("dtshijian").text = datas//生成动态音乐时间
//console.log($("dtshijian").text)

//console.log(formattedDuration);  // 输出格式化的音频总长                                        
////分割线歌词获取
var lyrics = $cache.get("geci");
var currentTime = $audio.offset;

  
  var currentTime = $audio.offset;
  
    // 找出当前的歌词和相邻的歌词
    var pastLyric = null;
    var currentLyric = null;
    var futureLyric = null;
    for (var i = 0; i < lyrics.length; i++) {
      if (parseFloat(lyrics[i].time) > currentTime) {
        futureLyric = lyrics[i];
        break;
      }
      pastLyric = currentLyric;
      currentLyric = lyrics[i];
    }
  
    // 更新歌词显示
    updateLyrics(pastLyric, currentLyric, futureLyric);
// 更新歌词显示的函数
function updateLyrics(past, current, future) {
  // 清空屏幕内容
  console.clear();

  // 显示歌词
  if (past) {
    console.log("这是过去的歌词：" + past.lineLyric);
   $("ggeci").text = past.lineLyric
  }
  if (current) {
    console.log("这是实时的歌词：" + current.lineLyric);
    $("geci").text = current.lineLyric
  }
  if (future) {
    console.log("这是未来的歌词：" + future.lineLyric);
    //$("wgeci").text = future.lineLyric
  }
}
        

//分割线
                                                                                    // 如果音乐正在播放，更新滑动条的值
                                          
                                                                                    
                                          }
$("slider").value = $audio.offset / $audio.duration;
//console.log("歌曲实时时间"+$audio.offset / $audio.duration);                                           
                                           //
                                      
                                  }
                              });
}


//获取音频时间格式mm:ss
function formatDuration(duration) {
    // 将总秒数转换为小时，分钟和秒数
    var hours   = Math.floor(duration / 3600);
    var minutes = Math.floor((duration - (hours * 3600)) / 60);
    var seconds = Math.floor(duration - (hours * 3600) - (minutes * 60));

    // 如果小时，分钟或秒小于10，则在前面添加零
    //if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    // 返回格式化的时间字符串
    return minutes+':'+seconds;
}
//歌词音频格式转换2mm:ss.sss
function formatDuration2(duration) {
    // 将总秒数转换为小时，分钟和秒数
    var hours   = Math.floor(duration / 3600);
    var minutes = Math.floor((duration - (hours * 3600)) / 60);
    var seconds = Math.floor(duration - (hours * 3600) - (minutes * 60));
    var milliseconds = Math.floor((duration - Math.floor(duration)) * 1000);

    // 如果小时，分钟，秒或毫秒小于10，则在前面添加零
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    if (milliseconds < 10) {milliseconds = "00"+milliseconds;}
    else if (milliseconds < 100) {milliseconds = "0"+milliseconds;}

    // 返回格式化的时间字符串
    return minutes+':'+seconds+'.'+milliseconds;
}
//转换音频格式3 mm:ss.ss


function formatDuration3(duration) {
  let totalSeconds = Math.floor(duration);
  let milliseconds = Math.floor((duration - totalSeconds) * 100);
  let seconds = totalSeconds % 60;
  let minutes = Math.floor(totalSeconds / 60);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  milliseconds = (milliseconds < 10) ? "0" + milliseconds :  milliseconds;

  return minutes + ":" + seconds + "." + milliseconds;
}



let angle = 0;
let rotating = false;

function startRotation() {
    rotating = true;
    rotation();
}

function stopRotation() {
    rotating = false;
}

function rotation() {
    if (rotating) {
        angle += 0.02; // 修改这个值来改变旋转速度
        $("songimg").rotate(angle);
        setTimeout(rotation, 1000 / 60); // 每秒 60 帧的旋转
    }
}
function resetRotation() {
    stopRotation(); // 停止旋转
    angle = 0; // 重置角度
    $("songimg").rotate(angle); // 更新视图
}
//`resetRotation()` 函数来重置旋转视图。

 // 开始旋转startRotation();

// 在需要停止的时候，调用 stopRotation()

//弹窗式下载⏬
function createPopupView(datas) {
  $("mainView").add({
    type: "view",
    props: {
      id: "popupView",
      bgcolor: $color("white"),
      radius: 10,
      borderWidth: 2,
      borderColor: $color("black")
    },
    layout: function(make, view) {
      make.center.equalTo(view.super);
      //make.right.equalTo(view.super).offset(-30);//距离右边30像素
      make.size.equalTo($size(200, 300));
    },
    views: [{
  type: "list",
  props: {
    id: "infoList",
    rowHeight: 70,
    template: [{
      type: "label",
      props: {
        id: "info",
        textColor: $color("#4B0082"),
        font: $font("Helvetica-Bold", 30),
        align: $align.left,
        lines: 2,
      },
      layout: function(make, view) {
        make.left.inset(10);
        make.centerY.equalTo(view.super);
        make.right.equalTo(view.prev.left).offset(-10);
      }
    },
    {
      type: "image",
      props: {
        id: "img",
        src: "https://img2.baidu.com/it/u=186447502,4171737951&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      },
      layout: function(make, view) {
        make.right.inset(10);
        make.centerY.equalTo(view.super);
        make.size.equalTo($size(40, 40)); // 设置图片大小
      }
    }],
    data: ["标准音质", "高清音质", "无损音质"].map(function(item) {
      return {
        info: {
          text: item
        },
        img: {
          src: "https://img2.baidu.com/it/u=186447502,4171737951&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500", // 设置每个项目的图片 URL
        }
      };
    })
  },
  layout: function(make, view) {
    make.top.left.right.inset(10);
    make.bottom.equalTo($("closeButton").top).offset(-10);
  },
  events: {
    didSelect: function(sender, indexPath, data) {
      //$ui.alert(data.info.text + "被点击了");
      var xuanze = data.info.text;
      if (xuanze == "标准音质") {
        var yinze = "128kmp3";
        download(xuanze, yinze,datas);
                
            } else if (xuanze == "高清音质") {
              var yinze = "320kmp3";
              download(xuanze, yinze,datas);
              
            }else if (xuanze == "无损音质") {
              var yinze = "2000kflac";
              download(xuanze, yinze,datas);
              
            }
          
      
        
      
    }
  }
},
   {
      type: "button",
      props: {
        id: "closeButton",
        title: "❌",
      },
      layout: function(make, view) {
        make.bottom.inset(10);
        make.centerX.equalTo(view.super);
      },
      events: {
        tapped: function(sender) {
          $("popupView").remove();
        }
      }
    }]
  });
}
//收藏歌曲列表
function shoucangshitu(datas) {
  $("mainView").add({
    type: "view",
    props: {
      id: "shoucangView",
      bgcolor: $color("white"),
      radius: 10,
      borderWidth: 2,
      borderColor: $color("black")
    },
    layout: function(make, view) {
      make.center.equalTo(view.super);
      make.size.equalTo($size(300, 380));
    },
    views: [
{
  type: "list",
  props: {
    id: "infoLists",
    rowHeight: 60,
    template: [
      {
        type: "image",
        props: {
          id: "pic",
          radius: 5
        },
        layout: function(make, view) {
          make.left.inset(10);
          make.centerY.equalTo(view.super);
          make.size.equalTo($size(40, 40));
        }
      },
      {
        type: "label",
        props: {
          id: "info",
          textColor: $color("#000"),
          font: $font(20),
          align: $align.left,
          lines: 2,
        },
        layout: function(make, view) {
          make.left.equalTo($("pic").right).offset(10);
          make.right.inset(10);
          make.centerY.equalTo(view.super);
        }
      }
    ],
    
      },
  layout: function(make, view) {
    make.top.left.right.inset(10);
    make.bottom.equalTo($("closeButton").top).offset(-10);
  },
  events: {
    didSelect: function(sender, indexPath, data) {
      
      playSong(indexPath.row);
      
      //$ui.alert(data.info.text + "被点击了");
      console.log(JSON.stringify(data))
    },
    //
    didLongPress: function(sender, indexPath, data) {
              //JSON.stringify` 方法将每个项和 `data` 转换为 JSON 字符串对比删除包含data数据
                          let savedData = $cache.get("shoucang") || [];
                          savedData = savedData.filter(item => JSON.stringify(item) !== JSON.stringify(data));
                          $cache.set("shoucang", savedData);
                            
                          
               //刷新收藏夹             
              
              $ui.toast("收藏删除成功❌");
              $("infoLists").data = savedData;
                    }
                    //
  }
}, {
  type: "button",
  props: {
    id: "closeButton",
    title: "❌",
  },
  layout: function(make, view) {
    make.bottom.inset(10);
    make.centerX.equalTo(view.super);
  },
  events: {
    tapped: function(sender) {
      $("shoucangView").remove();
    }
  }
}
      ]
      

  });
}
//收藏歌曲缓存载入
function shoucangdeqv(){
var datas = $cache.get("shoucang");

  var data = datas;
  return data; // 返回data变量
  
}
var currentIndex = 0;


function playSong(index) {
  $ui.toast("播放顺序😃✅"+index);
  //载入歌曲缓存
  var data = shoucangdeqv(); // 调用shoucangdeqv函数并获取返回的data变量
  currentIndex = index;
  //传入封面和歌曲名
            $("songname").text=data[currentIndex].info.text;
            $("songimg").src=data[currentIndex].pic.src
            //保存rid
  $cache.set("rid",data[currentIndex].rid)
  //启动歌词
  songgeci();
  $http.get({
           url:"https://kwapi-api-iobiovqpvk.cn-beijing.fcapp.run/mp3?rid="+data[currentIndex].rid,
           header: myHeaders,
          handler: function (resp) {
              $ui.loading(false);
              var songgeqv = resp.data;
              songgeqv = songgeqv.replace(/\r/g, '');
console.log("歌曲链接"+JSON.stringify(songgeqv))              

  //console.log(JSON.stringify(data[currentIndex]))
  //console.log("成功")
  //停止封面旋转
  stopRotation();
   //重置封面旋转
  resetRotation();
  //播放音乐
  
  $audio.play({
    url: songgeqv,
    events: {
      didPlayToEndTime: playNext
    }
    });
    //
    // 启动定时器检测歌曲状态         
              var checkAudioStatus=setInterval(function(){
                if($audio.status==2){
                  $ui.toast("歌曲加载成功😃✅");
                  $("playPause").title="⏸️";
                  
                 
                  //停止封面旋转
                  stopRotation();
                  //重置封面旋转
                  resetRotation();
                  //启动定时器
                  dingshiqi();
                   //启动封面旋转
                   startRotation();   
                 
                  
                  clearInterval(checkAudioStatus)
                }else{
                  $ui.toast("歌曲正在加载中……🥱")
                  console.log("歌曲"+songgeqv)
                  
                  //停止封面旋转
                  stopRotation();
                  //重置封面旋转
                  resetRotation();
    
                }
              },1000);  
 //    
 }
 }) 
  
  
}

function playNext() {
  //载入歌曲缓存
    var data = shoucangdeqv(); // 调用shoucangdeqv函数并获取返回的data变量
  currentIndex++;
  if (currentIndex >= data.length) {
    currentIndex = 0; // 如果已经到了最后一首歌，那么重新开始
  }
  playSong(currentIndex);
}

function playPrevious() {
  //载入歌曲缓存
    var data = shoucangdeqv(); // 调用shoucangdeqv函数并获取返回的data变量
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = data.length - 1;
  }
  playSong(currentIndex);
}


