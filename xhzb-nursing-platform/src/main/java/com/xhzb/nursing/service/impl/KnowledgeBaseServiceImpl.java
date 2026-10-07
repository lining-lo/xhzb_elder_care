package com.xhzb.nursing.service.impl;

import java.util.List;

import com.xhzb.common.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.KnowledgeBaseMapper;
import com.xhzb.nursing.domain.KnowledgeBase;
import com.xhzb.nursing.service.IKnowledgeBaseService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import java.util.Arrays;

/**
 * 知识库Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-07
 */
@Service
public class KnowledgeBaseServiceImpl extends ServiceImpl<KnowledgeBaseMapper, KnowledgeBase> implements IKnowledgeBaseService {
    @Autowired
    private KnowledgeBaseMapper knowledgeBaseMapper;

    /**
     * 查询知识库
     *
     * @param id 知识库主键
     * @return 知识库
     */
    @Override
    public KnowledgeBase selectKnowledgeBaseById(Long id) {
        return getById(id);
    }

    /**
     * 查询知识库列表
     *
     * @param knowledgeBase 知识库
     * @return 知识库
     */
    @Override
    public List<KnowledgeBase> selectKnowledgeBaseList(KnowledgeBase knowledgeBase) {
        return knowledgeBaseMapper.selectKnowledgeBaseList(knowledgeBase);
    }

    /**
     * 新增知识库
     *
     * @param knowledgeBase 知识库
     * @return 结果
     */
    @Override
    public int insertKnowledgeBase(KnowledgeBase knowledgeBase) {
        return save(knowledgeBase) ? 1 : 0;
    }

    /**
     * 修改知识库
     *
     * @param knowledgeBase 知识库
     * @return 结果
     */
    @Override
    public int updateKnowledgeBase(KnowledgeBase knowledgeBase) {
        return updateById(knowledgeBase) ? 1 : 0;
    }

    /**
     * 批量删除知识库
     *
     * @param ids 需要删除的知识库主键
     * @return 结果
     */
    @Override
    public int deleteKnowledgeBaseByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 删除知识库信息
     *
     * @param id 知识库主键
     * @return 结果
     */
    @Override
    public int deleteKnowledgeBaseById(Long id) {
        return removeById(id) ? 1 : 0;
    }
}
