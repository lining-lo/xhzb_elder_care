/*
 Navicat Premium Dump SQL

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80046 (8.0.46)
 Source Host           : localhost:3306
 Source Schema         : xhzb

 Target Server Type    : MySQL
 Target Server Version : 80046 (8.0.46)
 File Encoding         : 65001

 Date: 06/10/2026 10:44:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bed
-- ----------------------------
DROP TABLE IF EXISTS `bed`;
CREATE TABLE `bed`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '床位ID',
  `bed_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '床位编号',
  `bed_status` int NULL DEFAULT NULL COMMENT '床位状态: 未入住0, 已入住1 ',
  `sort` int NULL DEFAULT NULL COMMENT '床位号',
  `room_id` bigint NULL DEFAULT NULL COMMENT '房间ID',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `bed_number`(`bed_number` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 210 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '床位表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of bed
-- ----------------------------
INSERT INTO `bed` VALUES (1, '101-1', 0, 1, 1, '2023-09-26 17:39:53', '2025-04-20 17:00:53', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (2, '102-1', 0, 1, 2, '2023-09-26 17:40:01', '2023-10-05 16:00:05', 1671403256519078138, 1671403256519078164, NULL);
INSERT INTO `bed` VALUES (3, '102-2', 0, 2, 2, '2023-09-26 17:40:09', '2023-10-05 15:59:45', 1671403256519078138, 1671403256519078164, NULL);
INSERT INTO `bed` VALUES (4, '103-1', 0, 1, 3, '2023-09-26 17:40:42', '2023-10-05 16:00:21', 1671403256519078138, 1671403256519078164, NULL);
INSERT INTO `bed` VALUES (5, '104-1', 0, 1, 4, '2023-09-26 17:40:49', '2023-09-26 17:45:39', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (6, '104-2', 0, 2, 4, '2023-09-26 17:40:54', '2023-10-20 23:22:12', 1671403256519078138, 1671403256519078164, NULL);
INSERT INTO `bed` VALUES (7, '105-1', 0, 1, 5, '2023-09-26 17:41:09', '2023-09-26 17:45:52', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (8, '106-1', 0, 1, 6, '2023-09-26 17:41:16', '2023-09-26 17:45:58', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (9, '106-2', 0, 2, 6, '2023-09-26 17:41:24', '2023-09-26 17:46:04', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (10, '107-1', 0, 1, 7, '2023-09-26 17:41:32', '2023-12-21 09:37:49', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (11, '201-1', 0, 1, 8, '2023-09-26 17:44:53', '2025-04-20 17:07:59', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (12, '202-1', 0, 1, 9, '2023-09-26 17:46:33', '2023-09-26 17:46:33', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (13, '202-2', 0, 2, 9, '2023-09-26 17:46:47', '2023-09-26 17:46:47', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (14, '203-1', 0, 1, 10, '2023-09-26 18:43:58', '2023-09-26 18:43:58', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (15, '204-1', 0, 1, 11, '2023-09-26 18:44:03', '2023-09-26 18:44:03', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (16, '204-2', 0, 2, 11, '2023-09-26 18:44:12', '2023-09-26 18:44:12', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (18, '205-1', 0, 1, 12, '2023-09-26 18:44:23', '2023-12-20 18:40:07', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (19, '206-1', 0, 1, 13, '2023-09-26 18:44:36', '2023-12-20 21:43:10', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (20, '206-2', 0, 2, 13, '2023-09-26 18:44:42', '2023-09-26 18:44:48', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (21, '207-1', 0, 1, 14, '2023-09-26 18:45:01', '2023-09-26 18:45:01', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (22, '301-2', 0, 1, 15, '2023-09-26 18:45:26', '2023-12-26 19:35:06', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (23, '302-1', 0, 1, 16, '2023-09-26 18:45:31', '2023-09-26 18:45:31', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (24, '302-3', 0, 2, 16, '2023-09-26 18:45:39', '2023-12-26 19:35:15', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (25, '303-1', 0, 1, 17, '2023-09-26 18:45:44', '2023-09-26 18:45:44', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (27, '304-1', 0, 1, 18, '2023-09-26 18:45:55', '2023-09-26 18:45:55', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (28, '304-2', 0, 2, 18, '2023-09-26 18:46:04', '2023-09-26 18:46:04', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (29, '305-1', 0, 1, 19, '2023-09-26 18:46:11', '2023-12-21 10:04:47', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (30, '306-1', 0, 1, 20, '2023-09-26 18:46:16', '2023-09-26 18:46:16', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (31, '306-2', 0, 2, 20, '2023-09-26 18:46:22', '2023-09-26 19:08:50', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (32, '307-1', 0, 1, 21, '2023-09-26 18:46:29', '2023-09-26 18:46:29', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (33, '401-1', 0, 1, 22, '2023-09-26 18:52:14', '2023-09-26 18:52:14', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (34, '402-1', 0, 1, 23, '2023-09-26 18:52:22', '2023-09-26 18:52:22', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (35, '402-2', 0, 2, 23, '2023-09-26 18:52:35', '2023-09-26 18:52:38', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (36, '403-1', 0, 1, 24, '2023-09-26 18:52:47', '2023-09-26 18:52:47', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (37, '404-1', 0, 1, 25, '2023-09-26 18:52:54', '2023-09-26 18:52:54', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (38, '404-2', 0, 2, 25, '2023-09-26 18:53:02', '2023-09-26 18:53:10', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (39, '405-1', 0, 1, 26, '2023-09-26 18:53:18', '2023-09-26 18:53:18', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (40, '406-1', 0, 1, 27, '2023-09-26 18:53:27', '2023-09-26 18:53:27', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (41, '406-2', 0, 2, 27, '2023-09-26 18:53:36', '2023-09-26 18:53:36', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (42, '407-1', 0, 1, 28, '2023-09-26 18:53:44', '2023-09-26 18:53:44', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (43, '501-1', 0, 1, 29, '2023-09-26 18:55:47', '2023-09-26 18:55:47', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (44, '502-1', 0, 1, 31, '2023-09-26 18:55:52', '2023-09-26 18:55:52', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (45, '502-2', 0, 2, 31, '2023-09-26 18:56:02', '2023-09-26 18:56:02', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (46, '503-1', 0, 1, 32, '2023-09-26 18:56:10', '2023-09-26 18:56:10', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (48, '504-1', 0, 1, 33, '2023-09-26 18:56:26', '2023-09-26 18:56:26', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (49, '504-2', 0, 2, 33, '2023-09-26 18:56:32', '2023-09-26 18:56:32', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (50, '505-1', 0, 1, 34, '2023-09-26 18:56:37', '2023-09-26 18:56:37', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (52, '506-1', 0, 1, 35, '2023-09-26 18:56:49', '2023-09-26 18:56:49', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (53, '506-2', 0, 2, 35, '2023-09-26 18:56:54', '2023-09-26 18:56:54', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (54, '507-1', 0, 1, 36, '2023-09-26 18:57:00', '2023-09-26 18:57:00', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (55, '601-1', 0, 1, 37, '2023-09-26 19:05:11', '2023-09-28 22:53:28', 1671403256519078138, 1671403256519078164, NULL);
INSERT INTO `bed` VALUES (56, '602-1', 0, 1, 38, '2023-09-26 19:05:16', '2023-09-26 19:05:16', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (57, '602-2', 0, 2, 38, '2023-09-26 19:05:24', '2023-09-26 19:05:24', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (58, '603-1', 0, 1, 39, '2023-09-26 19:05:29', '2023-09-26 19:05:29', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (59, '604-1', 0, 1, 40, '2023-09-26 19:05:33', '2023-09-26 19:05:33', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (60, '604-2', 0, 2, 40, '2023-09-26 19:05:38', '2023-09-26 19:05:38', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (61, '605-1', 0, 1, 41, '2023-09-26 19:05:43', '2023-09-26 19:05:43', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (62, '606-1', 0, 1, 42, '2023-09-26 19:05:48', '2023-09-26 19:05:48', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (63, '606-2', 0, 2, 42, '2023-09-26 19:05:54', '2023-09-26 19:05:54', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (64, '607-1', 0, 1, 43, '2023-09-26 19:05:59', '2023-09-26 19:05:59', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (65, '701-1', 0, 1, 44, '2023-09-26 19:06:10', '2023-09-26 19:06:10', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (66, '702-1', 0, 1, 45, '2023-09-26 19:06:14', '2023-09-26 19:06:26', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (68, '702-2', 0, 2, 45, '2023-09-26 19:06:35', '2023-09-26 19:06:35', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (69, '703-1', 0, 1, 46, '2023-09-26 19:06:41', '2023-09-26 19:06:41', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (70, '704-1', 0, 1, 47, '2023-09-26 19:06:46', '2023-12-20 14:28:22', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (71, '704-2', 0, 2, 47, '2023-09-26 19:06:52', '2023-09-26 19:06:57', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (72, '705-1', 0, 1, 48, '2023-09-26 19:07:04', '2023-09-26 19:07:04', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (73, '706-1', 0, 1, 49, '2023-09-26 19:07:10', '2023-09-26 19:07:10', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (74, '706-2', 0, 2, 49, '2023-09-26 19:07:14', '2023-09-26 19:07:19', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (75, '707-1', 0, 1, 50, '2023-09-26 19:07:25', '2023-09-26 19:07:25', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (76, '801-1', 0, 1, 51, '2023-09-26 19:07:41', '2023-09-26 19:07:41', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (77, '803-1', 0, 1, 53, '2023-09-26 19:07:46', '2023-09-26 19:07:46', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (78, '805-1', 0, 1, 55, '2023-09-26 19:07:51', '2023-09-26 19:07:51', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (79, '807-1', 0, 1, 57, '2023-09-26 19:07:56', '2023-09-26 19:07:56', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (80, '802-1', 0, 1, 52, '2023-09-26 19:08:04', '2023-09-26 19:08:04', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (81, '801-2', 0, 2, 52, '2023-09-26 19:08:09', '2023-09-26 19:08:09', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (82, '804-1', 0, 1, 54, '2023-09-26 19:08:15', '2023-09-26 19:08:15', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (83, '804-2', 0, 2, 54, '2023-09-26 19:08:22', '2023-09-26 19:08:22', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (84, '806-1', 0, 1, 56, '2023-09-26 19:08:28', '2023-09-26 19:08:28', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (85, '806-2', 0, 2, 56, '2023-09-26 19:08:35', '2023-09-26 19:08:35', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (170, '101-2', 0, 2, 1, '2023-12-21 11:45:09', '2025-04-20 17:13:18', 1671403256519078138, 1, NULL);
INSERT INTO `bed` VALUES (171, '103-2', 0, 1, 3, '2023-12-23 16:12:34', '2023-12-23 16:22:03', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `bed` VALUES (177, '1011', 0, 1, 74, '2023-12-26 19:32:07', '2023-12-26 19:32:07', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (178, '101', 0, 1, 74, '2023-12-26 19:32:15', '2023-12-26 19:32:15', 1671403256519078138, NULL, NULL);
INSERT INTO `bed` VALUES (200, '107-2', 0, 1, 7, '2026-03-09 15:34:44', '2026-03-17 10:30:44', 1, 1, NULL);

-- ----------------------------
-- Table structure for elder
-- ----------------------------
DROP TABLE IF EXISTS `elder`;
CREATE TABLE `elder`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `id_card_no` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证号',
  `sex` int NULL DEFAULT NULL COMMENT '性别（0:女  1:男）',
  `status` int NOT NULL DEFAULT 1 COMMENT '状态（0:禁用，1:已入住 2:请假 3:已退住）',
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '手机号',
  `birthday` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '出生日期',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '家庭住址',
  `id_card_national_emblem_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证国徽面',
  `id_card_portrait_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '身份证人像面',
  `bed_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '床位编号',
  `bed_id` bigint NULL DEFAULT NULL COMMENT '床位id',
  `nation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '民族',
  `education_level` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文化程度',
  `social_security_card` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '社保卡号',
  `living_situation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '居住情况',
  `religious_belief` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '宗教信仰',
  `economic_source` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '经济来源',
  `marital_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '婚姻状况',
  `medical_payment_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '医疗费用支付方式',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `core_suggestion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '核心建议',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name_id_card_no`(`name` ASC, `id_card_no` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 85 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '老人表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of elder
-- ----------------------------

-- ----------------------------
-- Table structure for floor
-- ----------------------------
DROP TABLE IF EXISTS `floor`;
CREATE TABLE `floor`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '名称',
  `code` bigint NULL DEFAULT NULL COMMENT '编号',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 426 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '楼层表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of floor
-- ----------------------------
INSERT INTO `floor` VALUES (1, '1楼', 1, '2023-09-26 16:10:27', '2026-03-21 13:11:36', 1671403256519078153, 1, NULL);
INSERT INTO `floor` VALUES (2, '2楼', 2, '2023-09-26 17:37:20', '2023-09-26 17:37:20', 1671403256519078138, NULL, NULL);
INSERT INTO `floor` VALUES (3, '3楼', 3, '2023-09-26 17:37:26', '2023-09-26 17:37:26', 1671403256519078138, NULL, NULL);
INSERT INTO `floor` VALUES (4, '4楼', 4, '2023-09-26 17:37:32', '2023-09-26 17:37:32', 1671403256519078138, NULL, NULL);
INSERT INTO `floor` VALUES (5, '5楼', 5, '2023-09-26 17:37:38', '2023-09-26 17:37:38', 1671403256519078138, NULL, NULL);
INSERT INTO `floor` VALUES (6, '6楼', 6, '2023-09-26 17:37:42', '2023-09-26 17:37:59', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `floor` VALUES (7, '7楼', 7, '2023-09-26 17:37:47', '2023-09-26 17:37:52', 1671403256519078138, 1671403256519078138, NULL);
INSERT INTO `floor` VALUES (8, '8楼', 8, '2023-09-26 17:38:09', '2023-09-26 17:38:09', 1671403256519078138, NULL, NULL);
INSERT INTO `floor` VALUES (391, '9楼', 8, '2023-12-18 14:53:50', '2023-12-18 14:53:50', 1671403256519078138, NULL, NULL);
INSERT INTO `floor` VALUES (401, '10楼', 9, '2023-12-26 19:29:54', '2023-12-27 10:15:34', 1671403256519078138, 1671403256519078138, NULL);

-- ----------------------------
-- Table structure for gen_table
-- ----------------------------
DROP TABLE IF EXISTS `gen_table`;
CREATE TABLE `gen_table`  (
  `table_id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `table_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '表名称',
  `table_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '表描述',
  `sub_table_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '关联子表的表名',
  `sub_table_fk_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '子表关联的外键名',
  `class_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '实体类名称',
  `tpl_category` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'crud' COMMENT '使用的模板（crud单表操作 tree树表操作）',
  `tpl_web_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '前端模板类型（element-ui模版 element-plus模版）',
  `package_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成包路径',
  `module_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成模块名',
  `business_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成业务名',
  `function_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成功能名',
  `function_author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '生成功能作者',
  `gen_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '生成代码方式（0zip压缩包 1自定义路径）',
  `gen_path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '/' COMMENT '生成路径（不填默认项目路径）',
  `options` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '其它生成选项',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`table_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 43 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '代码生成业务表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of gen_table
-- ----------------------------

-- ----------------------------
-- Table structure for gen_table_column
-- ----------------------------
DROP TABLE IF EXISTS `gen_table_column`;
CREATE TABLE `gen_table_column`  (
  `column_id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `table_id` bigint NULL DEFAULT NULL COMMENT '归属表编号',
  `column_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列名称',
  `column_comment` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列描述',
  `column_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '列类型',
  `java_type` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'JAVA类型',
  `java_field` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'JAVA字段名',
  `is_pk` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否主键（1是）',
  `is_increment` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否自增（1是）',
  `is_required` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否必填（1是）',
  `is_insert` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否为插入字段（1是）',
  `is_edit` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否编辑字段（1是）',
  `is_list` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否列表字段（1是）',
  `is_query` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '是否查询字段（1是）',
  `query_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'EQ' COMMENT '查询方式（等于、不等于、大于、小于、范围）',
  `html_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '显示类型（文本框、文本域、下拉框、复选框、单选框、日期控件）',
  `dict_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典类型',
  `sort` int NULL DEFAULT NULL COMMENT '排序',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`column_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 672 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '代码生成业务表字段' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of gen_table_column
-- ----------------------------

-- ----------------------------
-- Table structure for nursing_level
-- ----------------------------
DROP TABLE IF EXISTS `nursing_level`;
CREATE TABLE `nursing_level`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '等级名称',
  `lplan_id` int NOT NULL COMMENT '护理计划ID',
  `fee` decimal(10, 2) NOT NULL COMMENT '护理费用',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（0：禁用，1：启用）',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '等级说明',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '护理等级表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of nursing_level
-- ----------------------------
INSERT INTO `nursing_level` VALUES (80, '二级护理等级', 138, 1500.00, 1, NULL, '2026-03-03 16:30:04', NULL, NULL, NULL, '2026-03-03 16:30:04');
INSERT INTO `nursing_level` VALUES (81, '三级护理等级', 139, 1200.00, 1, NULL, '2026-03-03 16:30:17', NULL, NULL, NULL, '2026-03-03 16:30:17');
INSERT INTO `nursing_level` VALUES (82, '四级护理等级', 140, 1000.00, 1, '无', '2026-03-03 16:30:30', NULL, NULL, NULL, '2026-03-13 17:54:25');
INSERT INTO `nursing_level` VALUES (83, '顶级护理', 141, 3010.00, 1, '最顶级的护理等级', '2026-03-09 16:37:08', NULL, NULL, NULL, '2026-03-09 16:37:08');

-- ----------------------------
-- Table structure for nursing_plan
-- ----------------------------
DROP TABLE IF EXISTS `nursing_plan`;
CREATE TABLE `nursing_plan`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '编号',
  `sort_no` int NULL DEFAULT NULL COMMENT '排序号',
  `plan_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '名称',
  `status` tinyint NOT NULL DEFAULT 0 COMMENT '状态 0禁用 1启用',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `plan_name`(`plan_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 175 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '护理计划表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of nursing_plan
-- ----------------------------
INSERT INTO `nursing_plan` VALUES (138, 1, '二级护理计划', 1, '2026-03-03 16:27:23', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_plan` VALUES (139, 1, '三级护理计划', 1, '2026-03-03 16:27:57', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_plan` VALUES (140, 1, '四级护理计划', 1, '2026-03-03 16:29:13', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_plan` VALUES (141, 1, '特级护理计划', 1, '2026-03-09 16:23:53', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_plan` VALUES (150, 2, '紧急护理计划', 1, '2026-03-09 16:43:41', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for nursing_project
-- ----------------------------
DROP TABLE IF EXISTS `nursing_project`;
CREATE TABLE `nursing_project`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '名称',
  `order_no` int NULL DEFAULT NULL COMMENT '排序号',
  `unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '单位',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '价格',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片',
  `nursing_requirement` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '护理要求',
  `status` int NOT NULL DEFAULT 1 COMMENT '状态（0：禁用，1：启用）',
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '护理项目表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of nursing_project
-- ----------------------------
INSERT INTO `nursing_project` VALUES (1, '修剪指甲', 1, '次', 10.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/b6631465-1684-41fe-8ccd-0b027cb91e90.png', '根据老人身体状况，定期修剪手指甲、脚趾甲，避免过长、开裂或划伤皮肤。修剪时动作轻柔，仔细打磨边缘，兼顾舒适度与安全性，预防倒刺、嵌甲及感染。去', 1, '1', '1', NULL, '2024-08-29 16:51:50', '2026-03-21 13:04:21');
INSERT INTO `nursing_project` VALUES (2, '衣物清洁', 1, '件', 5.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/41fc58d3-0627-4fa9-8459-906599aa1efa.png', '定时收集、分类清洗老人衣物、床单等织物，按材质选择合适洗涤方式。洗净后烘干、熨烫、整理归位，保持衣物干净、整洁、无异味，提升老人穿着舒适度。', 1, '1', '1', NULL, '2024-08-29 16:52:27', '2025-04-27 15:09:00');
INSERT INTO `nursing_project` VALUES (3, '整理床铺', 1, '次', 15.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/e611fcc9-dc45-49ac-abeb-f2ea99c2cffc.png', '每日定时整理床铺，更换枕套、床单、被罩，保持床单位平整、干燥、无褶皱。及时清理床上杂物，为老人营造整洁、舒适、卫生的睡眠与休息环境。', 1, '1', '1', NULL, '2024-08-29 16:52:52', '2024-08-29 08:51:46');
INSERT INTO `nursing_project` VALUES (4, '助餐', 1, '餐', 15.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/d91ba642-88e5-4c3d-8e50-a681ae3300e5.png', '根据老人饮食需求与身体状况，协助进食、饮水。对行动不便、吞咽困难者，提供喂食、喂水服务，注意温度、速度与营养搭配，确保老人安全、顺利进餐。', 1, '1', '1', NULL, '2024-08-29 16:53:29', '2024-08-29 08:52:24');
INSERT INTO `nursing_project` VALUES (5, '助浴', 1, '次', 40.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/125df948-7646-4fce-b322-1db0a84856e7.png', '协助老人完成全身清洁洗浴，做好防滑、保暖与安全防护。根据老人自理能力，全程陪护，控制水温与时间，避免滑倒、受凉，清洁后及时擦干穿衣。', 1, '1', '1', NULL, '2024-08-29 16:53:51', '2024-08-29 08:52:46');
INSERT INTO `nursing_project` VALUES (6, '洗头', 1, '次', 20.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/a38883fc-870b-40ff-a256-54ce2fc17af9.png', '定期为老人清洗头发，调节合适水温，做好头部与颈部保暖。冲洗干净后及时擦干、吹干，预防感冒，保持头发清洁清爽，提升老人舒适感。', 1, '1', '1', NULL, '2024-08-29 16:54:22', '2024-08-29 08:53:17');
INSERT INTO `nursing_project` VALUES (7, '洗脸', 1, '次', 15.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/95b0ad37-5d61-4ec2-a961-d6fb691a18f0.png', '每日早晚协助老人清洁面部，使用温和用品，轻柔擦拭眼、耳、鼻、面部及颈部。保持面部干净清爽，促进血液循环，提升日常舒适度。', 1, '1', '1', NULL, '2024-08-29 16:54:45', '2024-08-29 08:53:40');
INSERT INTO `nursing_project` VALUES (8, '洗脚', 1, '次', 20.00, 'https://itheim.oss-cn-beijing.aliyuncs.com/8437eb2d-3ea5-4eee-9d78-017bc8b3a66e.png', '每日为老人清洁双脚，调节适宜水温，浸泡、清洗、擦干双脚及趾缝。促进足部血液循环，缓解疲劳，预防脚气、干裂，提升睡眠与生活质量。', 1, '1', '1', NULL, '2024-08-29 16:55:08', '2024-08-29 08:54:03');
INSERT INTO `nursing_project` VALUES (20, '全身洗浴', 2, '元', 90.00, 'https://hm-xhzb.oss-cn-beijing.aliyuncs.com/476920d1-1dbd-4205-a1b6-95568881477e.png', '北京市海淀区西三旗街北京市海淀区西三旗街北京市海淀区西三旗街北京市海淀区西三旗街北京市', 1, '1', '1', NULL, '2026-03-09 15:59:52', '2026-03-28 16:52:37');
INSERT INTO `nursing_project` VALUES (31, '心理咨询', 1, '次', 25.00, 'https://hm-xhzb.oss-cn-beijing.aliyuncs.com/12b06336-24df-416b-a0ea-eff8f53e6fc1.png', '心理咨询心理咨询', 1, '1', NULL, NULL, '2026-03-28 17:07:01', '2026-03-28 09:07:01');

-- ----------------------------
-- Table structure for nursing_project_plan
-- ----------------------------
DROP TABLE IF EXISTS `nursing_project_plan`;
CREATE TABLE `nursing_project_plan`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL COMMENT '计划id',
  `project_id` int NOT NULL COMMENT '项目id',
  `execute_time` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '计划执行时间',
  `execute_cycle` int NOT NULL COMMENT '执行周期 0 天 1 周 2月',
  `execute_frequency` int NOT NULL COMMENT '执行频次',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1859 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '护理计划和项目关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of nursing_project_plan
-- ----------------------------
INSERT INTO `nursing_project_plan` VALUES (1736, 133, 87, '19:16:49', 1, 7, '2024-08-19 11:28:43', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1737, 133, 85, '19:28:34', 1, 1, '2024-08-19 11:28:43', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1738, 134, 85, '19:28:45', 0, 1, '2024-08-19 11:36:10', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1739, 135, 1, '16:55:58', 2, 1, '2024-08-29 08:55:34', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1740, 135, 5, '16:56:09', 0, 1, '2024-08-29 08:55:34', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1741, 135, 4, '08:00:00', 0, 1, '2024-08-29 08:55:34', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1742, 136, 5, '18:28:23', 1, 1, '2025-04-18 10:28:47', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1743, 136, 6, '18:28:35', 1, 2, '2025-04-18 10:28:47', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1744, 136, 7, '18:28:43', 0, 1, '2025-04-18 10:28:47', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1755, 138, 31, '16:26:36', 2, 2, '2026-03-03 16:28:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1756, 138, 8, '16:27:05', 1, 3, '2026-03-03 16:28:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1757, 138, 2, '16:27:14', 1, 2, '2026-03-03 16:28:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1758, 138, 6, '16:28:20', 1, 1, '2026-03-03 16:28:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1759, 139, 1, '16:27:23', 2, 2, '2026-03-03 16:28:57', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1760, 139, 3, '16:27:46', 1, 2, '2026-03-03 16:28:57', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1761, 139, 5, '16:28:49', 1, 1, '2026-03-03 16:28:57', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1763, 140, 1, '16:28:57', 2, 2, '2026-03-03 16:29:27', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1764, 140, 2, '16:29:23', 1, 1, '2026-03-03 16:29:27', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1767, 150, 1, '16:30:19', 1, 1, '2026-03-09 16:43:40', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1768, 150, 6, '16:39:59', 1, 2, '2026-03-09 16:43:40', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1769, 152, 3, '09:43:40', 0, 7, '2026-03-09 16:44:47', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1782, 137, 1, '16:24:45', 2, 2, '2026-03-11 18:09:03', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1783, 137, 2, '08:25:07', 1, 1, '2026-03-11 18:09:03', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1784, 137, 4, '08:00:00', 0, 3, '2026-03-11 18:09:03', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1785, 137, 5, '20:00:00', 1, 1, '2026-03-11 18:09:03', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1786, 137, 8, '20:26:05', 1, 3, '2026-03-11 18:09:03', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1788, 161, 2, '08:00', 1, 1, '2026-03-12 11:38:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1789, 162, 2, '08:00:00', 1, 2, '2026-03-12 11:39:42', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1817, 166, 3, '09:00', 1, 2, '2026-03-12 17:10:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1818, 166, 31, '11:02', 2, 7, '2026-03-12 17:10:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1819, 166, 20, '10:00', 0, 7, '2026-03-12 17:10:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1820, 166, 4, '08:00', 1, 7, '2026-03-12 17:10:33', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1834, 168, 2, '08:00', 1, 1, '2026-03-12 19:21:17', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1835, 169, 2, '08:00', 1, 1, '2026-03-13 09:16:58', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1836, 169, 3, '10:00', 0, 2, '2026-03-13 09:16:58', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1837, 169, 6, '08:00', 1, 3, '2026-03-13 09:16:58', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1838, 170, 2, '08:00', 1, 1, '2026-03-13 09:22:39', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1839, 170, 3, '08:00', 0, 1, '2026-03-13 09:22:39', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1840, 172, 20, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1841, 172, 3, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1842, 172, 4, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1843, 172, 5, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1844, 172, 6, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1845, 172, 31, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1846, 172, 7, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1847, 172, 8, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1848, 172, 2, '08:00', 1, 1, '2026-03-13 10:52:18', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1853, 158, 3, '18:06:25', 2, 1, '2026-03-13 17:48:01', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1854, 158, 2, '08:00:00', 1, 1, '2026-03-13 17:48:01', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1855, 174, 2, '08:00', 1, 6, '2026-03-13 21:21:36', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1856, 174, 3, '08:00', 1, 7, '2026-03-13 21:21:36', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1857, 141, 4, '16:22:54', 1, 3, '2026-03-21 13:04:54', NULL, NULL, NULL, NULL);
INSERT INTO `nursing_project_plan` VALUES (1858, 141, 5, '17:23:31', 1, 3, '2026-03-21 13:04:54', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '房间编号',
  `sort` int NULL DEFAULT NULL COMMENT '排序号',
  `type_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '房间类型名称',
  `floor_id` bigint NULL DEFAULT NULL COMMENT '楼层id',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `is_deleted` tinyint(1) NULL DEFAULT 0 COMMENT '是否删除',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 143 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '房间表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (1, '101', 1, '豪华双人间', 1, '2023-09-26 17:38:25', '2025-04-18 18:32:41', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (2, '102', 2, '豪华双人间', 1, '2023-09-26 17:38:32', '2025-04-18 18:33:09', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (3, '103', 3, '豪华双人间', 1, '2023-09-26 17:38:41', '2025-04-18 18:33:21', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (4, '104', 4, '双人套房', 1, '2023-09-26 17:38:48', '2025-04-18 18:33:25', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (5, '105', 5, '单人套房', 1, '2023-09-26 17:38:55', '2025-04-18 18:33:31', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (6, '106', 6, '双人套房', 1, '2023-09-26 17:39:05', '2025-04-18 18:33:38', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (7, '107', 7, '单人套房', 1, '2023-09-26 17:39:13', '2025-04-18 18:33:47', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (8, '201', 1, '单人套房', 2, '2023-09-26 17:42:02', '2025-04-18 18:33:56', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (9, '202', 2, '豪华单人间', 2, '2023-09-26 17:42:08', '2025-04-18 18:34:06', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (10, '203', 3, '普通单人间', 2, '2023-09-26 17:42:15', '2025-04-18 18:34:11', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (11, '204', 4, '豪华双人间', 2, '2023-09-26 17:42:22', '2025-04-18 18:34:16', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (12, '205', 5, '豪华单人间', 2, '2023-09-26 17:42:30', '2023-09-26 17:42:30', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (13, '206', 6, '双人套房', 2, '2023-09-26 17:42:41', '2023-09-26 17:42:41', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (14, '207', 7, '单人套房', 2, '2023-09-26 17:42:48', '2025-04-18 18:34:30', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (15, '301', 1, '单人套房', 3, '2023-09-26 17:43:54', '2025-04-18 18:34:38', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (16, '302', 2, '豪华双人间', 3, '2023-09-26 17:44:01', '2025-04-18 18:34:43', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (17, '303', 3, '普通单人间', 3, '2023-09-26 17:44:09', '2025-04-18 18:34:48', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (18, '304', 4, '豪华双人间', 3, '2023-09-26 17:44:17', '2023-09-26 17:44:17', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (19, '305', 5, '豪华单人间', 3, '2023-09-26 17:44:24', '2025-04-18 18:34:56', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (20, '306', 6, '双人套房', 3, '2023-09-26 17:44:33', '2025-04-18 18:34:59', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (21, '307', 7, '单人套房', 3, '2023-09-26 17:44:42', '2025-04-18 18:35:03', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (22, '401', 1, '单人套房', 4, '2023-09-26 18:51:10', '2025-04-18 18:35:11', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (23, '402', 2, '豪华双人间', 4, '2023-09-26 18:51:17', '2025-04-18 18:35:36', 0, 1671403256519078138, 1, NULL);
INSERT INTO `room` VALUES (24, '403', 3, '普通单人间', 4, '2023-09-26 18:51:23', '2023-09-26 18:51:23', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (25, '404', 4, '豪华双人间', 4, '2023-09-26 18:51:32', '2023-09-26 18:51:32', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (26, '405', 5, '豪华单人间', 4, '2023-09-26 18:51:42', '2023-09-26 18:51:42', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (27, '406', 6, '双人套房', 4, '2023-09-26 18:51:54', '2023-09-26 18:51:54', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (28, '407', 7, '单人套房', 4, '2023-09-26 18:52:03', '2023-09-26 18:52:03', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (29, '501', 1, '特护房', 5, '2023-09-26 18:53:54', '2023-09-26 18:53:54', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (31, '502', 2, '普通双人间', 5, '2023-09-26 18:54:05', '2023-09-26 18:54:05', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (32, '503', 3, '普通单人间', 5, '2023-09-26 18:54:12', '2023-09-26 18:54:12', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (33, '504', 4, '豪华双人间', 5, '2023-09-26 18:54:20', '2023-09-26 18:54:20', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (34, '505', 5, '豪华单人间', 5, '2023-09-26 18:54:28', '2023-09-26 18:54:28', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (35, '506', 6, '双人套房', 5, '2023-09-26 18:54:37', '2023-09-26 18:54:37', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (36, '507', 7, '单人套房', 5, '2023-09-26 18:54:47', '2023-09-26 18:54:47', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (37, '601', 1, '特护房', 6, '2023-09-26 18:57:14', '2023-09-26 18:57:14', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (38, '602', 2, '普通双人间', 6, '2023-09-26 18:57:20', '2023-09-26 18:57:20', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (39, '603', 3, '普通单人间', 6, '2023-09-26 18:57:28', '2023-09-26 18:57:28', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (40, '604', 4, '豪华双人间', 6, '2023-09-26 18:57:36', '2023-09-26 18:57:36', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (41, '605', 5, '豪华单人间', 6, '2023-09-26 19:01:36', '2023-09-26 19:01:36', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (42, '606', 6, '双人套房', 6, '2023-09-26 19:01:45', '2023-09-26 19:01:45', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (43, '607', 7, '单人套房', 6, '2023-09-26 19:01:54', '2023-09-26 19:01:54', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (44, '701', 1, '特护房', 7, '2023-09-26 19:02:13', '2023-09-26 19:02:13', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (45, '702', 2, '普通双人间', 7, '2023-09-26 19:02:20', '2023-09-26 19:02:20', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (46, '703', 3, '普通单人间', 7, '2023-09-26 19:02:28', '2023-09-26 19:02:28', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (47, '704', 4, '豪华双人间', 7, '2023-09-26 19:02:49', '2023-09-26 19:02:49', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (48, '705', 5, '豪华单人间', 7, '2023-09-26 19:03:00', '2023-09-26 19:03:00', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (49, '706', 6, '双人套房', 7, '2023-09-26 19:03:07', '2023-09-26 19:03:07', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (50, '707', 7, '单人套房', 7, '2023-09-26 19:03:15', '2023-09-26 19:03:15', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (51, '801', 1, '特护房', 8, '2023-09-26 19:03:49', '2023-09-26 19:03:49', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (52, '802', 2, '普通双人间', 8, '2023-09-26 19:03:57', '2023-09-26 19:03:57', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (53, '803', 3, '普通单人间', 8, '2023-09-26 19:04:04', '2023-09-26 19:04:04', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (54, '804', 4, '豪华双人间', 8, '2023-09-26 19:04:13', '2023-09-26 19:04:13', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (55, '805', 5, '豪华单人间', 8, '2023-09-26 19:04:45', '2023-09-26 19:04:45', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (56, '806', 6, '双人套房', 8, '2023-09-26 19:04:52', '2023-09-26 19:04:52', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (57, '807', 7, '单人套房', 8, '2023-09-26 19:05:00', '2023-09-26 19:05:00', 0, 1671403256519078138, NULL, NULL);
INSERT INTO `room` VALUES (74, '1001', 1, '普通单人间', 401, '2023-12-26 19:31:43', '2026-03-21 13:10:36', 0, 1671403256519078138, 1, NULL);

-- ----------------------------
-- Table structure for room_type
-- ----------------------------
DROP TABLE IF EXISTS `room_type`;
CREATE TABLE `room_type`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '房型名称',
  `bed_count` int NOT NULL DEFAULT 0 COMMENT '床位数量',
  `price` decimal(10, 2) NOT NULL COMMENT '床位费用',
  `introduction` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '介绍',
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '照片',
  `status` tinyint NOT NULL COMMENT '状态，0：禁用，1：启用',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `create_by` bigint NULL DEFAULT NULL COMMENT '创建人id',
  `update_by` bigint NULL DEFAULT NULL COMMENT '更新人id',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 131 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '房型表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of room_type
-- ----------------------------
INSERT INTO `room_type` VALUES (1, '单人套房', 0, 4000.00, '宽敞舒适的套房，配备独立卫生间和基本生活设施，满足独自居住的需求，提供私密性和舒适度', 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/e2f1031b-e23e-4379-95d4-ce8fe382f58f.png', 1, '2023-09-26 15:57:50', '2024-05-20 11:00:19', 1671403256519078153, 1, NULL);
INSERT INTO `room_type` VALUES (2, '双人套房', 0, 6000.00, '适合夫妻或朋友两人居住的套房，设有独立卫生间和基本生活设施，提供共享空间和私密性', 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/ff84c185-2e28-431c-951d-d004cc2d5bdc.png', 1, '2023-09-26 15:58:51', '2023-09-26 15:58:51', 1671403256519078153, NULL, NULL);
INSERT INTO `room_type` VALUES (3, '豪华单人间', 0, 3000.00, '豪华装修的单人房间，提供舒适的居住环境和高品质的服务，设计精美，配备独立卫生间和必需设施', 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/d803832c-5b93-4cae-ba95-aeb52ab0c5e0.png', 1, '2023-09-26 15:59:33', '2026-03-10 10:56:03', 1671403256519078153, 1, NULL);
INSERT INTO `room_type` VALUES (4, '豪华双人间', 0, 4500.00, '精心装修的双人房间，提供舒适和豪华的居住环境，配备独立卫生间和高品质的家具', 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/c3522da7-4c5c-48d2-94f9-9f0b95a048d2.png', 1, '2023-09-26 16:00:03', '2026-03-10 10:56:05', 1671403256519078153, 1, NULL);
INSERT INTO `room_type` VALUES (5, '普通单人间', 0, 2000.00, '简洁实用的单人房间，提供基本的居住设施和舒适度，适合独自居住的老年人，提供相对经济实惠的居住选择', 'https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/1a330b1c-b0a1-463d-8d9a-221ef17c314f.png', 1, '2023-09-26 16:00:27', '2026-03-12 14:23:50', 1671403256519078153, 1, NULL);
INSERT INTO `room_type` VALUES (115, '测试新增', 10, 3500.00, '水电费方式', 'https://itheim.oss-cn-beijing.aliyuncs.com/8fe7b29d-fce0-4201-becb-0586e8284a9d.png', 1, '2024-08-22 19:06:33', '2024-08-22 19:06:41', 1, 1, '是否');
INSERT INTO `room_type` VALUES (116, '标准双人间', 10, 1500.00, '123', 'https://itheim.oss-cn-beijing.aliyuncs.com/91c4a814-efd5-4093-a5ac-963b41047019.png,https://hm-xhzb.oss-cn-beijing.aliyuncs.com/5535f726-5ae2-413a-8548-0825459963eb.png', 1, '2024-09-12 22:52:36', '2024-09-12 22:55:10', 1, 1, '1231234565432');
INSERT INTO `room_type` VALUES (117, '豪华总统房', 3, 100000.00, '给你一个优雅舒适的家', 'https://hm-xhzb.oss-cn-beijing.aliyuncs.com/0054a549-63d2-4624-9e40-f530bb631d1f.png', 1, '2026-03-09 15:20:42', '2026-03-21 13:11:57', 1, 1, '给你一个优雅舒适的家');
INSERT INTO `room_type` VALUES (118, '大车店', 100, 10.00, '群居房', 'https://hm-xhzb.oss-cn-beijing.aliyuncs.com/554fdf86-803a-42b6-b29d-3678eb85004a.jpeg', 1, '2026-03-09 15:57:43', '2026-03-09 15:57:55', 1, 1, NULL);
INSERT INTO `room_type` VALUES (120, '单人套房3', 100, 1.00, '桑', NULL, 1, '2026-03-11 17:14:52', '2026-03-28 16:50:17', 1, 1, '阿斯钢');

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config`  (
  `config_id` int NOT NULL AUTO_INCREMENT COMMENT '参数主键',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '参数名称',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '参数键名',
  `config_value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '参数键值',
  `config_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'N' COMMENT '系统内置（Y是 N否）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '参数配置表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES (1, '主框架页-默认皮肤样式名称', 'sys.index.skinName', 'skin-blue', 'Y', 'admin', '2024-08-14 02:48:24', '', NULL, '蓝色 skin-blue、绿色 skin-green、紫色 skin-purple、红色 skin-red、黄色 skin-yellow');
INSERT INTO `sys_config` VALUES (2, '用户管理-账号初始密码', 'sys.user.initPassword', '123456', 'Y', 'admin', '2024-08-14 02:48:24', '', NULL, '初始化密码 123456');
INSERT INTO `sys_config` VALUES (3, '主框架页-侧边栏主题', 'sys.index.sideTheme', 'theme-dark', 'Y', 'admin', '2024-08-14 02:48:24', '', NULL, '深色主题theme-dark，浅色主题theme-light');
INSERT INTO `sys_config` VALUES (4, '账号自助-验证码开关', 'sys.account.captchaEnabled', 'true', 'Y', 'admin', '2024-08-14 02:48:24', '', NULL, '是否开启验证码功能（true开启，false关闭）');
INSERT INTO `sys_config` VALUES (5, '账号自助-是否开启用户注册功能', 'sys.account.registerUser', 'false', 'Y', 'admin', '2024-08-14 02:48:24', '', NULL, '是否开启注册用户功能（true开启，false关闭）');
INSERT INTO `sys_config` VALUES (6, '用户登录-黑名单列表', 'sys.login.blackIPList', '', 'Y', 'admin', '2024-08-14 02:48:24', '', NULL, '设置登录IP黑名单限制，多个匹配项以;分隔，支持匹配（*通配、网段）');

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `dept_id` bigint NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `parent_id` bigint NULL DEFAULT 0 COMMENT '父部门id',
  `ancestors` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '祖级列表',
  `dept_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '部门名称',
  `order_num` int NULL DEFAULT 0 COMMENT '显示顺序',
  `leader` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '负责人',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '部门状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`dept_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 204 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '部门表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES (100, 0, '0', '智慧养老院', 0, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2024-08-14 02:48:23', '', NULL);
INSERT INTO `sys_dept` VALUES (101, 100, '0,100', '高层办公室', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2024-08-14 02:48:23', 'admin', '2025-05-04 04:10:38');
INSERT INTO `sys_dept` VALUES (102, 100, '0,100', '财务部', 2, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2024-08-14 02:48:23', 'admin', '2025-05-04 04:11:21');
INSERT INTO `sys_dept` VALUES (103, 101, '0,100,101', '院长办公室', 1, '若依', '15888888888', 'ry@qq.com', '0', '0', 'admin', '2024-08-14 02:48:23', 'admin', '2025-05-04 04:11:06');
INSERT INTO `sys_dept` VALUES (104, 101, '0,100,101', '市场部门', 2, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2024-08-14 02:48:23', '', NULL);
INSERT INTO `sys_dept` VALUES (105, 101, '0,100,101', '测试部门', 3, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2024-08-14 02:48:23', '', NULL);
INSERT INTO `sys_dept` VALUES (106, 101, '0,100,101', '财务部门', 4, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2024-08-14 02:48:23', '', NULL);
INSERT INTO `sys_dept` VALUES (107, 101, '0,100,101', '运维部门', 5, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2024-08-14 02:48:23', '', NULL);
INSERT INTO `sys_dept` VALUES (108, 102, '0,100,102', '市场部门', 1, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2024-08-14 02:48:23', '', NULL);
INSERT INTO `sys_dept` VALUES (109, 102, '0,100,102', '财务部门', 2, '若依', '15888888888', 'ry@qq.com', '0', '2', 'admin', '2024-08-14 02:48:23', '', NULL);
INSERT INTO `sys_dept` VALUES (200, 100, '0,100', '行政部', 3, NULL, NULL, NULL, '0', '0', 'admin', '2025-05-04 04:11:40', '', NULL);
INSERT INTO `sys_dept` VALUES (201, 100, '0,100', '护理部', 4, NULL, NULL, NULL, '0', '0', 'admin', '2025-05-04 04:11:59', '', NULL);
INSERT INTO `sys_dept` VALUES (202, 100, '0,100', '后勤部', 5, NULL, NULL, NULL, '0', '0', 'admin', '2025-05-04 04:12:07', '', NULL);
INSERT INTO `sys_dept` VALUES (203, 100, '0,100', '销售部', 6, NULL, NULL, NULL, '0', '0', 'admin', '2025-05-04 04:12:16', '', NULL);

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `dict_code` bigint NOT NULL AUTO_INCREMENT COMMENT '字典编码',
  `dict_sort` int NULL DEFAULT 0 COMMENT '字典排序',
  `dict_label` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典标签',
  `dict_value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典键值',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典类型',
  `css_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '样式属性（其他样式扩展）',
  `list_class` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '表格回显样式',
  `is_default` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'N' COMMENT '是否默认（Y是 N否）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 121 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典数据表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
INSERT INTO `sys_dict_data` VALUES (1, 1, '男', '0', 'sys_user_sex', '', '', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '性别男');
INSERT INTO `sys_dict_data` VALUES (2, 2, '女', '1', 'sys_user_sex', '', '', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '性别女');
INSERT INTO `sys_dict_data` VALUES (3, 3, '未知', '2', 'sys_user_sex', '', '', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '性别未知');
INSERT INTO `sys_dict_data` VALUES (4, 1, '显示', '0', 'sys_show_hide', '', 'primary', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '显示菜单');
INSERT INTO `sys_dict_data` VALUES (5, 2, '隐藏', '1', 'sys_show_hide', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '隐藏菜单');
INSERT INTO `sys_dict_data` VALUES (6, 1, '正常', '0', 'sys_normal_disable', '', 'primary', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (7, 2, '停用', '1', 'sys_normal_disable', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (8, 1, '正常', '0', 'sys_job_status', '', 'primary', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (9, 2, '暂停', '1', 'sys_job_status', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (10, 1, '默认', 'DEFAULT', 'sys_job_group', '', '', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '默认分组');
INSERT INTO `sys_dict_data` VALUES (11, 2, '系统', 'SYSTEM', 'sys_job_group', '', '', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '系统分组');
INSERT INTO `sys_dict_data` VALUES (12, 1, '是', 'Y', 'sys_yes_no', '', 'primary', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '系统默认是');
INSERT INTO `sys_dict_data` VALUES (13, 2, '否', 'N', 'sys_yes_no', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '系统默认否');
INSERT INTO `sys_dict_data` VALUES (14, 1, '通知', '1', 'sys_notice_type', '', 'warning', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '通知');
INSERT INTO `sys_dict_data` VALUES (15, 2, '公告', '2', 'sys_notice_type', '', 'success', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '公告');
INSERT INTO `sys_dict_data` VALUES (16, 1, '正常', '0', 'sys_notice_status', '', 'primary', 'Y', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (17, 2, '关闭', '1', 'sys_notice_status', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '关闭状态');
INSERT INTO `sys_dict_data` VALUES (18, 99, '其他', '0', 'sys_oper_type', '', 'info', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '其他操作');
INSERT INTO `sys_dict_data` VALUES (19, 1, '新增', '1', 'sys_oper_type', '', 'info', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '新增操作');
INSERT INTO `sys_dict_data` VALUES (20, 2, '修改', '2', 'sys_oper_type', '', 'info', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '修改操作');
INSERT INTO `sys_dict_data` VALUES (21, 3, '删除', '3', 'sys_oper_type', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '删除操作');
INSERT INTO `sys_dict_data` VALUES (22, 4, '授权', '4', 'sys_oper_type', '', 'primary', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '授权操作');
INSERT INTO `sys_dict_data` VALUES (23, 5, '导出', '5', 'sys_oper_type', '', 'warning', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '导出操作');
INSERT INTO `sys_dict_data` VALUES (24, 6, '导入', '6', 'sys_oper_type', '', 'warning', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '导入操作');
INSERT INTO `sys_dict_data` VALUES (25, 7, '强退', '7', 'sys_oper_type', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '强退操作');
INSERT INTO `sys_dict_data` VALUES (26, 8, '生成代码', '8', 'sys_oper_type', '', 'warning', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '生成操作');
INSERT INTO `sys_dict_data` VALUES (27, 9, '清空数据', '9', 'sys_oper_type', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '清空操作');
INSERT INTO `sys_dict_data` VALUES (28, 1, '成功', '0', 'sys_common_status', '', 'primary', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '正常状态');
INSERT INTO `sys_dict_data` VALUES (29, 2, '失败', '1', 'sys_common_status', '', 'danger', 'N', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '停用状态');
INSERT INTO `sys_dict_data` VALUES (100, 0, '启用', '1', 'nursing_project_status', NULL, 'default', 'N', '0', 'admin', '2024-08-18 02:41:15', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (101, 0, '禁用', '0', 'nursing_project_status', NULL, 'default', 'N', '0', 'admin', '2024-08-18 02:41:30', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (103, 0, '启用', '1', 'nursing_plan_status', NULL, 'default', 'N', '0', 'admin', '2024-08-19 11:00:04', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (104, 0, '禁用', '2', 'nursing_plan_status', NULL, 'default', 'N', '0', 'admin', '2024-08-19 11:00:10', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (105, 0, '启用', '1', 'nursing_level_status', NULL, 'default', 'N', '0', 'admin', '2024-08-20 03:04:14', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (106, 0, '禁用', '0', 'nursing_level_status', NULL, 'default', 'N', '0', 'admin', '2024-08-20 03:04:21', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (114, 0, '已入住', '0', 'admission_status', NULL, 'default', 'N', '0', 'admin', '2026-03-21 12:58:22', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (115, 0, '未入住', '1', 'admission_status', NULL, 'default', 'N', '0', 'admin', '2026-03-21 12:58:28', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (116, 0, '随身设备', '0', 'device_location_type', NULL, 'default', 'N', '0', 'admin', '2026-03-21 12:58:44', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (117, 0, '固定设备', '1', 'device_location_type', NULL, 'default', 'N', '0', 'admin', '2026-03-21 12:58:51', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (118, 0, '评估中', '0', 'evaluation_progress', NULL, 'default', 'N', '0', 'admin', '2026-03-21 12:59:03', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (119, 0, '已完成', '1', 'evaluation_progress', NULL, 'default', 'N', '0', 'admin', '2026-03-21 12:59:09', '', NULL, NULL);
INSERT INTO `sys_dict_data` VALUES (120, 0, '已取消', '2', 'evaluation_progress', NULL, 'default', 'N', '0', 'admin', '2026-03-21 12:59:15', '', NULL, NULL);

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `dict_id` bigint NOT NULL AUTO_INCREMENT COMMENT '字典主键',
  `dict_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典名称',
  `dict_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '字典类型',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`dict_id`) USING BTREE,
  UNIQUE INDEX `dict_type`(`dict_type` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 109 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典类型表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
INSERT INTO `sys_dict_type` VALUES (1, '用户性别', 'sys_user_sex', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '用户性别列表');
INSERT INTO `sys_dict_type` VALUES (2, '菜单状态', 'sys_show_hide', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '菜单状态列表');
INSERT INTO `sys_dict_type` VALUES (3, '系统开关', 'sys_normal_disable', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '系统开关列表');
INSERT INTO `sys_dict_type` VALUES (4, '任务状态', 'sys_job_status', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '任务状态列表');
INSERT INTO `sys_dict_type` VALUES (5, '任务分组', 'sys_job_group', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '任务分组列表');
INSERT INTO `sys_dict_type` VALUES (6, '系统是否', 'sys_yes_no', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '系统是否列表');
INSERT INTO `sys_dict_type` VALUES (7, '通知类型', 'sys_notice_type', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '通知类型列表');
INSERT INTO `sys_dict_type` VALUES (8, '通知状态', 'sys_notice_status', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '通知状态列表');
INSERT INTO `sys_dict_type` VALUES (9, '操作类型', 'sys_oper_type', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '操作类型列表');
INSERT INTO `sys_dict_type` VALUES (10, '系统状态', 'sys_common_status', '0', 'admin', '2024-08-14 02:48:24', '', NULL, '登录状态列表');
INSERT INTO `sys_dict_type` VALUES (100, '护理项目状态', 'nursing_project_status', '0', 'admin', '2024-08-18 02:40:48', '', NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (101, '护理计划状态', 'nursing_plan_status', '0', 'admin', '2024-08-19 10:59:40', '', NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (102, '护理等级状态', 'nursing_level_status', '0', 'admin', '2024-08-20 03:04:03', '', NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (106, '健康评估-入住状态', 'admission_status', '0', 'admin', '2026-03-21 12:57:21', '', NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (107, '设备位置', 'device_location_type', '0', 'admin', '2026-03-21 12:57:33', '', NULL, NULL);
INSERT INTO `sys_dict_type` VALUES (108, '评估进度', 'evaluation_progress', '0', 'admin', '2026-03-21 12:57:41', '', NULL, NULL);

-- ----------------------------
-- Table structure for sys_job
-- ----------------------------
DROP TABLE IF EXISTS `sys_job`;
CREATE TABLE `sys_job`  (
  `job_id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'DEFAULT' COMMENT '任务组名',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '调用目标字符串',
  `cron_expression` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT 'cron执行表达式',
  `misfire_policy` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '3' COMMENT '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
  `concurrent` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '是否并发执行（0允许 1禁止）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '状态（0正常 1暂停）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注信息',
  PRIMARY KEY (`job_id`, `job_name`, `job_group`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 108 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定时任务调度表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_job
-- ----------------------------
INSERT INTO `sys_job` VALUES (1, '系统默认（无参）', 'DEFAULT', 'ryTask.ryNoParams', '0/10 * * * * ?', '3', '1', '1', 'admin', '2024-08-14 02:48:24', '', NULL, '');
INSERT INTO `sys_job` VALUES (2, '系统默认（有参）', 'DEFAULT', 'ryTask.ryParams(\'ry\')', '0/15 * * * * ?', '3', '1', '1', 'admin', '2024-08-14 02:48:24', '', NULL, '');
INSERT INTO `sys_job` VALUES (3, '系统默认（多参）', 'DEFAULT', 'ryTask.ryMultipleParams(\'ry\', true, 2000L, 316.50D, 100)', '0/20 * * * * ?', '3', '1', '1', 'admin', '2024-08-14 02:48:24', '', NULL, '');

-- ----------------------------
-- Table structure for sys_job_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_job_log`;
CREATE TABLE `sys_job_log`  (
  `job_log_id` bigint NOT NULL AUTO_INCREMENT COMMENT '任务日志ID',
  `job_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务名称',
  `job_group` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '任务组名',
  `invoke_target` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '调用目标字符串',
  `job_message` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '日志信息',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '执行状态（0正常 1失败）',
  `exception_info` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '异常信息',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`job_log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 125 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '定时任务调度日志表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_job_log
-- ----------------------------
INSERT INTO `sys_job_log` VALUES (124, '护理任务生成定时任务', 'DEFAULT', 'createNursingTaskJob.createNursingTaskJob', '护理任务生成定时任务 总共耗时：867毫秒', '0', '', '2026-03-01 22:42:27');

-- ----------------------------
-- Table structure for sys_logininfor
-- ----------------------------
DROP TABLE IF EXISTS `sys_logininfor`;
CREATE TABLE `sys_logininfor`  (
  `info_id` bigint NOT NULL AUTO_INCREMENT COMMENT '访问ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '用户账号',
  `ipaddr` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '登录IP地址',
  `login_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '登录地点',
  `browser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '浏览器类型',
  `os` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '操作系统',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '登录状态（0成功 1失败）',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '提示消息',
  `login_time` datetime NULL DEFAULT NULL COMMENT '访问时间',
  PRIMARY KEY (`info_id`) USING BTREE,
  INDEX `idx_sys_logininfor_s`(`status` ASC) USING BTREE,
  INDEX `idx_sys_logininfor_lt`(`login_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统访问记录' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_logininfor
-- ----------------------------
INSERT INTO `sys_logininfor` VALUES (1, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:22:32');
INSERT INTO `sys_logininfor` VALUES (2, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:23:34');
INSERT INTO `sys_logininfor` VALUES (3, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:24:40');
INSERT INTO `sys_logininfor` VALUES (4, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '验证码已失效', '2026-10-06 10:26:54');
INSERT INTO `sys_logininfor` VALUES (5, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:27:06');
INSERT INTO `sys_logininfor` VALUES (6, 'ry', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:29:03');
INSERT INTO `sys_logininfor` VALUES (7, 'ry', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:29:08');
INSERT INTO `sys_logininfor` VALUES (8, 'ry', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:29:15');
INSERT INTO `sys_logininfor` VALUES (9, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:30:04');
INSERT INTO `sys_logininfor` VALUES (10, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '密码输入错误5次，帐户锁定10分钟', '2026-10-06 10:34:05');
INSERT INTO `sys_logininfor` VALUES (11, 'ry', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '验证码错误', '2026-10-06 10:34:13');
INSERT INTO `sys_logininfor` VALUES (12, 'ry', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '1', '用户不存在/密码错误', '2026-10-06 10:34:22');
INSERT INTO `sys_logininfor` VALUES (13, 'admin', '127.0.0.1', '内网IP', 'Chrome 15', 'Windows 10', '0', '登录成功', '2026-10-06 10:42:41');

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `menu_id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '菜单名称',
  `parent_id` bigint NULL DEFAULT 0 COMMENT '父菜单ID',
  `order_num` int NULL DEFAULT 0 COMMENT '显示顺序',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `query` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由参数',
  `route_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '路由名称',
  `is_frame` int NULL DEFAULT 1 COMMENT '是否为外链（0是 1否）',
  `is_cache` int NULL DEFAULT 0 COMMENT '是否缓存（0缓存 1不缓存）',
  `menu_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '#' COMMENT '菜单图标',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2065 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES (1, '系统管理', 0, 6, 'system', NULL, '', '', 1, 0, 'M', '0', '0', '', 'icon_xtgl', 'admin', '2024-08-14 02:48:23', 'admin', '2026-03-10 11:02:46', '系统管理目录');
INSERT INTO `sys_menu` VALUES (2, '系统监控', 0, 7, 'monitor', NULL, '', '', 1, 0, 'M', '0', '0', '', 'icon_xtjk', 'admin', '2024-08-14 02:48:23', 'admin', '2026-03-10 11:03:03', '系统监控目录');
INSERT INTO `sys_menu` VALUES (3, '系统工具', 0, 8, 'tool', NULL, '', '', 1, 0, 'M', '0', '0', '', 'icon_xtgj', 'admin', '2024-08-14 02:48:23', 'admin', '2026-03-10 11:03:21', '系统工具目录');
INSERT INTO `sys_menu` VALUES (4, '若依官网', 0, 4, 'http://ruoyi.vip', NULL, '', '', 0, 0, 'M', '1', '0', '', 'guide', 'admin', '2024-08-14 02:48:23', 'admin', '2024-08-20 01:57:10', '若依官网地址');
INSERT INTO `sys_menu` VALUES (100, '用户管理', 1, 1, 'user', 'system/user/index', '', '', 1, 0, 'C', '0', '0', 'system:user:list', 'user', 'admin', '2024-08-14 02:48:23', '', NULL, '用户管理菜单');
INSERT INTO `sys_menu` VALUES (101, '角色管理', 1, 2, 'role', 'system/role/index', '', '', 1, 0, 'C', '0', '0', 'system:role:list', 'peoples', 'admin', '2024-08-14 02:48:23', '', NULL, '角色管理菜单');
INSERT INTO `sys_menu` VALUES (102, '菜单管理', 1, 3, 'menu', 'system/menu/index', '', '', 1, 0, 'C', '0', '0', 'system:menu:list', 'tree-table', 'admin', '2024-08-14 02:48:23', '', NULL, '菜单管理菜单');
INSERT INTO `sys_menu` VALUES (103, '部门管理', 1, 4, 'dept', 'system/dept/index', '', '', 1, 0, 'C', '0', '0', 'system:dept:list', 'tree', 'admin', '2024-08-14 02:48:23', '', NULL, '部门管理菜单');
INSERT INTO `sys_menu` VALUES (104, '岗位管理', 1, 5, 'post', 'system/post/index', '', '', 1, 0, 'C', '0', '0', 'system:post:list', 'post', 'admin', '2024-08-14 02:48:23', '', NULL, '岗位管理菜单');
INSERT INTO `sys_menu` VALUES (105, '字典管理', 1, 6, 'dict', 'system/dict/index', '', '', 1, 0, 'C', '0', '0', 'system:dict:list', 'dict', 'admin', '2024-08-14 02:48:23', '', NULL, '字典管理菜单');
INSERT INTO `sys_menu` VALUES (106, '参数设置', 1, 7, 'config', 'system/config/index', '', '', 1, 0, 'C', '0', '0', 'system:config:list', 'edit', 'admin', '2024-08-14 02:48:23', '', NULL, '参数设置菜单');
INSERT INTO `sys_menu` VALUES (107, '通知公告', 1, 8, 'notice', 'system/notice/index', '', '', 1, 0, 'C', '0', '0', 'system:notice:list', 'message', 'admin', '2024-08-14 02:48:23', '', NULL, '通知公告菜单');
INSERT INTO `sys_menu` VALUES (108, '日志管理', 1, 9, 'log', '', '', '', 1, 0, 'M', '0', '0', '', 'log', 'admin', '2024-08-14 02:48:23', '', NULL, '日志管理菜单');
INSERT INTO `sys_menu` VALUES (109, '在线用户', 2, 1, 'online', 'monitor/online/index', '', '', 1, 0, 'C', '0', '0', 'monitor:online:list', 'online', 'admin', '2024-08-14 02:48:23', '', NULL, '在线用户菜单');
INSERT INTO `sys_menu` VALUES (110, '定时任务', 2, 2, 'job', 'monitor/job/index', '', '', 1, 0, 'C', '0', '0', 'monitor:job:list', 'job', 'admin', '2024-08-14 02:48:23', '', NULL, '定时任务菜单');
INSERT INTO `sys_menu` VALUES (111, '数据监控', 2, 3, 'druid', 'monitor/druid/index', '', '', 1, 0, 'C', '0', '0', 'monitor:druid:list', 'druid', 'admin', '2024-08-14 02:48:23', '', NULL, '数据监控菜单');
INSERT INTO `sys_menu` VALUES (112, '服务监控', 2, 4, 'server', 'monitor/server/index', '', '', 1, 0, 'C', '0', '0', 'monitor:server:list', 'server', 'admin', '2024-08-14 02:48:23', '', NULL, '服务监控菜单');
INSERT INTO `sys_menu` VALUES (113, '缓存监控', 2, 5, 'cache', 'monitor/cache/index', '', '', 1, 0, 'C', '0', '0', 'monitor:cache:list', 'redis', 'admin', '2024-08-14 02:48:23', '', NULL, '缓存监控菜单');
INSERT INTO `sys_menu` VALUES (114, '缓存列表', 2, 6, 'cacheList', 'monitor/cache/list', '', '', 1, 0, 'C', '0', '0', 'monitor:cache:list', 'redis-list', 'admin', '2024-08-14 02:48:23', '', NULL, '缓存列表菜单');
INSERT INTO `sys_menu` VALUES (115, '表单构建', 3, 1, 'build', 'tool/build/index', '', '', 1, 0, 'C', '0', '0', 'tool:build:list', 'build', 'admin', '2024-08-14 02:48:23', '', NULL, '表单构建菜单');
INSERT INTO `sys_menu` VALUES (116, '代码生成', 3, 2, 'gen', 'tool/gen/index', '', '', 1, 0, 'C', '0', '0', 'tool:gen:list', 'code', 'admin', '2024-08-14 02:48:23', '', NULL, '代码生成菜单');
INSERT INTO `sys_menu` VALUES (117, '系统接口', 3, 3, 'swagger', 'tool/swagger/index', '', '', 1, 0, 'C', '0', '0', 'tool:swagger:list', 'swagger', 'admin', '2024-08-14 02:48:23', '', NULL, '系统接口菜单');
INSERT INTO `sys_menu` VALUES (500, '操作日志', 108, 1, 'operlog', 'monitor/operlog/index', '', '', 1, 0, 'C', '0', '0', 'monitor:operlog:list', 'form', 'admin', '2024-08-14 02:48:23', '', NULL, '操作日志菜单');
INSERT INTO `sys_menu` VALUES (501, '登录日志', 108, 2, 'logininfor', 'monitor/logininfor/index', '', '', 1, 0, 'C', '0', '0', 'monitor:logininfor:list', 'logininfor', 'admin', '2024-08-14 02:48:23', '', NULL, '登录日志菜单');
INSERT INTO `sys_menu` VALUES (1000, '用户查询', 100, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1001, '用户新增', 100, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1002, '用户修改', 100, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1003, '用户删除', 100, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1004, '用户导出', 100, 5, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1005, '用户导入', 100, 6, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:import', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1006, '重置密码', 100, 7, '', '', '', '', 1, 0, 'F', '0', '0', 'system:user:resetPwd', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1007, '角色查询', 101, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1008, '角色新增', 101, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1009, '角色修改', 101, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1010, '角色删除', 101, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1011, '角色导出', 101, 5, '', '', '', '', 1, 0, 'F', '0', '0', 'system:role:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1012, '菜单查询', 102, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1013, '菜单新增', 102, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1014, '菜单修改', 102, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1015, '菜单删除', 102, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:menu:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1016, '部门查询', 103, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1017, '部门新增', 103, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1018, '部门修改', 103, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1019, '部门删除', 103, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:dept:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1020, '岗位查询', 104, 1, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1021, '岗位新增', 104, 2, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1022, '岗位修改', 104, 3, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1023, '岗位删除', 104, 4, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1024, '岗位导出', 104, 5, '', '', '', '', 1, 0, 'F', '0', '0', 'system:post:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1025, '字典查询', 105, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1026, '字典新增', 105, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1027, '字典修改', 105, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1028, '字典删除', 105, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1029, '字典导出', 105, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:dict:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1030, '参数查询', 106, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1031, '参数新增', 106, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1032, '参数修改', 106, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1033, '参数删除', 106, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1034, '参数导出', 106, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:config:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1035, '公告查询', 107, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1036, '公告新增', 107, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1037, '公告修改', 107, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1038, '公告删除', 107, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'system:notice:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1039, '操作查询', 500, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:operlog:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1040, '操作删除', 500, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:operlog:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1041, '日志导出', 500, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:operlog:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1042, '登录查询', 501, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1043, '登录删除', 501, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1044, '日志导出', 501, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1045, '账户解锁', 501, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:logininfor:unlock', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1046, '在线查询', 109, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1047, '批量强退', 109, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:batchLogout', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1048, '单条强退', 109, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:online:forceLogout', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1049, '任务查询', 110, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1050, '任务新增', 110, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:add', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1051, '任务修改', 110, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1052, '任务删除', 110, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1053, '状态修改', 110, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:changeStatus', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1054, '任务导出', 110, 6, '#', '', '', '', 1, 0, 'F', '0', '0', 'monitor:job:export', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1055, '生成查询', 116, 1, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:query', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1056, '生成修改', 116, 2, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:edit', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1057, '生成删除', 116, 3, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:remove', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1058, '导入代码', 116, 4, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:import', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1059, '预览代码', 116, 5, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:preview', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (1060, '生成代码', 116, 6, '#', '', '', '', 1, 0, 'F', '0', '0', 'tool:gen:code', '#', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2000, '服务管理', 0, 4, 'serve', NULL, NULL, '', 1, 0, 'M', '0', '0', '', 'icon_fwgl', 'admin', '2024-08-14 02:59:12', 'admin', '2026-03-09 11:33:57', '');
INSERT INTO `sys_menu` VALUES (2001, '护理项目', 2000, 1, 'project', 'nursing/project/index', NULL, '', 1, 0, 'C', '0', '0', 'nursing:project:list', 'color', 'admin', '2024-08-14 03:00:15', 'admin', '2025-04-18 10:24:00', '护理项目菜单');
INSERT INTO `sys_menu` VALUES (2002, '护理项目查询', 2001, 1, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:project:query', '#', 'admin', '2024-08-14 03:00:15', 'admin', '2025-04-18 10:24:09', '');
INSERT INTO `sys_menu` VALUES (2003, '护理项目新增', 2001, 2, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:project:add', '#', 'admin', '2024-08-14 03:00:15', 'admin', '2025-04-18 10:24:13', '');
INSERT INTO `sys_menu` VALUES (2004, '护理项目修改', 2001, 3, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:project:edit', '#', 'admin', '2024-08-14 03:00:15', 'admin', '2025-04-18 10:24:18', '');
INSERT INTO `sys_menu` VALUES (2005, '护理项目删除', 2001, 4, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:project:remove', '#', 'admin', '2024-08-14 03:00:15', 'admin', '2025-04-18 10:24:21', '');
INSERT INTO `sys_menu` VALUES (2006, '护理项目导出', 2001, 5, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:project:export', '#', 'admin', '2024-08-14 03:00:15', 'admin', '2025-04-18 10:24:25', '');
INSERT INTO `sys_menu` VALUES (2007, '护理等级', 2000, 1, 'nursingLevel', 'nursing/nursingLevel/index', NULL, '', 1, 0, 'C', '0', '0', 'nursing:nursingLevel:list', 'guide', 'admin', '2024-08-14 08:29:05', 'admin', '2024-08-22 12:16:22', '护理等级菜单');
INSERT INTO `sys_menu` VALUES (2008, '护理等级查询', 2007, 1, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingLevel:query', '#', 'admin', '2024-08-14 08:29:05', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2009, '护理等级新增', 2007, 2, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingLevel:add', '#', 'admin', '2024-08-14 08:29:05', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2010, '护理等级修改', 2007, 3, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingLevel:edit', '#', 'admin', '2024-08-14 08:29:05', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2011, '护理等级删除', 2007, 4, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingLevel:remove', '#', 'admin', '2024-08-14 08:29:05', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2012, '护理等级导出', 2007, 5, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingLevel:export', '#', 'admin', '2024-08-14 08:29:05', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2013, '护理计划', 2000, 1, 'nursingPlan', 'nursing/nursingPlan/index', NULL, '', 1, 0, 'C', '0', '0', 'nursing:nursingPlan:list', 'druid', 'admin', '2024-08-14 08:29:10', 'admin', '2024-08-22 12:16:43', '护理计划菜单');
INSERT INTO `sys_menu` VALUES (2014, '护理计划查询', 2013, 1, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingPlan:query', '#', 'admin', '2024-08-14 08:29:10', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2015, '护理计划新增', 2013, 2, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingPlan:add', '#', 'admin', '2024-08-14 08:29:10', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2016, '护理计划修改', 2013, 3, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingPlan:edit', '#', 'admin', '2024-08-14 08:29:10', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2017, '护理计划删除', 2013, 4, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingPlan:remove', '#', 'admin', '2024-08-14 08:29:10', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2018, '护理计划导出', 2013, 5, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:nursingPlan:export', '#', 'admin', '2024-08-14 08:29:10', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2019, '在住管理', 0, 3, 'liveIn', NULL, NULL, '', 1, 0, 'M', '0', '0', '', 'icon_zzgl', 'admin', '2024-08-22 06:49:19', 'admin', '2026-03-09 11:32:42', '');
INSERT INTO `sys_menu` VALUES (2020, '房型设置', 2019, 0, 'houseSet', 'nursing/roomType/index', NULL, '', 1, 0, 'C', '0', '0', NULL, 'size', 'admin', '2024-08-22 06:50:50', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2021, '床位预览', 2019, 2, 'floor', 'nursing/floor/index', NULL, '', 1, 0, 'C', '0', '0', NULL, 'tree-table', 'admin', '2024-08-22 08:15:05', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2022, '入退管理', 0, 2, 'enterQuit', NULL, NULL, '', 1, 0, 'M', '0', '0', '', 'component', 'admin', '2024-08-23 12:52:34', 'admin', '2024-08-29 06:42:15', '');
INSERT INTO `sys_menu` VALUES (2023, '入住办理', 2022, 1, 'checkIn', 'nursing/checkIn/index', NULL, '', 1, 0, 'C', '0', '0', 'nursing:checkIn:list', 'edit', 'admin', '2024-08-23 13:13:48', 'admin', '2024-08-24 02:58:12', '入住菜单');
INSERT INTO `sys_menu` VALUES (2024, '入住查询', 2023, 1, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:checkIn:query', '#', 'admin', '2024-08-23 13:13:48', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2025, '入住申请', 2023, 2, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:checkIn:add', '#', 'admin', '2024-08-23 13:13:48', 'admin', '2026-03-18 16:57:30', '');
INSERT INTO `sys_menu` VALUES (2026, '入住详情', 2023, 3, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:checkIn:edit', '#', 'admin', '2024-08-23 13:13:48', 'admin', '2026-03-18 16:57:51', '');
INSERT INTO `sys_menu` VALUES (2027, '入住删除', 2023, 4, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:checkIn:remove', '#', 'admin', '2024-08-23 13:13:48', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2028, '入住导出', 2023, 5, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:checkIn:export', '#', 'admin', '2024-08-23 13:13:48', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2035, '入住详情', 2022, 0, 'checkInInfo', 'nursing/checkIn/details', NULL, '', 1, 0, 'C', '1', '0', NULL, 'checkbox', 'admin', '2024-08-24 03:44:48', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2037, '智能监测', 0, 5, 'intelligence', NULL, NULL, '', 1, 0, 'M', '0', '0', '', 'icon_znjc', 'admin', '2024-08-29 06:43:14', 'admin', '2026-03-09 11:35:17', '');
INSERT INTO `sys_menu` VALUES (2039, '健康评估', 2022, 0, 'healthAssessment', 'nursing/healthAssessment/index', NULL, '', 1, 0, 'C', '0', '0', '', 'eye', 'admin', '2024-08-29 06:48:51', 'admin', '2026-03-06 16:51:20', '');
INSERT INTO `sys_menu` VALUES (2040, '评估详情', 2022, 2, 'healthDetails', 'nursing/healthAssessment/details', NULL, '', 1, 0, 'F', '1', '0', 'enterQuit:healthAssessment:details', '#', 'admin', '2024-08-29 06:49:53', 'admin', '2026-03-18 16:37:46', '');
INSERT INTO `sys_menu` VALUES (2041, '负责老人', 2000, 4, 'oldPeople', 'nursing/oldPeople/index', NULL, '', 1, 0, 'C', '0', '0', '', 'peoples', 'admin', '2024-08-29 06:52:12', 'admin', '2024-08-29 06:52:23', '');
INSERT INTO `sys_menu` VALUES (2042, '任务安排', 2000, 5, 'arrange', 'nursing/arrange/index', NULL, '', 1, 0, 'C', '0', '0', NULL, 'redis-list', 'admin', '2024-08-29 06:53:06', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2043, '任务安排详情', 2000, 1, 'arrangeDetails', 'nursing/arrange/details', NULL, '', 1, 0, 'C', '1', '0', NULL, '#', 'admin', '2024-08-29 06:53:37', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2044, '设备管理', 2037, 0, 'device', 'nursing/device/index', NULL, '', 1, 0, 'C', '0', '0', '', 'tool', 'admin', '2024-08-29 06:54:54', 'admin', '2024-08-29 07:13:42', '');
INSERT INTO `sys_menu` VALUES (2045, '设备详情', 2037, 0, 'details', 'nursing/device/details', NULL, '', 1, 0, 'C', '1', '0', NULL, '#', 'admin', '2024-08-29 06:55:25', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2046, '新增报警规则', 2037, 0, 'ruleDetails', 'nursing/alertRule/details', NULL, '', 1, 0, 'C', '1', '0', NULL, '#', 'admin', '2024-08-29 06:56:01', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2047, '报警规则', 2037, 1, 'alertRule', 'nursing/alertRule/index', NULL, '', 1, 0, 'C', '0', '0', NULL, 'nested', 'admin', '2024-08-29 06:56:48', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2048, '报警数据', 2037, 2, 'alertData', 'nursing/alertData/index', NULL, '', 1, 0, 'C', '0', '0', NULL, 'skill', 'admin', '2024-08-29 06:57:25', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2050, '智能床位', 2019, 3, 'smartBed', 'nursing/smartBed/index', NULL, '', 1, 0, 'C', '0', '0', NULL, 'example', 'admin', '2025-05-04 01:06:31', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2052, '星海智询', 0, 0, 'zhixun', NULL, NULL, '', 1, 0, 'M', '0', '0', '', 'icon_xhzx', 'admin', '2025-07-16 22:26:29', 'admin', '2026-03-10 11:02:23', '');
INSERT INTO `sys_menu` VALUES (2053, '小智', 2052, 1, 'xiaozhi', 'nursing/zhixun/index', NULL, '', 1, 0, 'C', '0', '0', '', 'drag', 'admin', '2025-07-16 22:27:41', 'admin', '2025-07-16 23:33:43', '');
INSERT INTO `sys_menu` VALUES (2055, '知识库', 2052, 1, 'knowledgeBase', 'nursing/knowledgeBase/index', NULL, '', 1, 0, 'C', '0', '0', 'nursing:knowledgeBase:list', 'education', 'admin', '2025-07-21 23:06:50', 'admin', '2025-07-21 23:12:37', '知识库菜单');
INSERT INTO `sys_menu` VALUES (2056, '知识库查询', 2055, 1, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:knowledgeBase:query', '#', 'admin', '2025-07-21 23:06:50', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2057, '知识库新增', 2055, 2, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:knowledgeBase:add', '#', 'admin', '2025-07-21 23:06:50', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2058, '知识库修改', 2055, 3, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:knowledgeBase:edit', '#', 'admin', '2025-07-21 23:06:50', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2059, '知识库删除', 2055, 4, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:knowledgeBase:remove', '#', 'admin', '2025-07-21 23:06:50', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2060, '知识库导出', 2055, 5, '#', '', NULL, '', 1, 0, 'F', '0', '0', 'nursing:knowledgeBase:export', '#', 'admin', '2025-07-21 23:06:50', '', NULL, '');
INSERT INTO `sys_menu` VALUES (2061, '新增修改评估', 2022, 3, 'detailsSteps', 'nursing/healthAssessment/detailsSteps', NULL, '', 1, 0, 'F', '1', '0', 'enterQuit:healthAssessment:detailsSteps', 'drag', 'admin', '2026-02-05 11:51:18', 'admin', '2026-03-18 16:36:39', '');
INSERT INTO `sys_menu` VALUES (2062, '来访管理', 0, 1, 'appointment', NULL, NULL, '', 1, 0, 'M', '0', '0', '', 'icon_laifang', 'admin', '2026-03-10 17:00:58', 'admin', '2026-03-11 09:42:29', '');
INSERT INTO `sys_menu` VALUES (2063, '预约登记', 2062, 0, 'reservation', 'nursing/reservation/index', NULL, '', 1, 0, 'C', '0', '0', '', '#', 'admin', '2026-03-10 17:03:30', 'admin', '2026-03-10 17:07:15', '');

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `notice_id` int NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `notice_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告标题',
  `notice_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告类型（1通知 2公告）',
  `notice_content` longblob NULL COMMENT '公告内容',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '公告状态（0正常 1关闭）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '通知公告表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
INSERT INTO `sys_notice` VALUES (1, '温馨提醒：2018-07-01 若依新版本发布啦', '2', 0xE696B0E78988E69CACE58685E5AEB9, '0', 'admin', '2024-08-14 02:48:24', '', NULL, '管理员');
INSERT INTO `sys_notice` VALUES (2, '维护通知：2018-07-01 若依系统凌晨维护', '1', 0xE7BBB4E68AA4E58685E5AEB9, '0', 'admin', '2024-08-14 02:48:24', '', NULL, '管理员');

-- ----------------------------
-- Table structure for sys_oper_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_oper_log`;
CREATE TABLE `sys_oper_log`  (
  `oper_id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '模块标题',
  `business_type` int NULL DEFAULT 0 COMMENT '业务类型（0其它 1新增 2修改 3删除）',
  `method` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '方法名称',
  `request_method` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '请求方式',
  `operator_type` int NULL DEFAULT 0 COMMENT '操作类别（0其它 1后台用户 2手机端用户）',
  `oper_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '操作人员',
  `dept_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '部门名称',
  `oper_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '请求URL',
  `oper_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '主机地址',
  `oper_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '操作地点',
  `oper_param` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '请求参数',
  `json_result` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '返回参数',
  `status` int NULL DEFAULT 0 COMMENT '操作状态（0正常 1异常）',
  `error_msg` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '错误消息',
  `oper_time` datetime NULL DEFAULT NULL COMMENT '操作时间',
  `cost_time` bigint NULL DEFAULT 0 COMMENT '消耗时间',
  PRIMARY KEY (`oper_id`) USING BTREE,
  INDEX `idx_sys_oper_log_bt`(`business_type` ASC) USING BTREE,
  INDEX `idx_sys_oper_log_s`(`status` ASC) USING BTREE,
  INDEX `idx_sys_oper_log_ot`(`oper_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '操作日志记录' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_oper_log
-- ----------------------------
INSERT INTO `sys_oper_log` VALUES (1, '操作日志', 9, 'com.xhzb.web.controller.monitor.SysOperlogController.clean()', 'DELETE', 1, 'admin', '院长办公室', '/monitor/operlog/clean', '127.0.0.1', '内网IP', '', '{\"msg\":\"操作成功\",\"code\":200}', 0, '', '2026-03-28 09:44:48', 54);
INSERT INTO `sys_oper_log` VALUES (2, '登录日志', 9, 'com.xhzb.web.controller.monitor.SysLogininforController.clean()', 'DELETE', 1, 'admin', '院长办公室', '/monitor/logininfor/clean', '127.0.0.1', '内网IP', '', '{\"msg\":\"操作成功\",\"code\":200}', 0, '', '2026-03-28 09:44:51', 43);

-- ----------------------------
-- Table structure for sys_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post`  (
  `post_id` bigint NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  `post_code` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位编码',
  `post_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位名称',
  `post_sort` int NOT NULL COMMENT '显示顺序',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '状态（0正常 1停用）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`post_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '岗位信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
INSERT INTO `sys_post` VALUES (1, 'ceo', '董事长', 1, '0', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_post` VALUES (2, 'se', '项目经理', 2, '0', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_post` VALUES (3, 'hr', '人力资源', 3, '0', 'admin', '2024-08-14 02:48:23', '', NULL, '');
INSERT INTO `sys_post` VALUES (4, 'user', '普通员工', 4, '0', 'admin', '2024-08-14 02:48:23', '', NULL, '');

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `role_id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `role_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色权限字符串',
  `role_sort` int NOT NULL COMMENT '显示顺序',
  `data_scope` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '1' COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）',
  `menu_check_strictly` tinyint(1) NULL DEFAULT 1 COMMENT '菜单树选择项是否关联显示',
  `dept_check_strictly` tinyint(1) NULL DEFAULT 1 COMMENT '部门树选择项是否关联显示',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 105 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色信息表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES (1, '超级管理员', 'admin', 1, '1', 1, 1, '0', '0', 'admin', '2024-08-14 02:48:23', '', NULL, '超级管理员');
INSERT INTO `sys_role` VALUES (2, '普通角色', 'common', 2, '2', 1, 1, '0', '0', 'admin', '2024-08-14 02:48:23', '', NULL, '普通角色');
INSERT INTO `sys_role` VALUES (100, '行政主管', 'sys_role', 0, '1', 1, 1, '0', '0', 'admin', '2025-04-25 15:21:26', 'admin', '2025-07-16 19:25:31', NULL);
INSERT INTO `sys_role` VALUES (101, '院长', 'yuanzhang', 0, '1', 1, 1, '0', '0', 'admin', '2025-04-26 01:33:42', 'admin', '2025-07-16 19:25:28', NULL);
INSERT INTO `sys_role` VALUES (102, '护理员', 'nursing_elder', 5, '1', 1, 1, '0', '0', 'admin', '2025-05-04 04:14:26', 'admin', '2025-05-06 16:42:59', NULL);
INSERT INTO `sys_role` VALUES (103, '行政', 'administrator', 77, '1', 1, 1, '0', '0', 'admin', '2025-05-04 04:15:38', 'admin', '2025-07-16 19:25:15', NULL);
INSERT INTO `sys_role` VALUES (104, '测试', '123', 0, '1', 1, 1, '0', '0', 'admin', '2026-03-10 15:14:27', 'admin', '2026-03-16 17:56:55', NULL);

-- ----------------------------
-- Table structure for sys_role_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_dept`;
CREATE TABLE `sys_role_dept`  (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `dept_id` bigint NOT NULL COMMENT '部门ID',
  PRIMARY KEY (`role_id`, `dept_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色和部门关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role_dept
-- ----------------------------
INSERT INTO `sys_role_dept` VALUES (2, 100);
INSERT INTO `sys_role_dept` VALUES (2, 101);
INSERT INTO `sys_role_dept` VALUES (2, 105);

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色和菜单关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES (2, 1);
INSERT INTO `sys_role_menu` VALUES (2, 2);
INSERT INTO `sys_role_menu` VALUES (2, 3);
INSERT INTO `sys_role_menu` VALUES (2, 4);
INSERT INTO `sys_role_menu` VALUES (2, 100);
INSERT INTO `sys_role_menu` VALUES (2, 101);
INSERT INTO `sys_role_menu` VALUES (2, 102);
INSERT INTO `sys_role_menu` VALUES (2, 103);
INSERT INTO `sys_role_menu` VALUES (2, 104);
INSERT INTO `sys_role_menu` VALUES (2, 105);
INSERT INTO `sys_role_menu` VALUES (2, 106);
INSERT INTO `sys_role_menu` VALUES (2, 107);
INSERT INTO `sys_role_menu` VALUES (2, 108);
INSERT INTO `sys_role_menu` VALUES (2, 109);
INSERT INTO `sys_role_menu` VALUES (2, 110);
INSERT INTO `sys_role_menu` VALUES (2, 111);
INSERT INTO `sys_role_menu` VALUES (2, 112);
INSERT INTO `sys_role_menu` VALUES (2, 113);
INSERT INTO `sys_role_menu` VALUES (2, 114);
INSERT INTO `sys_role_menu` VALUES (2, 115);
INSERT INTO `sys_role_menu` VALUES (2, 116);
INSERT INTO `sys_role_menu` VALUES (2, 117);
INSERT INTO `sys_role_menu` VALUES (2, 500);
INSERT INTO `sys_role_menu` VALUES (2, 501);
INSERT INTO `sys_role_menu` VALUES (2, 1000);
INSERT INTO `sys_role_menu` VALUES (2, 1001);
INSERT INTO `sys_role_menu` VALUES (2, 1002);
INSERT INTO `sys_role_menu` VALUES (2, 1003);
INSERT INTO `sys_role_menu` VALUES (2, 1004);
INSERT INTO `sys_role_menu` VALUES (2, 1005);
INSERT INTO `sys_role_menu` VALUES (2, 1006);
INSERT INTO `sys_role_menu` VALUES (2, 1007);
INSERT INTO `sys_role_menu` VALUES (2, 1008);
INSERT INTO `sys_role_menu` VALUES (2, 1009);
INSERT INTO `sys_role_menu` VALUES (2, 1010);
INSERT INTO `sys_role_menu` VALUES (2, 1011);
INSERT INTO `sys_role_menu` VALUES (2, 1012);
INSERT INTO `sys_role_menu` VALUES (2, 1013);
INSERT INTO `sys_role_menu` VALUES (2, 1014);
INSERT INTO `sys_role_menu` VALUES (2, 1015);
INSERT INTO `sys_role_menu` VALUES (2, 1016);
INSERT INTO `sys_role_menu` VALUES (2, 1017);
INSERT INTO `sys_role_menu` VALUES (2, 1018);
INSERT INTO `sys_role_menu` VALUES (2, 1019);
INSERT INTO `sys_role_menu` VALUES (2, 1020);
INSERT INTO `sys_role_menu` VALUES (2, 1021);
INSERT INTO `sys_role_menu` VALUES (2, 1022);
INSERT INTO `sys_role_menu` VALUES (2, 1023);
INSERT INTO `sys_role_menu` VALUES (2, 1024);
INSERT INTO `sys_role_menu` VALUES (2, 1025);
INSERT INTO `sys_role_menu` VALUES (2, 1026);
INSERT INTO `sys_role_menu` VALUES (2, 1027);
INSERT INTO `sys_role_menu` VALUES (2, 1028);
INSERT INTO `sys_role_menu` VALUES (2, 1029);
INSERT INTO `sys_role_menu` VALUES (2, 1030);
INSERT INTO `sys_role_menu` VALUES (2, 1031);
INSERT INTO `sys_role_menu` VALUES (2, 1032);
INSERT INTO `sys_role_menu` VALUES (2, 1033);
INSERT INTO `sys_role_menu` VALUES (2, 1034);
INSERT INTO `sys_role_menu` VALUES (2, 1035);
INSERT INTO `sys_role_menu` VALUES (2, 1036);
INSERT INTO `sys_role_menu` VALUES (2, 1037);
INSERT INTO `sys_role_menu` VALUES (2, 1038);
INSERT INTO `sys_role_menu` VALUES (2, 1039);
INSERT INTO `sys_role_menu` VALUES (2, 1040);
INSERT INTO `sys_role_menu` VALUES (2, 1041);
INSERT INTO `sys_role_menu` VALUES (2, 1042);
INSERT INTO `sys_role_menu` VALUES (2, 1043);
INSERT INTO `sys_role_menu` VALUES (2, 1044);
INSERT INTO `sys_role_menu` VALUES (2, 1045);
INSERT INTO `sys_role_menu` VALUES (2, 1046);
INSERT INTO `sys_role_menu` VALUES (2, 1047);
INSERT INTO `sys_role_menu` VALUES (2, 1048);
INSERT INTO `sys_role_menu` VALUES (2, 1049);
INSERT INTO `sys_role_menu` VALUES (2, 1050);
INSERT INTO `sys_role_menu` VALUES (2, 1051);
INSERT INTO `sys_role_menu` VALUES (2, 1052);
INSERT INTO `sys_role_menu` VALUES (2, 1053);
INSERT INTO `sys_role_menu` VALUES (2, 1054);
INSERT INTO `sys_role_menu` VALUES (2, 1055);
INSERT INTO `sys_role_menu` VALUES (2, 1056);
INSERT INTO `sys_role_menu` VALUES (2, 1057);
INSERT INTO `sys_role_menu` VALUES (2, 1058);
INSERT INTO `sys_role_menu` VALUES (2, 1059);
INSERT INTO `sys_role_menu` VALUES (2, 1060);
INSERT INTO `sys_role_menu` VALUES (100, 1);
INSERT INTO `sys_role_menu` VALUES (100, 2);
INSERT INTO `sys_role_menu` VALUES (100, 3);
INSERT INTO `sys_role_menu` VALUES (100, 100);
INSERT INTO `sys_role_menu` VALUES (100, 101);
INSERT INTO `sys_role_menu` VALUES (100, 102);
INSERT INTO `sys_role_menu` VALUES (100, 103);
INSERT INTO `sys_role_menu` VALUES (100, 104);
INSERT INTO `sys_role_menu` VALUES (100, 105);
INSERT INTO `sys_role_menu` VALUES (100, 106);
INSERT INTO `sys_role_menu` VALUES (100, 107);
INSERT INTO `sys_role_menu` VALUES (100, 108);
INSERT INTO `sys_role_menu` VALUES (100, 109);
INSERT INTO `sys_role_menu` VALUES (100, 110);
INSERT INTO `sys_role_menu` VALUES (100, 111);
INSERT INTO `sys_role_menu` VALUES (100, 112);
INSERT INTO `sys_role_menu` VALUES (100, 113);
INSERT INTO `sys_role_menu` VALUES (100, 114);
INSERT INTO `sys_role_menu` VALUES (100, 115);
INSERT INTO `sys_role_menu` VALUES (100, 116);
INSERT INTO `sys_role_menu` VALUES (100, 117);
INSERT INTO `sys_role_menu` VALUES (100, 500);
INSERT INTO `sys_role_menu` VALUES (100, 501);
INSERT INTO `sys_role_menu` VALUES (100, 1000);
INSERT INTO `sys_role_menu` VALUES (100, 1001);
INSERT INTO `sys_role_menu` VALUES (100, 1002);
INSERT INTO `sys_role_menu` VALUES (100, 1003);
INSERT INTO `sys_role_menu` VALUES (100, 1004);
INSERT INTO `sys_role_menu` VALUES (100, 1005);
INSERT INTO `sys_role_menu` VALUES (100, 1006);
INSERT INTO `sys_role_menu` VALUES (100, 1007);
INSERT INTO `sys_role_menu` VALUES (100, 1008);
INSERT INTO `sys_role_menu` VALUES (100, 1009);
INSERT INTO `sys_role_menu` VALUES (100, 1010);
INSERT INTO `sys_role_menu` VALUES (100, 1011);
INSERT INTO `sys_role_menu` VALUES (100, 1012);
INSERT INTO `sys_role_menu` VALUES (100, 1013);
INSERT INTO `sys_role_menu` VALUES (100, 1014);
INSERT INTO `sys_role_menu` VALUES (100, 1015);
INSERT INTO `sys_role_menu` VALUES (100, 1016);
INSERT INTO `sys_role_menu` VALUES (100, 1017);
INSERT INTO `sys_role_menu` VALUES (100, 1018);
INSERT INTO `sys_role_menu` VALUES (100, 1019);
INSERT INTO `sys_role_menu` VALUES (100, 1020);
INSERT INTO `sys_role_menu` VALUES (100, 1021);
INSERT INTO `sys_role_menu` VALUES (100, 1022);
INSERT INTO `sys_role_menu` VALUES (100, 1023);
INSERT INTO `sys_role_menu` VALUES (100, 1024);
INSERT INTO `sys_role_menu` VALUES (100, 1025);
INSERT INTO `sys_role_menu` VALUES (100, 1026);
INSERT INTO `sys_role_menu` VALUES (100, 1027);
INSERT INTO `sys_role_menu` VALUES (100, 1028);
INSERT INTO `sys_role_menu` VALUES (100, 1029);
INSERT INTO `sys_role_menu` VALUES (100, 1030);
INSERT INTO `sys_role_menu` VALUES (100, 1031);
INSERT INTO `sys_role_menu` VALUES (100, 1032);
INSERT INTO `sys_role_menu` VALUES (100, 1033);
INSERT INTO `sys_role_menu` VALUES (100, 1034);
INSERT INTO `sys_role_menu` VALUES (100, 1035);
INSERT INTO `sys_role_menu` VALUES (100, 1036);
INSERT INTO `sys_role_menu` VALUES (100, 1037);
INSERT INTO `sys_role_menu` VALUES (100, 1038);
INSERT INTO `sys_role_menu` VALUES (100, 1039);
INSERT INTO `sys_role_menu` VALUES (100, 1040);
INSERT INTO `sys_role_menu` VALUES (100, 1041);
INSERT INTO `sys_role_menu` VALUES (100, 1042);
INSERT INTO `sys_role_menu` VALUES (100, 1043);
INSERT INTO `sys_role_menu` VALUES (100, 1044);
INSERT INTO `sys_role_menu` VALUES (100, 1045);
INSERT INTO `sys_role_menu` VALUES (100, 1046);
INSERT INTO `sys_role_menu` VALUES (100, 1047);
INSERT INTO `sys_role_menu` VALUES (100, 1048);
INSERT INTO `sys_role_menu` VALUES (100, 1049);
INSERT INTO `sys_role_menu` VALUES (100, 1050);
INSERT INTO `sys_role_menu` VALUES (100, 1051);
INSERT INTO `sys_role_menu` VALUES (100, 1052);
INSERT INTO `sys_role_menu` VALUES (100, 1053);
INSERT INTO `sys_role_menu` VALUES (100, 1054);
INSERT INTO `sys_role_menu` VALUES (100, 1055);
INSERT INTO `sys_role_menu` VALUES (100, 1056);
INSERT INTO `sys_role_menu` VALUES (100, 1057);
INSERT INTO `sys_role_menu` VALUES (100, 1058);
INSERT INTO `sys_role_menu` VALUES (100, 1059);
INSERT INTO `sys_role_menu` VALUES (100, 1060);
INSERT INTO `sys_role_menu` VALUES (100, 2000);
INSERT INTO `sys_role_menu` VALUES (100, 2001);
INSERT INTO `sys_role_menu` VALUES (100, 2002);
INSERT INTO `sys_role_menu` VALUES (100, 2003);
INSERT INTO `sys_role_menu` VALUES (100, 2004);
INSERT INTO `sys_role_menu` VALUES (100, 2005);
INSERT INTO `sys_role_menu` VALUES (100, 2006);
INSERT INTO `sys_role_menu` VALUES (100, 2007);
INSERT INTO `sys_role_menu` VALUES (100, 2008);
INSERT INTO `sys_role_menu` VALUES (100, 2009);
INSERT INTO `sys_role_menu` VALUES (100, 2010);
INSERT INTO `sys_role_menu` VALUES (100, 2011);
INSERT INTO `sys_role_menu` VALUES (100, 2012);
INSERT INTO `sys_role_menu` VALUES (100, 2013);
INSERT INTO `sys_role_menu` VALUES (100, 2014);
INSERT INTO `sys_role_menu` VALUES (100, 2015);
INSERT INTO `sys_role_menu` VALUES (100, 2016);
INSERT INTO `sys_role_menu` VALUES (100, 2017);
INSERT INTO `sys_role_menu` VALUES (100, 2018);
INSERT INTO `sys_role_menu` VALUES (100, 2037);
INSERT INTO `sys_role_menu` VALUES (100, 2041);
INSERT INTO `sys_role_menu` VALUES (100, 2042);
INSERT INTO `sys_role_menu` VALUES (100, 2043);
INSERT INTO `sys_role_menu` VALUES (100, 2044);
INSERT INTO `sys_role_menu` VALUES (100, 2045);
INSERT INTO `sys_role_menu` VALUES (100, 2046);
INSERT INTO `sys_role_menu` VALUES (100, 2047);
INSERT INTO `sys_role_menu` VALUES (100, 2048);
INSERT INTO `sys_role_menu` VALUES (101, 1);
INSERT INTO `sys_role_menu` VALUES (101, 2);
INSERT INTO `sys_role_menu` VALUES (101, 3);
INSERT INTO `sys_role_menu` VALUES (101, 100);
INSERT INTO `sys_role_menu` VALUES (101, 101);
INSERT INTO `sys_role_menu` VALUES (101, 102);
INSERT INTO `sys_role_menu` VALUES (101, 103);
INSERT INTO `sys_role_menu` VALUES (101, 104);
INSERT INTO `sys_role_menu` VALUES (101, 105);
INSERT INTO `sys_role_menu` VALUES (101, 106);
INSERT INTO `sys_role_menu` VALUES (101, 107);
INSERT INTO `sys_role_menu` VALUES (101, 108);
INSERT INTO `sys_role_menu` VALUES (101, 109);
INSERT INTO `sys_role_menu` VALUES (101, 110);
INSERT INTO `sys_role_menu` VALUES (101, 111);
INSERT INTO `sys_role_menu` VALUES (101, 112);
INSERT INTO `sys_role_menu` VALUES (101, 113);
INSERT INTO `sys_role_menu` VALUES (101, 114);
INSERT INTO `sys_role_menu` VALUES (101, 115);
INSERT INTO `sys_role_menu` VALUES (101, 116);
INSERT INTO `sys_role_menu` VALUES (101, 117);
INSERT INTO `sys_role_menu` VALUES (101, 500);
INSERT INTO `sys_role_menu` VALUES (101, 501);
INSERT INTO `sys_role_menu` VALUES (101, 1000);
INSERT INTO `sys_role_menu` VALUES (101, 1001);
INSERT INTO `sys_role_menu` VALUES (101, 1002);
INSERT INTO `sys_role_menu` VALUES (101, 1003);
INSERT INTO `sys_role_menu` VALUES (101, 1004);
INSERT INTO `sys_role_menu` VALUES (101, 1005);
INSERT INTO `sys_role_menu` VALUES (101, 1006);
INSERT INTO `sys_role_menu` VALUES (101, 1007);
INSERT INTO `sys_role_menu` VALUES (101, 1008);
INSERT INTO `sys_role_menu` VALUES (101, 1009);
INSERT INTO `sys_role_menu` VALUES (101, 1010);
INSERT INTO `sys_role_menu` VALUES (101, 1011);
INSERT INTO `sys_role_menu` VALUES (101, 1012);
INSERT INTO `sys_role_menu` VALUES (101, 1013);
INSERT INTO `sys_role_menu` VALUES (101, 1014);
INSERT INTO `sys_role_menu` VALUES (101, 1015);
INSERT INTO `sys_role_menu` VALUES (101, 1016);
INSERT INTO `sys_role_menu` VALUES (101, 1017);
INSERT INTO `sys_role_menu` VALUES (101, 1018);
INSERT INTO `sys_role_menu` VALUES (101, 1019);
INSERT INTO `sys_role_menu` VALUES (101, 1020);
INSERT INTO `sys_role_menu` VALUES (101, 1021);
INSERT INTO `sys_role_menu` VALUES (101, 1022);
INSERT INTO `sys_role_menu` VALUES (101, 1023);
INSERT INTO `sys_role_menu` VALUES (101, 1024);
INSERT INTO `sys_role_menu` VALUES (101, 1025);
INSERT INTO `sys_role_menu` VALUES (101, 1026);
INSERT INTO `sys_role_menu` VALUES (101, 1027);
INSERT INTO `sys_role_menu` VALUES (101, 1028);
INSERT INTO `sys_role_menu` VALUES (101, 1029);
INSERT INTO `sys_role_menu` VALUES (101, 1030);
INSERT INTO `sys_role_menu` VALUES (101, 1031);
INSERT INTO `sys_role_menu` VALUES (101, 1032);
INSERT INTO `sys_role_menu` VALUES (101, 1033);
INSERT INTO `sys_role_menu` VALUES (101, 1034);
INSERT INTO `sys_role_menu` VALUES (101, 1035);
INSERT INTO `sys_role_menu` VALUES (101, 1036);
INSERT INTO `sys_role_menu` VALUES (101, 1037);
INSERT INTO `sys_role_menu` VALUES (101, 1038);
INSERT INTO `sys_role_menu` VALUES (101, 1039);
INSERT INTO `sys_role_menu` VALUES (101, 1040);
INSERT INTO `sys_role_menu` VALUES (101, 1041);
INSERT INTO `sys_role_menu` VALUES (101, 1042);
INSERT INTO `sys_role_menu` VALUES (101, 1043);
INSERT INTO `sys_role_menu` VALUES (101, 1044);
INSERT INTO `sys_role_menu` VALUES (101, 1045);
INSERT INTO `sys_role_menu` VALUES (101, 1046);
INSERT INTO `sys_role_menu` VALUES (101, 1047);
INSERT INTO `sys_role_menu` VALUES (101, 1048);
INSERT INTO `sys_role_menu` VALUES (101, 1049);
INSERT INTO `sys_role_menu` VALUES (101, 1050);
INSERT INTO `sys_role_menu` VALUES (101, 1051);
INSERT INTO `sys_role_menu` VALUES (101, 1052);
INSERT INTO `sys_role_menu` VALUES (101, 1053);
INSERT INTO `sys_role_menu` VALUES (101, 1054);
INSERT INTO `sys_role_menu` VALUES (101, 1055);
INSERT INTO `sys_role_menu` VALUES (101, 1056);
INSERT INTO `sys_role_menu` VALUES (101, 1057);
INSERT INTO `sys_role_menu` VALUES (101, 1058);
INSERT INTO `sys_role_menu` VALUES (101, 1059);
INSERT INTO `sys_role_menu` VALUES (101, 1060);
INSERT INTO `sys_role_menu` VALUES (101, 2019);
INSERT INTO `sys_role_menu` VALUES (101, 2020);
INSERT INTO `sys_role_menu` VALUES (101, 2021);
INSERT INTO `sys_role_menu` VALUES (101, 2022);
INSERT INTO `sys_role_menu` VALUES (101, 2023);
INSERT INTO `sys_role_menu` VALUES (101, 2024);
INSERT INTO `sys_role_menu` VALUES (101, 2025);
INSERT INTO `sys_role_menu` VALUES (101, 2026);
INSERT INTO `sys_role_menu` VALUES (101, 2027);
INSERT INTO `sys_role_menu` VALUES (101, 2028);
INSERT INTO `sys_role_menu` VALUES (101, 2035);
INSERT INTO `sys_role_menu` VALUES (101, 2037);
INSERT INTO `sys_role_menu` VALUES (101, 2039);
INSERT INTO `sys_role_menu` VALUES (101, 2040);
INSERT INTO `sys_role_menu` VALUES (101, 2044);
INSERT INTO `sys_role_menu` VALUES (101, 2045);
INSERT INTO `sys_role_menu` VALUES (101, 2046);
INSERT INTO `sys_role_menu` VALUES (101, 2047);
INSERT INTO `sys_role_menu` VALUES (101, 2048);
INSERT INTO `sys_role_menu` VALUES (102, 2000);
INSERT INTO `sys_role_menu` VALUES (102, 2001);
INSERT INTO `sys_role_menu` VALUES (102, 2002);
INSERT INTO `sys_role_menu` VALUES (102, 2003);
INSERT INTO `sys_role_menu` VALUES (102, 2004);
INSERT INTO `sys_role_menu` VALUES (102, 2005);
INSERT INTO `sys_role_menu` VALUES (102, 2006);
INSERT INTO `sys_role_menu` VALUES (102, 2007);
INSERT INTO `sys_role_menu` VALUES (102, 2008);
INSERT INTO `sys_role_menu` VALUES (102, 2009);
INSERT INTO `sys_role_menu` VALUES (102, 2010);
INSERT INTO `sys_role_menu` VALUES (102, 2011);
INSERT INTO `sys_role_menu` VALUES (102, 2012);
INSERT INTO `sys_role_menu` VALUES (102, 2013);
INSERT INTO `sys_role_menu` VALUES (102, 2014);
INSERT INTO `sys_role_menu` VALUES (102, 2015);
INSERT INTO `sys_role_menu` VALUES (102, 2016);
INSERT INTO `sys_role_menu` VALUES (102, 2017);
INSERT INTO `sys_role_menu` VALUES (102, 2018);
INSERT INTO `sys_role_menu` VALUES (102, 2019);
INSERT INTO `sys_role_menu` VALUES (102, 2020);
INSERT INTO `sys_role_menu` VALUES (102, 2021);
INSERT INTO `sys_role_menu` VALUES (102, 2037);
INSERT INTO `sys_role_menu` VALUES (102, 2041);
INSERT INTO `sys_role_menu` VALUES (102, 2042);
INSERT INTO `sys_role_menu` VALUES (102, 2043);
INSERT INTO `sys_role_menu` VALUES (102, 2048);
INSERT INTO `sys_role_menu` VALUES (102, 2050);
INSERT INTO `sys_role_menu` VALUES (103, 1);
INSERT INTO `sys_role_menu` VALUES (103, 2);
INSERT INTO `sys_role_menu` VALUES (103, 3);
INSERT INTO `sys_role_menu` VALUES (103, 100);
INSERT INTO `sys_role_menu` VALUES (103, 101);
INSERT INTO `sys_role_menu` VALUES (103, 102);
INSERT INTO `sys_role_menu` VALUES (103, 103);
INSERT INTO `sys_role_menu` VALUES (103, 104);
INSERT INTO `sys_role_menu` VALUES (103, 105);
INSERT INTO `sys_role_menu` VALUES (103, 106);
INSERT INTO `sys_role_menu` VALUES (103, 107);
INSERT INTO `sys_role_menu` VALUES (103, 108);
INSERT INTO `sys_role_menu` VALUES (103, 109);
INSERT INTO `sys_role_menu` VALUES (103, 110);
INSERT INTO `sys_role_menu` VALUES (103, 111);
INSERT INTO `sys_role_menu` VALUES (103, 112);
INSERT INTO `sys_role_menu` VALUES (103, 113);
INSERT INTO `sys_role_menu` VALUES (103, 114);
INSERT INTO `sys_role_menu` VALUES (103, 115);
INSERT INTO `sys_role_menu` VALUES (103, 116);
INSERT INTO `sys_role_menu` VALUES (103, 117);
INSERT INTO `sys_role_menu` VALUES (103, 500);
INSERT INTO `sys_role_menu` VALUES (103, 501);
INSERT INTO `sys_role_menu` VALUES (103, 1000);
INSERT INTO `sys_role_menu` VALUES (103, 1001);
INSERT INTO `sys_role_menu` VALUES (103, 1002);
INSERT INTO `sys_role_menu` VALUES (103, 1003);
INSERT INTO `sys_role_menu` VALUES (103, 1004);
INSERT INTO `sys_role_menu` VALUES (103, 1005);
INSERT INTO `sys_role_menu` VALUES (103, 1006);
INSERT INTO `sys_role_menu` VALUES (103, 1007);
INSERT INTO `sys_role_menu` VALUES (103, 1008);
INSERT INTO `sys_role_menu` VALUES (103, 1009);
INSERT INTO `sys_role_menu` VALUES (103, 1010);
INSERT INTO `sys_role_menu` VALUES (103, 1011);
INSERT INTO `sys_role_menu` VALUES (103, 1012);
INSERT INTO `sys_role_menu` VALUES (103, 1013);
INSERT INTO `sys_role_menu` VALUES (103, 1014);
INSERT INTO `sys_role_menu` VALUES (103, 1015);
INSERT INTO `sys_role_menu` VALUES (103, 1016);
INSERT INTO `sys_role_menu` VALUES (103, 1017);
INSERT INTO `sys_role_menu` VALUES (103, 1018);
INSERT INTO `sys_role_menu` VALUES (103, 1019);
INSERT INTO `sys_role_menu` VALUES (103, 1020);
INSERT INTO `sys_role_menu` VALUES (103, 1021);
INSERT INTO `sys_role_menu` VALUES (103, 1022);
INSERT INTO `sys_role_menu` VALUES (103, 1023);
INSERT INTO `sys_role_menu` VALUES (103, 1024);
INSERT INTO `sys_role_menu` VALUES (103, 1025);
INSERT INTO `sys_role_menu` VALUES (103, 1026);
INSERT INTO `sys_role_menu` VALUES (103, 1027);
INSERT INTO `sys_role_menu` VALUES (103, 1028);
INSERT INTO `sys_role_menu` VALUES (103, 1029);
INSERT INTO `sys_role_menu` VALUES (103, 1030);
INSERT INTO `sys_role_menu` VALUES (103, 1031);
INSERT INTO `sys_role_menu` VALUES (103, 1032);
INSERT INTO `sys_role_menu` VALUES (103, 1033);
INSERT INTO `sys_role_menu` VALUES (103, 1034);
INSERT INTO `sys_role_menu` VALUES (103, 1035);
INSERT INTO `sys_role_menu` VALUES (103, 1036);
INSERT INTO `sys_role_menu` VALUES (103, 1037);
INSERT INTO `sys_role_menu` VALUES (103, 1038);
INSERT INTO `sys_role_menu` VALUES (103, 1039);
INSERT INTO `sys_role_menu` VALUES (103, 1040);
INSERT INTO `sys_role_menu` VALUES (103, 1041);
INSERT INTO `sys_role_menu` VALUES (103, 1042);
INSERT INTO `sys_role_menu` VALUES (103, 1043);
INSERT INTO `sys_role_menu` VALUES (103, 1044);
INSERT INTO `sys_role_menu` VALUES (103, 1045);
INSERT INTO `sys_role_menu` VALUES (103, 1046);
INSERT INTO `sys_role_menu` VALUES (103, 1047);
INSERT INTO `sys_role_menu` VALUES (103, 1048);
INSERT INTO `sys_role_menu` VALUES (103, 1049);
INSERT INTO `sys_role_menu` VALUES (103, 1050);
INSERT INTO `sys_role_menu` VALUES (103, 1051);
INSERT INTO `sys_role_menu` VALUES (103, 1052);
INSERT INTO `sys_role_menu` VALUES (103, 1053);
INSERT INTO `sys_role_menu` VALUES (103, 1054);
INSERT INTO `sys_role_menu` VALUES (103, 1055);
INSERT INTO `sys_role_menu` VALUES (103, 1056);
INSERT INTO `sys_role_menu` VALUES (103, 1057);
INSERT INTO `sys_role_menu` VALUES (103, 1058);
INSERT INTO `sys_role_menu` VALUES (103, 1059);
INSERT INTO `sys_role_menu` VALUES (103, 1060);
INSERT INTO `sys_role_menu` VALUES (103, 2037);
INSERT INTO `sys_role_menu` VALUES (103, 2044);
INSERT INTO `sys_role_menu` VALUES (103, 2045);
INSERT INTO `sys_role_menu` VALUES (103, 2046);
INSERT INTO `sys_role_menu` VALUES (103, 2047);
INSERT INTO `sys_role_menu` VALUES (103, 2048);

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `dept_id` bigint NULL DEFAULT NULL COMMENT '部门ID',
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NOT NULL COMMENT '用户账号',
  `nick_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NOT NULL COMMENT '用户昵称',
  `user_type` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '00' COMMENT '用户类型（00系统用户）',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '' COMMENT '用户邮箱',
  `phonenumber` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '' COMMENT '手机号码',
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '' COMMENT '头像地址',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '' COMMENT '密码',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '0' COMMENT '账号状态（0正常 1停用）',
  `del_flag` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `login_ip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '' COMMENT '最后登录IP',
  `login_date` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  `pwd_update_date` datetime NULL DEFAULT NULL COMMENT '密码最后更新时间',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_eo_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_eo_0900_ai_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES (1, 103, 'admin', '若依', '00', 'ry@163.com', '15888888888', '1', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1', '2026-10-06 10:42:41', '2026-10-06 10:38:05', 'admin', '2026-10-06 10:38:05', '', '2026-10-06 10:42:41', '管理员');
INSERT INTO `sys_user` VALUES (2, 105, 'ry', '若依', '00', 'ry@qq.com', '15666666666', '1', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', '127.0.0.1', '2026-10-06 10:38:05', '2026-10-06 10:38:05', 'admin', '2026-10-06 10:38:05', '', NULL, '测试员');

-- ----------------------------
-- Table structure for sys_user_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_post`;
CREATE TABLE `sys_user_post`  (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `post_id` bigint NOT NULL COMMENT '岗位ID',
  PRIMARY KEY (`user_id`, `post_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户与岗位关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user_post
-- ----------------------------
INSERT INTO `sys_user_post` VALUES (1, 1);

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户和角色关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES (1, 1);
INSERT INTO `sys_user_role` VALUES (100, 102);
INSERT INTO `sys_user_role` VALUES (101, 102);

SET FOREIGN_KEY_CHECKS = 1;
