"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "FastMenu",
  emits: ["handleOrder"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleOrder = (val) => {
      emit("handleOrder", val);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => handleOrder(0)),
        b: common_vendor.o(($event) => handleOrder(1)),
        c: common_vendor.o(($event) => handleOrder(2)),
        d: common_vendor.o(($event) => handleOrder(3))
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/components/FastMenu.js.map
