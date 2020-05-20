module.exports = {
	getRandStr, //生成随机字符串
	md5: md5, //MD5加密
	checkMobile: checkMobile, //检测手机号的合法性
	getDate: getDate, //获取当前日期
	urlToarray: urlCut, //url转对象
	isLogin: isLogin, //登录状态判断
	filteremoji: filteremoji, //微信昵称特殊字符过滤
	clearData: clearData, //清理缓存
	logout: logout, //退出登录，
	upImage: upImage, //图片上传
	parseParam,
	alert,
	success,
	error,
	getUser,
	navback, //返回上一层
	showloading,
	openImg, //图片预览
	hideMobile, //隐藏电话号码
	getNum, //生成随机整数
	setPage, //页面设置
	getPage, //获取页面对象
	clearHtml, //清理html字符
	getToTime, //根据指定时间获取剩余时间数量
	isUpdate, //是否需要升级
	downStart, //缓存图片到本地
	getWeek, //获取指定日期的星期
	getTime, //获取当前时间
	getJiaJian, //小数的加减,
	formatdate, //时间戳格式化
	inputReplace, //输入空格过滤
	replaceStr,//字符串替换
}

/**
 * 字符串替换
 * @param str
 * @param rep
 * @param repl
 * @returns {void | string | never}
 */
function replaceStr(str, rep, repl) {
	if (str == undefined || str == null || typeof str == 'boolean' || str == '' || str.toString().length < 1) {
		return '';
	}
	let reg = new RegExp(rep, "g");
	let res = str.replace(reg, repl);
	return res;
}

/**
 * 输入空格过滤
 * @param {String} str 
 **/
function inputReplace(str) {
	if (str == undefined || str == null || typeof str == 'boolean' || str == '' || str.toString().length < 1) {
		return '';
	}
	let newstr = str && str != '' ? str.toString().replace(/\s*/g, "") : '';
	return newstr;
}

/**
 * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
 * @param {String} ov
 * @param {String} nv
 * @return {Boolean}
 */
