package com.nhs.bcss;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import com.nhs.bcss.pojos.Student;

public class SomeTests {

	
	@Test
	public void testBasicUsage() {
		Assertions.assertEquals(15, 15);
		
	}
	
	
	@Test
	public void testApplContext() {
		Assertions.assertEquals(15, 15);
	}

}
