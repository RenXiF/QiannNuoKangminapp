<template>
	<view class="add_address_page">
		<view class="add_head"></view>
		<view class="add_first">
			<view class="first_item flex_rows border_bottom">
				<view class="item_head">联系人</view>
				<view class="item_cont"><input type="text" v-model="Receiving.receiverName" placeholder="请填写联系人姓名" /></view>
			</view>
			<view class="first_item flex_rows border_bottom">
				<view class="item_head"></view>
				<view class="item_cont flex_rows">
					<view class="radio_item flex_rows" @click="radioClick(1)">
						<view :class="[formData.gender == 1 ? 'active' : '', 'radio_icon']">√</view>
						<text>先生</text>
					</view>
					<view class="radio_item flex_rows" @click="radioClick(2)">
						<view :class="[formData.gender == 2 ? 'active' : '', 'radio_icon']">√</view>
						<text>女士</text>
					</view>
				</view>
			</view>
			<view class="first_item flex_rows border_bottom">
				<view class="item_head">手机号</view>
				<view class="item_cont"><input type="number" v-model="Receiving.receiverMobile" placeholder="请填写收货人手机号码" /></view>
			</view>
			<!-- <view class="server_address_item flex_rows border_bottom" @click="chooseArea"> 吊起定位-->
			<view class="server_address_item flex_rows border_bottom" @tap="openAddres">
				<view class="first_item flex_rows border_bottom">
					<view class="item_head">地址所属</view>
					<view class="item_choose" v-if="!pickerText">请选择</view>
					<view class="item_cont" style="width: 400upx;" v-else>{{ pickerText.label }}</view>
				</view>
				<view class="server_address_right Icon">&#xe638;</view>
			</view>
			<view class="first_item flex_rows">
				<view class="item_head">详细地址</view>
				<view class="item_cont"><input type="text" v-model="Receiving.receiverAddress" placeholder="如6号楼1单元1706室" /></view>
			</view>
			<view class="first_item flex_rows">
				<view class="item_head">邮政编码</view>
				<view class="item_cont"><input type="number" v-model="Receiving.receiverZip" placeholder="请填写邮政编码" /></view>
			</view>
		</view>
		<!-- <view class="add_sencond flex_rows">
			<view class="sencond_left">设为默认地址</view>
			<view class="sencond_right"><switch :value="formData.isDefault" class="right_switch" color="#FFA600" /></view>
		</view> -->
		<view class="add_editor" @click="removeAddress()" v-if="modify==1">删除地址</view>
		<view class="add_button" @click="postAddress()" v-if="modify==0">新增地址</view>
		<view class="add_button" @click="postmodify()" v-if="modify==1">修改地址</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';//导入地址弹窗
