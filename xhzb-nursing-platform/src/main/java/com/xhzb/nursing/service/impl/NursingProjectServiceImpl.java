package com.xhzb.nursing.service.impl;

import java.util.List;
import com.xhzb.common.utils.DateUtils;
import com.xhzb.nursing.domain.NursingProjectVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.NursingProjectMapper;
import com.xhzb.nursing.domain.NursingProject;
import com.xhzb.nursing.service.INursingProjectService;

/**
 * 护理项目Service业务层处理
 * 
 * @author lining
 * @date 2026-09-30
 */
@Service
public class NursingProjectServiceImpl implements INursingProjectService 
{
    @Autowired
    private NursingProjectMapper nursingProjectMapper;

    /**
     * 查询护理项目
     * 
     * @param id 护理项目主键
     * @return 护理项目
     */
    @Override
    public NursingProject selectNursingProjectById(Long id)
    {
        return nursingProjectMapper.selectNursingProjectById(id);
    }

    /**
     * 查询护理项目列表
     * 
     * @param nursingProject 护理项目
     * @return 护理项目
     */
    @Override
    public List<NursingProject> selectNursingProjectList(NursingProject nursingProject)
    {
        return nursingProjectMapper.selectNursingProjectList(nursingProject);
    }

    /**
     * 新增护理项目
     * 
     * @param nursingProject 护理项目
     * @return 结果
     */
    @Override
    public int insertNursingProject(NursingProject nursingProject)
    {
        nursingProject.setCreateTime(DateUtils.getNowDate());
        return nursingProjectMapper.insertNursingProject(nursingProject);
    }

    /**
     * 修改护理项目
     * 
     * @param nursingProject 护理项目
     * @return 结果
     */
    @Override
    public int updateNursingProject(NursingProject nursingProject)
    {
        nursingProject.setUpdateTime(DateUtils.getNowDate());
        return nursingProjectMapper.updateNursingProject(nursingProject);
    }

    /**
     * 批量删除护理项目
     * 
     * @param ids 需要删除的护理项目主键
     * @return 结果
     */
    @Override
    public int deleteNursingProjectByIds(Long[] ids)
    {
        return nursingProjectMapper.deleteNursingProjectByIds(ids);
    }

    /**
     * 删除护理项目信息
     * 
     * @param id 护理项目主键
     * @return 结果
     */
    @Override
    public int deleteNursingProjectById(Long id)
    {
        return nursingProjectMapper.deleteNursingProjectById(id);
    }

    /**
     * 查询所有护理项目
     * @return
     */
    @Override
    public List<NursingProjectVo> selectAll() {
        return nursingProjectMapper.selectAll();
    }
}
