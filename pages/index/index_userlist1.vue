<template>
	<view class="content">
		<view class="card_block" v-for="(item, index) in list1" :key="index" :style="{ background: item.bg }" @click="xiajidaili(item)"v-show="list1">
			<!-- <view class="card_block flex_columns" v-for="(item, index) in agentlist"> -->
			<!-- <text>描述名称</text> -->
			<view class="card_block_two flex-between">
				<view class="tit_card_name flex_columns">
					<text class="tit_name_b">{{ item.storeUsername }}</text>
					<text v-if="item.storeRole == 0">直系代理</text>
					<text v-if="item.storeRole == 1">总代理</text>
					<text v-if="item.storeRole == 2">省代理</text>
					<text v-if="item.storeRole == 3">市代理</text>
				</view>
				<view class="tit_card_details flex_columns">
					<view class="details_right">
						<image src="../../static/手机icon.png" mode="aspectFit"></image>
						<text>{{ item.storePhone }}</text>
					</view>
					<view class="details_right">
						<image src="../../static/网络icon.png" mode="aspectFit"></image>
						<text>{{ item.storeIdcard }}</text>
					</view>
				</view>
				<view class="tit_card_xiaji flex-center" v-if="item.isok==true">
					<image src="../../static/icon/right1.png" mode="aspectFit"></image>
				</view>
			</view>
			
		</view>
		<view class="null flex-center" v-show="list1.length<0">
			<text>暂无代理信息</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			list1: '',
			userlist:''
		};
	},
	onLoad(item) {
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		console.log(this.userlist);
		this.judgeUserlist(item);
	},
	methods: {
		xiajidaili(item){
			console.log(item);
			if (item.isok==true) {
				this.doUrl('pages/index/index_userlist',item);
			} else{
				uni.showToast({
					title: '当前用户暂无下级代理',
					icon: "none",
					duration: 3000
				})
			}
		},
		// 获取用户代理信息
		judgeUserlist: function(item) {
			this.http.getApi(
					'/user/getOneall/userid',
					// 'user/getall/userid',
					{
						userId: item.id
					},
					'get',
					this.userlist.storeOpendid).then(res => {
					console.log(res);
					console.log('获取用户信息成功');
					this.list1 = res.data.list;
					console.log(this.list1);
				}).catch(err => {
					console.log('获取用户信息失败' + JSON.stringify(err));
				});
		}
	}
};
</script>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 20px;
}


// 名片信息块
.card_block {
	width: 100%;
	// height: 120px;
	border-radius: 15px;
	color: #ffffff;
	background: linear-gradient(#e786af, #9986e7);
	padding: 10px 30px;
	// margin-left: 5%;
	margin-bottom: 30px;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	.card_block_two {
		width: 100%;
		align-items: center;
	}
	.card_block_two {
		// width: 100%;
		// height: 200px;

		.tit_card_name {
			min-width: 40%;
			// height: 60%;
			.tit_name_b {
				font-size: 30px;
				font-weight: 900;
			}
		}

		.tit_card_details {
			min-width: 50%;
			height: 100%;
			image {
				width: 20px;
				height: 20px;
				padding-right: 10px;
			}

			.details_right {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin: 5px 0px;
			}
		}
		.tit_card_xiaji{
			min-width: 5%;
			height: 100%;
			image{
				width: 20px;
				height: 20px;
			}
		}
	}
}
</style>
