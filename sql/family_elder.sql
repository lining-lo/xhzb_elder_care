-- ----------------------------
-- 家属老人绑定表（小程序端家人绑定/解绑）
-- 说明：如果表中已存在则不会重复创建
-- ----------------------------
CREATE TABLE IF NOT EXISTS `family_elder` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `family_member_id` bigint NOT NULL COMMENT '家属ID（family_member.id）',
  `elder_id` bigint NOT NULL COMMENT '老人ID（elder.id）',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '称呼',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '创建者（小程序用户ID）',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '更新者',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `uk_family_member_elder`(`family_member_id`, `elder_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '家属老人绑定表' ROW_FORMAT = DYNAMIC;
