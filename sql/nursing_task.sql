-- ----------------------------
-- 护理任务表（任务安排模块）
-- 说明：如果表中已存在则不会重复创建
-- ----------------------------
CREATE TABLE IF NOT EXISTS `nursing_task` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `elder_id` bigint NOT NULL COMMENT '老人ID（elder.id）',
  `project_id` bigint NOT NULL COMMENT '护理项目ID（nursing_project.id）',
  `plan_id` int DEFAULT NULL COMMENT '护理计划ID（计划外任务为空）',
  `task_type` tinyint NOT NULL DEFAULT 2 COMMENT '任务类型 1：护理计划外，2：护理计划内',
  `estimated_server_time` datetime NOT NULL COMMENT '期望服务时间',
  `plan_server_time` datetime DEFAULT NULL COMMENT '计划服务时间（生成时的原始时间，改期后仍用于避免重复生成）',
  `real_server_time` datetime DEFAULT NULL COMMENT '实际执行时间',
  `task_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '执行图片',
  `mark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '执行记录',
  `cancel_reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '取消原因',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '状态 1：待执行，2：已执行，3：已取消',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_elder_project_time`(`elder_id`, `project_id`, `estimated_server_time`) USING BTREE,
  INDEX `idx_status_time`(`status`, `estimated_server_time`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '护理任务表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 护理任务生成定时任务（每天 00:10 生成未来一周的计划内护理任务）
-- ----------------------------
INSERT INTO `sys_job` (`job_name`, `job_group`, `invoke_target`, `cron_expression`, `misfire_policy`, `concurrent`, `status`, `create_by`, `create_time`, `remark`)
SELECT '护理任务生成', 'DEFAULT', 'nursingTaskJob.generateNursingTask', '0 10 0 * * ?', '3', '1', '0', 'admin', NOW(), '每天生成未来一周的计划内护理任务'
WHERE NOT EXISTS (SELECT 1 FROM `sys_job` WHERE `invoke_target` = 'nursingTaskJob.generateNursingTask');
