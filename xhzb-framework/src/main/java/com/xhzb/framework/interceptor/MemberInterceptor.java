package com.xhzb.framework.interceptor;

import cn.hutool.core.map.MapUtil;
import cn.hutool.core.util.ObjectUtil;
import com.xhzb.common.exception.base.BaseException;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.common.utils.UserThreadLocal;
import com.xhzb.framework.web.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

@Component
public class MemberInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        //获取token
        String token = request.getHeader("authorization");
        if(StringUtils.isEmpty(token)){
            throw new BaseException("认证失败");
        }
        //解析token
        Map<String, Object> claims =  tokenService.parseToken(token);
        if(ObjectUtil.isEmpty(claims)){
            throw new BaseException("认证失败");
        }
        
        /**
            Long userId = ()Long)claims.get("userId");
          问题原因：
            JWT token 中的 userId 在解析时被存储为 Integer 类型
            代码尝试使用 (Long) 直接强制转换，但 Java 中 Integer 不能直接转换为 Long
          解决方案：
            使用 Hutool 的 MapUtil.get(claims, "userId", Long.class) 方法
            该方法会自动处理类型转换，无论底层是 Integer 还是 Long 都能正确转换为 Long 类型
            
            或者
            Long userId = Long.valueOf(claims.get("userId").toString());
            valueOf方法转换的是String类型,所以需要将里面的值先转为String类型
        */
        Long userId = MapUtil.get(claims, "userId", Long.class);
        if(ObjectUtil.isEmpty(userId)){
            throw new BaseException("认证失败");
        }
        //把数据存储到线程中
        UserThreadLocal.set(userId);
        return true;

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserThreadLocal.remove();
    }
}