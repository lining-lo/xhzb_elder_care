"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_api_login = require("../api/login.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (NavBar + _easycom_uni_popup)();
}
const NavBar = () => "../../components/Navbar/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const popup = common_vendor.ref();
    const router = common_vendor.ref(store.state.router);
    const capsuleBottom = common_vendor.ref();
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: () => {
          capsuleBottom.value = common_vendor.index.getMenuButtonBoundingClientRect().bottom + 12;
        }
      });
    });
    const decryptPhoneNumber = (e) => {
      common_vendor.wx$1.login({
        success(res) {
          if (e.detail.errMsg === "getPhoneNumber:ok" && e.target.errMsg === "getPhoneNumber:ok") {
            common_vendor.index.getUserInfo({
              success(val) {
                pages_api_login.login({
                  code: res.code,
                  phoneCode: e.detail.code,
                  nickName: val.userInfo.nickName
                }).then((res2) => {
                  if (res2.code === 200) {
                    common_vendor.index.setStorageSync("token", res2.data.token);
                    common_vendor.index.setStorageSync("nickName", res2.data.nickName);
                    common_vendor.index.showToast({
                      title: "登录成功",
                      duration: 1e3,
                      icon: "none"
                    });
                    if (router.value) {
                      common_vendor.index.redirectTo({
                        url: `/${router.value}`
                      });
                    }
                  }
                });
              }
            });
          }
        }
      });
    };
    const handleClose = () => {
      popup.value.close();
    };
    const handleToLink = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "登录",
          isShowBack: true,
          handleToLink
        }),
        b: common_assets._imports_0$2,
        c: common_vendor.o(decryptPhoneNumber),
        d: common_vendor.o(handleClose),
        e: common_vendor.o(decryptPhoneNumber),
        f: common_vendor.sr(popup, "d08ef7d4-1", {
          "k": "popup"
        }),
        g: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        }),
        h: capsuleBottom.value + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
