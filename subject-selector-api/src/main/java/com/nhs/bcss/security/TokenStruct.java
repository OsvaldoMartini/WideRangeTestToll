package com.nhs.bcss.security;

import org.springframework.stereotype.Component;

import com.nhs.bcss.domain.User;

@Component
final public class TokenStruct {
	private String message;
	String subjectIdentifier;
	boolean isExistPwd;
	boolean invalid;
	boolean internal;
	int codeResponse;
	User user;

	public TokenStruct() {
	}

	public String getSubjectIdentifier() {
		return subjectIdentifier;
	}

	public void setSubjectIdentifier(String subjectIdentifier) {
		this.subjectIdentifier = subjectIdentifier;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public boolean isInvalid() {
		return invalid;
	}

	public void setInvalid(boolean invalid) {
		this.invalid = invalid;
	}

	public boolean isExistPwd() {
		return isExistPwd;
	}

	public void setExistPwd(boolean isExistPwd) {
		this.isExistPwd = isExistPwd;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
