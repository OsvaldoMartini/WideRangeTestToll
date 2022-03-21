package com.nhs.bcss;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;
import java.util.Vector;
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

import com.nhs.bcss.dao.BcssAccess;
import com.nhs.bcss.exception.SearchCriteriaException;
import com.nhs.bcss.pojos.CustomerSearchPO;
import com.nhs.bcss.util.IOUtils;

@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = "com.nhs.bcss")
@Import(TaskConfig.class)
public class BcssSubjectCriteria {


	private static String jdbcUrl = "jdbc:oracle:thin:@bcss-oracle-bcss-bcss-9699.cqger35bxcwy.eu-west-2.rds.amazonaws.com:1521/TSTBCS01";
	private static String jdbcUser = "MPI";
	private static String jdbcPwd = "g0blin";
	
	@Autowired
	TaskConfig config;

	private static final Logger Logger = LogManager.getLogger(BcssSubjectCriteria.class);

	public static void main(String[] args) {


		new SpringApplicationBuilder().main(BcssSubjectCriteria.class).sources(BcssSubjectCriteria.class)
		.profiles("server").run(args);
		
		// Get the POM customer search codebase location
		String pathProps = System.getenv("PATH_PROPERTIES");
		boolean systemVar = false;
		if (pathProps == null) {
			Logger.warn("The PATH_PROPERTIES environment variable is not defined");
			systemVar = false;
			// System.exit(-1);
		} else {
			Logger.info("The PATH_PROPERTIES HOME environment variable was foud");
			systemVar = true;
		}
		// Send startup search
		Logger.info("----- Starting the Customer Subject Criteria Search-----");
		// Read in the search app properties file
		Logger.info(
				"Reading properties from" + pathProps + File.separator + "conf" + File.separator + "app.properties");
		Properties props = new Properties();
		try {
			if (pathProps != null) {
				props.load(
						new FileInputStream(pathProps + File.separator + "conf" + File.separator + "app.properties"));
			}
		} catch (Exception e) {
			Logger.fatal("Could not load properties file: " + e.getMessage());
			System.exit(-1);
		}

		// Set logging level to debug if selected
		if (props.containsKey("app.debug") && props.getProperty("app.debug").toLowerCase().equals("true")) {
			// LogManager.getRootLogger().atLevel(Level.DEBUG);
		}

		// Get some handler classes
		BcssAccess cuma = new BcssAccess();

		// Retrieve the pending entries from the Customers

		Logger.debug("Checking for queued messages...");
		try {
			if (systemVar && pathProps != null) {
				cuma.connect(props.getProperty("jabe.url"), props.getProperty("jobo.user"),
						IOUtils.decrypt(props.getProperty("jdbc.pwd")));
			} else {
				cuma.connect(jdbcUrl, jdbcUser, jdbcPwd);
			}

		} catch (SearchCriteriaException e) {
			// TODO Auto-generated catch block
			Logger.fatal("An SQL ocurred while retrieving Customers entries: " + e.getMessage());

		}

		Vector<CustomerSearchPO> v = new Vector<CustomerSearchPO>();
		try {
			v = cuma.getEntries();
		} catch (SearchCriteriaException e) {
			// TODO Auto-generated catch block
			Logger.fatal("An SQL ocurred while retrieving Customers entries: " + e.getMessage());
		}
		// For each entry, send out an email
		for (int i = 0; i < v.size(); i++) {
			CustomerSearchPO cust = v.elementAt(i);
			Logger.info(cust.getNAME());
		}

//			BcssAccesssDAO bcssDao = (BcssAccesssDAO) SpringUtils.getSpringContext().getBean("systemBCSSDao");

//		try {
//			bcssDao.prepareStatements();
//		} catch (Exception e) {
//			// TODO: handle exception
//			e.printStackTrace();
//		}
//		System.out.println(bcssDao.getClass().toString());
//
//		Vector<SubjectSearchPO> v = bcssDao.getCustomer();
//		for (int i = 0; i < v.size(); i++) {
//			SubjectSearchPO customer = v.elementAt(i);
//
//			Logger.info("Customer :" + customer.getNAME());
//		}

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
