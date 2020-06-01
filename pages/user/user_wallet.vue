<template>
	<view class="index columns">
		<!-- 背景块 -->
		<view class="block_one redBg">

		</view>
		<!-- 余额块 -->
		<view class="block_two flex_wrap flex_columns" v-if="sum!=''">
			<text>总数量</text>
			<view class="text_one flex-around">
				<text class="text_one_a">{{sum}}</text>
				<text>盒</text>
			</view>
			<!-- <view class="text_two flex-around">
				<text v-if="key==1">本月销售额：{{data.monthMyOrderSum}} 盒</text>
				<text v-else>上月销售额：{{data.monthMyOrderSum}} 盒</text>
				<text>%10返点：￥{{formatPrice(data.rosePoint)}}</text>
			</view> -->
		</view>
		<view class="block_two flex_wrap flex_columns" v-else>
			<text>总资产</text>
			<view class="text_one flex-around">
				<text class="text_one_a">0</text>
				<text>盒</text>
			</view>
		</view>
		<!-- 记录块 -->
		<view class="block_three flex_columns">
			<view class="title_block flex-between flex-center">
				<text class="tit_one">本地仓订单</text>
				<text class="tit_one">云仓订单</text>
			</view>
			
			<view class="flex-between">
				<view class="bl_kuan flex_columns">
					<view class="three_one_blk flex_columns" v-for="(item,index) in storeOrdersOne" :key='index' v-if="storeOrdersOne.length>1">
						<view class="three_txt_one flex-between">
							<text>数量:</text>
							<text class="three_txt_a">{{item.quantity}} 盒</text>
						</view>
						<view class="three_txt_two flex-between">
							<text>时间：</text>
							<text>{{item.updateTime.substring(0,16)}}</text>
						</view>
						<view class="three_txt_two flex-between flex_rows">
							<text>订单号:</text>
							<text>{{item.orderNo}}</text>
						</view>
					</view>
					<view class="null" v-if="storeOrdersOne.length<1">
						<text>暂无订单</text>
					</view>
				</view>
				<view class="bl_kuan flex_columns">
					<view class="three_one_blk flex_columns" v-for="(item,index) in yunOrdersOne" :key='index' v-if="yunOrdersOne.length>1">
						<view class="three_txt_one flex-between">
							<text>数量:</text>
							<text class="three_txt_a">{{item.quantity}} 盒</text>
						</view>
						<view class="three_txt_two flex-between">
							<text>时间：</text>
							<text>{{item.updateTime.substring(0,16)}}</text>
						</view>
						<view class="three_txt_two flex-between flex_rows">
							<text>订单号:</text>
							<text>{{item.orderNo}}</text>
						</view>
					</view>
					<view class="null" v-if="yunOrdersOne.length<1">
						<text>暂无订单</text>
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
				userlist:'',//用户基本信息
				storeOrdersOne:'',//本地仓数据
				yunOrdersOne:'',//云仓数据
				sum:'',//总和
				key:1
			}
		},
		onLoad(e) {
			console.log(e);
			this.key = e.key;
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			this.Settlement();
		},
		methods: {
			// 本月结算
			Settlement() {
				this.utils.showloading();
				// uni.showLoading();
				this.http.getApi('/order/MonthGetOrder',{myId:this.userlist.id,status:this.key},'get',this.userlist.storeOpendid).then(res=>{
					console.log(res);
					this.sum = res.data.sum;
					this.storeOrdersOne = res.data.storeOrdersOne;
					this.yunOrdersOne = res.data.yunOrdersOne;
					// this.sum = res.rosePoint +res.sumPoint +res.monthPoint;
					// uni.hideLoading();
					this.utils.success('查询成功！',()=>{
						// this.utils.navback();
						uni.hideLoading();
					})
				}).catch(err=>{
					uni.hideLoading();
					uni.showToast({
						title: "暂无信息！",
						icon: "none",
						duration: 3000
					});
					console.log(err);
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		height: 100%;
	}

	.block_one {
		width: 100%;
		height: 150px;
		// background-color: #D42B18;
	}

	// 余额块
	.block_two {
		width: 86%;
		height: 170px;
		border-radius: 15px;
		background: linear-gradient(#FF6462, #FF9365);
		color: #FFFFFF;
		padding: 10px 20px;
		position: absolute;
		display: flex;
		align-content: space-between;
		top: 80px;
		margin-left: 7%;

		.text_one {
			// border: 1px solid #000000;
			width: 100%;
			height: 67%;
			display: flex;
			align-items: center;
			text{
				font-size: 30px;
			}

			.text_one_a {
				font-size: 45px;
				font-weight: 900;
			}
		}

	}

	// 记录块
	.block_three {
		width: 100%;
		height: 100%;
		padding: 0 30px;
		// border: 1px solid #000000;
		margin-top: 120px;
		.title_block{
			width: 100%;
			// height: 50px;
			margin-bottom: 10px;
			// border: 1px solid #000000;
			// position: absolute;
			.tit_one{
				font-size: 20px;
				font-weight: 800;
			}
		}
		.bl_kuan{
			max-width: 48%;
			min-width: 48%;
		}
		.three_one_blk{
			// height: 70px;
			width: 100%;
			padding: 10px;
			margin-bottom: 10px;
			border-radius: 15px;
			background: #FFFFFF;
			box-shadow: 1upx 8upx 13upx #C0C0C0;
			.three_txt_one{
				font-size: 15px;
				margin-bottom: 3px;
				color: #333333;
				// font-weight: 600;
				.three_txt_a{
					color: #E44D22;
				}
			}
			.three_txt_two{
				font-size: 12px;
				color: #C8C7CC;
			}
		}
	}
</style>
