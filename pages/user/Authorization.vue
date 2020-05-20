<template>
	<!-- 授权函页面 -->
	<view class="index">
		<view class="index_Authorization" v-if="userlist.spareThree>=30">
			<image src="../../static/authorization.png" mode="aspectFit"></image>
			<view class="tit flex_columns">
				<text>{{userlist.storeUsername}}</text>
				<text class="tit_name">{{userlist.storePhone}}</text>
				<text class="tit_post" v-if="userlist.storeRole == 0">直系代理</text>
				<text class="tit_post" v-if="userlist.storeRole == 1">总代理</text>
				<text class="tit_post" v-if="userlist.storeRole == 2">省代理</text>
				<text class="tit_post" v-if="userlist.storeRole == 3">市代理</text>
			</view>
		</view>
		<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-else>
			<h3>该用户暂无授权函！</h3>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userlist:''
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		// height: 100%;
		margin: 0;
		padding: 0;
		.index_Authorization{
			width: 100%;
			margin: 0;
			padding: 0;
			image{
				width: 100%;
				height: 600px;
				// max-height: 100%;
				// text-align: center;
			}
			.tit{
				// width: 100%;
				left: 38%;
				top: 238px;
				position: absolute;
				text{
					color: #333333;
					font-weight: 700;
					font-size: 16px;
					text-align: center;
				}
				.tit_name{
					padding-top: 2px;
				}
				.tit_post{
					padding-top: 30px;
					
					// padding-left: 2;
					// text-align: center;
					
				}
			
			}
		}
	}

</style>
