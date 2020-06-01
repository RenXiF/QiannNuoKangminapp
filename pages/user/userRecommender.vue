<template>
	<view class="content">
		<view class="text">我的推荐码</view>
		<view class="" v-if="off==true">
			<canvas canvas-id="qrcode" style="width: 215px;height: 215px;" />
		</view>
		
		<!-- <input class="input" v-model="qrcodeText" placeholder="输入内容生成二维码" /> -->
		<button class="button" type="primary" @click="getoff()" v-else>点击打开二维码</button>
		<!-- <button class="button" type="primary" @tap="toComponent()">自定义组件</button> -->
	</view>
</template>

<script>
	import uQRCode from '@/common/uqrcode.js'
	export default {
		data() {
			return {
				qrcodeText: '',
				qrcodeSize: 129,
				qrcodeSrc: '',
				userlist:'',
				off:false
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			console.log(this.qrcodeText);
		},
		methods: {
			getoff(){
				if (this.userlist.id!='' && this.userlist.spareThree >=30) {
					this.qrcodeText = this.userlist.id+'';
					this.make(this.qrcodeText);
					this.off = true;
				} else{
					let _this = this;
					uni.showModal({
					    title: '该用户数量未达到',
					    content: '点击确定前往进货页面',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								_this.doUrl('pages/user/purchase');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			make(e) {
				console.log(e);
			      uQRCode.make({
			        canvasId: 'qrcode',
			        componentInstance: this,
			        text: e,
			        size: 215,
			        margin: 10,
			        backgroundColor: '#ffffff',
			        foregroundColor: '#000000',
			        fileType: 'jpg',
			        correctLevel: 3,
			        success: res => {
			          console.log(res)
			        }
			      })
			    }
			// toComponent() {
			// 	uni.navigateTo({
			// 		url: '/pages/component/qrcode/qrcode'
			// 	})
			// }
		}
	}
</script>

<style>
	page {
		background-color: #f0f0f0;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: var(--status-bar-height);
	}

	.text {
		display: flex;
		justify-content: center;
		margin-top: 50rpx;
		margin-bottom: 30rpx;
		font-size: 36rpx;
		color: #666666;
	}

	.canvas {
		margin-top: 50rpx;
		text-align: center;
	}

	.canvas canvas {
		margin: 0 auto;
	}

	.image {
		width: 258rpx;
		margin-top: 50rpx;
		text-align: center;
	}

	.image image {
		display: block;
		width: 258rpx;
		height: 258rpx;
	}

	.input {
		width: 600rpx;
		height: 40px;
		margin: 50rpx 0;
		padding: 0 20rpx;
		border: 1px solid #b0b0b0;
		border-radius: 5px;
		background-color: #ffffff;
		box-sizing: border-box;
	}

	.button {
		width: 690rpx;
		margin: 10rpx;
	}

	.button:last-child {
		margin-bottom: 50rpx;
	}
</style>