export default {
	components: {
		simpleAddress
	},
	data() {
		return {
			cityPickerValueDefault: [0, 0, 1],
			pickerText: {
				label:''
			},
			modify:0,
			userlist:'',//用户信息
			Receiving:{
				userId:'',
				receiverName:'',//收货人
				receiverMobile:'',//收货人手机
				receiverAddress:'',//详细地址
				receiverProvince:'',//省级
				receiverCity:'',//市级
				receiverDistrict:'',//区县
				receiverZip:'',//邮政编码
				
			},
			
			
			addrInfo:{},
			serverAddress:'', 
			formData: {
				address: '',
				addressId: 0,
				areaId: 0,
				cityId: 0,
				distinctId: 0,
				gender: 0,
				isDefault: 0,
				lat: '',
				lng: '',
				notes: '',
				phone: '',
				provinceId: 0,
				userName: ''
			}
		};
	},
	onLoad(options) {
		console.log(options);
		this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
		console.log(this.userlist);
		this.Receiving.userId = this.userlist.id;
		if(options.edit=="true"){
			this.modify = 1;
			this.edit();
		}
	},
	onShow() {
		
	},
	methods: {
		// 三级地址选择
		openAddres() {
			this.cityPickerValueDefault = [0,0,1]
			this.$refs.simpleAddress.open();
		},
		onConfirm(e) {
			// this.pickerText = JSON.stringify(e);
			this.pickerText = e;
			console.log(e);
			this.Receiving.receiverProvince = e.labelArr[0];
			this.Receiving.receiverCity = e.labelArr[1];
			this.Receiving.receiverDistrict = e.labelArr[2];
		},
		//修改地址参数 
		edit(){
			let addr = uni.getStorageSync('edit_addr');
			console.log('已执行');
			console.log(addr);
			this.Receiving = addr;
			this.pickerText.label = addr.receiverProvince+addr.receiverCity+addr.receiverDistrict;
			// 	addr.provinceId = addr.pcdaIds[0];
			// 	addr.cityId = addr.pcdaIds[1];
			// 	addr.distinctId = addr.pcdaIds[2];
			// delete addr.pcdaIds; 
			// delete addr.pcdaNames;
			// this.http.getArea(addr.lat,addr.lng).then((res)=>{
			// 	this.serverAddress = res.province+''+res.city+''+res.area
			// 	this.formData.address = addr.address.replace(this.serverAddress,''); 
			// }).catch();
			
			// this.formData = addr;
			// console.log(addr)
		},
		// 选择地址
		chooseArea(){
			let that = this;
			uni.chooseLocation({
				keyword:'',
				success(res) {
					let lat = res.latitude;
					let lng = res.longitude;
					that.formData.lat = lat;
					that.formData.lng = lng;
					that.serverAddress = res.address
					that.http.getArea(lat,lng).then((res)=>{
						that.getAddrInfo(res)
					}).catch();
				}
			})
		},
		// 获取地址ID
		getAddrInfo(res){
			console.log(res)
			this.addrInfo = res;
			this.serverAddress = res.province+''+res.city+''+res.area
			this.formData.provinceId = res.provinceId;
			this.formData.cityId = res.cityId;
			this.formData.distinctId = res.areaId;
			this.formData.address = res.address.replace(this.serverAddress,'');
		},
		radioClick(index) {
			this.formData.gender = index;
			this.radioIndex = index;
		},
		postAddress() {
			// this.Verification();
			if(this.Receiving.receiverName==''){
				this.utils.error('请填写联系人！');return;
			}
			if(this.Receiving.receiverMobile=='' || this.utils.checkMobile(this.Receiving.receiverMobile)==false){
				this.utils.error('请填写正确手机号！');return;
			}
			if(this.Receiving.receiverProvince==''){
				this.utils.error('请选择地址所属！');return;
			}
			if(this.Receiving.receiverAddress==''){
				this.utils.error('请填写详细地址！');return;
			}
			if(this.Receiving.receiverZip==''|| this.Receiving.receiverZip.length!=6){
				this.utils.error('请填写正确6位邮政编码！');return;
			}
			let Receiving = this.Receiving;
				// jsonData.address = this.serverAddress+''+this.formData.address;
			console.log(Receiving) 
			// let that = this; 
			this.utils.showloading();
			this.http.getApi('/shippings/add',Receiving,'post',this.userlist.storeOpendid).then(res=>{
				console.log(res);
				uni.hideLoading();
				this.utils.success('添加成功！',()=>{
					this.utils.navback();
				})
			}).catch(err=>{
				console.log(err);
			})
		},
		// 修改地址
		postmodify(){
			if(this.Receiving.receiverName==''){
				this.utils.error('请填写联系人！');return;
			}
			if(this.Receiving.receiverMobile=='' || this.utils.checkMobile(this.Receiving.receiverMobile)==false){
				this.utils.error('请填写正确手机号！');return;
			}
			if(this.Receiving.receiverProvince==''){
				this.utils.error('请选择地址所属！');return;
			}
			if(this.Receiving.receiverAddress==''){
				this.utils.error('请填写详细地址！');return;
			}
			if(this.Receiving.receiverZip==''|| this.Receiving.receiverZip.length!=6){
				this.utils.error('请填写正确6位邮政编码！');return;
			}
			let Receiving = this.Receiving;
			// this.Verification();
				// jsonData.address = this.serverAddress+''+this.formData.address;
			console.log(Receiving) 
			// let that = this; 
			this.utils.showloading();
			this.http.getApi('/shippings/update',Receiving,'post',this.userlist.storeOpendid).then(res=>{
				console.log(res);
				uni.hideLoading();
				this.utils.success('修改成功！',()=>{
					this.utils.navback();
				})
			}).catch(err=>{
				console.log(err);
			})
		},
		// 删除地址
		removeAddress() {
			if(this.Receiving.receiverName==''){
				this.utils.error('请填写联系人！');return;
			}
			if(this.Receiving.receiverMobile=='' || this.utils.checkMobile(this.Receiving.receiverMobile)==false){
				this.utils.error('请填写正确手机号！');return;
			}
			if(this.Receiving.receiverProvince==''){
				this.utils.error('请选择地址所属！');return;
			}
			if(this.Receiving.receiverAddress==''){
				this.utils.error('请填写详细地址！');return;
			}
			if(this.Receiving.receiverZip==''|| this.Receiving.receiverZip.length!=6){
				this.utils.error('请填写正确6位邮政编码！');return;
			}
			// this.Verification();
			let Receiving = this.Receiving;
				// jsonData.address = this.serverAddress+''+this.formData.address;
			console.log(Receiving) 
			// let that = this; 
			this.utils.showloading();
			this.http.getApi('/shippings/delete',{shippingId:this.Receiving.id,uid:this.userlist.id},'DELETE',this.userlist.storeOpendid).then(res=>{
				console.log(res);
				uni.hideLoading();
				uni.removeStorageSync('setAddr');
				this.utils.success('删除成功！',()=>{
					this.utils.navback();
				})
			}).catch(err=>{
				console.log(err);
			})
			
		}
	},
	// watch: {
	// 	getPhone(val) {
	// 		this.getPhone == val;
	// 	},
	// 	getmsg(val) {
	// 		this.getmsg == val;
	// 	}
	// }
};
</script>

