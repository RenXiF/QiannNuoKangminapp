<template>
	<!-- 商品页面 -->
	<view class="index">
		<view class="index_commodity flex_columns">
			<view class="one_block flex_columns" v-for="(item,index) in commodity">
				<view class="noe_tit_b flex-between">
					<view class="noe_b_left flex_columns">
						<text>提货数量：{{item.num}}</text>
						<text>收货人：{{item.name}}</text>
						<text>收货地址：{{item.add}}</text>
						<text>申请时间：{{item.data}}</text>
						<text>手机号：{{item.phone}}</text>
					</view>
					<view class="noe_b_right flex_columns flex">
						<text>{{item.state}}</text>
						<image src="../../static/Positive.jpg" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				commodity:[
					{
					num:200,
					name:"李四",
					add:"贵州遵义",
					data:"2020-3-4",
					phone:12312341234,
					state:"已发货"
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
		width: 100%;
		height: 100%;
	}
	.index_commodity{
		width: 100%;
		height: 100%;
		padding: 10px 30px;
		.one_block{
			width: 100%;
			padding: 10px 20px;
			border-radius: 15px;
			background-color: #DD524D;
			.noe_tit_b{
				width: 100%;
				text{
					color: #FFFFFF;
					font-size: 15px;
				}
				.noe_b_left{
					height: 100%;
				}
				.noe_b_right{
					max-width: 40%;
					height: 120px;
					flex-direction: row-reverse;
					image{
						max-width: 80px;
						border-radius: 15px;
						
					}
				}
			}
		}
	}

</style>
