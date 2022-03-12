package com.nhs.bcss.exceptions;

public class SubjectNotFoundExceptionResponse {

    private String subjectNotFound;

    public SubjectNotFoundExceptionResponse(String subjectNotFound) {
        this.subjectNotFound = subjectNotFound;
    }

    public String getSubjectNotFound() {
        return this.subjectNotFound;
    }

    public void setSubjectNotFound(String subjectNotFound) {
    	this.subjectNotFound = subjectNotFound;
    }
}
