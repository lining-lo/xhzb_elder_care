package com.xhzb.nursing.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import org.apache.ibatis.annotations.Param;
import com.xhzb.nursing.domain.Contract;
import com.xhzb.nursing.domain.vo.MemberContractVo;

/**
 * 合同Mapper接口
 * 
 * @author ruoyi
 * @date 2026-10-09
 */
@Mapper
public interface ContractMapper extends BaseMapper<Contract>
{
    /**
     * 查询合同
     * 
     * @param id 合同主键
     * @return 合同
     */
    public Contract selectContractById(Long id);

    /**
     * 查询合同列表
     * 
     * @param contract 合同
     * @return 合同集合
     */
    public List<Contract> selectContractList(Contract contract);

    /**
     * 新增合同
     * 
     * @param contract 合同
     * @return 结果
     */
    public int insertContract(Contract contract);

    /**
     * 修改合同
     * 
     * @param contract 合同
     * @return 结果
     */
    public int updateContract(Contract contract);

    /**
     * 删除合同
     * 
     * @param id 合同主键
     * @return 结果
     */
    public int deleteContractById(Long id);

    /**
     * 批量删除合同
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteContractByIds(Long[] ids);

    /**
     * 分页查询小程序用户的合同列表
     *
     * @param page 分页参数
     * @param familyMemberId 小程序用户ID
     * @return 合同分页数据
     */
    public IPage<MemberContractVo> selectMemberContractList(IPage<MemberContractVo> page, @Param("familyMemberId") Long familyMemberId);
}
