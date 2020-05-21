(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/pg-tree/pg-tree"],{

/***/ 228:
/*!*****************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pg-tree.vue?vue&type=template&id=3869bd48& */ 229);
/* harmony import */ var _pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pg-tree.vue?vue&type=script&lang=js& */ 231);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _pg_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pg-tree.vue?vue&type=style&index=0&lang=css& */ 233);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__["render"],
  _pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 229:
/*!************************************************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue?vue&type=template&id=3869bd48& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pg-tree.vue?vue&type=template&id=3869bd48& */ 230);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_template_id_3869bd48___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 230:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue?vue&type=template&id=3869bd48& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uniSwipeAction: function() {
    return __webpack_require__.e(/*! import() | components/uni-swipe-action/uni-swipe-action */ "components/uni-swipe-action/uni-swipe-action").then(__webpack_require__.bind(null, /*! @/components/uni-swipe-action/uni-swipe-action.vue */ 252))
  },
  uniSwipeActionItem: function() {
    return Promise.all(/*! import() | components/uni-swipe-action-item/uni-swipe-action-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-swipe-action-item/uni-swipe-action-item")]).then(__webpack_require__.bind(null, /*! @/components/uni-swipe-action-item/uni-swipe-action-item.vue */ 257))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 231:
/*!******************************************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pg-tree.vue?vue&type=script&lang=js& */ 232);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 232:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var uniSwipeAction = function uniSwipeAction() {__webpack_require__.e(/*! require.ensure | components/uni-swipe-action/uni-swipe-action */ "components/uni-swipe-action/uni-swipe-action").then((function () {return resolve(__webpack_require__(/*! @/components/uni-swipe-action/uni-swipe-action.vue */ 252));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var uniSwipeActionItem = function uniSwipeActionItem() {Promise.all(/*! require.ensure | components/uni-swipe-action-item/uni-swipe-action-item */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-swipe-action-item/uni-swipe-action-item")]).then((function () {return resolve(__webpack_require__(/*! @/components/uni-swipe-action-item/uni-swipe-action-item.vue */ 257));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default2 =





























{
  name: 'pgTree',
  components: {
    uniSwipeAction: uniSwipeAction,
    uniSwipeActionItem: uniSwipeActionItem },

  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      } },

    params: {
      type: Object,
      default: function _default() {
        return {};
      } },

    selected: {
      type: [Array, Number],
      default: function _default() {
        return [];
      } },

    keepLevel: {
      //是否保存折叠信息
      type: Boolean,
      default: function _default() {
        return true;
      } },

    finalChoose: {
      //是否只能选中最后一个
      type: Boolean,
      default: function _default() {
        return false;
      } },

    enableChoose: {
      //是否启用插件内置选中
      type: Boolean,
      default: function _default() {
        return true;
      } },

    singleSelect: {
      //是否单选
      type: Boolean,
      default: function _default() {
        return false;
      } },

    rightIcon: {
      //折叠图片
      type: String,
      default: function _default() {
        return '/static/pg-tree/icon/arrow-right.png';
      } },

    downIcon: {
      //打开图片
      type: String,
      default: function _default() {
        return '/static/pg-tree/icon/arrow-down.png';
      } },

    selectedIcon: {
      //选中图标
      type: String,
      default: function _default() {
        return '/static/pg-tree/icon/pg_selected.png';
      } },

    unfoldPath: {
      //展开路径
      type: Array,
      default: function _default() {
        return [];
      } },

    openSelected: {
      //打开选中的item折叠状态
      type: Boolean,
      default: function _default() {
        return false;
      } },

    enableEdit: {
      //是否能编辑
      type: Boolean,
      default: function _default() {
        return false;
      } },

    isAllfold: {
      //是否全部折叠 0:折叠 1：展开	 2：不管
      type: Number,
      default: function _default() {
        return 2;
      } } },


  data: function data() {
    return {
      listData: [],
      options: [
      {
        text: '编辑',
        style: {
          backgroundColor: '#2b98ef' } },


      {
        text: '删除',
        style: {
          backgroundColor: '#e74c3c' } }] };




  },
  watch: {
    list: function list(_list) {
      this.listData = [];
      this.updateListData(_list);
    },
    selected: function selected(_selected) {
      this.changeSelected(_selected);
    },
    unfoldPath: function unfoldPath() {
      this.unfold();
    },
    isAllUnfold: function isAllUnfold() {
      this.switchFold();
    } },

  mounted: function mounted() {
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
    editCate: function editCate(item, $event) {
      if ($event.index == 0) {
        //编辑分类
        var data = { item: item, isEdit: true };
        this.$emit('itemEdit', data);
      }
      if ($event.index == 1) {
        //删除分类
        var _data = { item: item, isDel: true };
        this.$emit('itemEdit', _data);
      }
    },
    updateListData: function updateListData() {var _this = this;var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var parentId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      //转换prop的list数据结构为单层数组形式
      var selected = [];
      if (typeof this.selected == 'number') {
        selected[0] = this.selected;
      } else {
        selected = this.selected;
      }
      list.forEach(function (item) {
        _this.listData.push({
          id: item.id,
          name: item.name,
          parentId: parentId, //父级id数组
          level: level, //层级
          isLast: false, //是否是最后一级
          show: level === 0, // 是否显示自己
          isParentShow: false, //直接的父级是否显示
          showChild: false, //是否显示子级
          isSelected: item.isSelected ? item.isSelected :  false || selected.includes(item.id) ? true : false //是否是挑选中的
        });
        if (Array.isArray(item.child) && item.child.length > 0) {
          var parents = _toConsumableArray(parentId);
          parents.push(item.id);
          _this.updateListData(item.child, level + 1, parents);
        } else {
          _this.listData[_this.listData.length - 1].isLast = true;
        }
      });
    },
    unfold: function unfold() {var _this2 = this;
      //展开路径
      this.unfoldPath.forEach(function (item) {
        //标记所有的父级设置showChild属性为true
        var id = item;
        _this2.listData.forEach(function (iitem) {
          if (iitem.id == item) {
            iitem.showChild = true;
          }
        });
      });
      this.unfoldPath.forEach(function (id) {
        //显示子级
        _this2.listData.forEach(function (iitem) {
          if (iitem.parentId.includes(id)) {
            if (iitem.parentId[iitem.parentId.length - 1] === id) {
              iitem.isParentShow = true;
            }
            if (iitem.isParentShow == true) {
              //如果他的直接父级是在显示的并且父级的祖先也都是显示
              var isShow = true;
              iitem.parentId.forEach(function (parent) {
                _this2.listData.forEach(function (listItem) {
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
    unfoldAll: function unfoldAll() {
      //展开全部
      this.listData.forEach(function (item) {
        if (item.level != 0) {
          item.isParentShow = true;
        }
        if (!item.isLast) {
          item.showChild = true;
        }
        item.show = true;
      });
    },
    foldAll: function foldAll() {
      //折叠全部
      this.listData.forEach(function (item) {
        item.show = false;
        if (item.level == 0) {
          item.show = true;
        }
        item.showChild = false;
        item.isParentShow = false;
      });
    },
    switchFold: function switchFold() {
      if (this.isAllfold == 0) this.foldAll();
      if (this.isAllfold == 1) this.unfoldAll();
    },
    switchChild: function switchChild(item, index) {
      if (this.keepLevel) {
        this.switchChild1(item, index);
      } else {
        this.switchChild2(item, index);
      }
    },
    changeSelected: function changeSelected(selected) {
      //更新选中状态
      var list = this.listData;

      list.forEach(function (item) {
        item.isSelected = false;
        if (selected.includes(item.id)) {
          item.isSelected = true;
        }
      });
    },
    openSelectedItem: function openSelectedItem() {
      //打开选中项目路径
      var list = this.listData;
      var parents = [];
      this.selected.forEach(function (item) {
        //找出选中item的全部父级
        list.forEach(function (iitem) {
          if (iitem.id == item) {
            parents = parents.concat(iitem.parentId);
            iitem.show = true;
            iitem.isParentShow = true;
          }
        });
      });
      var temp = []; //去重
      for (var i = 0; i < parents.length; i++) {
        if (temp.indexOf(parents[i]) == -1) {
          temp.push(parents[i]);
        }
      }
      parents = temp;
      parents.forEach(function (parentId) {
        list.forEach(function (parent) {
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
            list.forEach(function (iitem) {
              if (iitem.parentId[iitem.parentId.length - 1] === parent.id) {
                if (parents.includes(parent.id)) iitem.show = true;
              }
            });
          }
        });
      });
    },
    switchChild2: function switchChild2(item, index) {
      //切换子级显示不保留折叠信息
      var list = this.listData;
      var id = item.id;
      item.showChild = !item.showChild;
      list.forEach(function (iitem) {
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
    switchChild1: function switchChild1(item, index) {var _this3 = this;
      //切换子级显示保存折叠信息
      var list = this.listData;
      var id = item.id;
      var showPath = [];

      item.showChild = !item.showChild;

      list.forEach(function (iitem) {
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
              var isShow = true;
              iitem.parentId.forEach(function (parent) {
                _this3.listData.forEach(function (listItem) {
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
      this.listData.forEach(function (item) {
        if (item.showChild) {
          showPath.push(item.id);
        }
      });
      this.$emit('switchFold', showPath);
    },
    chooseTreeItem: function chooseTreeItem(item, index) {
      //点击分类
      console.log('item: ', item.name);
      if (this.enableChoose) {
        var id = item.id;
        var isHas = false;
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
          var data = { item: item, selected: this.selected };
          this.$emit('itemClick', data);
        }
      } else {
        this.$emit('itemClick', item);
      }
    } } };exports.default = _default2;

/***/ }),

/***/ 233:
/*!**************************************************************************************!*\
  !*** D:/资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../电脑软件/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pg-tree.vue?vue&type=style&index=0&lang=css& */ 234);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pg_tree_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 234:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/资料/程序资料/黔诺康/components/pg-tree/pg-tree.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/pg-tree/pg-tree.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/pg-tree/pg-tree-create-component',
    {
        'components/pg-tree/pg-tree-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(228))
        })
    },
    [['components/pg-tree/pg-tree-create-component']]
]);
