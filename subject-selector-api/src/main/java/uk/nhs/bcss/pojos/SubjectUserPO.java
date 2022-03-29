package uk.nhs.bcss.pojos;

public class SubjectUserPO {

	private String subjectIdentifier;

	private String userName;

	public SubjectUserPO(String subjectIdentifier, String userName) {
		super();
		this.subjectIdentifier = subjectIdentifier;
		this.userName = userName;
	}

	public String getSubjectIdentifier() {
		return subjectIdentifier;
	}

	public void setSubjectIdentifier(String subjectIdentifier) {
		this.subjectIdentifier = subjectIdentifier;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
