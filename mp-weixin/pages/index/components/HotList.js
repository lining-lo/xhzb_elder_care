"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "HotList",
  props: {
    // 房型信息
    baseData: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.baseData, (item, index, i0) => {
          return {
            a: item.photo,
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.introduction),
            d: index
          };
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/components/HotList.js.map
