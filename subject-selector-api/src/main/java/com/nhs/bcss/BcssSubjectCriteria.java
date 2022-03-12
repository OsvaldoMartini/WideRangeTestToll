package com.nhs.bcss;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;


@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = "com.nhs.bcss")
public class BcssSubjectCriteria {

	public static void main(String[] args) {
		new SpringApplicationBuilder().main(BcssSubjectCriteria.class).sources(BcssSubjectCriteria.class)
		.profiles("server-ui").run(args);

		
	}
	
	
	@Bean
	public Executor taskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
		executor.setCorePoolSize(2);
		executor.setMaxPoolSize(2);
		executor.setQueueCapacity(500);
		executor.setThreadNamePrefix("ExcMethodAsync");
		executor.initialize();
		return executor;
	}
	
}
