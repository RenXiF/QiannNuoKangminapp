import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
import amap from './common/amap.js';
import * as http from '@/common/request.js'
const utils = require("./common/util.js");

Vue.prototype.http = http;
Vue.prototype.utils = utils;

/**
 * 客服电话
 */
Vue.prototype.phone = '15323232222';

/**
 * 高德地图SDK
 */
Vue.prototype.amap = function() {
	return new amap.AMapWX({
		key: '0898c34e96fae4c7cbff8110e711a5d3'
	});
}

/**
 * 发起余额扣款请求
 * @param {Object} sn
 */
Vue.prototype.balance_pay = function(sn,isback) {
		let that = this;
		let jsonData = {};
		jsonData.user_id = utils.getUser('id');
		jsonData.sn = sn;
		utils.showloading();
		utils.getApi('/api/order/balance_pay', jsonData, res => {
			uni.hideLoading();
			console.log(res)
			if (res.code == 1) {
				uni.showToast({
					title: '支付成功！',
					success() {
						setTimeout(function() {
							that.doSwitch('/pages/order/order');
						}, 1500);
					}
				})
			} else {
				uni.showModal({
					title: '提示',
					content: res.msg,
					showCancel: false,
					success() {
						if(isback==true){
							utils.navback();	
						}
					}
				})
			}
		})
	},

	/**
	 * url跳转
	 * @param {Object} url 跳转的页面<br>
	 * @param {Object} param 传递的参数<br>
	 * @param {Object} islogin islogin是否登录才能进入<br>
	 * @param {Object} msg
	 */
	Vue.prototype.doUrl = function(url, param, islogin, msg) {
		url = url.replace(" ", "");
		if (url == '#' || url == '' || url == 'http://' || url == 'https://') {
			return;
		}
		let urlparam = utils.urlToarray(url.replace("??", "?"));
		let params = utils.parseParam(param).toLowerCase() + '&' + utils.parseParam(urlparam).toLowerCase();
		if (islogin != undefined && islogin != false && utils.isLogin() == false) {
			utils.login(msg);
			return;
		}
		//直接URL跳转
		if (url.substr(0, 4) == 'http') {
			uni.navigateTo({
				url: "/pages/webview/webview?" + params + "&url=" + url
			})
			return;
		}
		//根据Controller + Action跳转
		let urls = url.indexOf("?") < 0 ? url : url.substr(0, url.indexOf('?'));
		let uri = urls.indexOf("pages/") < 0 ? "/pages/" + urls : '/' + urls;
		uri = uri.replace("//", "/") + '?' + params;
		uni.navigateTo({
			url: uri,
			fail: function() {
				uni.showToast({
					title: "该功能正在开发中，请耐心等待更新！！",
					icon: "none",
					duration: 3000
				})
			}
		});
	}

/**
 * @name 获取定位缓存信息<br>
 * @param {Object} field
 */
Vue.prototype.getLocationInfo = function(field) {
	let info = uni.getStorageSync('location');
	// console.log(info)
	if (info == '' || info == null) {
		return null;
	}
	if (field != undefined && field != '') {
		if (info[field] != undefined) {
			return info[field];
		}
		if (info.address[field] != undefined) {
			return info.address[field];
		}
		return null;
	} else {
		return info;
	}
}

/**
 * 获取配置信息
 * @param {Object} field
 */
Vue.prototype.getConfig = function(field) {
	let config = uni.getStorageSync('config');
	if (config != '' && config != undefined && config[field] != undefined) {
		return config[field]
	} else {
		return config;
	}
}

/**
 * 拨打客服电话
 * @param {Object} phone
 */
Vue.prototype.callPhone = function(phone) {
	let telPhone = phone;
	if (phone == undefined || phone == '') {
		let config = uni.getStorageSync('config');
		telPhone = config.phone != undefined ? config.phone : '';
	}
	if (telPhone == '' || telPhone == null) {
		return;
	}
	uni.makePhoneCall({
		phoneNumber: telPhone
	})
}

/**
 * 获取系统平台
 */
Vue.prototype.getPlatform = function getPlatform() {
	var str = this.getSys('platform').toString().toLocaleLowerCase();
	if (str == 'ios') {
		return str.toLocaleUpperCase();
	} else {
		return str.substr(0, 1).toLocaleUpperCase() + str.substr(1, str.length);
	}
}

/**
 * 获取系统信息
 */
Vue.prototype.getSys = function getSys(field) {
	let system = uni.getSystemInfoSync();
	// console.log(JSON.stringify(system))
	if (field != undefined && system[field] != undefined) {
		return system[field];
	}
	return system;
}

/**
 * 预览图片<br>
 * -- param urls 图片列表<br>
 * -- param id 显示第几张图片
 */
Vue.prototype.openImg = function openImg(urls, id) {
	// 	console.log(JSON.stringify(urls));
	// 	console.log(id)
	let index = id != undefined && id >= 0 ? id : 0;
	utils.openImg(urls, id);
}


/**
 * 图片本地缓存
 */
// uni.removeStorageSync("CacheImage");
Vue.prototype.getImg = function(url) {
	if (url == undefined || url.length < 5 | url.substr(0, 4) != 'http') {
		return url;
	}
	// #ifdef APP-PLUS
	//获取下载文件地址
	let downurl = url;
	var start = url.lastIndexOf(".");
	var end = url.lastIndexOf("?") >= 0 ? url.lastIndexOf('?') : url.length;
	var ext = url.substring(start, end);
	var ext_num = url.indexOf(ext);
	if (ext_num >= 0) {
		downurl = url.substr(0, ext_num) + ext;
	}
	//读取缓存文件 
	let MName = utils.md5(downurl);
	//检查是否存在文件后缀名
	let names = ['jpg', 'jpeg', 'png', 'gif'];
	if (names.indexOf(ext) <= 0) {
		downurl = url;
	}
	let cacheUrl = plus.storage.getItem(MName);
	//缓存文件存在，直接读
	if (cacheUrl != null) {
		return cacheUrl;
	}
	//IOS下载地址为原地址
	// 	if(uni.getSystemInfoSync().platform=='ios'){
	// 		utils.downStart(downurl,MName,ext);
	// 	}else{
	// 		utils.downStart(url,MName,ext);
	// 	}
	utils.downStart(downurl, MName, ext);
	//#endif

	return url;
}
/**
 * 底部菜单跳转
 * @param {Object} url
 */
Vue.prototype.doSwitch = function(url) {
	uni.switchTab({
		url: url
	})
}
const app = new Vue({
	...App
})
app.$mount()
