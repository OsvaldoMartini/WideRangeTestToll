package com.nhs.bcss.validator;

import com.nhs.bcss.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return User.class.equals(aClass);
	}

	@Override
	public void validate(Object object, Errors errors) {

		User user = (User) object;

		if (user.getPassword().length() < 6) {
			errors.rejectValue("password", "Length", "Password must be at least 6 characters");
		}

		if (!user.getPassword().equals(user.getConfirmPassword())) {
			errors.rejectValue("confirmPassword", "Match", "Passwords must match");
		}
		// confirmPassword

	}

	public void validate(String userName, String subjectName, Errors errors) {

		errors.rejectValue("username", "Not Exist", "User: \"" + userName + "\" not exist in \"" + subjectName + "\"");
		// confirmPassword

	}

	public void validatePassword(String userName, String subjectName, Errors errors) {
		errors.rejectValue("password", "Invalid Login",
				"Password Incorrect: \"" + userName + "\" not exist in \"" + subjectName + "\"");
	}

	public void isEmailValid(String userName, Errors errors) {

		String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
		if (!userName.matches(regex)) {
			errors.rejectValue("username", "Invalid", "User Name needs to be an email: \"" + userName + "\" ");
		}

	}

}
