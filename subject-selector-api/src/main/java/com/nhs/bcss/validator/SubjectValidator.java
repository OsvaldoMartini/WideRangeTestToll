package com.nhs.bcss.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.nhs.bcss.domain.User;

@Component
public class SubjectValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return String.class.equals(aClass);
	}

//	@Override
	public void validate(Object object, String subjectName, Errors errors) {

		User user = (User) object;

		errors.rejectValue("username", "Exist", "User: \"" + user.getUsername() + "\" already exist in \"" + subjectName + "\"");
		// confirmPassword

	}

	public void validate(String subjectName, Errors errors) {

		errors.rejectValue("subject", "Not Exist", "Subject: \"" + subjectName + "\" not exist !");
	}
	
	@Override
	public void validate(Object object, Errors errors) {
		User user = (User) object;

		errors.rejectValue("username", "Exist", "User: " + user.getUsername() + " already exist!");
		// confirmPassword

		
	}
}
