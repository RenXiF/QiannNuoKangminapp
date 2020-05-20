<template>
	<!-- 意见反馈页面 -->
	<view class="index flex_columns">
		<view  v-if="Feedbacklist.length!=0">
			<view class="index_Feedback flex_columns" v-for="(item,index) in Feedbacklist">
			<!-- <text class="text_a">提交信息</text> -->
			<view class="text_b text_a flex-between flex-center">
				<text>时间：</text>
				<text>{{item.createTime.substring(0,16)}}</text>
			</view>
			<view class="text_a flex-between flex-center">
				<text>内容：</text>
				<textarea value="" v-model="item.question" disabled="true"  auto-height="true"/>
			</view>
			<!-- <view class="text_a flex-between flex-center">
				<text>电话：</text>
				<textarea value="" v-model="item.storePhone" disabled="true"  auto-height="true"/>
			</view> -->
			<view class="text_b flex-between flex-center">
				<text>状态：</text>
				<text v-if="item.status==0">待处理</text>
				<text v-if="item.status==1">已处理</text>
				<!-- <text v-else>待审核</text> -->
			</view>
			
			
			<!-- <text class="text_c" @click="Feedback()">提交信息</text> -->
		</view>
		</view>
		
		<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-else>
			<h3>暂无信息！</h3>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userlist:'',
				Feedbacklist:[]
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			if (this.userlist) {
				// this.Feedbacklist.storeId = this.userlist.id;
				// this.Feedbacklist.storeName = this.userlist.storeUsername;
				// this.Feedbacklist.storePhone = this.userlist.storePhone;
				this.Feedback();
			} else{
				this.utils.error('您的账号未登录！请登录账号再试',()=>{
					this.utils.navback();
				});
			}
		},
		methods: {
			Feedback(){

				// 提交申请
				this.utils.showloading();
				this.http.getApi('/tickling/getAllByid',{MyId:this.userlist.id,pageNum:1,pageSize:20}, 'get',this.userlist.storeOpendid).then(res => {
						// uni.setStorageSync('userlist', res.data);
						this.Feedbacklist = res.data.list;
						console.log(res)
						uni.hideLoading();
						this.utils.success('查询成功!',()=>{
							// this.utils.navback();
						});
					}).catch(err => {
						console.log(err);
						this.utils.error('请填写正确反馈信息!');
					});
			},
			
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		// height: 100%;
		margin: 0;
		padding: 15px;
		.index_Feedback{
			width: 100%;
			padding: 10px;
			margin-bottom: 10px;
			// padding: 10px;
			border-radius: 15px;
			box-shadow: 1px 2px 6px #999999;
			background-color: #F1F3F4;
			textarea{
				max-width: 80%;
				// height: 200px;
				// border: #3F536E 1px solid;
				padding: 10px;
				// background-color: #F1F3F4;
			}
			text{
				color: #333333;
			}
			.text_a{
				border-bottom: #666666 1px solid;
			}
			.text_b{
				padding: 10px 0;
			}
			.text_c {
				margin-top: 30px;
				padding: 10px 20px;
				// color: #FF5733;
				color: #FFFFFF;
				box-shadow: 1px 2px 6px #F55866;
				background: linear-gradient(0deg,rgba(246,62,100,1),rgba(244,106,103,1));
				border-radius: 15px;
				font-size: 25px;
				
			}
		}
	}

</style>
