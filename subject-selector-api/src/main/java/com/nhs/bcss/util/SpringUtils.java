package com.nhs.bcss.util;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class SpringUtils {

	public static ApplicationContext getSpringContext() {
		return new ClassPathXmlApplicationContext(Constants.SPRING_CONFIG_XML);
	}
}
