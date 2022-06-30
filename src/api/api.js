import {
  get,
  post
} from '../http.js'
//get post 同时都要引入

//封装接口的方法
export function getAppIndex() {
  return get('api/app/recommend/appIndex')
}

export function getBanner() {
  return get('api/app/banner')
}

export function getTel() {
  return post('api/app/smsCode', {
    //这里用的是params传参，直接写{}就可，不用再声明params啦
    mobile: 18567391972,
    sms_type: 'login'
  })
}

export function gettree() {
  return get('tree/Info')
}

export function gethometree() {
  return get('hometree')
}

// 去vue页面通过生命周期来获取数据啦
// async mounted() {
//      // 明星讲师、精品课程等等
//      let res = await getAppIndex();

//      //添加到数组
//      this.startList = res.data.data.list

//      // 轮播图列表
//      var banner = await getBanner();
//      // console.log('轮播图'+ banner)
//      if (banner.data.code == 200) {
//      this.bannerList = banner.data.data
//      }

//      // 手机验证码接口
//      let Tel = await getTel();
//      // console.log('手机验证码'+ Tel)

//      //
//      },
