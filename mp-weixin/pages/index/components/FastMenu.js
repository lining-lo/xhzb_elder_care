"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "FastMenu",
  emits: ["isToken"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const store = common_vendor.useStore();
    const handleBinding = () => {
      emit("isToken", "/pages/family/binding?str=home");
    };
    const handleOrder = () => {
      store.commit("setRouter", "pages/index/index");
      store.commit("user/setOrderStatus", "");
      store.commit("setFootStatus", 0);
      store.commit("user/setBackLike", "home");
      common_vendor.index.navigateTo({
        url: common_vendor.index.getStorageSync("token") ? "/subPages/order/index" : "/pages/login/index"
      });
    };
    const handleBill = () => {
      store.commit("setRouter", "pages/index/index");
      store.commit("setFootStatus", 0);
      store.commit("user/setBackLike", "home");
      common_vendor.index.navigateTo({
        url: common_vendor.index.getStorageSync("token") ? "/subPages/bill/index" : "/pages/login/index"
      });
    };
    const handleIntro = () => {
      store.commit("setRouter", "pages/index/index");
      store.commit("setFootStatus", 0);
      store.commit("user/setBackLike", "home");
      common_vendor.index.navigateTo({
        url: "/subPages/introduce/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleIntro),
        b: common_vendor.o(handleBinding),
        c: common_vendor.o(handleOrder),
        d: common_vendor.o(handleBill)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/FastMenu.js.map
