<template>
	<!-- 进货页面 -->
	<view class="index">
		<view class="index_purchase">
			<view class="one_block flex_rows">
				<image src="../../static/Positive.jpg" mode="aspectFit"></image>
				<view class="one_block_b flex_columns">
					<text>黔诺康</text>
					<text class="tit_one_b flex_rows flex_wrap">黔诺康源于尉氏县，至今已有200年历史，已传承七代，荣获尉氏县（第三批非物质文化遗产），公司承诺使用三次无疗效退全款</text>
				</view>
			</view>
			<view class="two_block flex-between flex-center">
				<text>产品数量：</text>
				<input type="number" v-model="quantity" minlength="30" value="30" placeholder="请输入不小于30的进货数量!" />
			</view>
			<view class="two_block flex-between flex-center" @click="doUrl('pages/address/management_address',{ select: 1 })">
				<text>地址：</text>
				<view class="choose_item item_border rows flex-between">
					<view class="item_left" v-if="setAddr != ''">已选择</view>
					<!-- <view class="item_left" v-else>规格</view> -->
					<view class="item_right rows centerlay">
						<text class="mgrt20" v-if="setAddr != ''">{{ setAddr.receiverProvince}} {{ setAddr.receiverCity}} {{ setAddr.receiverDistrict}}</text>
						<text class="mgrt20" v-else>请选择收货地址</text>
						<text class="Icon right_icon">&#xe638;</text>
					</view>
				</view>
			</view>
			<view class="two_block flex-between flex-center">
				<text>支付方式：</text>
				<view class="choose_item item_border rows flex-between" @click="SpecificationsShow">
					<view class="item_left" v-if="Selected != ''">已选择</view>
					<!-- <view class="item_left" v-else>规格</view> -->
					<view class="item_right rows centerlay">
						<text class="mgrt20" v-if="Selected != ''">{{ Selected.name }}</text>
						<text class="mgrt20" v-else>请选择支付方式</text>
						<text class="Icon right_icon">&#xe638;</text>
					</view>
				</view>
			</view>
		</view>
		<view class="Submission flex-center">
			<button type="default" @click="tijiao()">提交订单</button>
		</view>
		<!-- 支付弹窗 -->
		<popup :show="showSpecifications" posNum="bottom: 0;width:100%; border-radius: 20rpx 20rpx 0 0;" @showClose="SpecificationsClose">
			<view class="server_pop" v-if="method">
				<view class="pop_tit flex_rows">
					<view class=""></view>
					<view class="">选择支付方式</view>
					<view class="" @click="SpecificationsClose">×</view>
				</view>
				<view class="pop_cont flex_rows">
					<view :class="[item.active ? 'active' : '', 'cont_item']" v-for="(item, index) in method" :key="index" @click="serverItemClick(index)">
						{{ item.name }}
					</view>
				</view>
				<!-- <view class="pop_num space-between rows">
					<view class="">
						购买数量
					</view>
					<view class="price_right space-between rows">
						<view class="right_reduce Icon" @click="reduceGoodsNum(baseNum)">&#xe611;</view>
						<view class="right_num">{{ baseNum }}</view>
						<view class="right_add Icon" @click="addGoodsNum(baseNum)">&#xe632;</view>
					</view>
				</view> -->
			</view>
			<view class="pop_button" @click="serverButton">确定</view>
		</popup>
	</view>
</template>

