package uk.nhs.bcss.pojos;

public class ResponseError {
	public boolean isError;
	public String status;
	public String code;
	public String message;
	public String operationName;
	public String testCaseLine;
	public String pathDataFile;
	public String fileExtension;
	public String[] errors;

	@Override
	public String toString() {
		return "status: " + status + "\n" + "code: " + code + "\n" + "message: " + message + "\n" + "operationName: "
				+ operationName + "\n" + testCaseLine + "\n" + "pathDataFile: " + pathDataFile + "\n"
				+ "fileExtension: " + fileExtension;
	}
}