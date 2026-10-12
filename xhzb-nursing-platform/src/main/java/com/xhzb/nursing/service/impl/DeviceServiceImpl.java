package com.xhzb.nursing.service.impl;

import java.time.LocalDateTime;
import java.util.*;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.json.JSONUtil;
import com.huaweicloud.sdk.iotda.v5.IoTDAClient;
import com.huaweicloud.sdk.iotda.v5.model.*;
import com.xhzb.common.constant.CacheConstants;
import com.xhzb.common.exception.base.BaseException;
import com.xhzb.common.utils.DateUtils;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.nursing.domain.dto.DeviceDto;
import com.xhzb.nursing.domain.vo.DeviceDetailVo;
import com.xhzb.nursing.domain.vo.ProductVo;
import com.xhzb.nursing.util.DateTimeZoneConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.DeviceMapper;
import com.xhzb.nursing.domain.Device;
import com.xhzb.nursing.service.IDeviceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

/**
 * 设备Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-11
 */
@Service
public class DeviceServiceImpl extends ServiceImpl<DeviceMapper, Device> implements IDeviceService {
    @Autowired
    private DeviceMapper deviceMapper;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private IoTDAClient client;

    /**
     * 查询设备详情
     * @param iotId
     * @return
     */
    @Override
    public DeviceDetailVo queryDeviceDetail(String iotId) {
        //查询本地设备数据
        Device device = this.lambdaQuery().eq(Device::getIotId, iotId).one();
        if(ObjectUtil.isEmpty(device)){
            return null;
        }
        //调用华为云接口查询设备详情
        ShowDeviceRequest request = new ShowDeviceRequest();
        request.setDeviceId(iotId);
        ShowDeviceResponse response;
        try {
            response = client.showDevice(request);
        } catch (Exception e) {
            throw new BaseException("物联网接口 - 查询设备详情，调用失败");
        }
        //属性拷贝
        DeviceDetailVo deviceVo = BeanUtil.toBean(device, DeviceDetailVo.class);
        deviceVo.setDeviceStatus(response.getStatus());
        String activeTimeStr = response.getActiveTime();
        //日期转换
        if(StringUtils.isNotEmpty(activeTimeStr)){
            //把字符串转换为LocalDateTime
            LocalDateTime activeTime = LocalDateTimeUtil.parse(activeTimeStr, DatePattern.UTC_MS_PATTERN);
            //日期时区转换
            deviceVo.setActiveTime(DateTimeZoneConverter.utcToShanghai(activeTime));
        }

        return deviceVo;
    }

    /**
     * 查询设备列表
     *
     * @param device 设备
     * @return 设备
     */
    @Override
    public List<Device> selectDeviceList(Device device) {
        return deviceMapper.selectDeviceList(device);
    }

    /**
     * 新增设备
     *
     * @param device 设备
     * @return 结果
     */
    @Override
    public int insertDevice(Device device) {
        return save(device) ? 1 : 0;
    }

    /**
     * 修改设备
     *
     * @param device 设备
     * @return 结果
     */
    @Override
    public int updateDevice(Device device) {
        return updateById(device) ? 1 : 0;
    }

    /**
     * 批量删除设备
     *
     * @param ids 需要删除的设备主键
     * @return 结果
     */
    @Override
    public int deleteDeviceByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 删除设备信息
     *
     * @param id 设备主键
     * @return 结果
     */
    @Override
    public int deleteDeviceById(Long id) {
        return removeById(id) ? 1 : 0;
    }


    /**
     * 同步产品列表
     */
    @Override
    public void syncProductList() {
        //请求参数
        ListProductsRequest listProductsRequest = new ListProductsRequest();

        //发起请求
        ListProductsResponse response = client.listProducts(listProductsRequest);
        if (response.getHttpStatusCode() != 200) {
            throw new BaseException("物联网接口 - 查询产品，同步失败");
        }
        //存储到redis
        redisTemplate.opsForValue().set(CacheConstants.IOT_ALL_PRODUCT_LIST, JSONUtil.toJsonStr(response.getProducts()));
    }

    /**
     * 查询所有产品列表
     *
     * @return
     */
    @Override
    public List<ProductVo> allProduct() {
        //从redis中查询数据
        String jsonStr = redisTemplate.opsForValue().get(CacheConstants.IOT_ALL_PRODUCT_LIST);
        //如果数据为空，则返回一个空集合
        if(StringUtils.isEmpty(jsonStr)){
            return Collections.emptyList();
        }
        //解析数据，并返回
        return JSONUtil.toList(jsonStr, ProductVo.class);
    }

    /**
     * 注册设备
     * @param dto
     */
    @Override
    public void registerDevice(DeviceDto dto) {
        //判断设备名称是否存在
        Long count = this.lambdaQuery().eq(Device::getDeviceName, dto.getDeviceName()).count();
        if(count > 0){
            throw new BaseException("设备名称已存在，请重新输入");
        }

        //判断设备标识是否存在
        count = this.lambdaQuery().eq(Device::getNodeId, dto.getNodeId()).count();
        if(count > 0){
            throw new BaseException("设备标识码已存在，请重新输入");
        }

        //判断同一位置是否绑定了相同的产品
        count = this.lambdaQuery()
                .eq(Device::getBindingLocation, dto.getBindingLocation())
                .eq(Device::getLocationType, dto.getLocationType())
                .eq(Device::getProductKey, dto.getProductKey())
                .eq(Objects.nonNull(dto.getPhysicalLocationType()), Device::getPhysicalLocationType, dto.getPhysicalLocationType())
                .count();
        if(count > 0){
            throw new BaseException("该老人/位置已绑定该产品，请重新选择");
        }

        //注册设备--->IoT平台
        AddDeviceRequest request = new AddDeviceRequest();
        AddDevice body = new AddDevice();
        body.withProductId(dto.getProductKey());
        body.withDeviceName(dto.getDeviceName());
        body.withNodeId(dto.getNodeId());

        //秘钥设置
        AuthInfo authInfo = new AuthInfo();
        String secret = UUID.randomUUID().toString().replaceAll("-", "");
        authInfo.withSecret(secret);
        body.setAuthInfo(authInfo);
        request.setBody(body);

        AddDeviceResponse response;
        try {
            response = client.addDevice(request);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException("物联网接口 - 注册设备，调用失败");
        }
        //本地保存设备
        //属性拷贝
        Device device = BeanUtil.toBean(dto, Device.class);
        //秘钥
        device.setSecret(secret);
        //设备id、设备绑定状态
        device.setIotId(response.getDeviceId());
        save(device);
    }
}
