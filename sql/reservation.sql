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
