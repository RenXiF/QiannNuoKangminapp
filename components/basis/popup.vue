<template>
	<view class="popup" v-show="show">
		<view class="mask" @click="closeShow"></view>
		<view class="content" :style="posNum">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			show:{
				type:Boolean,
				default(){
					return true;
				}
			 },
			posNum:{
				type:String,
				default(){
					return '';
				}
			 }
		},
		methods: {
			closeShow(){
				this.$emit('showClose')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mask{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background: rgba(0,0,0,0.3);
		z-index:100;
	}
	.content{
		// width: 100%;
		height: auto;
		position: fixed;
		left: 0;
		z-index: 101;
		background: #FFF;
	}
</style>