function isUpdate(ov, nv) {
	if (!ov || !nv || ov == "" || nv == "") {
		return false;
	}
	var b = false,
		ova = ov.replace("V", "").replace("v", "").replace(" ", '').split(".", 4),
		nva = nv.replace("V", "").replace("v", "").replace(" ", '').split(".", 4);
	for (var i = 0; i < ova.length && i < nva.length; i++) {
		var so = ova[i],
			no = parseInt(so),
			sn = nva[i],
			nn = parseInt(sn);
		if (nn > no || sn.length > so.length) {
			return true;
		} else if (nn < no) {
			return false;
		}
	}
	if (nva.length > ova.length && 0 == nv.indexOf(ov)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 获取相差时间数据<br>
 * --param starttime 开始时间<br>
 * --param endtime 结束时间
 */
function getToTime(starttime, endtime) {
	var start_date = starttime ? new Date(starttime.replace(/-/g, "/")) : new Date();
	var end_date = new Date(endtime.replace(/-/g, "/"));
	var date = end_date.getTime() - start_date.getTime() //时间差的毫秒数
	//计算出相差天数
	var days = Math.floor(date / (24 * 3600 * 1000)) < 0 ? 0 : Math.floor(date / (24 * 3600 * 1000));
	//计算出小时数
	var leave1 = date % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
	var hours = Math.floor(leave1 / (3600 * 1000)) < 0 ? 0 : Math.floor(leave1 / (3600 * 1000));
	//计算相差分钟数
	var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
	var minutes = Math.floor(leave2 / (60 * 1000)) < 0 ? 0 : Math.floor(leave2 / (60 * 1000));
	//计算相差秒数
	var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
	var seconds = Math.round(leave3 / 1000) < 0 ? 0 : Math.round(leave3 / 1000);
	//两个时间相差数量是否大于1秒钟
	var isnow = true;
	if (days < 1 && hours < 1 && minutes < 1 && seconds < 1) {
		isnow = false;
	}
	return {
		d: days <= 9 ? '0' + days : days,
		h: hours <= 9 ? '0' + hours : hours,
		m: minutes <= 9 ? '0' + minutes : minutes,
		s: seconds <= 9 ? '0' + seconds : seconds,
		gt: isnow
	};
}

/**
 * 获取页面对象
 */
function getPage(field) {
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	var currentWebview = page.$getAppWebview();
	var obj = currentWebview.getStyle();
	if (field) {
		return obj[field];
	} else {
		return obj;
	}
}

/**
 * 页面设置
 * --param {titleNView:{titleText:'text'}}
 */
function setPage(param) {
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	var currentWebview = page.$getAppWebview();
	// 	currentWebview.setStyle({
	// 		titleNView: {
	// 			titleText: "test",
	// 		},
	// 	});
	currentWebview.setStyle(param);
}

/**
 * 生成随机整数<br>
 * --param minNum<br>
 * --param maxNum
 */
function getNum(minNum, maxNum) {
	let num = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
	if (num < 0) {
		return getNum(minNum, maxNum);
	} else {
		return num;
	}
}

/**
 * 电话号码隐藏<br>
 * -- param 电话号码
 */
function hideMobile(phone) {
	if (phone != undefined && phone.length < 1) {
		return "";
	}
	let mobile = "";
	let phonestr = phone + "";
	if (checkMobile(phonestr)) {
		mobile = phonestr.substr(0, 3) + "****" + phonestr.substr(7, phonestr.length);
	} else {
		mobile = phonestr.substr(0, 4) + "****";
	}
	return mobile;
}

/**
 * 预览图片<br>
 * -- param urls 图片列表<br>
 * -- param id 显示第几张图片
 */
function openImg(urls, id) {
	let index = id != undefined && id >= 0 ? id : 0;
	uni.previewImage({
		urls: urls,
		current: urls[id],
		indicator: 'number'
	})
}
/**
 * 加载窗口
 */
function showloading(msg, mask) {
	uni.showLoading({
		title: msg ? msg : "加载中...",
		mask: mask == undefined ? true : mask
	})
}

/**
 * 返回页面<br>
 * param:<br>
 * 		time 延时时间（秒）<br>
 * 		delta 返回页面数<br>
 * return: void;
 */
function navback(time, delta) {
	let timeNum = parseInt(time) > 1000 ? time : parseInt(time) * 1000;
	//延时执行
	if (time != undefined && parseInt(time) > 0) {
		setTimeout(function() {
			uni.navigateBack({
				delta: delta != undefined ? delta : 1
			})
		}, timeNum);
		return;
	}
	//立即执行
	uni.navigateBack({
		delta: delta != undefined ? delta : 1
	});
}

/**
 * 获取已经登录的用户信息<br>
 * param:<br>
 * 		field 需要返回的字段<br>
 * return:<br>
 * 		String<br> 
 * 		Object
 */
function getUser(field) {
	let User = uni.getStorageSync("user");
	if (User == "" || typeof User != 'object') {
		return 0;
	}
	if (field != undefined) {
		return User[field];
	} else {
		return User;
	}
}

/**
 * 成功提示<br>
 * title 提示信息<br>
 * callback 回调函数<br>
 * 显示时间：1000毫秒
 */
function success(title, callback) {
	uni.showToast({
		icon: "success",
		mask: true,
		title: title,
		duration: 1000,
		success: function() {
			if (typeof callback == 'function') {
				setTimeout(function() {
					callback()
				}, 1000)
			}
		}
	})
}

/**
 * 错误提示<br>
 * msg 提示信息<br>
 * callback 回调函数<br>
 * 显示时间：2000毫秒
 */
function error(msg, callback) {
	uni.showToast({
		icon: "none",
		title: msg,
		duration: 2000,
		success: function() {
			if (typeof callback == 'function') {
				setTimeout(function() {
					callback()
				}, 1000)
			}
		}
	})
}



/**
 * 提示窗口
 */
function alert(msg, callback) {
	uni.showModal({
		title: "提示",
		content: msg,
		success: function(re) {
			if (typeof callback == 'function' && re.confirm) {
				callback(re);
				return;
			}
		}
	})
}

/**
 * 生成随机数<br>
 * len 生成的字符串长度
 */
function getRandStr(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (var i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
	}
	return pwd;
}

/**
 * 图片上传
 */
function upImage(num, params, callback) {
	let number = num > 0 ? num : 1;
	let param = params != null && typeof params == 'object' ? params : new Object();
	if (param.id == undefined) {
		param.id = this.getUser("id");
	}
	uni.chooseImage({
		count: number,
		sizeType: ["compressed"],
		success: function(chooseImageRes) {
			uni.showLoading({
				title: "请稍后....",
				mask: true
			})
			let tempFilePaths = chooseImageRes.tempFilePaths;
			//console.log(JSON.stringify(tempFilePaths));
			if (tempFilePaths == undefined || tempFilePaths == "") {
				uni.showToast({
					title: "选择的图片无效！",
					icon: "none"
				});
				return;
			}
			//加密
			param.Number = num;
			param.Time = Date.parse(new Date());
			param.AppId = AppId;
			//过滤空格参数
			for (var i in param) {
				var str = param[i] + "";
				param[i] = str.replace(/\s+/g, '');
			}
			delete param.Token;
			/* var Token = sign(param); */
			var Token = md5(JSON.stringify(param));
			//参数增加和删除
			delete param.AppId;
			param.Token = Token;
			let files = [];
			for (var i = 0; i < tempFilePaths.length; i++) {
				var item = {
					uri: tempFilePaths[i],
					name: "f_" + i
				};
				files.push(item);
			}
			//上传
			const uploadTask = uni.uploadFile({
				url: ApiServer + "/api/Upload/img_fid",
				filePath: tempFilePaths[0],
				name: 'file',
				/* files: files, */
				formData: param,
				success: (uploadFileRes) => {
					console.log(uploadFileRes)
					if (uploadFileRes.statusCode != 200) {
						uni.hideLoading();
						uni.showToast({
							title: "文件上传失败！",
							icon: "none"
						});
						return;
					}
					callback(uploadFileRes.data);
				},
				fail: function(e) {
					console.log(JSON.stringify(e));
					uni.hideLoading();
					uni.showToast({
						title: "文件上传失败！",
						icon: "none"
					});
				}
			});
		}
	})
}

/**
 * 判断登录状态
 */
function isLogin(is) {
	var UserInfo = uni.getStorageSync('user');
	if (UserInfo == undefined || UserInfo == '' || UserInfo.userId == undefined || UserInfo.userId < 1) {
		return false;
	} else {
		return true;
	}
}

/**
 * 清理本地缓存
 */
function clearData() {
	if (isLogin()) {
		uni.getStorage({
			key: "UserInfo",
			success: function(data) {
				uni.clearStorageSync();
				uni.setStorageSync("UserInfo", data.data);
				uni.showToast({
					title: "缓存清理完成!"
				})
			},
			fail: function(e) {
				uni.showToast({
					title: "出现了点小状况~！",
					icon: "none"
				})
			}
		})
	} else {
		try {
			uni.clearStorageSync();
			uni.showToast({
				title: "缓存清理完成!"
			})
		} catch (e) {
			uni.showToast({
				title: "出现了点小状况~！",
				icon: "none"
			})
		}
	}

}

/**
 * 退出登录
 */
function logout() {
	try {
		uni.removeStorageSync("user");
		return true;
	} catch (e) {
		return false;
	}
}

/**
 * URL转对象
 * 用于提取url中的参数
 */
function urlCut(url) {
	var strlen = url.indexOf("?");
	if (strlen != -1) {
		var urlstr = url.substr(strlen + 1);
	} else {
		var urlstr = url.substr(1);
	}
	//拆分key value
	var arr = urlstr.split('&');
	var obj = new Object();
	for (var i = 0; i < arr.length; i++) {
		var item = arr[i].split('=');
		obj[item[0]] = item[1];
	}
	return obj;
}

/**
 * 获取当前日期 YYYY-MM-DD
 */
function getDate(nowdate) {
	var date = nowdate ? nowdate : new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

/**
 * 获取当前时间 H:i:s
 */
function getTime() {
	var date = new Date();
	var seperator = ":";
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();

	function getLen(str) {
		if (str.length < 2) {
			return '0' + str;
		} else {
			return str;
		}
	}
	var currtime = getLen(hours) + seperator + getLen(minutes) + seperator + getLen(seconds);
	return currtime;
}

/**
 * 获取当前星期
 */
function getWeek(nowdate) {
	var date = nowdate ? nowdate : new Date();
	var weekday = ["周 日", "周 一", "周 二", "周 三", "周 四", "周 五", "周 六"];
	return weekday[date.getDay()];
}

/**
 * 手机号验证
 */
function checkMobile(mobile) {
	if (mobile == '' || mobile == undefined) {
		return false;
	}
	if (mobile.toString().length != 11) {
		return false;
	}
	if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(mobile))) {
		return false;
	} else {
		return true;
	}
}
/**
 * 清理html字符
 */
function clearHtml(stri) {
	if (stri == undefined || stri == '') {
		return '';
	}
	let str = stri.replace(/<[^>]*>|<\/[^>]*>/gm, "");
	return str;
}
/**
 * 获取通信秘钥
 */
function sign(Obj, isMd5 = true) {
	var str = parseParam(Obj).replace(" ", ""); //对象先转成URL参数
	var arr = str.split('&'); //拆分参数
	var param = new Array(); //拆分成数组后存放结果
	var keys = new Array(); //排序规则
	for (var i = 0; i < arr.length; i++) {
		var res = arr[i].split('=');
		//处理多个==情况
		var val = "";
		for (var s = 1; s < res.length; s++) {
			if (res[s] != undefined && res[s] == "") {
				val += "=";
			} else {
				val += res[s];
			}
		}
		param[res[0]] = val;
		keys.push(res[0]);
	}
	//排序
	var res = keys.sort()
	//赋值，重新生成数据
	var newArray = new Array();
	for (var i = 0; i < res.length; i++) {
		newArray[res[i]] = param[res[i]];
	}
	//生成加密字符串
	return isMd5 == true ? md5(parseParam(newArray)) : parseParam(newArray);
}

/**
 * JSON对象生成URL
 */
function parseParam(param, key, encode, n = 0) {
	if (param == null) return '';
	var paramStr = '';
	var t = typeof(param);
	if (t == 'string' || t == 'number' || t == 'boolean') {
		paramStr += '&' + key + '=' + param
		// paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURI(encodeURI(param)) : param);
	} else {
		for (var i in param) {
			var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
			paramStr += parseParam(param[i], k, encode, i);
		}
	}
	if (n == 0) {
		return paramStr.substr(1)
	} else {
		return paramStr;
	}
};


/**
 * MD5加密
 * @param string
 * @returns {string}
 */
function md5(string) {

	var rotateLeft = function(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}
	var addUnsigned = function(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
			if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}
	var F = function(x, y, z) {
		return (x & y) | ((~x) & z);
	}
	var G = function(x, y, z) {
		return (x & z) | (y & (~z));
	}
	var H = function(x, y, z) {
		return (x ^ y ^ z);
	}
	var I = function(x, y, z) {
		return (y ^ (x | (~z)));
	}
	var FF = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var GG = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var HH = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var II = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var convertToWordArray = function(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWordsTempOne = lMessageLength + 8;
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};
	var wordToHex = function(lValue) {
		var WordToHexValue = "",
			WordToHexValueTemp = "",
			lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValueTemp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
		}
		return WordToHexValue;
	};
	var uTF8Encode = function(string) {
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};

	var x = Array();
	var k, AA, BB, CC, DD, a, b, c, d;
	var S11 = 7,
		S12 = 12,
		S13 = 17,
		S14 = 22;
	var S21 = 5,
		S22 = 9,
		S23 = 14,
		S24 = 20;
	var S31 = 4,
		S32 = 11,
		S33 = 16,
		S34 = 23;
	var S41 = 6,
		S42 = 10,
		S43 = 15,
		S44 = 21;
	string = uTF8Encode(string);
	x = convertToWordArray(string);
	a = 0x67452301;
	b = 0xEFCDAB89;
	c = 0x98BADCFE;
	d = 0x10325476;
	for (k = 0; k < x.length; k += 16) {
		AA = a;
		BB = b;
		CC = c;
		DD = d;
		a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
		d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
		c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
		b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
		a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
		d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
		c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
		b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
		a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
		d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
		c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
		b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
		a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
		d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
		c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
		b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
		a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
		d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
		c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
		b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
		a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
		d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
		c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
		b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
		a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
		d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
		c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
		b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
		a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
		d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
		c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
		b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
		a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
		d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
		c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
		b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
		a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
		d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
		c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
		b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
		a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
		d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
		c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
		b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
		a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
		d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
		c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
		b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
		a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
		d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
		c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
		b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
		a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
		d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
		c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
		b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
		a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
		d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
		c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
		b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
		a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
		d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
		c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
		b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
		a = addUnsigned(a, AA);
		b = addUnsigned(b, BB);
		c = addUnsigned(c, CC);
		d = addUnsigned(d, DD);
	}
	var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
	return tempValue.toLowerCase();

}

