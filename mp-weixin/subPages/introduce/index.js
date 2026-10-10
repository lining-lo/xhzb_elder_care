"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
if (!Math) {
  Phone();
}
const Phone = () => "../../components/uni-phone/index2.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const capsuleBottom = common_vendor.ref();
    const phone = common_vendor.ref(null);
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: () => {
          capsuleBottom.value = common_vendor.index.getMenuButtonBoundingClientRect().bottom + 12;
        }
      });
    });
    const handlePhone = () => {
      phone.value.popup.open("center");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "养老院介绍",
          isShowBack: true,
          handleToLink: _ctx.handleToLink
        }),
        b: common_assets._imports_0$6,
        c: common_assets._imports_1$1,
        d: common_assets._imports_2$1,
        e: common_assets._imports_3$1,
        f: common_vendor.o(($event) => handlePhone()),
        g: capsuleBottom.value + "px",
        h: common_vendor.sr(phone, "bd219101-1", {
          "k": "phone"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd219101"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subPages/introduce/index.js.map
