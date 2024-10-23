//全局定义页面
$cache.set("pg", 1);
//全局定义选项
$cache.set("toye", []);

var github = "https://ghp.ci/";



//临时
const url = `https://api16.danshenapi.xyz:1239/api/Video/video_list`;
const headers = {
'Content-Type' : `application/json`,
'Authorization' : `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbGllbnQueHh4MTIzIiwiYXVkIjoic2VydmVyLnh4eDEyMyIsImlhdCI6MTcyODYwODgyMywiZXhwIjoxODI4NjA4ODIyLCJ1aWQiOiI0MjUyNTQifQ.7Pm8o3I68RFWAcM5-zN-ZR0oqwqtotDAw222ueg6p0Q`,
'Referer' : `https://web001.huisese.top:15228/`
};


//



//var appname = "示例应用";
function jiemian (appname,platform_id){
  $ui.push({
    props: {
      title: appname
    },
    views: [
      {
        type: "input",
        props: {
          id: "searchbar",
          placeholder: "请输入搜索内容🔍"
        },
        layout: function(make) {
          make.top.left.right.inset(0);
          make.height.equalTo(50);
        },
        events: {
          returned: soushuo
        }
      },
      //选项
      
      {
        type: "menu",
        props: {
          id: "menu",
          items: [],
        },
        layout: function(make) {
          make.left.right.equalTo(0);
          make.top.equalTo($("searchbar").bottom);
          make.height.equalTo(50);
        },
        events: {
          changed: xuanze
        }
      },
      //视频列阵
      {
        type: "matrix",
        props: {
          id: "Video",
          columns: 2,
          itemHeight: 180,
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
        layout: function(make) {
          make.top.equalTo($("menu").bottom);
          make.bottom.left.right.inset(0);
        },
        events: {
          //视图点击反馈
          didSelect: shitudianji,
          //下滑反馈
          didReachBottom: xiahua,
          //长按反馈
          didLongPress: SCchangan,          
          //
        }
      },
      //按钮
      {
        type: "button",
        props: {
          id: "hb_img",
          src: "https://s1.aigei.com/src/img/gif/a3/a3b45cc1dd004616b77431c993efaedb.gif?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=1735488000&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:M5l3tZqPTfP6_LAgA1uAHjIWVTo=",
          radius: 45
        },
        layout: function(make, view) {
          make.bottom.inset(30);
          make.width.height.equalTo(60);
          make.right.inset(15);
        },
        events: {
          tapped: function(sender) {
            shoucangJM()
            $ui.toast("进去收藏夹");
          }
        }
      }
    ]
  });
  
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
          console.log(JSON.stringify(data))
          // Handle item selection
          play(data.url,data.pm.text)
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

  
  
  
//捕捉搜索
function soushuo(sender) {
   sender.blur();
   var kongwei
   $ui.toast("您输入了: " + sender.text);
   getdata(kongwei,sender.text);
   
}
  
  
//捕捉选择
function xuanze(sender) {
            const selectedIndex = sender.index; // 获取当前选择的索引
            const selectedItem = sender.items[selectedIndex]; // 获取当前选择的项的名称
            $ui.toast("您选择了: " + selectedItem); // 显示提示信息
            var data = $cache.get("toye");
              console.log(data);
              
              // 使用选中的索引从缓存的完整数据中获取 category_id
              var category_id = data[selectedIndex].category_id;
              var kongwei;
            var kongwei
           
            getdata(category_id,kongwei)
            
         
            
          }

//捕捉视图点击
function shitudianji(sender, indexPath, data) {
   $ui.toast("您点击了: " + data.pm.text);
   var kongwei
   geturl(data.pm.text,data.url),
            
   console.log(data);
}  
  

//捕捉下滑

function xiahua(sender) {
  console.log("下滑id"+sender.category_id);
  sender.endFetchingMore();
  
 var pg =  $cache.get("pg")+1;
 $cache.set("pg",pg)
 
 
$http.post({
    url: url,
    header: headers,
    body: {"page":pg,"limit":20,"platform_id":platform_id,"category_id":sender.category_id,"title":sender.title},
    handler: function(resp) {
      var list = resp.data.data.list;
      var data = [];
      list.forEach(function(item, index) {
       $("Video").insert({
       	indexPath: $indexPath(0, $("Video").data.length),
       	value: {img:{src:item.image},pm:{text:item.title},url:item.url}
    });
   });
  }     
});       
        
  
  
  
  $ui.toast("下滑成功");
}

//捕捉长按
function SCchangan(sender, indexPath, data) {
    // 获取已保存的数据
    let savedData = $cache.get("shoucang") || [];
    
    $http.get({
        url: data.url,
        handler: function (resp) {
            $ui.loading(false);
            var playurl = resp.data.data;
            
            console.log(resp.data);
            
            // 创建一个新的对象，复制原始data的所有属性
            let newData = {...data};
            
            // 更新url为playurl
            newData.url = playurl;
            
            // 添加新的数据到数组的前端
            savedData.unshift(newData);
            
            // 保存数据
            $cache.set("shoucang", savedData);
            
            $ui.toast("收藏成功✅");
        }
    });
}
   



function getdata(category_id,title) {
  $("Video").category_id = category_id;
  $("Video").title = title;
  $http.post({
    url: url,
    header: headers,
    body: {"page":1,"limit":20,"platform_id":platform_id,"category_id":category_id,"title":title},
    handler: function(resp) {
      console.log("请求"+resp.data);
      var list = resp.data.data.list;
      var data = [];
      list.forEach(function(item, index) {
        data.push({img:{src:item.image},pm:{text:item.title},url:item.url,category_id:category_id,title:title})
              
            });
            // 设置数据到矩阵视图
                    $("Video").data = data;
                    //console.log(data);
      
     }  
    });  
  }
  
  // 调用函数以显示界面  
  getdata();
  
function geturl(pm, url) {
    $ui.loading(true);
    $http.get({
             url:url,
            handler: function (resp) {
                $ui.loading(false);
                var playurl = resp.data.data;
            
            console.log(resp.data);
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

}    
  
// 获取设备屏幕宽度
const screenWidth = $device.info.screen.width;
// 计算图标大小为屏幕宽度的五分之一
const iconSize = screenWidth / 5;
// 设置标签高度
const labelHeight = 50;
// 设置间隔大小
const gap = 10;
// 设置图标圆角大小
const cornerRadius = 10; // 可以根据需要调整这个值


function getapplist(){
// 渲染UI
$ui.render({
  props: { 
    title: "中车盒子🎥(持续更新中...)" 
  },
  views: [{
    type: "matrix",
    props: {
      columns: 5, // 设置5列
      itemHeight: iconSize + labelHeight, // 设置每个项目的高度
      spacing: gap, // 设置间隔
      template: {
        views: [{
          type: "image",
          props: {
            id: "icon",
            contentMode: $contentMode.scaleAspectFill, // 使用scaleAspectFill以填充整个区域
            cornerRadius: cornerRadius, // 设置圆角
            clipsToBounds: true // 确保圆角生效
          },
          layout: (make, view) => {
            make.centerX.equalTo(view.super);
            make.top.inset(gap);
            make.size.equalTo($size(iconSize - 2 * gap, iconSize - 2 * gap));
          }
        },
        {
          type: "label",
          props: {
            id: "label",
            text: "中车测试",
            align: $align.center,
            lines: 2,
            font: $font(12) // 设置字体大小
          },
          layout: (make, view) => {
            make.centerX.equalTo(view.super);
            make.top.equalTo(view.prev.bottom).offset(5); // 稍微增加与图标的间距
            make.width.equalTo(view.super);
            make.height.equalTo(labelHeight);
          }
        }]
      },
    },
    layout: $layout.fill,
    events: {
      didSelect: (sender, indexPath, data) => {
        if (data.type == 1) {
        jiemian(data.label.text,data.platform_id);
        
caidan(data.platform_id)      
       }if (data.type == 5) {
// 当用户选择一个图标时触发
        $ui.alert({
          title: "不好意思😬",
          message: `正在开发中...`
        });
       }if (data.type == 6) {
// 当用户选择一个图标时触发
        $ui.alert({
          title: "不好意思😬",
          message: `正在开发中...`
        });
         
       }
      }
    }
  }]
});

//菜单获取
function caidan(platform_id){
var pg =  $cache.get("pg");
$http.post({
    url: url,
    header: headers,
    body: {"page":pg,"limit":20,"platform_id":platform_id},
    handler: function(resp) {
      var video_category = resp.data.data.video_category;
      
$("menu").items = video_category.map(item => {
            return item.title
          });
 // 将完整的 video_category 数据保存到缓存中
      $cache.set("toye", video_category);
  }     
});
}
//启动更新检查
get_updata()
}

// 获取应用列表
function getlist(){
$http.get({
  url: github+"https://raw.githubusercontent.com/Q39547190/JS-BOX/main/ZCZHSP.json",
  handler: function(resp) {
    applist = resp.data.applist;
   // $cache.set("applist", applist);
    
    // 更新矩阵视图的数据
    $("matrix").data = applist.map(item => {
      return {
        icon: { src: item.pic_url },
        label: { text: item.name },
        platform_id: item.platform_id,
        type: item.type,
        };
    });
  }
});
}


// 全局变量控制动画状态


// 主函数:创建并显示加载界面
function zhongcheLoading() {
  $ui.render({
    props: { bgcolor: $color("#F0F4F8") },
    views: [
      // 图像容器
      {
        type: "view",
        props: { id: "imageContainer", clipsToBounds: true, bgcolor: $color("clear") },
        layout: (make, view) => {
          make.centerX.equalTo(view.super)
          make.centerY.equalTo(view.super).offset(-80)
          make.size.equalTo($size(90, 90))
        },
        views: [
          // 加载图像
          {
            type: "image",
            props: { id: "loadingImage", src: "https://gaitu.oss-cn-hangzhou.aliyuncs.com/assets/edc2d09040d4460b9c3d85bec4b05ab5.gif", radius: 45, alpha: 0 },
            layout: $layout.fill
          }
        ]
      },
      // 加载文本
      {
        type: "label",
        props: { id: "loadingLabel", text: "准备启程...", align: $align.center, font: $font("bold", 18), textColor: $color("#2C3E50"), alpha: 0 },
        layout: (make, view) => {
          make.centerX.equalTo(view.super)
          make.top.equalTo($("imageContainer").bottom).offset(20)
        }
      },
      // 进度条
      {
        type: "progress",
        props: { id: "progress", value: 0, trackColor: $color("#E0E7FF"), progressColor: $color("#3498DB"), alpha: 0 },
        layout: (make, view) => {
          make.centerX.equalTo(view.super)
          make.top.equalTo($("loadingLabel").bottom).offset(15)
          make.width.equalTo(view.super).multipliedBy(0.8)
          make.height.equalTo(6)
        }
      },
      // 百分比标签
      {
        type: "label",
        props: { id: "percentLabel", text: "0%", align: $align.center, font: $font(14), textColor: $color("#7F8C8D"), alpha: 0 },
        layout: (make, view) => {
          make.centerX.equalTo(view.super)
          make.top.equalTo($("progress").bottom).offset(10)
        }
      },
      // 备注信息
      {
        type: "label",
        props: { 
          id: "beizhu", 
          text: "by:中车大神\n\n宗旨:看不过来没关系，但必须拥有!\n\n仅供学习禁止倒卖\n\n更新日期：2023-11-27",
          align: $align.center, textColor: $color("#8496B8"), font: $font(12), lines: 0, alpha: 0 
        },
        layout: (make, view) => {
          make.centerX.equalTo(view.super)
          make.bottom.equalTo(view.super).offset(-30)
          make.left.right.inset(20)
        }
      } 
    ]
  });
  
  // 淡入动画
  $ui.animate({
    duration: 0.8,
    animation: () => {
      ["loadingImage", "loadingLabel", "progress", "percentLabel", "beizhu"].forEach(id => $(id).alpha = 1)
    },
    completion: () => {
      simulateLoading()
    }
  })
}

// 模拟加载过程
function simulateLoading() {
  let progress = 0;
  const intervalID = setInterval(() => {
    progress += 0.01;
    if (progress > 1) {
      progress = 1;
      clearInterval(intervalID);
      $("loadingLabel").text = "准备就绪，开始启程！";
      
      // 淡出动画
      $ui.animate({
        duration: 0.8,
        delay: 0.5,
        animation: () => {
          ["imageContainer", "loadingLabel", "progress", "percentLabel", "beizhu"].forEach(id => $(id).alpha = 0)
        },
        completion: () => {
          console.log("加载完成，准备进入主页面")
          // 在这里添加转场到主页面的代码
          getapplist();
          getlist();
        }
      })
    } else {
      $("loadingLabel").text = progress < 0.3 ? "准备启程..." : progress < 0.6 ? "正在加载资源..." : "即将就绪...";
    }
    $ui.animate({
      duration: 0.3,
      animation: () => {
        $("progress").value = progress;
        $("percentLabel").text = Math.round(progress * 100) + "%";
      }
    });
  }, 20);
}

// 启动加载界面
zhongcheLoading();

//自动更新
async function get_updata() {
	const resp = await $http.get(github+"https://raw.githubusercontent.com/Q39547190/JS-BOX/main/AWJQ-gx.json");
	if (resp.response.statusCode === 200) {
		if (resp.data.version != "1.0.2") {
			$ui.alert({
				title: "发现新版本 - " + resp.data.version,
				message: resp.data.upexplain,
				actions: [{
					title: "立即更新",
					handler: function() {
						download(resp.data.updata, resp.data.name)
					}
				},
				{
					title: "取消"
				}]

			});

		} else {
			let today = new Date().toLocaleDateString();
			console.log(today);
			let key = "dismissedAt";

			let dismissedAt = $cache.get(key);

			if (dismissedAt != today) {
				$ui.alert({
					title: "公告",
					message: resp.data.Bulletin,
					actions: [{
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
					}]
				});
			}
			//..
		}
		//..
	}
}

function download(url, name) {
	$ui.toast("正在安装中 ...");
	$http.download({
		url: url,
		handler: function(resp) {
			$addin.save({
				name: name,
				icon: "tram.fill",
				data: resp.data,
				handler: function() {
					$ui.alert({
						title: "安装完成",
						message: "\n是否打开？\n" + name,
						actions: [{
							title: "打开",
							handler: function() {
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