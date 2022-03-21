package com.nhs.bcss.pojos;

public class SubjectSearchPO {
	private String NHS_NUMBER;

	private String NAME;
	private int AGE;
	private String HUB;
	private String SCREENING_CENTRE;
	private String EPISODE_START_DATE;
	private String EPISODE_END_DATE;
	private String LATEST_EVENT_STATUS;
	
	
	public SubjectSearchPO() {
	}

	public SubjectSearchPO(String nHS_NUMBER, String nAME, int aGE, String hUB, String sCREENING_CENTRE,
			String ePISODE_START_DATE, String ePISODE_END_DATE, String lATEST_EVENT_STATUS) {
		super();
		NHS_NUMBER = nHS_NUMBER;
		NAME = nAME;
		AGE = aGE;
		HUB = hUB;
		SCREENING_CENTRE = sCREENING_CENTRE;
		EPISODE_START_DATE = ePISODE_START_DATE;
		EPISODE_END_DATE = ePISODE_END_DATE;
		LATEST_EVENT_STATUS = lATEST_EVENT_STATUS;
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
	public int getAGE() {
		return AGE;
	}
	public void setAGE(int aGE) {
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
