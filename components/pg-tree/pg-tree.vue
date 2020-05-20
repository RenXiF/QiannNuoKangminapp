<template>
	<view>
		<view class="pg-tree-list">
			<uni-swipe-action style="background-color: #fff;" v-if="enableEdit">
				<uni-swipe-action-item :options="options" v-for="(item, index) in listData" @click="editCate(item, $event)" class="swipe-item" :class="{ show: item.show }">
					<view class="tree-item" :class="{ show: item.show }" :style="{ marginLeft: item.level * 30 + 'rpx' }" @click.stop="chooseTreeItem(item, index)">
						<view class="">
							<image :src="item.showChild ? downIcon : rightIcon" v-if="!item.isLast" class="pg-tree-icon" mode="" @click.stop="switchChild(item, index)"></image>
							<text class="pg-tree-text" :style="{ borderLeft: item.level == 0 ? '' : '1px solid #e4e4e4' }">{{ item.name }}</text>
						</view>
						<image v-if="item.isSelected" :src="selectedIcon" mode="" class="choose"></image>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<block v-for="(item, index) in listData" :key="index" v-else>
				<view class="tree-item" :class="{ show: item.show }" :style="{ marginLeft: item.level * 30 + 'rpx' }" @click.stop="chooseTreeItem(item, index)">
					<view class="">
						<image :src="item.showChild ? downIcon : rightIcon" v-if="!item.isLast" class="pg-tree-icon" mode="" @click.stop="switchChild(item, index)"></image>
						<text class="pg-tree-text" :style="{ borderLeft: item.level == 0 ? '' : '1px solid #e4e4e4' }">{{ item.name }}</text>
					</view>
					<image v-if="item.isSelected" :src="selectedIcon" mode="" class="choose"></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
