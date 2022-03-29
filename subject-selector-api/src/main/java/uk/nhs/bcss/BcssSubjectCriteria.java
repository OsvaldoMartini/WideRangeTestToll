package uk.nhs.bcss;

import java.util.concurrent.Executor;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = "uk.nhs.bcss")
@Import(TaskConfig.class)
public class BcssSubjectCriteria {

	@Autowired
	TaskConfig config;

	private static final Logger Logger = LogManager.getLogger(BcssSubjectCriteria.class);

	public static void main(String[] args) {
		
//		SpringApplication.run(BcssSubjectCriteria.class, args);
		
		new SpringApplicationBuilder().main(BcssSubjectCriteria.class).sources(BcssSubjectCriteria.class)
		.profiles("default").run(args);
		
		Logger.info("Server started");
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
