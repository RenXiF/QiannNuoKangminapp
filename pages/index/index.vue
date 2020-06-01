<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<view class="header">
				<image src="/static/icon_main.png" class="btn"></image>
				<view class="input">
					<image src="/static/search.png" class="search"></image>
					<input type="text" value="" placeholder="搜索" />
				</view>
				<image src="/static/msg.png" class="btn"></image>
			</view>
			<view class="header_content">
				<view class="left">
					<text class="title">黔诺康管理系统</text>
					<text class="sub_title" v-if="userlist!=''">用户：{{userlist.storeUsername}}</text>
					<text class="sub_title" v-if="userlist==''">用户信息</text>
					<!-- <text class="btn">免费试学</text> -->
				</view>
				<view><image src="/static/right.png" style="width: 131px;height: 122px;"></image></view>
			</view>
		</view>
		
		<!-- 功能块 -->
		<view class="page_content">
			<view class="menu">
				<view class="flex-center" v-for="(item, index) in menus" :key='index'>
					<view class="item" @click="doUrl(item.http)">
						<view class="img_view" :style="{ background: item.bg }"><image :src="item.icon" class="image"></image></view>
						<text class="txt">{{ item.txt }}</text>
					</view>
				</view>
			</view>

			<view><customSwiper :swiper-list="swiperList" /></view>
			<view class="ad">
				<view class="ad_btn">
					<text class="title">代理信息</text>
					<text class="sub_title">当前所有的代理人员信息</text>
				</view>
				<image src="/static/tag.png" class="bg"></image>
			</view>
		</view>
		<!-- 代理信息 -->

		<!-- <view class="content">
			<pg-tree :list="list" :selected="selected" :unfoldPath="unfoldPath" :keepLevel="true" :isAllfold="2" :enableChoose="true" :finalChoose="false" :enableEdit="true" @itemClick="itemClick" @itemEdit="itemEdit" @switchFold="switchFold"></pg-tree>
		</view> -->
		  
		<view class="card_block_one">
			<view class="card_block" v-for="(item, index) in datalist.list" :key="index" :style="{ background: item.bg }" @click="xiajidaili(item)">
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
			
		</view>
	</view>
</template>

