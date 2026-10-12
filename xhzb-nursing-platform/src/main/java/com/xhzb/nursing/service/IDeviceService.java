package com.xhzb.nursing.service;

import java.util.List;

import com.xhzb.nursing.domain.Device;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.dto.DeviceDto;
import com.xhzb.nursing.domain.vo.DeviceDetailVo;
import com.xhzb.nursing.domain.vo.ProductVo;

/**
 * 设备Service接口
 *
 * @author ruoyi
 * @date 2026-10-11
 */
public interface IDeviceService extends IService<Device> {

    /**
     * 查询设备列表
     *
     * @param device 设备
     * @return 设备集合
     */
    public List<Device> selectDeviceList(Device device);

    /**
     * 新增设备
     *
     * @param device 设备
     * @return 结果
     */
    public int insertDevice(Device device);

    /**
     * 修改设备
     *
     * @param device 设备
     * @return 结果
     */
    public int updateDevice(Device device);

    /**
     * 批量删除设备
     *
     * @param ids 需要删除的设备主键集合
     * @return 结果
     */
    public int deleteDeviceByIds(Long[] ids);

    /**
     * 删除设备信息
     *
     * @param id 设备主键
     * @return 结果
     */
    public int deleteDeviceById(Long id);

    /**
     * 从物联网平台同步产品列表
     */
    void syncProductList();

    /**
     * 查询所有产品列表
     *
     * @return 产品列表
     */
    List<ProductVo> allProduct();

    /**
     * 注册设备
     * @param deviceDto
     */
    void registerDevice(DeviceDto deviceDto);


    /**
     * 查询设备详情
     * @param iotId
     * @return
     */
    DeviceDetailVo queryDeviceDetail(String iotId);
}
