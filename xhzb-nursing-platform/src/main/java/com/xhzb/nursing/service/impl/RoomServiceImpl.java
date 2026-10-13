package com.xhzb.nursing.service.impl;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhzb.common.constant.CacheConstants;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.nursing.domain.DeviceData;
import com.xhzb.nursing.domain.Room;
import com.xhzb.nursing.domain.vo.DeviceInfo;
import com.xhzb.nursing.mapper.RoomMapper;
import com.xhzb.nursing.service.IRoomService;
import com.xhzb.nursing.domain.vo.RoomVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * 房间Service业务层处理
 *
 * @author ruoyi
 * @date 2025-03-28
 */
@Service
public class RoomServiceImpl extends ServiceImpl<RoomMapper, Room> implements IRoomService {
    @Autowired
    private RoomMapper roomMapper;

    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    /**
     * 查询房间
     *
     * @param id 房间主键
     * @return 房间
     */
    @Override
    public Room selectRoomById(Long id) {
        return getById(id);
    }

    /**
     * 查询房间列表
     *
     * @param room 房间
     * @return 房间
     */
    @Override
    public List<Room> selectRoomList(Room room) {
        return roomMapper.selectRoomList(room);
    }

    /**
     * 新增房间
     *
     * @param room 房间
     * @return 结果
     */
    @Override
    public int insertRoom(Room room) {
        return save(room) ? 1 : 0;
    }

    /**
     * 修改房间
     *
     * @param room 房间
     * @return 结果
     */
    @Override
    public int updateRoom(Room room) {
        return updateById(room) ? 1 : 0;
    }

    /**
     * 批量删除房间
     *
     * @param ids 需要删除的房间主键
     * @return 结果
     */
    @Override
    public int deleteRoomByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 根据楼层 id 获取房间视图对象列表
     *
     * @param floorId
     * @return
     */
    @Override
    public List<RoomVo> getRoomsByFloorId(Long floorId) {
        return roomMapper.selectByFloorId(floorId);
    }


    /**
     * 获取所有房间（负责老人）
     *
     * @param floorId
     * @return
     */
    @Override
    public List<RoomVo> getRoomsWithNurByFloorId(Long floorId) {
        return roomMapper.selectByFloorIdWithNur(floorId);
    }

    /**
     * 按照房间id查询楼层、房间、价格
     */
    @Override
    public RoomVo getRoomById(Long id) {
        return roomMapper.getRoomById(id);
    }

    /**
     * 查询智能楼层的基础数据和设备上报的数据
     *
     * @param floorId
     * @return
     */
    @Override
    public List<RoomVo> getRoomsWithDeviceByFloorId(Long floorId) {
//        redisTemplate.opsForHash().get(CacheConstants.IOT_DEVICE_LAST_DATA,"");
        //SQL返回的数据是基础数据，找到的是房间、床位、设备（房间|床位）
        List<RoomVo> roomVos = roomMapper.getRoomsWithDeviceByFloorId(floorId);
        roomVos.forEach(roomVo->{
            //遍历的是房间数据
            List<DeviceInfo> deviceVos = roomVo.getDeviceVos();
            //房间设备所对应的设备上报的数据
            deviceVos.forEach(deviceInfo -> {
                String jsonStr = (String) redisTemplate.opsForHash().get(CacheConstants.IOT_DEVICE_LAST_DATA, deviceInfo.getIotId());
                if(StringUtils.isEmpty(jsonStr)){
                    return;//跳出本次循环，并不是结束方法
                }
                deviceInfo.setDeviceDataVos(JSONUtil.toList(jsonStr, DeviceData.class));
            });
            //遍历的是床位数据
            roomVo.getBedVoList().forEach(bedVo -> {
                //获取床位对应的设备列表
                bedVo.getDeviceVos().forEach(deviceInfo -> {
                    String jsonStr = (String) redisTemplate.opsForHash().get(CacheConstants.IOT_DEVICE_LAST_DATA, deviceInfo.getIotId());
                    if(StringUtils.isEmpty(jsonStr)){
                        return;//跳出本次循环，并不是结束方法
                    }
                    deviceInfo.setDeviceDataVos(JSONUtil.toList(jsonStr, DeviceData.class));
                });
            });
        });
        return roomVos;
    }
}
