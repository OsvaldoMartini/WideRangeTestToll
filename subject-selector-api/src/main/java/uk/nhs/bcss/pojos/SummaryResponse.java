package uk.nhs.bcss.pojos;

public class SummaryResponse {

	

	private Long total;                 
	private String operationName;                  
	private String valueResponse;
	
	public SummaryResponse(Long total, String operationName, String valueResponse) {
		super();
		this.total = total;
		this.operationName = operationName;
		this.valueResponse = valueResponse;
	}
	public Long getTotal() {
		return total;
	}
	public void setTotal(Long total) {
		this.total = total;
	}
	public String getOperationName() {
		return operationName;
	}
	public void setOperationName(String operationName) {
		this.operationName = operationName;
	}
	public String getValueResponse() {
		return valueResponse;
	}
	public void setValueResponse(String valueResponse) {
		this.valueResponse = valueResponse;
	}
	
}
