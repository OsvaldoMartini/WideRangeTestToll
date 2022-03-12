package com.nhs.bcss.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import com.nhs.bcss.domain.User;

@Component
public class DeleteUserSubject implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return String.class.equals(aClass);
	}

//	@Override
	public void validate(String userName, String subjectName, Errors errors) {

		errors.rejectValue("subjectIdentifier", "Not Allowed", "User: \"" + userName + "\" don't have control above subject: \"" + subjectName + "\"");
		// confirmPassword

	}

	@Override
	public void validate(Object object, Errors errors) {
		User user = (User) object;

		errors.rejectValue("subjectIdentifier", "Not Allowed", "User: \"" + user.getUsername() + "\" not allowed to delete!");
		
	}
}
