"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  props: {
    handleToRefresh: {
      // 用于自定义跳转
      type: Function
    }
  },
  setup(__props) {
    const capsuleBottom = ref();
    onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: () => {
          capsuleBottom.value = common_vendor.index.getMenuButtonBoundingClientRect().bottom + 18;
        }
      });
    });
    const props = __props;
    const handleTo = () => {
      props.handleToRefresh();
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(handleTo),
        c: common_vendor.unref(capsuleBottom) + "px"
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44cb6724"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/NetFail/index.js.map
