const utils = require('@/common/util.js');
//export const ApiServer = 'https://www.tcwanrenbang.cn/';
//export const ApiServer = 'http://192.168.2.189:9527/';
// export const ApiServer = 'http://47.93.91.21:8080/';
export const ApiServer = 'https://www.ulvdbrv.cn/';
// export const ApiServer = 'http://192.168.0.12:8080/';
export const AppId = 'wx50b9df64d4785714';
export const amap = require('./amap.js');
export const AmapObj = new amap.AMapWX({
	// key: '514fc08a59aa59c024f149746a778641',
		 key:'7ec4b9767a8dbd46e8b03d4949c37237' ,
	
});
/**
 * 接口调用-同步
 * @param {Object} url
 * @param {Object} param	
 * @param {Object} callback
 * @param {Object} errback
 */
export function getApi(uri, param, method, debug,login) {
	return new Promise((resolt, retject) => {
		var url = ApiServer + '' + uri;
		if (param == undefined || param == '' || typeof param != 'object') {
			param = new Object();
		}
		// 请求地址
		var apiurl = uri.indexOf('http')>=0 ? uri : url;
		// 打印加密数据
		if (debug === true) {
			console.log(apiurl);
			console.log(JSON.stringify(param));
		}
		let userinfo = uni.getStorageSync('user');
		let methods = method && method != null ? method : "post";
		// console.log(methods);
		// 发起请求
		uni.request({
			url: apiurl,
			data: param,
			method: methods,
			header: {
				'content-type': methods.toString().toLocaleUpperCase() == 'POST' ? 'application/json' : 'application/x-www-form-urlencoded', // 默认值
				'userId': userinfo ? userinfo.userId : '',
				'serviceToken': userinfo ? userinfo.serviceToken : '',
				'lastLoginTime': userinfo ? userinfo.lastLoginTimes : '',
				'login': login
			},
			dataType: "json",
			success: function(res) {
				if(uri.indexOf('http')>=0){
					if(res.statusCode==200){
						resolt(res.data);
						// console.log("打印接口");
					}else{
						retject(res.data);
					}
					return;
				}
				// console.log("打印接口");
				// console.log(JSON.stringify(res))
				if (res.statusCode == 200 && res.data.status == 0) {
					resolt(res.data);
					return;
				}
				if (res.statusCode == 200 && res.data.status != 0) {
					retject(res.data);
				}
				uni.hideLoading();
				console.log(res)
				uni.showToast({
					title: res.data.message,
					icon: 'none'
				});
			},
			fail: function(err) {
				//console.log(err)
				retject(err)
				uni.hideLoading();
				uni.showToast({
					title: "网络连接失败，请检查网络连接！",
					icon: "none",
					duration: 3000
				})
			}
		})
	})
}
/**
 * 文件上传
 * @param {Object} file
 */
export function upload(file) {
	return new Promise((resolt, retject) => {
		utils.showloading();
		uni.uploadFile({
			url: ApiServer + '/api/upload/qiniu', //仅为示例，非真实的接口地址
			filePath: file,
			name: 'file',
			success: (uploadFileRes) => {
				uni.hideLoading();
				let res = JSON.parse(uploadFileRes.data);
				if(uploadFileRes.statusCode==200 && res.code==200){
					resolt(res.data);return;
				}
				utils.error('文件上传失败！');
			},
			fail(err) {
				uni.hideLoading();
				utils.error('文件上传失败！');
			}
		});
	})
}

/**
 * 发送验证码
 * @param {Object} mobile
 */
export function sendCode(mobile) {
	return new Promise((resolt, retject) => {
		getApi('/api/login/getVerifyCode', {
			phone: mobile
		}, 'get').then(res => {
			if (res.code == 200) {
				utils.success('发送成功！');
				resolt(true)
			} else {
				utils.error('发送失败！');
				retject(false);
				return;
			}
		}).catch(err => {
			retject(false);
		})
	})
}


