package com.nhs.bcss.controller;

import java.security.Principal;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhs.bcss.domain.Subject;
import com.nhs.bcss.domain.User;
import com.nhs.bcss.services.MapValidationErrorService;
import com.nhs.bcss.services.SubjectService;
import com.nhs.bcss.services.UserService;
import com.nhs.bcss.validator.DeleteUserSubject;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

	@Autowired
	private SubjectService subjectService;

	@Autowired
	private UserService userService;

	@Autowired
	private MapValidationErrorService mapValidationErrorService;

	@Autowired
	private DeleteUserSubject deleteUserSubject;

	@PostMapping("")
	public ResponseEntity<?> createNewSubject(@Valid @RequestBody Subject subject, BindingResult result,
			Principal principal) {

		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		Subject subject1 = subjectService.saveOrUpdateSubject(subject, principal.getName());
		return new ResponseEntity<Subject>(subject1, HttpStatus.CREATED);
	}

	@GetMapping("/{subjectId}")
	public ResponseEntity<?> getSubjectById(@PathVariable String subjectId, Principal principal) {

		Subject subject = subjectService.findSubjectByIdentifier(subjectId, true);

		return new ResponseEntity<Subject>(subject, HttpStatus.OK);
	}

	@GetMapping("/all")
	public List<Subject> getAllSubjects() {
		return subjectService.findAllSubjects();
	}

	@GetMapping("/allByUser")
	public List<Subject> getAllSubjectsByUser() {
		return subjectService.findAllSubjectsByUserId();
	}

	@DeleteMapping("/{subjectId}")
	public ResponseEntity<?> deleteSubject(@PathVariable String subjectId, Principal principal) {
		subjectService.deleteSubjectByIdentifier(subjectId);

		return new ResponseEntity<String>("Subject with ID: '" + subjectId + "' was deleted", HttpStatus.OK);
	}

	@PostMapping("/{subjectId}")
	public ResponseEntity<?> deleteUserNameInSubject(@PathVariable String subjectId, @Valid @RequestBody User user,
			BindingResult result, Principal principal) {

		if (!user.getUsername().equalsIgnoreCase(principal.getName())) {
			deleteUserSubject.validate(user.getUsername(), subjectId, result);
			ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
			return errorMap;
		}

		userService.deleteUserByIdentifier(subjectId, principal.getName());

		return new ResponseEntity<String>("Subject with ID: '" + subjectId + "' was deleted", HttpStatus.OK);
	}

}
