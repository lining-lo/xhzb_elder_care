-- ----------------------------
-- 服务单（订单）表：小程序端服务下单
-- ----------------------------
CREATE TABLE IF NOT EXISTS `product_order` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `order_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单号',
  `elder_id` bigint NOT NULL COMMENT '老人ID（elder.id）',
  `project_id` bigint NOT NULL COMMENT '护理项目ID（nursing_project.id）',
  `family_member_id` bigint NOT NULL COMMENT '小程序用户ID（family_member.id）',
  `estimated_arrival_time` datetime NOT NULL COMMENT '期望服务时间',
  `amount` decimal(10, 2) NOT NULL DEFAULT 0.00 COMMENT '订单金额',
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '状态 0待支付 1待执行 2已执行 3已完成 4已取消 5退款中',
  `trading_order_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '交易单号（支付平台）',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `cancel_reason` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '取消原因',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_order_no`(`order_no`) USING BTREE,
  INDEX `idx_member_status`(`family_member_id`, `status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '服务单（订单）表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 退款记录表
-- ----------------------------
CREATE TABLE IF NOT EXISTS `refund_record` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `order_id` bigint NOT NULL COMMENT '订单ID（product_order.id）',
  `order_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '订单号',
  `trading_order_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '交易单号',
  `trading_channel` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '退款渠道',
  `refund_amount` decimal(10, 2) DEFAULT NULL COMMENT '退款金额',
  `refund_status` tinyint NOT NULL DEFAULT 1 COMMENT '退款状态 1退款中 2退款成功 3退款失败',
  `refund_time` datetime DEFAULT NULL COMMENT '退款完成时间',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_order_id`(`order_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '退款记录表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 护理任务表补充：计划外任务关联的服务单ID
-- ----------------------------
ALTER TABLE `nursing_task` ADD COLUMN `order_id` bigint DEFAULT NULL COMMENT '服务单ID（计划外任务来源，product_order.id）' AFTER `plan_id`;

-- ----------------------------
-- 费用账单表：小程序端账单
-- ----------------------------
CREATE TABLE IF NOT EXISTS `bill` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `bill_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '账单编号',
  `bill_type` tinyint NOT NULL DEFAULT 0 COMMENT '账单类型 0月度账单 1费用账单',
  `elder_id` bigint NOT NULL COMMENT '老人ID（elder.id）',
  `check_in_config_id` bigint DEFAULT NULL COMMENT '入住配置ID（check_in_config.id）',
  `family_member_id` bigint DEFAULT NULL COMMENT '小程序用户ID（family_member.id）',
  `bill_month` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '账单月份（yyyy-MM）',
  `bill_start_time` datetime DEFAULT NULL COMMENT '账单开始时间',
  `bill_end_time` datetime DEFAULT NULL COMMENT '账单结束时间',
  `total_days` int DEFAULT NULL COMMENT '账单天数',
  `lname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '护理等级名称',
  `type_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '房型名称',
  `bed_cost` decimal(10, 2) DEFAULT NULL COMMENT '床位费',
  `nursing_cost` decimal(10, 2) DEFAULT NULL COMMENT '护理费',
  `other_cost` decimal(10, 2) DEFAULT NULL COMMENT '其他费用',
  `medical_insurance_payment` decimal(10, 2) DEFAULT NULL COMMENT '医保支付',
  `government_subsidy` decimal(10, 2) DEFAULT NULL COMMENT '政府补贴',
  `month_cost` decimal(10, 2) DEFAULT NULL COMMENT '每月应付',
  `current_cost` decimal(10, 2) DEFAULT NULL COMMENT '本期应付',
  `deposit_amount` decimal(10, 2) DEFAULT NULL COMMENT '押金',
  `bill_amount` decimal(10, 2) DEFAULT NULL COMMENT '账单金额',
  `prepaid_amount` decimal(10, 2) DEFAULT NULL COMMENT '预缴款支付',
  `payable_amount` decimal(10, 2) DEFAULT NULL COMMENT '应付金额',
  `transaction_status` tinyint NOT NULL DEFAULT 0 COMMENT '支付状态 0待支付 1已支付 2已关闭',
  `payment_deadline` datetime DEFAULT NULL COMMENT '支付截止时间',
  `transaction_time` datetime DEFAULT NULL COMMENT '支付时间',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_elder_bill_start`(`elder_id`, `bill_start_time`) USING BTREE,
  INDEX `idx_member_status`(`family_member_id`, `transaction_status`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '费用账单表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- 账单生成定时任务（每天 00:20）
-- ----------------------------
INSERT INTO `sys_job` (`job_name`, `job_group`, `invoke_target`, `cron_expression`, `misfire_policy`, `concurrent`, `status`, `create_by`, `create_time`, `remark`)
SELECT '费用账单生成', 'DEFAULT', 'billJob.generateBill', '0 20 0 * * ?', '3', '1', '0', 'admin', NOW(), '每天生成在住老人的月度费用账单'
WHERE NOT EXISTS (SELECT 1 FROM `sys_job` WHERE `invoke_target` = 'billJob.generateBill');
