<template>
	<!-- 我的订单页面 -->
	<view>
		<view class="paging flex-center">
				<text :class="[paging == 0 ? 'tab-nav-item tab-active' : 'tab-nav-item']" @click="purchase()">进货订单</text>
				<text :class="[paging == 1 ? 'tab-nav-item tab-active' : 'tab-nav-item']" @click="Shipment()">发货订单</text>
		</view>
		
		<view class="tab-nav">
					<view v-for="(menuTab, index) in menuTabs" :key="index">
						<view v-bind:id="'tabNum' + index" @click="swichMenu(index)" :class="[currentTab == index ? 'tab-nav-item tab-active' : 'tab-nav-item']">
							{{ menuTab.name }}
						</view>
					</view>
				</view>
	<section class="aui-flexView">
		<!-- <header class="aui-navBar aui-navBar-fixed">
			<view href="javascript:;" class="aui-navBar-item" @click="doUrl('../pages/home/home')">
				<i class="icon icon-return"></i>
			</view>
			<view class="aui-center">
				<span class="aui-center-title">我的订单</span>
			</view>
			<view href="javascript:;" class="aui-navBar-item">
				<i class="icon icon-sys"></i>
			</view>
		</header> -->
		<section class="aui-scrollView">
			<view class="aui-tab">
				
				<!-- <view class="viewHeight boder"></view> -->
				<view class="tab-panel">
					<view v-for="(menuList, index) in menuLists" :key="index">
						<!-- <view :class="[currentTab==index ? 'tab-panel-item tab-active' : 'tab-panel-item']"> -->
						<view class="tab-item">
							<view class="aui-well-item aui-well-item-clear">
								<view class="aui-well-item-hd">
									<img src="../../static/icon-logo.png" alt="" />
									</view>
								<view class="aui-well-item-bd"><h3>贵州瀚诺贸易有限公司</h3></view>
								<text class="aui-well-item-fr" v-if="menuList.status == 0">未发货</text>
								<text class="aui-well-item-fr" v-if="menuList.status == 1">已发货</text>
								<text class="aui-well-item-fr" v-if="menuList.status == 2">交易完成</text>
								<text class="aui-well-item-fr" v-if="menuList.status == 3">交易异常关闭</text>
								<view class="aui-well-item-hd">
									<img src="../../static/icon/2.png" alt=""></image>
								</view>
							</view>
							<view class="aui-mail-product">
								<view class="aui-mail-product-item">
									<view class="aui-mail-product-item-hd"><img src="../../static/Positive.jpg" alt="" /></view>
									<view class="aui-mail-product-item-bd">
										<text>创建时间：{{menuList.createTime.substring(0,16)}}</text>
										<text>订单号：{{ menuList.orderNo }}</text>
										<text>手机号：{{ menuList.storePhone }}</text>
										<text>下单数量：{{ menuList.quantity }} 盒</text>
									</view>
								</view>
							</view>
							<view class="aui-mail-payment">
								<text>订单价格:</text>
								<text class="text_Price">￥{{ menuList.payment }}</text>
							</view>
							<view class="aui-mail-button flex_row_reverse" v-if="paging==0">
								<!-- <text :class="[menuList.status == 0 ? 'hd' : menuList.status == 2 ? '' : 'aui-df-color']">未发货</text> -->
								<text :class="[menuList.status == 0 ? '' : 'aui-df-color']" @click="Orderdetails(menuList)">查看订单</text>
								<text :class="[menuList.status == 0 ? '' : 'aui-df-color']" v-if="menuList.status == 0">等待发货</text>
								<text :class="[menuList.status != 0 ? '' : 'aui-df-color']" v-if="menuList.status == 1" @click="Confirm(menuList.orderNo)">确认收货</text>
								<text :class="[menuList.status < 1 ? '' : 'aui-df-color']" v-if="menuList.status > 1">已确认收货</text>
							</view>
							<view class="aui-mail-button flex_row_reverse" v-else>
								<input type="text" v-if="inputoff == true" value="" v-model="input" @input="onKeyInput" placeholder="请输入快递运单号"/>
								<text :class="[menuList.status == 0 ? '' : 'aui-df-color']" @click="Orderdetails(menuList)">查看订单</text>
								<text :class="[menuList.status == 0 ? '' : 'aui-df-color']" v-if="menuList.status == 0 && inputoff == false" @click="delivery()">确认发货</text>
								<text :class="[menuList.status == 0 ? '' : 'aui-df-color']" v-if="menuList.status == 0 && inputoff == true" @click="delivery2(menuList.orderNo)">确认发货</text>
								<text :class="[menuList.status != 0 ? '' : 'aui-df-color']" v-if="menuList.status == 1">等待下级代理收货</text>
								<text :class="[menuList.status < 1 ? '' : 'aui-df-color']" v-if="menuList.status > 1">下级代理已确认发货</text>
							</view>
						</view>
						<view :class="[index+1==menuList.length ? 'hd':'viewHeight']"></view>
					</view>
				</view>
			</view>
			
			
		</section>
	</section>
	<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-if="menuLists==null">
		<text>暂无订单</text>
	</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			input:'',//用户输入运单号
			inputoff:false,
			paging:0,//控制代收发货页面
			pageNum:1,
			scrollLeft: 0,
			isClickChange: false,
			currentTab: 0,
			menuTabs: [
				{
					name: '全部'
				},
				{
					name: '未发货'
				},
				{
					name: '已发货'
				},
				{
					name: '交易完成'
				},
				{
					name: '异常关闭'
				}
			],
			menuLists:null,//加载订单
			userlist: '' //用户缓存
		};
	},
	onLoad() {
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		console.log(this.userlist);
		this.judgeOrder();
	},
	methods: {
		//下拉刷新
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.swichMenu(this.currentTab);
				this.utils.success('刷新成功！',()=>{
					uni.stopPullDownRefresh();
				});
		},
		//触底加载更多
		onReachBottom() {
			if (this.menuLists==null) {
				return;
			} else{
				if (this.paging==0) {
				this.judgeOrder();
				} else{
					this.abnormalOrder(this.currentTab);
				}
			}
			
		},
		// 更新用户信息
		updateUser: function(data) {
			// 判断是否登录
			this.utils.showloading();
			this.http
				.getApi('/user/login', { storeLogin: 1, storeOpendid: data }, 'post', '')
				.then(res => {
					uni.setStorageSync('userlist', res.data);
					this.judgeOrder();
					this.utils.success('刷新成功！',()=>{
						uni.hideLoading();
					});
				})
				.catch(err => {
				});
		},
		// 确认收货
		Confirm(e){
			// let e = e;
			this.utils.showloading();
			this.http.getApi('/order/takeOver', {userId:this.userlist.id, orderNo: e }, 'get', this.userlist.storeOpendid)
			.then(res => {
				// this.menuLists = res.data.list;
				console.log(res);
				this.utils.success('操作成功！',()=>{
					this.updateUser(this.userlist.storeOpendid);
				});
				
			})
			.catch(err => {
				uni.hideLoading();
				console.log(err);
			});
		},
		onKeyInput: function(event) {
		    this.input = event.target.value
			console.log(this.input);
		},
		
		Orderdetails(item){
			console.log(item);
			this.doUrl('pages/index/orderDetails',item);
		},
		delivery(){
			this.inputoff = true;
			// let e = e;
			uni.showModal({
			    title: '请填写快递运单号',
			    content: '请在输入框处填写快递运单号',
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
			
		},
		delivery2(e){
			this.utils.showloading();
			this.http.getApi('/order/delivery', {orderNo:e, wuliuNo: this.input }, 'get', this.userlist.storeOpendid)
			.then(res => {
				// this.menuLists = res.data.list;
				console.log(res);
				this.utils.success('操作成功！',()=>{
					uni.hideLoading();
					this.inputoff = false;
					this.updateUser(this.userlist.storeOpendid);
				})
			})
			.catch(err => {
				uni.hideLoading();
				console.log(err);
				this.utils.success('该订单已操作成功！',()=>{
					uni.hideLoading();
					this.inputoff = false;
					this.updateUser(this.userlist.storeOpendid);
				})
			});
		},
		// 获取全部进订单
		judgeOrder() {
			this.utils.showloading();
			if (this.paging==0) {
				this.http.getApi('/order/getmyorder', { myId: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					// this.menuLists = res.data.list;
					console.log(res);
					if (res.data.list.length==0) {
						// this.menuLists = null;
						if (this.pageNum==1) {
							this.menuLists = null;
						} else{
							this.utils.error('暂无更多')
							console.log('------暂无更多------');
						}
					} else{
						this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
						this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
					}
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
			} else{
				this.http.getApi('/order/getorder', { myId: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						// this.menuLists = res.data.list;
						console.log(res);
						if (res.data.list.length==0) {
							// this.menuLists = null;
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多')
								console.log('------暂无更多------');
							}
						} else{
							this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
							this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
						}
					})
					.catch(err => {
						uni.hideLoading();
						console.log(err);
					});
			}
			
		},
		//获取其他订单
		abnormalOrder(current) {
			let com = current;
			this.utils.showloading();
			if (this.paging==0) {
				this.http.getApi('/order/getmyorderStusas', { myId: this.userlist.id, status: com - 1, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.data.list.length==0) {
						// this.menuLists = null;
						if (this.pageNum==1) {
							this.menuLists = null;
						} else{
							this.utils.error('暂无更多')
							console.log('------暂无更多------');
						}
					} else{
						this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
						this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
					}
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
			} else{
				if (this.paging==1) {
					if(current==1){
						this.http.getApi('/order/statusZero', { myId: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
						.then(res => {
							uni.hideLoading();
							console.log(res);
							if (res.data.list.length==0) {
								if (this.pageNum==1) {
									this.menuLists = null;
								} else{
									this.utils.error('暂无更多')
									console.log('------暂无更多------');
								}
							} else{
								this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
								this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
							}
						})
						.catch(err => {
							uni.hideLoading();
							console.log(err);
						});
					}
					if(current==2){
						this.http.getApi('/order/statusOne', { myId: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
						.then(res => {
							uni.hideLoading();
							console.log(res);
							if (res.data.list.length==0) {
								if (this.pageNum==1) {
									this.menuLists = null;
								} else{
									this.utils.error('暂无更多')
									console.log('------暂无更多------');
								}
								
							} else{
								this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
								this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
							}
						})
						.catch(err => {
							uni.hideLoading();
							console.log(err);
						});
					}
					if(current==3){
						this.http.getApi('/order/statusTwo', { myId: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
						.then(res => {
							uni.hideLoading();
							console.log(res);
							if (res.data.list.length==0) {
								if (this.pageNum==1) {
									this.menuLists = null;
								} else{
									this.utils.error('暂无更多')
									console.log('------暂无更多------');
								}
							} else{
								this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
								this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
							}
						})
						.catch(err => {
							uni.hideLoading();
							console.log(err);
						});
					}
					else{
						this.menuLists=null;
						this.utils.success('暂无订单！',()=>{
							uni.hideLoading();
						})
					}
				} else{
					this.menuLists=null;
					this.utils.success('暂无订单！',()=>{
						uni.hideLoading();
					})
				}
					
				
				
			}
		},

		swichMenu: async function(current) {
			//点击其中一个选项
			if (this.currentTab == current) {
				return false;
			} else {
				if (current == 0) {
					this.currentTab = current;
					this.pageNum = 1;
					this.judgeOrder();
				} else {
					this.currentTab = current;
					this.pageNum = 1;
					this.abnormalOrder(current);
				}
			}
		},
		purchase(){
			this.paging = 0;
			this.pageNum = 1;
			this.judgeOrder();
		},
		Shipment(){
			this.paging = 1;
			this.pageNum = 1;
			this.judgeOrder();
		}
	}
};
</script>

<style lang="scss">
@import '../../css/style.css';
.paging{
	background: #FFFFFF;
	width: 100%;
	height: 40px;
	position: fixed;
	justify-content: center;
	z-index: 99999;
	top: 0;
	text{
		width: 20%;
		text-align: center;
	}
}
.aui-mail-button{
	width: 100%;
	input{
		width: 40%;
		height: 100%;
		margin-left: 30px;
		border-radius: 10px;
		background-color: #F0F2F5;
		font-size: 16px;
		padding-left: 10px;
	}
}
.text_Price{
	margin-left: 10px;
	color: #F23030;
	font-size: 20px;
}
</style>
