package com.xhzb.nursing.mapper;

import java.time.LocalDateTime;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xhzb.nursing.domain.DeviceData;
import com.xhzb.nursing.domain.vo.DeviceDataTrendVo;
import com.xhzb.nursing.domain.vo.DeviceServicePropertyVo;

/**
 * 设备数据Mapper接口
 * 
 * @author ruoyi
 * @date 2026-10-12
 */
@Mapper
public interface DeviceDataMapper extends BaseMapper<DeviceData>
{
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
     * 删除设备数据
     * 
     * @param id 设备数据主键
     * @return 结果
     */
    public int deleteDeviceDataById(Long id);

    /**
     * 批量删除设备数据
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteDeviceDataByIds(Long[] ids);

    /**
     * 查询设备每个功能最新上报的数据
     *
     * @param iotId 设备ID
     * @return 设备最新上报数据
     */
    public List<DeviceServicePropertyVo> selectLatestPropertyList(@Param("iotId") String iotId);

    /**
     * 按小时统计设备指标数据
     *
     * @param iotId 设备ID
     * @param functionId 功能ID
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 统计数据
     */
    public List<DeviceDataTrendVo> selectHourAvgList(@Param("iotId") String iotId, @Param("functionId") String functionId,
                                                     @Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);

    /**
     * 按天统计设备指标数据
     *
     * @param iotId 设备ID
     * @param functionId 功能ID
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 统计数据
     */
    public List<DeviceDataTrendVo> selectDayAvgList(@Param("iotId") String iotId, @Param("functionId") String functionId,
                                                    @Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);
}