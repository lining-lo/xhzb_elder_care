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
const _sfc_main = {
  __name: "index",
  props: {
    // 选择的时间
    errorTipText: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["handleSub"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const popup = common_vendor.ref(null);
    const emit = __emit;
    const handleClose = () => {
      popup.value.close();
    };
    const handleSub = () => {
      emit("handleSub");
    };
    __expose({
      popup
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.errorTipText.text),
        b: common_vendor.o(handleClose),
        c: common_vendor.o(handleSub),
        d: _ctx.type === "left" || _ctx.type === "right" ? 1 : "",
        e: common_vendor.sr(popup, "2a31ee3a-0", {
          "k": "popup"
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/Operate/index.js.map
