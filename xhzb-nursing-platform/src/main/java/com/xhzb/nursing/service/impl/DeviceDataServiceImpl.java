package com.xhzb.nursing.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.xhzb.common.constant.CacheConstants;
import com.xhzb.common.exception.ServiceException;
import com.xhzb.common.utils.DateUtils;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.nursing.domain.Device;
import com.xhzb.nursing.domain.IotMsgNotifyData;
import com.xhzb.nursing.mapper.DeviceMapper;
import com.xhzb.nursing.domain.vo.DeviceDataTrendVo;
import com.xhzb.nursing.domain.vo.DeviceServicePropertyVo;
import com.xhzb.nursing.service.IDeviceService;
import com.xhzb.nursing.util.DateTimeZoneConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.DeviceDataMapper;
import com.xhzb.nursing.domain.DeviceData;
import com.xhzb.nursing.service.IDeviceDataService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 设备数据Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-12
 */
@Service
public class DeviceDataServiceImpl extends ServiceImpl<DeviceDataMapper, DeviceData> implements IDeviceDataService {
    @Autowired
    private DeviceDataMapper deviceDataMapper;

    @Autowired
    private IDeviceService deviceService;

    @Autowired
    private StringRedisTemplate redisTemplate;

    /**
     * 查询设备数据
     *
     * @param id 设备数据主键
     * @return 设备数据
     */
    @Override
    public DeviceData selectDeviceDataById(Long id) {
        return getById(id);
    }

    /**
     * 查询设备数据列表
     *
     * @param deviceData 设备数据
     * @return 设备数据
     */
    @Override
    public List<DeviceData> selectDeviceDataList(DeviceData deviceData) {
        return deviceDataMapper.selectDeviceDataList(deviceData);
    }

    /**
     * 新增设备数据
     *
     * @param deviceData 设备数据
     * @return 结果
     */
    @Override
    public int insertDeviceData(DeviceData deviceData) {
        return save(deviceData) ? 1 : 0;
    }

    /**
     * 修改设备数据
     *
     * @param deviceData 设备数据
     * @return 结果
     */
    @Override
    public int updateDeviceData(DeviceData deviceData) {
        return updateById(deviceData) ? 1 : 0;
    }

    /**
     * 批量删除设备数据
     *
     * @param ids 需要删除的设备数据主键
     * @return 结果
     */
    @Override
    public int deleteDeviceDataByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 删除设备数据信息
     *
     * @param id 设备数据主键
     * @return 结果
     */
    @Override
    public int deleteDeviceDataById(Long id) {
        return removeById(id) ? 1 : 0;
    }

    /**
     * 批量保存设备数据
     *
     * @param iotMsgNotifyData
     */
    @Override
    public void batchInsertDeviceData(IotMsgNotifyData iotMsgNotifyData) {
        String iotId = iotMsgNotifyData.getHeader().getDeviceId();
        //查询设备信息
        Device device = deviceService.lambdaQuery().eq(Device::getIotId, iotId).one();
        if (ObjectUtil.isEmpty(device)) {
            log.error("设备不存在");
            return;
        }
        //批量保存设备数据
        iotMsgNotifyData.getBody().getServices().forEach(s -> {
            //判断属性是否为空
            Map<String, Object> properties = s.getProperties();
            if (CollUtil.isEmpty(properties)) {
                return;
            }

            //上报时间处理
            String eventTimeStr = s.getEventTime();
            LocalDateTime localDateTime = LocalDateTimeUtil.parse(eventTimeStr, "yyyyMMdd'T'HHmmss'Z'");
            LocalDateTime eventTime = DateTimeZoneConverter.utcToShanghai(localDateTime);

            List<DeviceData> list = new ArrayList<>();

            //key:属性id，value:属性值
            properties.forEach((k, v) -> {
                DeviceData deviceData = BeanUtil.toBean(device, DeviceData.class);
                deviceData.setId(null);
                deviceData.setAlarmTime(eventTime);
                deviceData.setFunctionId(k);
                deviceData.setDataValue(v + "");
                deviceData.setAccessLocation(device.getBindingLocation());
                list.add(deviceData);
            });
            //批量保存设备数据
            saveBatch(list);
            redisTemplate.opsForHash().put(CacheConstants.IOT_DEVICE_LAST_DATA, iotId, JSONUtil.toJsonStr(list));
        });

    }

