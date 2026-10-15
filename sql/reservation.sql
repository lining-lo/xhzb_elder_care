-- ----------------------------
-- 参观/探访预约表（小程序端 + 管理端共用）
-- 说明：如果表中已存在则不会重复创建
-- ----------------------------
CREATE TABLE IF NOT EXISTS `reservation` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '预约人姓名',
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '预约人手机号',
  `time` datetime NOT NULL COMMENT '预约时间',
  `visitor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '家人姓名（老人姓名）',
  `type` tinyint NOT NULL DEFAULT 0 COMMENT '预约类型（0：参观预约，1：探访预约）',
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '预约状态（0：待上门，1：已完成，2：已取消，3：已过期）',
  `family_member_id` bigint DEFAULT NULL COMMENT '小程序用户ID（family_member.id），管理端登记的为空',
  `arrive_time` datetime DEFAULT NULL COMMENT '到院时间',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建者（小程序用户ID）',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_time_type_status`(`time`, `type`, `status`) USING BTREE,
  INDEX `idx_create_by_status`(`create_by`, `status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '参观/探访预约表' ROW_FORMAT = DYNAMIC;
-- ----------------------------
-- 预约登记（管理端）菜单权限
-- ----------------------------
UPDATE `sys_menu` SET `perms` = 'nursing:reservation:list' WHERE `menu_id` = 2063 AND (`perms` IS NULL OR `perms` = '');

INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `query`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `remark`)
SELECT 2064, '预约登记查询', 2063, 1, '', '', NULL, 1, 0, 'F', '0', '0', 'nursing:reservation:query', '#', 'admin', NOW(), ''
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` t WHERE t.`menu_id` = 2064);

INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `query`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `remark`)
SELECT 2065, '预约登记新增', 2063, 2, '', '', NULL, 1, 0, 'F', '0', '0', 'nursing:reservation:add', '#', 'admin', NOW(), ''
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` t WHERE t.`menu_id` = 2065);

INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `query`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `remark`)
SELECT 2066, '预约登记修改', 2063, 3, '', '', NULL, 1, 0, 'F', '0', '0', 'nursing:reservation:edit', '#', 'admin', NOW(), ''
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` t WHERE t.`menu_id` = 2066);

INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `query`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `remark`)
SELECT 2067, '预约登记删除', 2063, 4, '', '', NULL, 1, 0, 'F', '0', '0', 'nursing:reservation:remove', '#', 'admin', NOW(), ''
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` t WHERE t.`menu_id` = 2067);

INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `query`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `remark`)
SELECT 2068, '预约登记导出', 2063, 5, '', '', NULL, 1, 0, 'F', '0', '0', 'nursing:reservation:export', '#', 'admin', NOW(), ''
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` t WHERE t.`menu_id` = 2068);
