package uk.nhs.bcss.exceptions;

public class SubjectIdExceptionResponse {

    private String subjectIdentifier;

    public SubjectIdExceptionResponse(String subjectIdentifier) {
        this.subjectIdentifier = subjectIdentifier;
    }

    public String getSubjectIdentifier() {
        return subjectIdentifier;
    }

    public void setSubjectIdentifier(String subjectIdentifier) {
        this.subjectIdentifier = subjectIdentifier;
    }
}