    /**
     * 查询设备每个功能最新上报的数据
     *
     * @param iotId 设备ID
     * @return 设备最新上报数据
     */
    @Override
    public List<DeviceServicePropertyVo> selectLatestPropertyList(String iotId) {
        if (StringUtils.isEmpty(iotId)) {
            throw new ServiceException("设备ID不能为空");
        }
        //设备最后一次上报的数据缓存在Redis中，缓存没有时（例如服务重启后）再查询数据库
        String jsonStr = (String) redisTemplate.opsForHash().get(CacheConstants.IOT_DEVICE_LAST_DATA, iotId);
        if (StringUtils.isNotEmpty(jsonStr)) {
            return JSONUtil.toList(jsonStr, DeviceData.class).stream()
                    .map(this::toServiceProperty)
                    .collect(Collectors.toList());
        }
        return deviceDataMapper.selectLatestPropertyList(iotId);
    }

    /**
     * 按天统计查询指标数据（24个小时点，没有数据的时间点补0）
     *
     * @param iotId 设备ID
     * @param functionId 功能ID
     * @param startTime 开始时间（时间戳）
     * @param endTime 结束时间（时间戳）
     * @return 统计数据
     */
    @Override
    public List<DeviceDataTrendVo> selectDataListByDay(String iotId, String functionId, Long startTime, Long endTime) {
        checkTrendDataParam(iotId, functionId);

        LocalDate date = toLocalDate(startTime);
        LocalDateTime beginTime = date.atStartOfDay();
        Map<String, Double> dataMap = toDataMap(
                deviceDataMapper.selectHourAvgList(iotId, functionId, beginTime, beginTime.plusDays(1)));

        List<DeviceDataTrendVo> result = new ArrayList<>(24);
        for (int hour = 0; hour < 24; hour++) {
            String dateTime = String.format("%02d:00", hour);
            result.add(new DeviceDataTrendVo(dateTime, dataMap.getOrDefault(dateTime, 0D)));
        }
        return result;
    }

    /**
     * 按周统计查询指标数据（7个天数据点，没有数据的天补0）
     *
     * @param iotId 设备ID
     * @param functionId 功能ID
     * @param startTime 开始时间（时间戳）
     * @param endTime 结束时间（时间戳）
     * @return 统计数据
     */
    @Override
    public List<DeviceDataTrendVo> selectDataListByWeek(String iotId, String functionId, Long startTime, Long endTime) {
        checkTrendDataParam(iotId, functionId);

        LocalDate date = toLocalDate(startTime);
        LocalDateTime beginTime = date.atStartOfDay();
        Map<String, Double> dataMap = toDataMap(
                deviceDataMapper.selectDayAvgList(iotId, functionId, beginTime, beginTime.plusDays(7)));

        List<DeviceDataTrendVo> result = new ArrayList<>(7);
        for (int day = 0; day < 7; day++) {
            LocalDate currentDate = date.plusDays(day);
            String dateTime = String.format("%02d.%02d", currentDate.getMonthValue(), currentDate.getDayOfMonth());
            result.add(new DeviceDataTrendVo(dateTime, dataMap.getOrDefault(dateTime, 0D)));
        }
        return result;
    }

    /**
     * 校验按天/按周统计的查询参数
     */
    private void checkTrendDataParam(String iotId, String functionId) {
        if (StringUtils.isEmpty(iotId) || StringUtils.isEmpty(functionId)) {
            throw new ServiceException("设备ID与功能ID不能为空");
        }
    }

    /**
     * 把时间戳转换为日期，为空时取当天
     */
    private LocalDate toLocalDate(Long time) {
        return Objects.isNull(time) ? LocalDate.now()
                : Instant.ofEpochMilli(time).atZone(ZoneId.systemDefault()).toLocalDate();
    }

    /**
     * 把统计数据转换为Map，key为时间点
     */
    private Map<String, Double> toDataMap(List<DeviceDataTrendVo> dataList) {
        Map<String, Double> dataMap = new LinkedHashMap<>();
        dataList.forEach(data -> dataMap.put(data.getDateTime(), data.getDataValue()));
        return dataMap;
    }

    /**
     * 设备上报数据转换为最新数据
     */
    private DeviceServicePropertyVo toServiceProperty(DeviceData deviceData) {
        DeviceServicePropertyVo propertyVo = new DeviceServicePropertyVo();
        propertyVo.setFunctionId(deviceData.getFunctionId());
        propertyVo.setEventTime(deviceData.getAlarmTime());
        propertyVo.setValue(deviceData.getDataValue());
        return propertyVo;
    }
}