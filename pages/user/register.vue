<template>
	<!-- 注册页面 -->
	<view class="content">
		<view class="forget-bg">
			<view class="forget-card">
				<view class="forget-input forget-margin-b"><input type="text" v-model="storelist.storeUsername" focus placeholder="请输入您的姓名" /></view>
				<!-- <view class="forget-input forget-margin-b"><input type="text" v-model="storelist.storeReterences" placeholder="请输入您的推荐码" /></view> -->
				<view class="forget-button forget-margin-b" @click="Sweepcode()">
					<view class=" flex-center">
						<text v-if="storelist.storeParentid!=''">已扫码</text>
						<text else>请扫推荐码 点击文字扫码</text>
					</view>
				</view>
				<view class="forget-input forget-margin-b"><input type="idcard" v-model="storelist.storeIdcard" placeholder="请输入您的身份证号码" /></view>
				<view class="forget-input forget-margin-b"><input type="number" v-model="storelist.storePhone" confirm-type="done" maxlength="11" placeholder="请输入您的手机号" /></view>
				<!-- <view class="forget-input forget-margin-b">
					<view class="verify-left"><input type="number" placeholder="请输入验证码" /></view>
					<view class="verify-right"><button class="verify-btn" type="primary">获取验证码</button></view>
				</view> -->
			</view>
		</view>
		<view class="forget-btn"><button class="landing" type="primary" @click="Submission()">提交</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			storelist:{
				storeUsername: '', //姓名
				storePhone: '', //电话
				storeLogin: 1, //登录方式
				storeOpendid: '', //Opendid值
				storeReterences: '123456', //推荐码
				storeParentid: '', //上级ID
				storeIdcard: '' //身份证
			}
			
		};
	},
	onLoad() {
		this.storelist.storeOpendid = uni.getStorageSync('Opendid'); //加载缓存
	},
	methods: {
		Sweepcode(){
			let _this = this;
			// 只允许通过相机扫码
			uni.scanCode({
			    onlyFromCamera: true,
			    success: function (res) {
					_this.storelist.storeParentid = res.result;
			    }
			});
		},
		Submission() {
			if(this.storelist.storeUsername==''){
				this.utils.error('请填写联系人！');return;
			}
			if(this.storelist.storeParentid==''){
				this.utils.error('请扫描推荐码！');return;
			}
			if(this.storelist.storePhone=='' || this.utils.checkMobile(this.storelist.storePhone)==false){
				this.utils.error('请填写正确手机号！');return;
			}
			if(this.storelist.storeIdcard==''){
				this.utils.error('请填写身份证号码！');return;
			}
			let storelist= this.storelist;
			// let _this = this;
			this.http.getApi('/user/register',storelist, 'post','').then(res => {
				this.utils.success('注册成功！',()=>{
					this.utils.navback();
				})
			}).catch(err => {
				if(err.status==22){
					uni.showModal({
					    title: '该用户已存在',
					    content: '点击确定返回用户界面',
					    success: function (res) {
					        if (res.confirm) {
								this.utils.navback();
					        } else if (res.cancel) {
					        }
					    }
					});
					
				}else{
					this.utils.error(err.msg);
				}
				
			});
		}
	}
};
</script>

<style lang="scss">
.verify-left {
	width: calc(100% - 260upx);
}
.verify-right {
	padding-left: 20upx;
}
.verify-btn {
	height: 80upx;
	line-height: 80upx;
	font-size: 28upx;
	width: 240upx;
	border-radius: 8upx;
	background: linear-gradient(left, #ff978d, #ffbb69);
}
.verify-left,
.verify-right {
	float: left;
}
.landing {
	height: 84upx;
	line-height: 84upx;
	border-radius: 44upx;
	font-size: 32upx;
	background: linear-gradient(left, #ff978d, #ffbb69);
}
.forget-btn {
	padding: 10upx 20upx;
	margin-top: 780upx;
}

.forget-input input {
	background: #f2f5f6;
	font-size: 28upx;
	padding: 10upx 25upx;
	height: 62upx;
	line-height: 62upx;
	border-radius: 8upx;
}
.forget-margin-b {
	margin-bottom: 25upx;
}
.forget-input,.forget-button {
	padding: 10upx 20upx;
	overflow: auto;
}
.forget-button view{
	background: #f2f5f6;
	font-size: 28upx;
	padding: 10upx 25upx;
	height: 72upx;
	// height: 62upx;
	border-radius: 8upx;
	justify-content: center;
	text{
		color: #80808F;
	}
}
.forget-card {
	background: #fff;
	border-radius: 12upx;
	padding: 60upx 25upx;
	box-shadow: 0 6upx 18upx rgba(0, 0, 0, 0.12);
	position: relative;
	margin-top: 120upx;
}
.forget-bg {
	height: 260upx;
	padding: 25upx;
	background: linear-gradient(#ff978d, #ffbb69);
}
</style>
