package com.xhzb.common.constant;

/**
 * 缓存的key 常量
 *
 * @author ruoyi
 */
public class CacheConstants {

    /**
     * 沉默周期 redis key 前缀 使用redis的setIfAbsent
     * setIfAbsent = Redis 原生命令 SETNX (SET if Not eXists)
     */
    public static final String IOT_ALERT_SILENT_PREFIX = "iot:alert:silent:{}:{}:{}";


    /**
     * 报警次数 redis key 前缀 使用redis的原子自增increment ()
     * 自动初始化：key 不存在时，自动创建并从 0 开始自增, 返回自增后的最新值 ,
     * 只能对整数类型的值操作，非数字会报错
     */
    public static final String IOT_ALERT_COUNT_PREFIX = "iot:alert:count:{}:{}:{}";

    /**
     * 设备数据 cache key
     */
    public static final String IOT_DEVICE_LAST_DATA = "iot:device_last_data";

    /**
     * 登录用户 redis key
     */
    public static final String LOGIN_TOKEN_KEY = "login_tokens:";

    /**
     * 产品列表 cache key
     */
    public static final String IOT_ALL_PRODUCT_LIST = "iot:all_product_list";

    /**
     * 验证码 redis key
     */
    public static final String CAPTCHA_CODE_KEY = "captcha_codes:";

    /**
     * 参数管理 cache key
     */
    public static final String SYS_CONFIG_KEY = "sys_config:";

    /**
     * 字典管理 cache key
     */
    public static final String SYS_DICT_KEY = "sys_dict:";

    /**
     * 防重提交 redis key
     */
    public static final String REPEAT_SUBMIT_KEY = "repeat_submit:";

    /**
     * 限流 redis key
     */
    public static final String RATE_LIMIT_KEY = "rate_limit:";

    /**
     * 登录账户密码错误次数 redis key
     */
    public static final String PWD_ERR_CNT_KEY = "pwd_err_cnt:";
}
