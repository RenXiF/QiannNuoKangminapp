<template>
	<!-- 我的云仓页面 -->
	<view class="index flex_columns">
		<view class="index_hall flex_rows flex-between">
			<view class="one_block flex_columns flex-center" v-for="(item,index) in list1" :key="index" @click="doUrl(item.http)">
				<image :src="item.img" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- <view class="index_hall flex_rows">
			<view class="one_block flex_columns flex-center" v-for="(item,index) in list2" :key="index" @click="doUrl(item.http)">
				<image :src="item.img" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view> -->
	</view>
</template>		

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list1:[
					{
						img:"../../static/textbook.png",
						name:"云仓订单",
						http:'pages/user/LocalWarehouse',
					},
					{
						img:"../../static/textbook.png",
						name:"云仓进货",
						http:'pages/user/YunCpurchase',
					},
					{
						img:"../../static/textbook.png",
						name:"云仓提货",
						http:'pages/user/YunCdelivery',
					}
				],
				list2:[
					{
						img:"../../static/textbook.png",
						name:"我的库存",
						http:'pages/user/ceshi',
					}
				]
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			if (this.userlist.storeMoneysum!=1) {
				this.utils.success('您的等级不足！',()=>{
					this.utils.navback();
				});
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.index {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.index_hall{
		width: 100%;
		// height: 100%;
		.one_block{
			width: 33.333%;
			height: 100px;
			padding: 20px;
			background-color: #FFFFFF;
			border: #F8F8F8 1px solid;
			image{
				width: 60%;
			}
			text{
				margin-top: 10px;
			}
			
		}
	}

</style>
