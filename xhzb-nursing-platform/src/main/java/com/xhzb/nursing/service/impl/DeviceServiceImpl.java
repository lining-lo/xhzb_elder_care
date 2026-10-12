package com.xhzb.nursing.service.impl;

import java.util.Collections;
import java.util.List;

import cn.hutool.json.JSONUtil;
import com.huaweicloud.sdk.iotda.v5.IoTDAClient;
import com.huaweicloud.sdk.iotda.v5.model.ListProductsRequest;
import com.huaweicloud.sdk.iotda.v5.model.ListProductsResponse;
import com.xhzb.common.constant.CacheConstants;
import com.xhzb.common.exception.base.BaseException;
import com.xhzb.common.utils.DateUtils;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.nursing.domain.vo.ProductVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.DeviceMapper;
import com.xhzb.nursing.domain.Device;
import com.xhzb.nursing.service.IDeviceService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import java.util.Arrays;

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
     * 查询设备
     *
     * @param id 设备主键
     * @return 设备
     */
    @Override
    public Device selectDeviceById(Long id) {
        return getById(id);
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
}
