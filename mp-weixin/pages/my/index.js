"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_UniFooter = common_vendor.resolveComponent("UniFooter");
  _component_UniFooter();
}
if (!Math) {
  (FastMenu + MyMenu + DeletePopup)();
}
const FastMenu = () => "./components/FastMenu.js";
const MyMenu = () => "./components/MyMenu.js";
const DeletePopup = () => "../../components/Operate/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const operate = common_vendor.ref(null);
    const nickName = common_vendor.ref(null);
    const token = common_vendor.ref(null);
    const errorTipText = common_vendor.ref({
      text: "您真的要退出登录吗？"
    });
    const capsuleBottom = common_vendor.ref();
    common_vendor.onShow(() => {
      nickName.value = common_vendor.index.getStorageSync("nickName");
      token.value = common_vendor.index.getStorageSync("token");
    });
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: () => {
          capsuleBottom.value = common_vendor.index.getMenuButtonBoundingClientRect().bottom + 12;
        }
      });
    });
    const subUnbind = () => {
      store.dispatch("user/loginOut");
      operate.value.popup.close();
      nickName.value = null;
      token.value = null;
    };
    const handleClick = () => {
      if (!token.value && !nickName.value) {
        goLogin();
      }
    };
    const handleOut = () => {
      operate.value.popup.open();
    };
    const handleOrder = (val) => {
      if (val !== void 0) {
        store.commit("user/setOrderStatus", val);
      }
      if (!token.value && !nickName.value) {
        goLogin();
      } else {
        store.commit("user/setBackLike", "my");
        common_vendor.index.navigateTo({
          url: "/subPages/order/index"
        });
      }
    };
    const handleApp = () => {
      if (!token.value && !nickName.value) {
        goLogin();
      } else {
        common_vendor.index.navigateTo({
          url: "/subPages/appointment/list/index"
        });
      }
    };
    const handleContract = () => {
      if (!token.value && !nickName.value) {
        goLogin();
      } else {
        common_vendor.index.navigateTo({
          url: "/subPages/contract/index"
        });
      }
    };
    const handleBill = () => {
      if (!token.value && !nickName.value) {
        goLogin();
      } else {
        store.commit("user/setBackLike", "my");
        common_vendor.index.navigateTo({
          url: "/subPages/bill/index"
        });
      }
    };
    const goLogin = () => {
      store.commit("setRouter", "pages/my/index");
      common_vendor.index.navigateTo({
        url: "/pages/login/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(token.value && nickName.value ? nickName.value : "立即登录"),
        c: common_vendor.o(handleClick),
        d: common_vendor.o(($event) => handleOrder("")),
        e: common_vendor.o(handleOrder),
        f: common_vendor.o(handleApp),
        g: common_vendor.o(handleContract),
        h: common_vendor.o(handleBill),
        i: token.value && nickName.value
      }, token.value && nickName.value ? {
        j: common_vendor.o(handleOut)
      } : {}, {
        k: capsuleBottom.value + "px",
        l: common_vendor.sr(operate, "f97bc692-2", {
          "k": "operate"
        }),
        m: common_vendor.o(subUnbind),
        n: common_vendor.p({
          errorTipText: errorTipText.value
        }),
        o: common_vendor.p({
          pagePath: "pages/my/index"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f97bc692"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/index.js.map
