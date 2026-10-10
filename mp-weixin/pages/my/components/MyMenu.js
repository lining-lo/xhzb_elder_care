"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "MyMenu",
  emits: ["handleApp", "handleContract", "handleBill"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleApp = () => {
      emit("handleApp");
    };
    const handleContract = () => {
      emit("handleContract");
    };
    const handleBill = () => {
      emit("handleBill");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleApp),
        b: common_vendor.o(handleContract),
        c: common_vendor.o(handleBill)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/components/MyMenu.js.map
