package uk.nhs.bcss.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class SubjectNameValidator implements Validator {

	@Override
	public boolean supports(Class<?> aClass) {
		return String.class.equals(aClass);
	}

	@Override
	public void validate(Object object, Errors errors) {

		String subjectName = (String) object;

		if (subjectName.length() < 3) {
			errors.rejectValue("subjectName", "Length", "SubjectName must be at least 3 characters");
		}

	}
}
