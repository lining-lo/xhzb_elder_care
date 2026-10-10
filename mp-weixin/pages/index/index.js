"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_api_index = require("../api/index.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  const _component_UniFooter = common_vendor.resolveComponent("UniFooter");
  (_component_NavBar + _component_UniFooter)();
}
if (!Math) {
  (Appointment + FastMenu + HotList + Phone)();
}
const Phone = () => "../../components/uni-phone/index2.js";
const FastMenu = () => "./components/FastMenu.js";
const HotList = () => "./components/HotList.js";
const Appointment = () => "./components/Appointment.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const baseData = common_vendor.ref([]);
    const enabled = common_vendor.ref(true);
    const triggered = common_vendor.ref(false);
    const phone = common_vendor.ref(null);
    const capsuleBottom = common_vendor.ref();
    common_vendor.onShow(() => {
      getHotList();
    });
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: () => {
          capsuleBottom.value = common_vendor.index.getMenuButtonBoundingClientRect().bottom + 12;
        }
      });
    });
    const getHotList = async () => {
      await pages_api_index.getHotHoust({
        status: 1
      }).then((res) => {
        if (res.code === 200) {
          baseData.value = res.data;
          triggered.value = false;
          enabled.value = false;
        }
      });
    };
    common_vendor.onPullDownRefresh(() => {
      setTimeout(() => {
        getHotList();
        common_vendor.index.stopPullDownRefresh();
      }, 200);
    });
    const isToken = (val) => {
      store.commit("setRouter", "pages/index/index");
      common_vendor.index.navigateTo({
        url: common_vendor.index.getStorageSync("token") ? val : "/pages/login/index"
      });
    };
    const handlePhone = () => {
      phone.value.popup.open("center");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "星海智伴",
          isShowBack: false
        }),
        b: common_assets._imports_0$1,
        c: common_vendor.o(($event) => handlePhone()),
        d: common_vendor.o(isToken),
        e: common_vendor.p({
          ["base-data"]: baseData.value
        }),
        f: capsuleBottom.value + "px",
        g: common_vendor.p({
          pagePath: "pages/index/index"
        }),
        h: common_vendor.sr(phone, "1cf27b2a-5", {
          "k": "phone"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
