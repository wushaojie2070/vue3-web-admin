//引入mock
//vue项目在cmd中“npm run dev”之后，在同一层同时（可能要以管理员身份）新开一个cmd,全局安装mock服务器：
// npm i @shymean/mock-server -g
// 然后输入下面命令（路径可能要改动）启动mock服务器。
// mock -p 9999 -f ./src/mock/mock.js
//记得把开发环境地址改掉
const Mock = require("mockjs");

//下面是给接口分配数据
Mock.mock('/tree/Info', 'get', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
  return treeInfo
})
Mock.mock('/hometree', 'get', () => { //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
  return hometree
})


let treeInfo = Mock.mock({
  "data|6": [ //生成6条数据 数组
    {
      "shopId|+1": 1, //生成商品id，自增1
      "shopMsg": "@ctitle(10)", //生成商品信息，长度为10个汉字
      "shopName": "@cname", //生成商品名 ， 都是中国人的名字
      "shopTel": /^1(5|3|7|8)[0-9]{9}$/, //生成随机电话号
      "shopAddress": "@county(true)", //随机生成地址
      "shopStar|1-5": "★", //随机生成1-5个星星
      "salesVolume|30-1000": 30, //随机生成商品价格 在30-1000之间
      "shopLogo": "@Image('100x40','#c33', '#ffffff','小北鼻')", //生成随机图片，大小/背景色/字体颜色/文字信息
      "food|2": [ //每个商品中再随机生成2个food
        {
          "foodName": "@cname", //food的名字
          "foodPic": "@Image('100x40','#c33', '#ffffff','小可爱')", //生成随机图片，大小/背景色/字体颜色/文字信息
          "foodPrice|1-100": 20, //生成1-100的随机数
          "aname|2": [{
            "aname": "@cname",
            "aprice|30-60": 20
          }]
        }
      ]
    }
  ]
})

let hometree = Mock.mock({
  "items": [{
      icon: "el-icon-setting",
      index: "home",
      title: "首页"
    },
    {
      icon: "el-icon-menu",
      index: "404",
      title: "404页面"
    },
    {
      icon: "el-icon-date",
      index: "3",
      title: "table正式模板",
      subs: [{
        index: "completeTemplate",
        title: "Table正式环境模板"
      }]
    },
    {
      icon: "el-icon-star-on",
      index: "RichTextEditings",
      title: "富文本编辑"
    },
    {
      icon: "el-icon-upload2",
      index: "drag",
      title: "维护人员页面",
      subs: [{
          index: "ExperimentDemoDaseTable",
          title: "实验Demo基础表格"
        },
        {
          index: "FormalEnvironmentTable",
          title: "正式环境表格"
        },
        {
          index: "FormValidation",
          title: "表单验证+自定义"
        },
        {
          index: "ComponentTransmissionValue",
          title: "组件传值"
        },
        {
          index: "upload",
          title: "文件上传/图片"
        },
        {
          index: "yihushi",
          title: "一户式查询",
        },
        {
          index: "ceshi2",
          title: "测试二级",
          subs: [{
            index: "ceshi31",
            title: "测试三级1"
          },
          {
            index: "ceshi32",
            title: "测试三级2"
          }, ]
        }
      ]
    },
    {
      icon: "el-icon-star-on",
      index: "yijiceshi1",
      title: "一级测试1"
    },
    {
      icon: "el-icon-star-on",
      index: "yijiceshi2",
      title: "一级测试2"
    },
    {
      icon: "el-icon-star-on",
      index: "yijiceshi3",
      title: "一级测试3"
    }

  ]

})
