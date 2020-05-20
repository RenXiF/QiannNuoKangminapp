<template>
	<!-- 本月订单结算页面 -->
	<view class="index">
		<view class="index_withdrawal">
			<view class="one_block flex_columns flex-center">
				<text class="tit_num">0.00</text>
				<text>可结算金额</text>
			</view>
			<view class="two_block flex_rows">
				<view class="two_left flex_columns">
					<text>提现金额：</text>
					<text>收款银行：</text>
					<text>开户行名称：</text>
					<text>收款账户名：</text>
					<text>收款银行卡号：</text>
				</view>
				<view class="two_right flex_columns">
					<input type="number" value="" placeholder="请输入提现金额"/>
					<input type="text" value="" placeholder="请输入收款银行"/>
					<input type="text" value="" placeholder="请输入开户行名称"/>
					<input type="text" value="" placeholder="请输入收款账户名"/>
					<input type="number" value="" placeholder="请输入收款银行卡号"/>
				</view>
			</view>
		</view>
		<view class="Submission flex-center">
			<button type="default" @click="tijiao()">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			tijiao(){
				uni.showToast({
					title: "该功能正在开发中，请耐心等待更新!!！",
					icon: "none",
					duration: 3000
				})
			}
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}
	.index_withdrawal{
		width: 100%;
		background-color: #FFFFFF;
		.one_block{
			width: 100%;
			margin-top: 30px;
			text{
				font-size: 15px;
				color: #999999;
			}
			.tit_num{
				font-size: 35px;
				font-weight: 700;
				color: #000000;
				// margin-bottom: ;
			}
		}
		.two_block{
			height: 100%;
			padding: 10px 30px;
			margin-top: 30px;
			text{
				font-size: 16px;
			}
			
			.two_left{
				width: 35%;
				height: 100%;
				color: #333333;
				text{
					height: 30px;
					text-align: center;
					line-height: 30px;
					margin-bottom: 10px;
				}
			}
			.two_right{
				width: 60%;
				height: 100%;
				color: #999999;
				input{
					height: 30px;
					font-size: 15px;
					margin-bottom: 10px;
				}
			}
		}
	}
	.Submission{
		padding: 20px;
		button{
			height: 50px;
			color: #FFFFFF;
			background-color: #FF5733;
		}
	}

</style>
