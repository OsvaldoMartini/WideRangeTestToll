package com.nhs.bcss.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhs.bcss.domain.User;
import com.nhs.bcss.services.MapValidationErrorService;
import com.nhs.bcss.services.SubjectService;
import com.nhs.bcss.services.UserService;
import com.nhs.bcss.validator.SubjectNameValidator;
import com.nhs.bcss.validator.UserAlreadyExist;
import com.nhs.bcss.validator.UserValidator;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
@Api(value = "User Coontroller", description = "Operations pertaining to user in PPMTool Management System")
public class UserController {

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserValidator userValidator;

	@Autowired
	private SubjectNameValidator subjectNameValidator;

	@Autowired
	private UserAlreadyExist userAlreadyExist;

	@Autowired
	private SubjectService subjectService;
	
	@PostMapping(path = "/register/{subjectName}", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, @PathVariable String subjectName,
			BindingResult result) {
		// Validate passwords match

		userValidator.isEmailValid(user.getUsername(), result);
		userValidator.validate(user, result);
		subjectNameValidator.validate(subjectName, result);

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null) {
			return errorMap; // new ResponseEntity<User>(user, HttpStatus.BAD_REQUEST);
		}

		user.setPassword(user.getPassword());
		user = subjectService.autoCreateSubjectAndUser(subjectName, user);

		if (user != null) {
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		} else {
			userAlreadyExist.validate(user, subjectName, result);
			errorMap = mapValidationErrorService.MapValidationService(result);
			return errorMap;
		}

	}

	@GetMapping("/subjects")
	public Iterable<User> getAllUserNames() {
		return userService.findAllUserNames();
	}

	@GetMapping("")
	public Iterable<User> getAllUsers() {
		return userService.findAllUserNames();
	}

}
