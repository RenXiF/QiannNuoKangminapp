<template>
	<!-- 意见反馈页面 -->
	<view class="index flex_columns">
		<view class="index_Feedback flex_columns flex-center">
			<!-- <text class="text_a">提交信息</text> -->
			<textarea value="" v-model="Feedbacklist.question" @input="jiance(Feedbacklist.question)" placeholder="请输入反馈信息(注:请勿输入表情)" maxlength="200" auto-height="true"  focus="true"/>
			<text class="text_c" @click="Feedback()">提交信息</text>
		</view>
		<!-- <view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-else>
			<h3>该用户暂无授权函！</h3>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userlist:'',
				Feedbacklist:{
					question:'',
					storeId:'',
					storeName:'',
					storePhone:''
					
				}
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			if (this.userlist) {
				this.Feedbacklist.storeId = this.userlist.id;
				this.Feedbacklist.storeName = this.userlist.storeUsername;
				this.Feedbacklist.storePhone = this.userlist.storePhone;
			} else{
				this.utils.error('您的账号未登录！请登录账号再试',()=>{
					this.utils.navback();
				});
			}
		},
		methods: {
			jiance(e){
				if(e.length>=200){
					this.utils.error('内容已达到最大限制');
					return;
				}
			},
			Feedback(){
				if(this.Feedbacklist.question=='' || this.Feedbacklist.question.length<10){
					this.utils.error('请填写正确反馈信息!');
					return;
				}
				// 提交申请
				this.utils.showloading();
				console.log(this.Feedbacklist);
				this.http.getApi('/tickling/found',this.Feedbacklist, 'post',this.userlist.storeOpendid).then(res => {
						// uni.setStorageSync('userlist', res.data);
						// this.userlist = res.data;
						console.log(res)
						
						this.utils.success('提交成功!',()=>{
							this.utils.navback();
							uni.hideLoading();
						});
					}).catch(err => {
						console.log(err);
						this.utils.error('请填写正确反馈信息!');
					});
			}
			
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		// height: 100%;
		margin: 0;
		padding: 0;
		.index_Feedback{
			width: 100%;
			margin: 0;
			padding: 10px;
			textarea{
				width: 95%;
				min-height: 100px;
				border-radius: 15px;
				padding: 10px;
				background-color: #F1F3F4;
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