<script>
import customSwiper from '@/components/blackmonth-swiper/index'; //导入轮播组件
import NewTry  from '../../components/userList.vue';
import pgTree from '@/components/pg-tree/pg-tree';
export default {
	  onShareAppMessage(res) {
	    if (res.from === 'button') {// 来自页面内分享按钮
	    }
	    return {
	      title: '来自黔诺康管理的分享',
	      path: '/pages/user/user?id=123'
	    }
	  },
	components: {
		customSwiper,
		NewTry,
		pgTree
	},
	data() {
		return {
			// 轮播图
			onOff: true, //默认开启 展示
			onNO: false, //默认关闭 收起
			fold: false,
			swiperList: [
				{
					type: 'image',
					url: '../../static/Positive.jpg'
				},
				{
					type: 'image',
					url: '../../static/Back.jpg'
				},
				{
					type: 'image',
					url: '../../static/Positive.jpg'
				},
				{
					type: 'image',
					url: '../../static/Back.jpg'
				}
			],
			// 功能模块
			menus: [
				{
					bg: 'linear-gradient(0deg,rgba(9,216,162,1),rgba(90,242,217,1))',
					icon: '/static/graduation.png',
					txt: '我的订单',
					http: 'pages/index/order',
					isFree: true
				},
				{
					bg: 'linear-gradient(0deg,rgba(251,184,35,1),rgba(255,228,40,1))',
					icon: '/static/live.png',
					txt: '业绩统计',
					http: 'pages/index/Statistics',
					isFree: false
				},
				{
					bg: 'linear-gradient(0deg,rgba(255,126,34,1),rgba(240,184,27,1))',
					icon: '/static/emblem.png',
					txt: '业务大厅',
					http: 'pages/index/hall',
					isFree: true
				},
				{
					bg: 'linear-gradient(0deg,rgba(9,177,252,1),rgba(24,200,255,1))',
					icon: '/static/question_bank.png',
					txt: '更多内容',
					http: 'pages/user/ceshi',
					isFree: true
				}
			],
			agentlist: [
				{
					bg: 'linear-gradient(0deg,rgba(9,216,162,0.7),rgba(90,242,217,0.8))',
					icon: '/static/graduation.png',
					txt: '张三',
					txt2: '市代理',
					http: 'pages/home/order',
					isFree: true,
					list: [
						{
							img: '../../static/手机icon.png',
							name: '17312341234'
						},
						{
							img: '../../static/位置icon.png',
							name: '贵州省遵义市'
						},
						{
							img: '../../static/网络icon.png',
							name: '*********'
						},
						{
							img: '../../static/nameicon.png',
							name: '**********'
						}
					]
				},
				{
					bg: 'linear-gradient(0deg,rgba(251,184,35,1),rgba(255,228,40,1))',
					icon: '/static/live.png',
					txt: '李四',
					txt2: '市代理',
					isFree: false,
					list: [
						{
							img: '../../static/手机icon.png',
							name: '17312341234'
						},
						{
							img: '../../static/位置icon.png',
							name: '贵州省遵义市'
						},
						{
							img: '../../static/网络icon.png',
							name: '*********'
						},
						{
							img: '../../static/nameicon.png',
							name: '**********'
						}
					]
				},
				{
					bg: 'linear-gradient(0deg,rgba(255,126,34,1),rgba(240,184,27,1))',
					icon: '/static/emblem.png',
					txt: '王五',
					txt2: '省代理',
					isFree: true,
					list: [
						{
							img: '../../static/手机icon.png',
							name: '17312341234'
						},
						{
							img: '../../static/位置icon.png',
							name: '贵州省遵义市'
						},
						{
							img: '../../static/网络icon.png',
							name: '*********'
						},
						{
							img: '../../static/nameicon.png',
							name: '**********'
						}
					]
				}
			],
			code: '',
			userlist: '', //加载用户缓存
			datalist: '', //加载代理信息
			
			datalist2off:false,//加载代理下级信息开关
			datalist2: '', //加载代理下级信息
			item: '',
			index:'',
			userid:''
		};
	},
	onLoad() {
		
	},
	onShow() {
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		if (this.userlist!='') {
			this.judgeUserlist();
		} else{
			this.datalist = '';
			uni.showToast({
				title: "该用户未登录！",
				icon: "none",
				duration: 3000
			})
		}
	},
	methods: {
		
		// 获取下标
		selectTypeChange(){
			let index = this.$refs.addRequestState.value;
			if(index == this.selectTypeLists[0].value){
				this.wxDepositShow=true;
			}else{
				this.wxDepositShow=false;
			}
			
		},
		
		xiajidaili(item){
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
		judgeUserlist: function() {
			console.log(this.userlist);
			this.http.getApi('/user/getOneall/userid',{userId: this.userlist.id},'get',this.userlist.storeOpendid).then(res => {
					this.datalist = res.data;
				}).catch(err => {
				});
		}
	}
};
</script>

<style>
page {
	width: 100%;
	background-color: #ebebeb;
}
</style>
<style lang="scss" scoped>
@function realSize($args) {
	@return $args / 1.5;
}
ul {
	margin-top: 50px;
	padding-left: 20px !important;
}
.page_edu {
	width: 100%;
}
.page_edu_header {
	padding-top: var(--status-bar-height);
	background-color: #0bc99d;
	width: 100%;
	height: realSize(330px);
	.header {
		// display: flex;
		display: none;
		flex-direction: row;
		align-items: center;
		padding: realSize(20px);
		.btn {
			width: realSize(36px);
			height: realSize(30px);
		}
		.input {
			height: realSize(59px);
			width: 100%;
			margin-left: realSize(20px);
			margin-right: realSize(20px);
			background: rgba(255, 255, 255, 1);
			border-radius: realSize(30px);
			display: flex;
			flex-direction: row;
			align-items: center;
			.search {
				width: realSize(30px);
				height: realSize(30px);
				margin-left: realSize(20px);
				margin-right: realSize(20px);
			}
		}
	}
	.header_content {
		display: flex;
		flex-direction: row;
		.left {
			display: flex;
			flex-direction: column;
			width: 57%;
			margin-top: 10px;
			margin-left: 15px;
			margin-right: 15px;
			.title {
				width: realSize(419px);
				height: realSize(59px);
				font-size: realSize(47px);
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}
			.sub_title {
				margin-top: 3px;
				// padding: 2px 5px;
				font-size: realSize(18px);
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				background: linear-gradient(0deg, rgba(120, 255, 224, 1) 0%, rgba(255, 255, 255, 1) 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.btn {
				margin-top: 3px;
				width: realSize(198px);
				height: realSize(60px);
				background: linear-gradient(-30deg, rgba(252, 135, 29, 1), rgba(246, 185, 9, 1));
				box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
				border-radius: realSize(30px);
				color: rgba(255, 255, 255, 1);
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
.page_content {
	width: 100%;
	margin-top: -74px;
	.menu {
		margin-left: 10px;
		margin-right: 10px;
		padding-left: 10px;
		padding-right: 10px;
		height: realSize(176px);
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.img_view {
				width: 60px;
				height: 60px;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				.image {
					width: 50px;
					height: 50px;
				}
			}
			.txt {
				margin-top: 5px;
				font-size: 14px;
				color: rgba(51, 51, 51, 1);
			}
		}
	}
	.s_menu {
		// display: none;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		margin-top: 15px;
		margin-left: 10px;
		margin-right: 10px;
		padding-left: 10px;
		padding-right: 10px;
		.item {
			// display: none;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.image {
				width: 35px;
				height: 35px;
			}
			.txt {
				margin-top: 5px;
				font-size: 14px;
				color: rgba(51, 51, 51, 1);
			}
		}
	}
	.ad {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		.bg {
			position: absolute;
			width: 120px;
			height: 105px;
			left: 0;
		}
		.ad_btn {
			width: 100%;
			height: 63px;
			margin: 30px;
			background: linear-gradient(0deg, rgba(253, 155, 28, 1), rgba(251, 197, 33, 1));
			border-radius: 67px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.title {
				font-size: realSize(38px);
				font-family: PingFang-SC-Heavy;
				font-weight: 800;
				color: rgba(255, 255, 255, 1);
			}
			.sub_title {
				background: linear-gradient(0deg, rgba(255, 128, 37, 1), rgba(255, 153, 32, 1));
				box-shadow: 0px 4px 5px 0px rgba(92, 53, 48, 0.3), 0px 1px 0px 0px rgba(228, 228, 228, 1);
				border-radius: realSize(24px);
				font-size: realSize(24px);
				font-family: PingFang-SC-Heavy;
				font-weight: 800;
				font-style: italic;
				color: rgba(255, 236, 177, 1);
				line-height: realSize(26px);
			}
		}
	}
}
.card_block_one{
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