/**
 * 微信昵称过滤emoji
 */
const filteremoji = function filteremoji(str) {

	//测试表情
	// console.log(escape(str));
	//escape得到%uD83C%u.........格式的编码，可对应成\u...格式

	var regStr =
		/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
	if (regStr.test(str)) {
		return str.replace(regStr, "");
	} else {
		return str;
	}
}

function getDirInfo(path) {

}

/**
 * 创建下载任务
 */
function downStart(downurl, name, ext) {
	//检查是否存在文件后缀名
	let names = ['jpg', 'jpeg', 'png', 'gif'];
	if (names.indexOf(ext) <= 0) {
		var filename = (name + '.png').replace('..', '.');
	} else {
		var filename = (name + '.' + ext).replace('..', '.');
	}
	var dtask = plus.downloader.createDownload(downurl, {
		'filename': '_doc/cachefile/' + filename
	}, function(d, status) {
		// 下载完成
		if (status == 200) {
			//删除原来的文件
			console.log('图片缓存完成：' + d.filename)
			plus.storage.setItem(name, d.filename);
		} else {
			console.log("下载失败：" + status + ",文件地址：" + downurl)
		}
	}, function(e) {
		console.log(JSON.stringify(e))
	});
	dtask.start();
}

function getJiaJian(type, num1, num2) {
	var temp1, temp2, a;
	try {
		// 获取temp1小数点后的长度
		temp1 = num1.toString().split(".")[1].length;
	} catch (e) {
		temp1 = 0;
	}
	try {
		// 获取temp2小数点后的长度
		temp2 = num2.toString().split(".")[1].length;
	} catch (e) {
		temp2 = 0;
	}
	// Math.max(temp1, temp2) 为了获取temp1和temp2两个值中较大的一个
	// Math.pow(a,b) 表示 a 的 b 次方
	a = Math.pow(10, Math.max(temp1, temp2));

	// 计算的方式是先将所有的小数乘为整数，待加减运算执行完之后再除去对应的 a 的值，将其变为小数输出
	// 先判断执行的方式是否是加法，不是的话则执行减法运算
	var he = type == "add" ? (num1 * a + num2 * a) / a : (num1 * a - num2 * a) / a;
	return Math.round(he * 100) / 100;
}

/** 
 * 时间戳格式化函数 
 * @param {string} format 格式 
 * @param {int} timestamp 要格式化的时间 默认为当前时间 
 */
function formatdate(number, format) {
	if (!format) {
		format = 'Y/M/D h:m:s'
	}
	if (!number || number == '') {
		return '';
	}
	var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
	var returnArr = [];

	var date = new Date(number * 1000);
	returnArr.push(date.getFullYear());
	returnArr.push(formatNumber(date.getMonth() + 1));
	returnArr.push(formatNumber(date.getDate()));

	returnArr.push(formatNumber(date.getHours()));
	returnArr.push(formatNumber(date.getMinutes()));
	returnArr.push(formatNumber(date.getSeconds()));

	for (var i in returnArr) {
		format = format.replace(formateArr[i], returnArr[i]);
	}

	//数据转化  
	function formatNumber(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}
	return format;
}
