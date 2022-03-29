package uk.nhs.bcss;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Configuration
public class TaskConfig {
	
	@EnableConfigurationProperties(TaskProperties.class)
    public static class TestConfiguration {
        // nothing
    }
}