<style lang="scss">
.add_address_page {
	background-color: #f5f5f5;
	height: 100%;
	.border_bottom {
		border-bottom: 1upx solid #f5f5f5;
	}
	.add_head {
		height: 20upx;
	}
	.add_first {
		background-color: #ffffff;
		padding: 0 30upx;
		.first_item {
			height: 100upx;
			justify-content: flex-start;
			align-items: center;
			font-size: 26upx;
			.item_head {
				width: 150upx;
				color: #a1a1a1;
			}
			.item_cont {
				width: calc(100% - 260upx);
				color: #333333;
				justify-content: flex-start;
				input{
					width: 100%;
				}
				.radio_item {
					justify-content: flex-start;
					align-items: center;
					margin-right: 90upx;
					.radio_icon {
						width: 27upx;
						height: 27upx;
						border-radius: 50%;
						font-size: 20upx;
						color: #ffffff;
						margin-right: 10upx;
						background-color: #f5f5f5;
						line-height: 27upx;
						text-align: center;
						&.active {
							background-color: #ffa600;
						}
					}
				}
			}
			.item_choose {
				color: #a1a1a1;
			}
		}
		.server_address_right {
			font-size: 25upx;
			color: #909090;
		}
		.server_address_item {
			height: 100upx;
			justify-content: space-between;
			align-items: center;
			font-size: 26upx;
		}
	}
	.add_sencond {
		margin-top: 20upx;
		padding: 0 30upx;
		height: 100upx;
		justify-content: space-between;
		align-items: center;
		font-size: 26upx;
		color: #333333;
		background-color: #ffffff;
		.sencond_left {
		}
		.sencond_right {
		}
	}
	.add_editor {
		height: 100upx;
		line-height: 100upx;
		color: #f7776a;
		padding: 0 30upx;
		background-color: #ffffff;
		margin-top: 20upx;
		text-align: center;
	}
	.add_button {
		width: 690upx;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		margin: 80upx auto 0;
		border-radius: 15upx;
		background-color: #ffa600;
		color: #ffffff;
		font-size: 30upx;
	}
}
</style>
