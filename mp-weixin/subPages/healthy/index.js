"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pages_api_family = require("../../pages/api/family.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bedNumber = common_vendor.ref("");
    const elderImg = common_vendor.ref("");
    const elderName = common_vendor.ref("");
    const remark = common_vendor.ref("");
    const deviceName = common_vendor.ref("");
    const heartRate = common_vendor.ref({});
    const productKey = common_vendor.ref("");
    const iotId = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      const obj = JSON.parse(decodeURIComponent(options.item));
      if (obj) {
        deviceName.value = obj.deviceName;
        productKey.value = obj.productKey;
        iotId.value = obj.iotId;
        elderImg.value = obj.image;
        elderName.value = obj.name;
        remark.value = obj.mremark;
      }
    });
    common_vendor.onMounted(() => {
      pages_api_family.queryServiceProperties(iotId.value).then((res) => {
        if (res.data && Array.isArray(res.data)) {
          res.data.forEach((item) => {
            const eventTimestamp = new Date(item.eventTime).getTime();
            if (item.functionId === "HeartRate") {
              heartRate.value.dataValue = item.value;
              heartRate.value.updateTime = eventTimestamp;
            } else if (item.functionId === "BodyTemp") {
              heartRate.value.bodyTemp = item.value;
              heartRate.value.bodyTempTime = eventTimestamp;
            } else if (item.functionId === "xueyang") {
              heartRate.value.xueyang = item.value;
              heartRate.value.xueyangTime = eventTimestamp;
            } else if (item.functionId === "BatteryPercentage") {
              heartRate.value.batteryPercentage = item.value;
              heartRate.value.batteryTime = eventTimestamp;
            }
          });
        }
      });
    });
    const handleDisabled = () => {
      return common_vendor.index.showToast({
        title: "程序员小哥哥正在开发中",
        duration: 1e3,
        icon: "none"
      });
    };
    const getTime = (type, time) => {
      const currentDate = time || /* @__PURE__ */ new Date();
      let formattedDate = "";
      if (type === "day") {
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        formattedDate = `${month}月${day}日`;
      } else {
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        formattedDate = `${hours}:${minutes}`;
      }
      return formattedDate;
    };
    const handleToDetail = () => {
      common_vendor.index.navigateTo({
        url: `/subPages/wuDataDetail/index?date=${common_vendor.format(
          new Date(heartRate.value.updateTime),
          "yyyy-MM-dd"
        )}&deviceName=${deviceName.value}&iotId=${iotId.value}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "健康数据",
          isShowBack: true,
          src: "../../static/back@2x.png"
        }),
        b: elderImg.value,
        c: common_vendor.t(elderName.value),
        d: common_vendor.t(remark.value),
        e: common_vendor.t(bedNumber.value !== "" ? bedNumber.value + "床" : "--"),
        f: common_assets._imports_0$4,
        g: heartRate.value.updateTime
      }, heartRate.value.updateTime ? {
        h: common_vendor.t(getTime("day", new Date(heartRate.value.updateTime))),
        i: common_vendor.t(getTime("time", new Date(heartRate.value.updateTime)))
      } : {}, {
        j: common_vendor.t(heartRate.value.dataValue || "--"),
        k: common_vendor.o(handleToDetail),
        l: common_assets._imports_1,
        m: heartRate.value.updateTime
      }, heartRate.value.updateTime ? {
        n: common_vendor.t(getTime("day", new Date(heartRate.value.updateTime))),
        o: common_vendor.t(getTime("time", new Date(heartRate.value.updateTime)))
      } : {}, {
        p: common_vendor.o(handleDisabled),
        q: common_assets._imports_2,
        r: heartRate.value.updateTime
      }, heartRate.value.updateTime ? {
        s: common_vendor.t(getTime("day", new Date(heartRate.value.updateTime))),
        t: common_vendor.t(getTime("time", new Date(heartRate.value.updateTime)))
      } : {}, {
        v: common_vendor.o(handleDisabled),
        w: common_assets._imports_3,
        x: heartRate.value.updateTime
      }, heartRate.value.updateTime ? {
        y: common_vendor.t(getTime("day", new Date(heartRate.value.updateTime))),
        z: common_vendor.t(getTime("time", new Date(heartRate.value.updateTime)))
      } : {}, {
        A: common_vendor.o(handleDisabled),
        B: common_assets._imports_4,
        C: common_assets._imports_5
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44de5b56"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subPages/healthy/index.js.map
