<template>
	<!-- 我的云仓页面 -->
	<view>
		<view class="paging flex-center">
			<text v-for="(item, index) in menuTabs0" :key="index" @click="purchase(index)" :class="[paging == index ? 'tab-nav-item tab-active' : 'tab-nav-item']">
				{{ item.name }}
			</text>
		</view>
		<view class="tab-nav">
			<view v-for="(menuTab, index) in menuTabs" :key="index">
				<view v-bind:id="'tabNum' + index" @click="swichMenu(index)" :class="[currentTab == menuTab.state ? 'tab-nav-item tab-active' : 'tab-nav-item']">
					{{ menuTab.name }}
				</view>
			</view>
		</view>
	<section class="aui-flexView">
		<section class="aui-scrollView">
			<view class="aui-tab">
				
				<!-- <view class="viewHeight"></view> -->
				<view class="tab-panel">
					<view v-for="(menuList, index) in menuLists" :key="index">
						<!-- <view :class="[currentTab==index ? 'tab-panel-item tab-active' : 'tab-panel-item']"> -->
						<view class="tab-item">
							<view class="aui-well-item aui-well-item-clear">
								<view class="aui-well-item-hd"><img src="../../static/icon-logo.png" alt="" /></view>
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
							<view class="aui-mail-button flex_row_reverse" v-if="paging!=0 && paging!=1">
								<text class="aui-df-color" @click="Orderdetails(menuList)">查看订单</text>
							</view>
							<view class="aui-mail-button flex_row_reverse" v-if="paging==0">
								<!-- <text :class="[menuList.status == 0 ? 'hd' : menuList.status == 2 ? '' : 'aui-df-color']">未发货</text> -->
								<text :class="[menuList.status == 0 ? '' : 'aui-df-color']" @click="Orderdetails(menuList)" v-if="menuList.status == 0">查看订单</text>
								
								<text :class="[menuList.status != 0 ? '' : 'aui-df-color']" v-if="menuList.status == 1" @click="Confirm(menuList.orderNo)">确认收货</text>
								<text :class="[menuList.status < 1 ? '' : 'aui-df-color']" v-if="menuList.status > 1">已确认收货</text>
							</view>
							<view class="aui-mail-button flex_row_reverse" v-if="paging==1">
								<input type="text" v-if="inputoff == true" value="" v-model="input" @input="onKeyInput" placeholder="请输入快递运单号"/>
								<text :class="[menuList.status != 0 ? '' : 'aui-df-color']" v-if="menuList.status == 1" @click="Confirm(menuList.orderNo)">确认收货</text>
								<text :class="[menuList.status == 0 ? '' : 'aui-df-color']" v-if="menuList.status == 0" >等待发货</text>
								<text :class="[menuList.status < 1 ? '' : 'aui-df-color']" v-if="menuList.status > 1">订单已确认收货</text>
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
			inputoff:false,//控制input输入显示
			paging:0,//控制顶部页面选项
			pageNum:1,
			scrollLeft: 0,
			isClickChange: false,
			currentTab0: 0,
			currentTab: 0,
			menuTabs0: [{name: '我的进货单',state:0},
				{name: '我的提货单',state:1},
				{name: '我的下级进货单',state:2},
				{name: '我的下级提货单',state:3}
			],
			menuTabs: [{name: '全部',state:0},
				{name: '未发货',state:1},
				{name: '已发货',state:2},
				{name: '交易完成',state:3},
				{name: '异常关闭',state:4}
			],
			menuLists: [],//加载订单
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
		// 查看订单
		Orderdetails(item){
			console.log(item);
			this.doUrl('pages/index/orderDetails',item);
		},
		// 确认收货
		Confirm(e){
			// let e = e;
			this.utils.showloading();
			this.http.getApi('/yunorder/takeOver', { orderNo: e }, 'get', this.userlist.storeOpendid)
			.then(res => {
				// this.menuLists = res.data.list;
				console.log(res);
				this.pageNum = 1;
				this.utils.success('操作成功！',()=>{
					uni.hideLoading();
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
			console.log('fsnfklsfs'+this.input);
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
		
		swichMenu: async function(current) {
			//点击其中一个选项
			if (this.currentTab == current) {
				return false;
			} else {
				// console.log(current);
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
		purchase(e){
			//点击其中一个选项
			if (this.paging == e) {
				return false;
			} else {
				if (e == 0) {
					this.paging = e;
					this.pageNum = 1;
					this.judgeOrder();
				} else {
					this.paging = e;
					this.pageNum = 1;
					this.abnormalOrder(e);
				}
			}
		},
		// 获取全部进订单
		judgeOrder() {
			this.utils.showloading();
			if (this.paging==0) {
				this.http.getApi('/yunorder/selectMyAll', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.data.list.length==0) {
						if (this.pageNum==1) {
							this.menuLists = null;
						} else{
							this.utils.error('暂无更多');
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
			if (this.paging==1) {
				this.http.getApi('/yunorder/selectMyAlltifyingTwo', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.data.list.length==0) {
						if (this.pageNum==1) {
							this.menuLists = null;
						} else{
							this.utils.error('暂无更多');
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
			if (this.paging==2) {
				this.http.getApi('/yunorder/getorder', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.data.list.length==0) {
						if (this.pageNum==1) {
							this.menuLists = null;
						} else{
							this.utils.error('暂无更多');
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
			if (this.paging==3){
				this.http.getApi('/yunorder/getorderTwo', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					console.log(res);
					if (res.data.list.length==0) {
						if (this.pageNum==1) {
							this.menuLists = null;
						} else{
							this.utils.error('暂无更多');
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
				if(current==1){
					this.http.getApi('/yunorder/statusZero', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.data.list.length==0) {
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多');;
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
					this.http.getApi('/yunorder/statusOne', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.data.list.length==0) {
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多');
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
					this.http.getApi('/yunorder/statusOk', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.data.list.length==0) {
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多');
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
					this.utils.success('查询成功！',()=>{
						uni.hideLoading();
					})
				}
			} 
			if (this.paging==1) {
				if(current==1){
					this.http.getApi('/yunorder/statusZerotifyingTwo', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.data.list.length==0) {
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多');
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
					this.http.getApi('/yunorder/statusOnetifyingTwo', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.data.list.length==0) {
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多');
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
					this.http.getApi('/yunorder/statusOktifyingTwo', { uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.data.list.length==0) {
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多');
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
					this.utils.success('查询成功！',()=>{
						uni.hideLoading();
					})
				}
			}
			if (this.paging==2) {
				console.log('zheli');
				console.log(current);
				if(current!=0){
					this.http.getApi('/yunorder/fifyOne', { status:com-1, uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
					.then(res => {
						uni.hideLoading();
						console.log(res);
						if (res.data.list.length==0) {
							if (this.pageNum==1) {
								this.menuLists = null;
							} else{
								this.utils.error('暂无更多');
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
					// this.paging = current;
					// this.judgeOrder();
					this.menuLists=null;
					this.utils.success('查询成功！',()=>{
						uni.hideLoading();
					})
				}
			}
			else{
				if (this.paging==3) {
					if(current!=0){
						this.http.getApi('/yunorder/fifyTow', { status:com-1, uid: this.userlist.id, pageNum: this.pageNum, pageSize: 10 }, 'get', this.userlist.storeOpendid)
						.then(res => {
							uni.hideLoading();
							console.log(res);
							if (res.data.list.length==0) {
								if (this.pageNum==1) {
									this.menuLists = null;
								} else{
									this.utils.error('暂无更多');
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
						// this.paging = current;
						// this.judgeOrder();
						this.menuLists=null;
						this.utils.success('查询成功！',()=>{
							uni.hideLoading();
						})
					}
				}
				 else{
					this.menuLists=null;
					this.utils.success('暂无订单！',()=>{
						uni.hideLoading();
					})
				}
					
				
				
			}
		},
		
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
		// width: 20%;
		font-size: 10px;
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
