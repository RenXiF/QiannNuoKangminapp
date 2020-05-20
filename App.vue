<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/* #ifdef H5 */
uni-page-head {
	display: none;
}
/* #endif */
.status_height {
	width: 100%;
	height: var(--status-bar-height);
}
page {
	width: 750upx;
	height: 100%;
}
view{
	box-sizing: border-box;
}
.status_bar {
	width: 100%;
	height: var(--status-bar-height);
}
// 字体
.fontA1 {
	color: #a1a1a1;
}
.priceFont {
	color: #fe2736;
	font-weight: bold;
}
.priceFontDiscount {
	color: #a1a1a1;
	text-decoration: line-through;
}
.noWrapF {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.centerlay{
	justify-content: center;
	align-items: center;
}
.mgrt20{
	margin-right: 20upx;
}
//浮动
.rt {
	float: right;
}
.lt {
	float: left;
}
.clearf {
	&:after {
		content: '';
		display: block;
		clear: both;
	}
}
// 促销背景
.redBg {
	color: #ffffff;
	background: -webkit-linear-gradient(to right, #fc684d, #fe2736);
	background: -o-linear-gradient(to right, #fc684d, #fe2736);
	background: -moz-linear-gradient(to right, #fc684d, #fe2736);
	background: linear-gradient(to right, #fc684d, #fe2736);
}
.status_view {
	width: 750upx;
	height: 100%;
}
.static_view {
	padding: 30upx;
	height: 100%;
}
view {
	font-size: 28upx;
}

.status_start {
	padding: 20upx;
}
.boder {
	border: 1upx crimson solid;
}
.img {
	width: 100%;
}
/* 栅格布局 */
.flex {
	display: flex !important;
	// width: 750upx;
}
.flex_rows {
	display: flex;
	flex-direction: row !important;
}
.flex_row_reverse {
	display: flex;
	flex-direction: row-reverse !important;
}
.flex_columns {
	display: flex;
	flex-direction: column !important;
}
.flex_wrap {
	display: flex;
	flex-wrap: wrap;
}
.flex_nowrap {
	display: flex;
	flex-wrap: nowrap !important;
}
.flex-between {
	display: flex;
	justify-content: space-between !important;
}
.flex-around {
	display: flex;
	justify-content: space-around !important;
}
.flex-center {
	display: flex;
	align-items: center;
	// justify-content: space-between !important;
}
/* 文本溢出隐藏 */
.ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.imgWidth {
	width: 100%;
	overflow: hidden;
}
.null{
		width: 100%;
		// height: 200px;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
/* @font-face {
	font-family: 'iconfont';
	src: url('~@/static/iconfont.ttf');
} */
@font-face {
  font-family: 'iconfont';  /* project id 1382929 */
  src: url('https://at.alicdn.com/t/font_1382929_4mo4iyap3r6.eot');
  src: url('https://at.alicdn.com/t/font_1382929_4mo4iyap3r6.eot?#iefix') format('embedded-opentype'),
  url('https://at.alicdn.com/t/font_1382929_4mo4iyap3r6.woff2') format('woff2'),
  url('https://at.alicdn.com/t/font_1382929_4mo4iyap3r6.woff') format('woff'),
  url('https://at.alicdn.com/t/font_1382929_4mo4iyap3r6.ttf') format('truetype'),
  url('https://at.alicdn.com/t/font_1382929_4mo4iyap3r6.svg#iconfont') format('svg');
}
.Icon {
	font-family: iconfont;
	font-size: 32upx;
}
.Stance {
	margin: 30upx 0;
	height: 80upx;
}
</style>
