<template>
	<view class="center">
		<view class="center_top"><view class="mask"></view></view>
		<view class="center_box_bg">
			<view class="profily">
				<view class="base">
					<view class="profily_header">
						<!-- <image :src="imgInfo" mode="aspectFit"></image> -->
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<view class=" flex_columns">
						<view class="">
							<text v-show="userlist.storeUsername">{{ userlist.storeUsername }}</text>
							<text v-show="!userlist.storeUsername">未登录</text>
							<!-- <text class="text_b">*总代理</text> -->
							<text class="text_b" v-if="userlist.storeRole == 0">直系代理</text>
							<text class="text_b" v-if="userlist.storeRole == 1">总代理</text>
							<text class="text_b" v-if="userlist.storeRole == 2">省代理</text>
							<text class="text_b" v-if="userlist.storeRole == 3">市代理</text>
						</view>
						<view class="mess_information">
							<!-- <text>我的库存：{{userlist.spareTwo}}盒</text> -->
							<text v-show="userlist.spareTwo">云仓库存：{{userlist.spareTwo}} 盒</text>
							<text v-show="!userlist.spareTwo">云仓库存：0</text>
							<!-- <text>直属代理：3</text> -->
						</view>
						<view class="mess_information">
							<!-- <text>我的库存：{{userlist.spareTwo}}盒</text> -->
							<text v-show="userlist.spareThree">累计进货：{{userlist.spareThree}} 盒</text>
							<text v-show="!userlist.spareThree">累计进货：0</text>
							<!-- <text>直属代理：3</text> -->
						</view>
					</view>

					<!-- <image src="../../static/icon/setting.png" mode=""></image> -->
					<!-- <text class="text_c" @click="doUrl('/pages/user/sregister')">注册</text> -->
					<text class="text_c" @click="login()" v-show="!userlist">登录</text>
					<!-- <button class="text_c" @click="appLogin">APP微信授权登录</button> -->
					<text class="text_c" @click="qingchu()" v-show="userlist">退出登录</text>
				</view>
				<view class="order_status">
					<view class="status" v-for="item in status" @click="doUrl(item.http)">
						<image class="icon" :src="item.url" mode="aspectFill"></image>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="baiban"></view>
			<view class="center_menu">
				<view class="menu_item" v-for="item in menus" @click="doUrl(item.http,{key:item.key})">
					<image :src="item.icon" mode="aspectFill"></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
			<view class="center_menu">
				<view class="menu_item"  @click="Hotline()">
					<image src="../../static/icon/9.png" mode="aspectFill"></image>
					<text>全国热线</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onShareAppMessage(res) {
	  if (res.from === 'button') {// 来自页面内分享按钮
	  }
	  return {
	    title: '来自黔诺康管理的分享',
	    path: '/pages/user/user?id=123'
	  }
	},
	data() {
		return {
			status: [
				{
					key: 1,
					name: '代理发货',
					url: '../../static/icon/one.png',
					http: 'pages/index/order'
				},
				{
					key: 2,
					name: '我要招商',
					url: '../../static/icon/2.png',
					http: 'pages/user/userRecommender'
				},
				{
					key: 3,
					name: '我要进货',
					url: '../../static/icon/3.png',
					http: 'pages/user/purchase'
				},
				{
					key: 4,
					name: '我的云仓',
					http: 'pages/user/YunCang',
					url: '../../static/icon/4.png'
				}
			],
			menus: [
				{
					name: '本月进货总量',
					icon: '../../static/icon/6.png',
					// http: 'pages/user/commodity',
					http: 'pages/user/user_wallet',
					key: 1
				},
				{
					name: '上月进货总量',
					icon: '../../static/icon/5.png',
					http: 'pages/user/user_wallet',
					// http: 'pages/user/cheshi',
					key: 2
				},
				// {
				// 	name: '上月进货总量',
				// 	icon: '../../static/icon/7.png',
				// 	// http: 'pages/user/withdrawal',
				// 	http: 'pages/user/user_wallet',
				// 	http: 'pages/user/cheshi',
				// 	key: 3
				// },
				{
					name: '我的授权',
					icon: '../../static/icon/8.png',
					http: 'pages/user/Authorization',
					key: 4
				}
				// {
				// 	name: '全国热线',
				// 	icon: '../../static/icon/9.png',
				// 	http: 'pages/user/ceshi',
				// 	key: 5
				// }
				// {
				// 	name: '渠道设置',
				// 	icon: '../../static/icon/10.png',
				// 	http: 'pages/user/ceshi',
				// 	key: 6
				// }
			],
			nickName: '未登录',
			data: '',
			imgInfo: '../../static/logo.png',
			storeOpendid: '',
			userlist: ''
		};
	},
	onShow() {
		this.storeOpendid = uni.getStorageSync('Opendid'); //加载缓存
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		console.log(this.userlist);
	},
	onLoad() {
		this.login();
	},
	methods: {
		Hotline(){
			uni.makePhoneCall({
			    phoneNumber: '400-996-5055' //仅为示例
			});
		},
		qingchu() {
			uni.removeStorageSync('userlist');
			uni.removeStorageSync('Opendid');
			uni.removeStorageSync('setAddr');
			this.userlist = null;
			this.storeOpendid = '';
			this.utils.success('退出成功！', () => {
				// this.utils.navback();
			});
		},
		login: function() {
			let _this = this;
			_this.utils.showloading();
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					let code = loginRes.code;
					// 赋值名称头像
					if (_this.storeOpendid != '') {
						_this.judgelogin(_this.storeOpendid);
					} else {
						_this.judgeOpendid(code);
					}
				}
			});
		},
		// 判断是否有Opendid
		judgeOpendid: function(code) {
			this.http.getApi('/user/test',{code: code},'get','').then(res => {
					uni.setStorageSync('Opendid', res.data);
					this.storeOpendid = res.data;
					this.judgelogin(res.data);
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err.msg,
						icon: 'none',
						duration: 3000
					});
				});
		},
		// 判断用户是否注册
		judgelogin: function(data) {
			// 判断是否登录
			this.http.getApi('/user/login', { storeLogin: 1, storeOpendid: data }, 'post', '').then(res => {
					uni.setStorageSync('userlist', res.data);
					this.userlist = res.data;
					uni.hideLoading();
					uni.showToast({
						title: '登录成功！',
						icon: 'none',
						duration: 3000
					});
				}).catch(err => {
					let _this = this;
					uni.hideLoading();
					console.log(err);
					if (err.status == 19) {
						uni.showModal({
							title: '该用户未注册',
							content: '点击确定跳转注册界面',
							success: function(res) {
								if (res.confirm) {
									_this.doUrl('/pages/user/register');
								} else if (res.cancel) {
								}
							}
						});
					}
					else {
						uni.showToast({
							title: err.msg,
							icon: 'none',
							duration: 3000
						});
					}
				});
		}
	},
	computed: {}
};
</script>

