-- ----------------------------
-- 护理员账号数据
-- 角色：护理员（sys_role.role_key = nursing_elder，role_id = 102）
-- 部门：护理部（sys_dept.dept_id = 201）
-- 密码：与 admin 一致（admin123）
-- 说明：脚本可重复执行，已存在的账号与角色关系不会重复插入
-- ----------------------------
INSERT INTO `sys_user` (`dept_id`, `user_name`, `nick_name`, `email`, `phonenumber`, `sex`, `avatar`, `password`, `status`, `del_flag`, `create_by`, `create_time`, `remark`)
SELECT 201, 'nurse01', '张芳', 'nurse01@163.com', '13900000001', '0', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', 'admin', NOW(), '护理员'
WHERE NOT EXISTS (SELECT 1 FROM `sys_user` WHERE `user_name` = 'nurse01');

INSERT INTO `sys_user` (`dept_id`, `user_name`, `nick_name`, `email`, `phonenumber`, `sex`, `avatar`, `password`, `status`, `del_flag`, `create_by`, `create_time`, `remark`)
SELECT 201, 'nurse02', '李强', 'nurse02@163.com', '13900000002', '1', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', 'admin', NOW(), '护理员'
WHERE NOT EXISTS (SELECT 1 FROM `sys_user` WHERE `user_name` = 'nurse02');

INSERT INTO `sys_user` (`dept_id`, `user_name`, `nick_name`, `email`, `phonenumber`, `sex`, `avatar`, `password`, `status`, `del_flag`, `create_by`, `create_time`, `remark`)
SELECT 201, 'nurse03', '王敏', 'nurse03@163.com', '13900000003', '0', '', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '0', '0', 'admin', NOW(), '护理员'
WHERE NOT EXISTS (SELECT 1 FROM `sys_user` WHERE `user_name` = 'nurse03');

-- 关联「护理员」角色（sys_user_role 主键为 user_id + role_id，IGNORE 保证可重复执行）
INSERT IGNORE INTO `sys_user_role` (`user_id`, `role_id`)
SELECT `user_id`, 102 FROM `sys_user` WHERE `user_name` IN ('nurse01', 'nurse02', 'nurse03');