<script>
	import popup from '@/components/basis/popup.vue';
	export default {
		components: {
			popup
		},
		data() {
			return {
				title: 'Hello',
				showSpecifications: false, //支付弹窗控制
				userlist:'',//用户基本信息
				quantity:'',//用户输入数量
				method:[{name:'银行转账',
						id:1},
					{name:'微信支付',
						id:2},
					{name:'线下自理',
						id:3}],
				Selected:'',//用户已选择支付方式
				setAddr:''//用户已选择地址
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
		},
		onShow() {
			this.setAddr = uni.getStorageSync('setAddr'); //加载选中地址缓存
			console.log('地址');
			console.log(this.setAddr);
		},
		methods: {
			add(){
				
			},
			// 支付弹窗
			SpecificationsShow() {
				this.showSpecifications = true;
			},
			
			SpecificationsClose() {
				this.showSpecifications = false;
			},
			serverItemClick(index) {
				for (let i = 0; i < this.method.length; i++) {
					let item = this.method[i];
					item.active = index == i ? true : false;
					this.method.splice(i, 1, item);
					if (index == i) {
						this.Selected = item;
					}
				}
			},
			serverButton() {
				for (let i = 0; i < this.method.length; i++) {
					if (this.method[i].active == true) {
						this.showSpecifications = false;
					}
				}
			},
			tijiao(){
				let _this = this;
				if(_this.quantity==''|| _this.quantity<30){
					_this.utils.error('请输入不小于30的进货数量!！');return;
				}
				if(!_this.Selected){
					uni.showToast({
						title: "请选择支付方式！",
						icon: "none",
						duration: 3000
					})
					return;
				}
				_this.utils.showloading();
					_this.http.getApi('/yunorder/GiveOrder', {
								storeId: _this.userlist.id,
								spaceOne:_this.userlist.storeUsername,
								parentId: _this.userlist.storeParentid,
								storePhone:_this.setAddr.receiverMobile,
								// storeRole:_this.userlist.storeRole,
								quantity:_this.quantity,
								paymentType:_this.Selected.id,
								adderss:_this.setAddr.id,
								ordertifying:2,
							}, 'POST',_this.userlist.storeOpendid).then(res => {
								_this.utils.success('提交成功!',()=>{
									_this.utils.navback();
								});
							}).catch(err => {
								uni.showToast({
									title: err.msg,
									icon: "none",
									duration: 3000
								})
							});
			}
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		height: 100%;
		padding: 10px 10px;
		background-color: #F8F8F8;
	}
	.index_purchase{
		width: 100%;
		// height: 100%;
		border-radius: 15px;
		padding: 10px;
		background-color: #FFFFFF;
		box-shadow: 1px 2px 6px #C8C7CC;
		// 第一块
		.one_block{
			width: 100%;
			height: 100px;
			image{
				width: 30%;
				height: 100%;
			}
			
			.one_block_b{
				width: 67%;
				height: 100%;
				margin-left: 10px;
					text{
					font-size: 15px;
					color: #333333;
				}
				.tit_one_b{
					color: #999999;
					font-size: 13px;
				}
			}
			
		}
		// 第二块
		.two_block{
			width: 100%;
			// height: 40px;
			height: 100%;
			padding: 10px 0px;
			border-bottom: #DDDCDF 1px solid;
			text{
				max-width: 30%;
			}
			input{
				width: 70%;
				height: 40px;
				background-color: #F9F9F9;
				padding-left: 10px;
				border-radius: 10px;
				
			}
			.choose_item {
				height: 30px;
				justify-content: space-between;
				align-items: center;
			
				>view {
					font-size: 30upx;
				}
			
				&.item_border {
					// border-bottom: 1px solid #FF5733;选中下划线
				}
			
				.item_left {
					color: #a1a1a1;
				}
			
				.item_right {
					color: #FF5733;
					margin-left: 10px;
				}
			
				.right_icon {
					font-size: 18upx;
				}
			}
		}
		// 第三块
		.three_block{
			width: 100%;
			height: 50px;
			border-bottom: #A1A1A1 1px solid;
		}
		// 第四块
		.four_block{
			width: 100%;
			height: 100%;
			// border: #A1A1A1 1px solid;
		}
	}
	.Submission{
		padding: 20px;
		button{
			// height: 40px;
			border-radius: 15px;
			color: #FFFFFF;
			// background-color: #FF5733;
			box-shadow: 1px 2px 6px #F55866;
			background: linear-gradient(0deg,rgba(246,62,100,1),rgba(244,106,103,1));
		}
	}
	//支付弹窗样式
	.pop_button {
		margin-top: 260upx;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 30upx;
		color: #ffffff;
		background-color: #ffa600;
	}
	.server_pop {
		padding: 0 30upx;
	
		.pop_tit {
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10upx;
			height: 120upx;
			font-size: 30upx;
			color: #333333;
		}
		.pop_num{
			align-items: center;
			font-size: 30upx;
			color: #333333;
			.price_right {
				width: 22%;
				align-items: center;
				font-size: 24upx;
			
				.right_reduce {
					color: #FFA600;
					font-size: 43upx;
					margin-right: 2upx;
				}
			
				.right_add {
					color: #FFA600;
					font-size: 48upx;
				}
			}
		}
	
		.pop_cont {
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
	
			.cont_item {
				margin-bottom: 30upx;
				margin-right: 30upx;
				padding: 10upx 20upx;
				text-align: center;
				font-size: 28upx;
				color: #a1a1a1;
				border-radius: 15upx;
				border: 2upx solid #f5f5f5;
	
				text {}
	
				&.active {
					background-color: #ffa600;
					color: #ffffff;
				}
			}
		}
	}

</style>
