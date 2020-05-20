<template>
	<!-- 业务大厅页面 -->
	<view class="index flex_columns">
		<view class="index_hall flex_rows flex-between">
			<view class="one_block flex_columns flex-center" v-for="(item,index) in list1" :key="index" @click="doUrl(item.http)">
				<image :src="item.img" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="index_hall flex_rows">
			<view class="one_block flex_columns flex-center" v-for="(item,index) in list2" :key="index" @click="doUrl(item.http)">
				<image :src="item.img" mode="aspectFit"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
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
						name:"收货地址",
						http:'pages/address/management_address',
					},
					{
						img:"../../static/textbook.png",
						name:"代理审核",
						http:'pages/user/Agent_audit',
						// http:'pages/user/ceshi',
					},
					{
						img:"../../static/textbook.png",
						name:"意见反馈",
						http:'pages/user/Feedback',
					}
				],
				list2:[
					{
						img:"../../static/textbook.png",
						name:"反馈进度",
						http:'pages/user/FeedbackSpeed',
					},
					{
						img:"../../static/textbook.png",
						name:"修改资料",
						http:'pages/user/ceshi',
					}
				]
			}
		},
		onLoad() {

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
