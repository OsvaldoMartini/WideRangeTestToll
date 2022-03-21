package com.nhs.bcss;

import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "intake-lineartojson")
public class TaskProperties {

	/**
	 * The Jdbc Url
	 */
	private String jdbcUrl;

	/**
	 * The Jdbc User
	 */
	private String jdbcUser;

	/**
	 * The Jdbc Pwd
	 */
	private String jdbcPwd;

	public String getJdbcUrl() {
		return jdbcUrl;
	}

	public void setJdbcUrl(String jdbcUrl) {
		this.jdbcUrl = jdbcUrl;
	}

	public String getJdbcUser() {
		return jdbcUser;
	}

	public void setJdbcUser(String jdbcUser) {
		this.jdbcUser = jdbcUser;
	}

	public String getJdbcPwd() {
		return jdbcPwd;
	}

	public void setJdbcPwd(String jdbcPwd) {
		this.jdbcPwd = jdbcPwd;
	}

}
