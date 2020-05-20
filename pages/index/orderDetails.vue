<template>
	<!-- 订单详情页面 -->
	<view class="index">
		<view class="index_commodity flex_columns" v-if="orderlist.createTime!='000000000000000'">
			<view class="one_block flex_columns">
				<view class="noe_tit_b flex-between">
					<view class="noe_b_left flex_columns">
						<text>创建时间：{{orderlist.createTime.substring(0,16)}}</text>
						<text>更新时间：{{orderlist.updateTime.substring(0,16)}}</text>
						<text>数量：{{itemlist.quantity}} 盒</text>
						<text>收货人：{{orderlist.receiverName}}</text>
						<text>收货地址：{{orderlist.receiverProvince}}{{orderlist.receiverCity}}{{orderlist.receiverDistrict}}{{orderlist.receiverAddress}}</text>
						<text>邮政编码：{{orderlist.receiverZip}}</text>
						<text>手机号：{{orderlist.receiverMobile}}</text>
					</view>
					<view class="noe_b_right flex_columns flex">
						<text>{{item.state}}</text>
						<text v-if="itemlist.status == 0">未发货</text>
						<text v-if="itemlist.status == 1">已发货</text>
						<text v-if="itemlist.status == 2">交易完成</text>
						<text v-if="itemlist.status == 3">交易异常关闭</text>
						<image src="../../static/Positive.jpg" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;"else>
			<text>暂无详情订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				storeOpendid:'',
				itemlist:'',
				orderlist:{
					createTime:'000000000000000',
					updateTime:'000000000000000'
				}
			}
		},
		onLoad(item) {
			this.itemlist = item;
			console.log(item);
			this.storeOpendid = uni.getStorageSync('Opendid'); //加载缓存
			if (item) {
				
				if (!item.sparetwo) {
					this.orderDetails(item.addressid);
				} else{
					this.orderDetails(item.sparetwo);
				}
			} else{
				this.utils.success('暂无信息！',()=>{
					this.utils.navback();
				});
			}
		},
		
		methods: {
			orderDetails(e){
				this.utils.showloading();
				this.http.getApi('/shippings/GetShipping', {ShippingID:e }, 'get', this.storeOpendid)
				.then(res => {
					this.orderlist = res.data;
					console.log(res);
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
					uni.showToast({
						title: err.msg,
						icon: "none",
						duration: 3000
					})
				});
			},
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
					border-radius: 15px;
					image{
						max-width: 80px;
						border-radius: 15px;
						
					}
				}
			}
		}
	}

</style>
