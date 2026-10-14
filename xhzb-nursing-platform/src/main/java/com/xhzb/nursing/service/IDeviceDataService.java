package com.xhzb.nursing.service;

import java.util.List;

import com.xhzb.nursing.domain.DeviceData;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.IotMsgNotifyData;
import com.xhzb.nursing.domain.vo.DeviceDataTrendVo;
import com.xhzb.nursing.domain.vo.DeviceServicePropertyVo;

/**
 * 设备数据Service接口
 *
 * @author ruoyi
 * @date 2026-10-12
 */
public interface IDeviceDataService extends IService<DeviceData> {
    /**
     * 查询设备数据
     *
     * @param id 设备数据主键
     * @return 设备数据
     */
    public DeviceData selectDeviceDataById(Long id);

    /**
     * 查询设备数据列表
     *
     * @param deviceData 设备数据
     * @return 设备数据集合
     */
    public List<DeviceData> selectDeviceDataList(DeviceData deviceData);

    /**
     * 新增设备数据
     *
     * @param deviceData 设备数据
     * @return 结果
     */
    public int insertDeviceData(DeviceData deviceData);

    /**
     * 修改设备数据
     *
     * @param deviceData 设备数据
     * @return 结果
     */
    public int updateDeviceData(DeviceData deviceData);

    /**
     * 批量删除设备数据
     *
     * @param ids 需要删除的设备数据主键集合
     * @return 结果
     */
    public int deleteDeviceDataByIds(Long[] ids);

    /**
     * 删除设备数据信息
     *
     * @param id 设备数据主键
     * @return 结果
     */
    public int deleteDeviceDataById(Long id);

    /**
     * 批量保存数据
     * @param iotMsgNotifyData
     */
    void batchInsertDeviceData(IotMsgNotifyData iotMsgNotifyData);

    /**
     * 查询设备每个功能最新上报的数据
     *
     * @param iotId 设备ID
     * @return 设备最新上报数据
     */
    public List<DeviceServicePropertyVo> selectLatestPropertyList(String iotId);

    /**
     * 按天统计查询指标数据（24个小时点，没有数据的时间点补0）
     *
     * @param iotId 设备ID
     * @param functionId 功能ID
     * @param startTime 开始时间（时间戳）
     * @param endTime 结束时间（时间戳）
     * @return 统计数据
     */
    public List<DeviceDataTrendVo> selectDataListByDay(String iotId, String functionId, Long startTime, Long endTime);

    /**
     * 按周统计查询指标数据（7个天数据点，没有数据的天补0）
     *
     * @param iotId 设备ID
     * @param functionId 功能ID
     * @param startTime 开始时间（时间戳）
     * @param endTime 结束时间（时间戳）
     * @return 统计数据
     */
    public List<DeviceDataTrendVo> selectDataListByWeek(String iotId, String functionId, Long startTime, Long endTime);
}