<template>
	<view class="content">
		<view class="flex_columns" v-if="data!=''">
			<canvas canvas-id="pieCanvas" class="canvas" @touchstart="getstatistics"></canvas>
			<view class=" tit_a flex-center">
				<text>{{data.roleOne}}人</text>
				<text>{{data.roleTwo}}人</text>
				<text>{{data.roleThree}}人</text>
			</view>
		</view>
		<view class="null flex-center" v-else>
			<text>暂无代理信息</text>
		</view>
	</view>
	
</template>

<script>
var uniCharts = require('../../static/js/uniCharts.js');
var pieChart = null;
export default {
	data() {
		return {
			title: 'Hello',
			userlist:'',
			data:''//判断是否有代理
		}
	},
	onLoad: function(e) {
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		console.log(this.userlist);
		
		
		var windowWidth = 420;
		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}

		pieChart = new uniCharts({
			animation: true,
			canvasId: 'pieCanvas',
			type: 'pie',
			series: [
				{
					name: '总代理',
					data: 1
				},
				{
					name: '省代理',
					data: 2
				},
				{
					name: '市代理',
					data: 3
				}
			],
			width: windowWidth,
			height: 300,
			dataLabel: true
		});
		// this.touchHandler(e);
		this.getstatistics(this.userlist.id);
	},
	methods: {
		touchHandler: function(e) {
			console.log(pieChart.getCurrentDataIndex(e));
			console.log(pieChart);
		},
		// 获取统计列表
		getstatistics(e) {
			this.utils.showloading();
			this.http
				.getApi('/user/StoreUserAnalysis', { userId: e }, 'get', this.userlist.storeOpendid)
				.then(res => {
					uni.hideLoading();
					// this.addressList = res.data.list;
					console.log(res);
					
					if (res.data.roleOne==0 &&res.data.roleThree==0 &&res.data.roleTwo==0) {
						console.log('暂无代理');
					} else{
						this.data = res.data;
						pieChart.chartData.pieData.series[0].data = res.data.roleOne;//总代理数量
						pieChart.chartData.pieData.series[1].data = res.data.roleTwo;//省代理数量
						pieChart.chartData.pieData.series[2].data = res.data.roleThree;//市代理数量
						
					}
					
				})
				.catch(err => {
					uni.hideLoading();
					console.log(err);
				});
		}
	}
};
</script>
<style lang="scss">
/*每个页面公共css */

page,
view {
	display: flex; /* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
}

page {
	min-height: 100%;
}

.content {
	flex-direction: column;
	width: 100%;
	.tit_a{
		width: 100%;
		justify-content: center;
		text{
			min-width: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
.content canvas {
	width: 100%;
	height: 300px;
}
</style>
