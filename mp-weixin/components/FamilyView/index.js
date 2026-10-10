"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const visible = true;
const indicatorStyle = `height: 50px`;
const _sfc_main = {
  __name: "index",
  props: {
    allElderData: {
      type: Array,
      default: () => []
    },
    // 表单基本信息
    formData: {
      type: Object,
      default: () => ({})
    },
    serviceVal: {
      type: String,
      default: ""
    }
  },
  emits: ["bindFamily"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const popup = common_vendor.ref(null);
    const emit = __emit;
    const value = common_vendor.ref([0]);
    const selectItem = common_vendor.ref({});
    common_vendor.watch(props, (newValue) => {
      common_vendor.nextTick$1(() => {
        newValue.allElderData.forEach((ele, i) => {
          if (ele.elderId === newValue.formData.elderId) {
            value.value = [i];
          }
        });
      });
    });
    const bindChange = (e) => {
      selectItem.value = props.allElderData[e.detail.value[0]];
      common_vendor.index.__f__("log", "at components/FamilyView/index.vue:64", selectItem.value);
    };
    const onSubmit = (e, val) => {
      if (selectItem.value.id === void 0 && selectItem.value.elderId === -1 || selectItem.value.id === void 0) {
        selectItem.value = props.allElderData[0];
      }
      value.value = e.detail.value;
      emit("bindFamily", selectItem.value);
      popup.value.close();
    };
    const handleClose = () => {
      value.value = [];
      popup.value.close();
    };
    __expose({
      popup
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleClose),
        b: visible
      }, {
        c: common_vendor.f(__props.allElderData, (item, index, i0) => {
          return {
            a: common_vendor.t(item.elderName),
            b: index,
            c: common_vendor.o(($event) => onSubmit($event), index)
          };
        }),
        d: indicatorStyle,
        e: value.value,
        f: common_vendor.o(bindChange)
      }, {
        g: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
        h: common_vendor.sr(popup, "7d986389-0", {
          "k": "popup"
        }),
        i: common_vendor.o(_ctx.change)
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/FamilyView/index.js.map
