package com.xhzb.nursing.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xhzb.nursing.domain.NursingTask;
import com.xhzb.nursing.domain.dto.NursingTaskQueryDto;
import com.xhzb.nursing.domain.vo.NursingTaskVo;

/**
 * 护理任务Mapper接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Mapper
public interface NursingTaskMapper extends BaseMapper<NursingTask>
{
    /**
     * 查询护理任务列表
     *
     * @param query 查询条件
     * @return 护理任务列表
     */
    public List<NursingTaskVo> selectNursingTaskList(NursingTaskQueryDto query);

    /**
     * 查询护理任务详情
     *
     * @param id 护理任务ID
     * @return 护理任务详情
     */
    public NursingTaskVo selectNursingTaskById(Long id);

    /**
     * 查询老人的护理员姓名
     *
     * @param elderId 老人ID
     * @return 护理员姓名集合
     */
    public List<String> selectNursingNameByElderId(Long elderId);
}