<style lang="scss">
page {
	height: 100%;
}

.profily,
.profily_header {
	border-radius: 8px;
}
.center_top {
	// margin-top: 50px;
}

.center {
	height: 100%;

	&_top {
		height: 18%;
		background: url('../../static/icon/header.jpg') no-repeat 0% 50%;
		background-size: cover;

		// background: #E6E6E6;
		.mask {
			background: rgba(0, 0, 0, 0.4);
			height: 100%;
		}
	}

	&_box_bg {
		background: #f9f9f9;
		position: relative;

		.profily {
			position: absolute;
			width: 90%;
			// border:1px solid #F7F7F7;
			margin: 0 auto;
			top: -100upx;
			left: 5%;
			background: #fefefe;
			padding: 35upx;
			box-sizing: border-box;
			box-shadow: 0px 2px 5px #ededed;
		}
	}
}

.base {
	display: flex;
	align-items: center;
	border-bottom: 2px solid #f6f6f6;
	padding-bottom: 35upx;
	position: relative;
	.profily_header {
		height: 120upx;
		width: 120upx;
		// background-image: url('../../static/icon/header.jpg');
		// background-size: 100%;
		position: relative;
		// top: -170upx;
		image {
			width: 100%;
			border-radius: 8px;
		}
	}
	.text_b {
		font-size: 12px;
		color: #f0ad4e;
		border-radius: 3px;
		padding: 0 5px;
	}
	.mess_information text {
		font-size: 13px;
		color: #333333;
	}

	text {
		margin-left: 20px;
		font-size: 30upx;
	}

	// image{
	// 	position: absolute;
	// 	height: 40upx;
	// 	width: 40upx;
	// 	right: 0px;
	// 	top:0px;
	// }
	.text_c {
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0px 20px;
		// color: #FF5733;
		color: #FFFFFF;
		right: 0px;
		top: 0px;
		box-shadow: 1px 2px 6px #F55866;
		background: linear-gradient(0deg,rgba(246,62,100,1),rgba(244,106,103,1));
		border-radius: 15px;
		text {
			font-size: 7px;
		}
	}
}

.order_status {
	display: flex;
	justify-content: space-between;
	margin-top: 35upx;

	.status {
		width: 140upx;
		font-size: 24upx;
		text-align: center;
		letter-spacing: 0.5px;
		display: flex;
		flex-direction: column;
		.icon {
			width: 50upx;
			height: 50upx;
			margin: 0 auto;
			margin-bottom: 5px;
		}
	}
}

.baiban {
	background: #fefefe;
	height: 300upx;
}

.center_menu {
	width: 100%;
	display: inline-block;

	.menu_item {
		font-size: 28upx;
		letter-spacing: 1px;
		padding: 14px 5%;
		background: #fefefe;
		overflow: hidden;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: 1px solid #efefef;

		// &:hover {
		// 	background: #f6f6f6 !important;
		// }

		&::after {
			content: '';
			width: 30upx;
			height: 30upx;
			position: absolute;
			right: 5%;
			background: url('../../static/icon/right.png') no-repeat;
			background-size: 100%;
		}

		text:nth-of-type(1) {
			margin-left: 10px;
		}

		image {
			width: 40upx;
			height: 40upx;
		}

		&:nth-of-type(4) {
			margin-top: 10px;
		}
	}
}
</style>
