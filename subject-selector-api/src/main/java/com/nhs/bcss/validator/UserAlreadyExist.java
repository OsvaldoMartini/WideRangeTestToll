package com.nhs.bcss.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.nhs.bcss.domain.User;

@Component
public class UserAlreadyExist implements Validator {

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

	@Override
	public void validate(Object object, Errors errors) {
		User user = (User) object;

		// confirmPassword
		errors.rejectValue("username", "Exist", "User: " + user.getUsername() + " already exist!");
		

		
	}
}
