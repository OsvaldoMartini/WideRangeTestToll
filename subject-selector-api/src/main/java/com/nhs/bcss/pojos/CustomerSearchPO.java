package com.nhs.bcss.pojos;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@javax.persistence.Entity
@EnableJpaRepositories("com.nhs.bcss.pojos.*")
@ComponentScan(basePackages = { "com.nhs.bcss.pojos.*" })
@EntityScan("com.nhs.bcss.pojos.*")   
public class CustomerSearchPO {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String NHS_NUMBER;
	private String NAME;
	private short AGE;
	private String HUB;
	private String SCREENING_CENTRE;
	private String EPISODE_START_DATE;
	private String EPISODE_END_DATE;
	private String LATEST_EVENT_STATUS;
	
	public CustomerSearchPO() {
		
	}
	
	
	/**
	 * @param nHS_NUMBER
	 * @param nAME
	 * @param aGE
	 * @param hUB
	 * @param sCREENING_CENTRE
	 * @param ePISODE_START_DATE
	 * @param ePISODE_END_DATE
	 * @param lATEST_EVENT_STATUS
	 */
	public CustomerSearchPO(String nHS_NUMBER, String nAME, short aGE, String hUB, String sCREENING_CENTRE,
			String ePISODE_START_DATE, String ePISODE_END_DATE, String lATEST_EVENT_STATUS) {
	
		this.NHS_NUMBER = nHS_NUMBER;
		this.NAME = nAME;
		this.AGE = aGE;
		this.HUB = hUB;
		this.SCREENING_CENTRE = sCREENING_CENTRE;
		this.EPISODE_START_DATE = ePISODE_START_DATE;
		this.EPISODE_END_DATE = ePISODE_END_DATE;
		this.LATEST_EVENT_STATUS = lATEST_EVENT_STATUS;
	}
	public String getNHS_NUMBER() {
		return NHS_NUMBER;
	}
	public void setNHS_NUMBER(String nHS_NUMBER) {
		NHS_NUMBER = nHS_NUMBER;
	}
	public String getNAME() {
		return NAME;
	}
	public void setNAME(String nAME) {
		NAME = nAME;
	}
	public short getAGE() {
		return AGE;
	}
	public void setAGE(short aGE) {
		AGE = aGE;
	}
	public String getHUB() {
		return HUB;
	}
	public void setHUB(String hUB) {
		HUB = hUB;
	}
	public String getSCREENING_CENTRE() {
		return SCREENING_CENTRE;
	}
	public void setSCREENING_CENTRE(String sCREENING_CENTRE) {
		SCREENING_CENTRE = sCREENING_CENTRE;
	}
	public String getEPISODE_START_DATE() {
		return EPISODE_START_DATE;
	}
	public void setEPISODE_START_DATE(String ePISODE_START_DATE) {
		EPISODE_START_DATE = ePISODE_START_DATE;
	}
	public String getEPISODE_END_DATE() {
		return EPISODE_END_DATE;
	}
	public void setEPISODE_END_DATE(String ePISODE_END_DATE) {
		EPISODE_END_DATE = ePISODE_END_DATE;
	}
	public String getLATEST_EVENT_STATUS() {
		return LATEST_EVENT_STATUS;
	}
	public void setLATEST_EVENT_STATUS(String lATEST_EVENT_STATUS) {
		LATEST_EVENT_STATUS = lATEST_EVENT_STATUS;
	}

	
	
}