export default {
	name: 'pgTree',
	components: {
		uniSwipeAction,
		uniSwipeActionItem
	},
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		params: {
			type: Object,
			default() {
				return {};
			}
		},
		selected: {
			type: [Array, Number],
			default() {
				return [];
			}
		},
		keepLevel: {
			//是否保存折叠信息
			type: Boolean,
			default() {
				return true;
			}
		},
		finalChoose: {
			//是否只能选中最后一个
			type: Boolean,
			default() {
				return false;
			}
		},
		enableChoose: {
			//是否启用插件内置选中
			type: Boolean,
			default() {
				return true;
			}
		},
		singleSelect: {
			//是否单选
			type: Boolean,
			default() {
				return false;
			}
		},
		rightIcon: {
			//折叠图片
			type: String,
			default() {
				return '/static/pg-tree/icon/arrow-right.png';
			}
		},
		downIcon: {
			//打开图片
			type: String,
			default() {
				return '/static/pg-tree/icon/arrow-down.png';
			}
		},
		selectedIcon: {
			//选中图标
			type: String,
			default() {
				return '/static/pg-tree/icon/pg_selected.png';
			}
		},
		unfoldPath: {
			//展开路径
			type: Array,
			default() {
				return [];
			}
		},
		openSelected: {
			//打开选中的item折叠状态
			type: Boolean,
			default() {
				return false;
			}
		},
		enableEdit: {
			//是否能编辑
			type: Boolean,
			default() {
				return false;
			}
		},
		isAllfold: {
			//是否全部折叠 0:折叠 1：展开	 2：不管
			type: Number,
			default() {
				return 2;
			}
		}
	},
	data() {
		return {
			listData: [],
			options: [
				{
					text: '编辑',
					style: {
						backgroundColor: '#2b98ef'
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#e74c3c'
					}
				}
			]
		};
	},
	watch: {
		list(list) {
			this.listData = [];
			this.updateListData(list);
		},
		selected(selected) {
			this.changeSelected(selected);
		},
		unfoldPath() {
			this.unfold();
		},
		isAllUnfold() {
			this.switchFold();
		}
	},
	mounted() {
		if (this.list) {
			this.updateListData(this.list);
		}
		if (this.openSelected) {
			this.openSelectedItem();
		}

		if (this.unfoldPath) {
			this.unfold();
		}
		this.switchFold();
	},
	methods: {
		editCate(item, $event) {
			if ($event.index == 0) {
				//编辑分类
				let data = { item, isEdit: true };
				this.$emit('itemEdit', data);
			}
			if ($event.index == 1) {
				//删除分类
				let data = { item, isDel: true };
				this.$emit('itemEdit', data);
			}
		},
		updateListData(list = [], level = 0, parentId = []) {
			//转换prop的list数据结构为单层数组形式
			let selected = [];
			if (typeof this.selected == 'number') {
				selected[0] = this.selected;
			} else {
				selected = this.selected;
			}
			list.forEach(item => {
				this.listData.push({
					id: item.id,
					name: item.name,
					parentId, //父级id数组
					level, //层级
					isLast: false, //是否是最后一级
					show: level === 0, // 是否显示自己
					isParentShow: false, //直接的父级是否显示
					showChild: false, //是否显示子级
					isSelected: item.isSelected ? item.isSelected : false || selected.includes(item.id) ? true : false //是否是挑选中的
				});
				if (Array.isArray(item.child) && item.child.length > 0) {
					let parents = [...parentId];
					parents.push(item.id);
					this.updateListData(item.child, level + 1, parents);
				} else {
					this.listData[this.listData.length - 1].isLast = true;
				}
			});
		},
		unfold() {
			//展开路径
			this.unfoldPath.forEach(item => {
				//标记所有的父级设置showChild属性为true
				let id = item;
				this.listData.forEach(iitem => {
					if (iitem.id == item) {
						iitem.showChild = true;
					}
				});
			});
			this.unfoldPath.forEach(id => {
				//显示子级
				this.listData.forEach(iitem => {
					if (iitem.parentId.includes(id)) {
						if (iitem.parentId[iitem.parentId.length - 1] === id) {
							iitem.isParentShow = true;
						}
						if (iitem.isParentShow == true) {
							//如果他的直接父级是在显示的并且父级的祖先也都是显示
							let isShow = true;
							iitem.parentId.forEach(parent => {
								this.listData.forEach(listItem => {
									if (listItem.id == parent) {
										if (listItem.showChild == false) {
											isShow = false;
										}
									}
								});
							});
							if (isShow) {
								iitem.show = true;
							}
						}
					}
				});
			});
		},
		unfoldAll() {
			//展开全部
			this.listData.forEach(item => {
				if (item.level != 0) {
					item.isParentShow = true;
				}
				if (!item.isLast) {
					item.showChild = true;
				}
				item.show = true;
			});
		},
		foldAll() {
			//折叠全部
			this.listData.forEach(item => {
				item.show = false;
				if (item.level == 0) {
					item.show = true;
				}
				item.showChild = false;
				item.isParentShow = false;
			});
		},
		switchFold() {
			if (this.isAllfold == 0) this.foldAll();
			if (this.isAllfold == 1) this.unfoldAll();
		},
		switchChild(item, index) {
			if (this.keepLevel) {
				this.switchChild1(item, index);
			} else {
				this.switchChild2(item, index);
			}
		},
		changeSelected(selected) {
			//更新选中状态
			let list = this.listData;

			list.forEach(item => {
				item.isSelected = false;
				if (selected.includes(item.id)) {
					item.isSelected = true;
				}
			});
		},
		openSelectedItem() {
			//打开选中项目路径
			let list = this.listData;
			let parents = [];
			this.selected.forEach(item => {
				//找出选中item的全部父级
				list.forEach(iitem => {
					if (iitem.id == item) {
						parents = parents.concat(iitem.parentId);
						iitem.show = true;
						iitem.isParentShow = true;
					}
				});
			});
			let temp = []; //去重
			for (let i = 0; i < parents.length; i++) {
				if (temp.indexOf(parents[i]) == -1) {
					temp.push(parents[i]);
				}
			}
			parents = temp;
			parents.forEach(parentId => {
				list.forEach(parent => {
					if (parent.id == parentId) {
						if (!parent.isLast) {
							parent.showChild = true;
						}
						if (parent.level != 0) {
							parent.isParentShow = true;
						}
						parent.show = true;
					}
					if (parent.level == 0) {
						list.forEach(iitem => {
							if (iitem.parentId[iitem.parentId.length - 1] === parent.id) {
								if (parents.includes(parent.id)) iitem.show = true;
							}
						});
					}
				});
			});
		},
		switchChild2(item, index) {
			//切换子级显示不保留折叠信息
			let list = this.listData;
			let id = item.id;
			item.showChild = !item.showChild;
			list.forEach(iitem => {
				if (item.showChild === false) {
					if (!iitem.parentId.includes(id)) {
						//隐藏所有子级
						return;
					}
					if (iitem.isLast !== true) {
						iitem.showChild = false;
					}
					iitem.show = false;
				} else {
					if (iitem.parentId[iitem.parentId.length - 1] === id) {
						iitem.show = true;
					}
				}
			});
		},
		switchChild1(item, index) {
			//切换子级显示保存折叠信息
			let list = this.listData;
			let id = item.id;
			let showPath = [];

			item.showChild = !item.showChild;

			list.forEach(iitem => {
				if (item.showChild == false) {
					if (!iitem.parentId.includes(id)) {
						return;
					}
					if (iitem.parentId[iitem.parentId.length - 1] === id) {
						iitem.isParentShow = false;
					}
					iitem.show = false;
				} else {
					if (iitem.parentId.includes(id)) {
						if (iitem.parentId[iitem.parentId.length - 1] === id) {
							iitem.isParentShow = true;
							iitem.show = true;
						}
						if (iitem.isParentShow == true) {
							//如果他的直接父级是在显示的并且父级的祖先也都是显示
							let isShow = true;
							iitem.parentId.forEach(parent => {
								this.listData.forEach(listItem => {
									if (listItem.id == parent) {
										if (listItem.showChild == false) {
											isShow = false;
										}
									}
								});
							});
							if (isShow) {
								iitem.show = true;
							}
						}
					}
				}
			});

			//生成展示路径
			this.listData.forEach(item => {
				if (item.showChild) {
					showPath.push(item.id);
				}
			});
			this.$emit('switchFold', showPath);
		},
		chooseTreeItem(item, index) {
			//点击分类
			console.log('item: ', item.name);
			if (this.enableChoose) {
				let id = item.id;
				let isHas = false;
				if (this.finalChoose) {
					//是否只能选择最后一个
					if (item.isLast === true) {
						this.$emit('itemClick', item);
						if (this.selected.includes(item.id)) {
							this.selected.splice(this.selected.indexOf(item.id), 1);
						} else {
							if (this.singleSelect) {
								//是否单选
								this.selected.pop();
							}
							this.selected.push(item.id);
						}
					}
				} else {
					for (var i = 0; i < this.selected.length; i++) {
						if (this.selected[i] == id) {
							isHas = true;
							this.selected.splice(i, 1);
						}
					}
					if (!isHas) {
						if (this.singleSelect) {
							//是否单选
							this.selected.pop();
						}
						this.selected.push(id);
					}
					let data = { item, selected: this.selected };
					this.$emit('itemClick', data);
				}
			} else {
				this.$emit('itemClick', item);
			}
		}
	}
};
</script>

<style>
.pg-tree-list {
	display: flex;
	flex-direction: column;
}
.pg-tree-list .swipe-item {
	height: 0;
	opacity: 0;
	transition: 0.2s;
}
.pg-tree-list .swipe-item.show {
	height: 90rpx;
	opacity: 1;
}
.pg-tree-list .swipe-item .tree-item {
	width: 100%;
}
.pg-tree-list .tree-item {
	height: 0;
	opacity: 0;
	transition: 0.2s;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 30rpx;
	color: #000;
	background-color: #ffffff;
}
.pg-tree-list .tree-item image.choose {
	width: 60rpx;
	height: 60rpx;
}
.pg-tree-list .tree-item.show {
	height: 50rpx;
	opacity: 1;
	padding: 20rpx 10rpx;
	border-bottom: 1px solid #e4e4e4;
}
.pg-tree-list .tree-item .pg-tree-icon {
	width: 30rpx;
	height: 30rpx;
	margin-right: 8rpx;
}
.pg-tree-list .tree-item .pg-tree-text {
	padding-left: 20rpx;
}
</style>