/**
 * 获取定位
 */
export function getLocal() {
	return new Promise((resolt, retject) => {
		AmapObj.getRegeo({
			success: (data) => {
				let info = data[0];
				let locationData = info.regeocodeData.addressComponent ? info.regeocodeData.addressComponent : {};
				locationData.latitude = info.latitude;
				locationData.longitude = info.longitude;
				locationData.area = locationData.district;
				// locationData.address = info.regeocodeData.addressComponent
				locationData.desc = info.desc;
				locationData.detail = locationData.province+''+locationData.city+''+locationData.district+''+locationData.desc
				// 获取省、市ID
				if (locationData.city) {
					getAreaId(locationData.city).then(local => {
						locationData.cityId = local.id;
						locationData.provinceId = local.pid;
						uni.setStorageSync('location', locationData);
						//获取区ID
						if (locationData.district) {
							getAreaId(locationData.district).then(area => {
								locationData.areaId = area.id;
								uni.setStorageSync('location', locationData);
								// console.log(locationData)
							})
						}
					})
				}
				resolt(locationData);
			},
			fail(err) {
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: '无法获取定位，请开启定位后重试！',
					confirmText: '重试',
					success(res) {
						if (res.confirm) {
							getLocal();
						}
					}
				});
			}
		});
	})
}

/**
 * 获取附近位置
 */
export function getAddList() {
	return new Promise((resolt, retject) => {
		AmapObj.getRegeo({
			success: (data) => {
				console.log(data)
				resolt(data);
			},
			fail(err) {
				uni.hideLoading();
				uni.showModal({
					title: '提示',
					content: '无法获取定位，请开启定位后重试！',
					confirmText: '重试',
					success(res) {
						if (res.confirm) {
							getLocal();
						}
					}
				});
			}
		});
	})
}

/**
 * 根据经纬度坐标获取地理位置
 * @param {Object} lat
 * @param {Object} lng
 */
export function getArea(lat,lng){
	return new Promise((resolt,retject)=>{
		let jsondata = {
			key:'fb53a9274cd326bc10206e4e45541afd',
			location:lng+','+lat
		}
		utils.showloading();
		getApi('https://restapi.amap.com/v3/geocode/regeo?parameters',jsondata,'get').then(res=>{
			if(res.status==1){
				let info = {
					province:res.regeocode.addressComponent.province,
					provinceId:0,
					city:res.regeocode.addressComponent.city,
					cityId:0,
					area:res.regeocode.addressComponent.district,
					areaId:0,
					address:res.regeocode.formatted_address
				}
				//获取省份ID
				getAreaId(info.province).then(prov=>{
					console.log(prov)
					info.provinceId = prov.id;
					if(info.provinceId && info.cityId && info.areaId){
						uni.hideLoading()
						resolt(info);
					}
				}).catch()
				//获取市ID
				getAreaId(info.city).then(prov=>{
					info.cityId = prov.id;
					if(info.provinceId && info.cityId && info.areaId){
						uni.hideLoading()
						resolt(info);
					}
				}).catch()
				//获取区ID
				getAreaId(info.area).then(prov=>{
					info.areaId = prov.id;
					if(info.provinceId && info.cityId && info.areaId){
						uni.hideLoading()
						resolt(info);
					}
				}).catch()
			}else{
				uni.hideLoading()
				utils.error('地址解析失败，请稍后重试！');
				retject(res)
			}
		}).catch(err=>{
			console.log(err)
		})
	})
}


/**
 * 根据区域名称获取本级和上级区域ID
 * @param {Object} name
 */
export function getAreaId(name) {
	return new Promise((resolt, retject) => {
		getApi('/api/cms/getAreasByName', {
			name: name
		}, 'get').then(res => {
			if (res.data.length > 0) {
				resolt(res.data[0]);
			} else {
				retject(null);
			}
		}).catch(err => {
			retject(null);
		});
	})
}
