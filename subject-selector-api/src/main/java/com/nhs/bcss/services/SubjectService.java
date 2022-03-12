package com.nhs.bcss.services;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nhs.bcss.domain.Backlog;
import com.nhs.bcss.domain.Subject;
import com.nhs.bcss.domain.User;
import com.nhs.bcss.exceptions.SubjectIdException;
import com.nhs.bcss.exceptions.SubjectNotFoundException;
import com.nhs.bcss.repositories.BacklogRepository;
import com.nhs.bcss.repositories.SubjectRepository;
import com.nhs.bcss.security.TokenStruct;

@Service
public class SubjectService {

	@Autowired
	private SubjectRepository subjectRepository;

	@Autowired
	private BacklogRepository backlogRepository;

	@Autowired
	private TokenStruct tokenStruct;
	
	public Subject saveOrUpdateSubject(Subject subject, String username) {

		if (subject.getId() != null) {
			Subject existingSubject = subjectRepository.findBySubjectIdentifier(subject.getSubjectIdentifier());
//			if (existingSubject != null && (!existingSubject.getSubjectLeader().equals(username))) {
			if (existingSubject != null) {
				throw new SubjectNotFoundException("Subject not found in your account");
			} else if (existingSubject == null) {
				throw new SubjectNotFoundException("Subject with ID: '" + subject.getSubjectIdentifier()
						+ "' cannot be updated because it doesn't exist");
			}
		}

		try {
			// User user = userRepository.findByUsername(username);
			// subject.setUser(user);
			// subject.setSubjectLeader(user.getUsername());
			subject.setSubjectIdentifier(subject.getSubjectIdentifier());

			if (subject.getId() == null) {
				Backlog backlog = new Backlog();
				subject.setBacklog(backlog);
				backlog.setSubject(subject);
				backlog.setSubjectIdentifier(subject.getSubjectIdentifier());
			}

			if (subject.getId() != null) {
				subject.setBacklog(backlogRepository.findBySubjectIdentifier(subject.getSubjectIdentifier()));
				// Date now = new Date(System.currentTimeMillis());
				// subject.setUpdated_At(Newnow.getTime());
			}

			return subjectRepository.save(subject);

		} catch (Exception e) {
			throw new SubjectIdException(
					"Subject ID '" + subject.getSubjectIdentifier().toUpperCase() + "' already exists");
		}

	}

	public User autoCreateSubjectAndUser(String subjectName, User user) {

		Subject subject = findBySubjectIdentifier(subjectName, false);
		// AutoCreagte Subject
		if (subject == null) {

			// Set<User> userEntry = new HashSet<User>();
			// userEntry.add(user);

			subject = new Subject();

			subject.setDescription(subjectName);
			subject.setSubjectName(subjectName);
			subject.setSubjectIdentifier(subjectName);
			subject = saveOrUpdateSubject(subject, user.getUsername());

		}

		user.setSubject(subject);

		Set<User> userEntry = subject.getUsers();

		boolean isNewUser = true;

		if (userEntry == null) {
			userEntry = new HashSet<User>();
		} else {

			Iterator<User> it = userEntry.iterator();
			while (it.hasNext()) {
				User userInt = it.next();
				if (userInt.getUsername().equalsIgnoreCase(user.getUsername())) {
					isNewUser = false;
					user = userInt;
					break;
				}
			}

		}

//		Set<User> userEntry = new HashSet<User>();
//		userEntry.add(user);
//		subject.setUsers(userEntry);

//		User newUser = userService.saveUser(user);

		if (isNewUser) {
			// userEntry.clear();

			// To Force to Create a New One
			user.setId(0L);

			userEntry.add(user);
			subject.setUsers(userEntry);
			save(subject);

			final String searchTerm = user.getUsername();
			Optional<User> userOption = subject.getUsers().stream().filter(u -> {
				boolean isAuthorized = searchTerm.equalsIgnoreCase(u.getUsername());
				return isAuthorized;
			}).findFirst();

			return userOption.get();
		} else {
			return null;
		}
	}

	public Subject findSubjectByIdentifier(String subjectId, boolean throwItIfNotExist) {

		// Only want to return the subject if the user looking for it is the owner

		Subject subject = subjectRepository.getSubjectAndUserId(subjectId, tokenStruct.getUser().getId());
		
		if (subject == null && throwItIfNotExist) {
			throw new SubjectNotFoundException("Subject not found in your account");

		}

//		if (subject != null && !subject.getSubjectLeader().equals(username)) {
//			throw new SubjectNotFoundException("Subject not found in your account");
//		}

		return subject;
	}

	public Subject findBySubjectIdentifier(String subjectId, boolean throwItIfNotExist) {

		// Only want to return the subject if the user looking for it is the owner

		Subject subject = subjectRepository.findBySubjectIdentifier(subjectId.toUpperCase());

		if (subject == null && throwItIfNotExist) {
			throw new SubjectIdException("Subject ID '" + subjectId + "' does not exist");

		}

		return subject;
	}

	public Subject findSubjectByLeader(String subjectId, String username, boolean throwItIfNotExist) {

		// Only want to return the subject if the user looking for it is the owner

		String[] subjectArr = subjectRepository.getSubjectIdentifierAndLeader(subjectId.toUpperCase(), username);

		if (subjectArr == null && throwItIfNotExist) {
			throw new SubjectIdException(
					String.format("Subject ID ' %s Leader: %s '  does not exist ", subjectId, username));
		}

		Subject subject = null;
		if (subjectArr.length > 0) {
			subject = subjectRepository.findBySubjectIdentifier(subjectArr[0]);

		}

		return subjectArr.length > 0 ? subject : null;
	}

	public Subject findSubjectAndUserName(String subjectId, String username, boolean throwItIfNotExist) {

		// Only want to return the subject if the user looking for it is the owner

		Subject subject = subjectRepository.getSubjectAndUserName(subjectId,  username);

		if (subject == null && throwItIfNotExist) {
			throw new SubjectIdException(
					String.format("Subject ID ' %s Leader: %s '  does not exist ", subjectId, username));
		}

		return subject;
	}

	public List<Subject> findAllSubjects() {
		return subjectRepository.findAllSubjects();
	}
	
	public List<Subject> findAllSubjectsByUserId() {
		return subjectRepository.findAllByUserId(tokenStruct.getUser().getId());
	}

	public Iterable<Subject> findAllSubjects(String username) {
		return subjectRepository.findAllBySubjectLeader(username);
	}

	public void deleteSubjectByIdentifier(String subjectid) {
		subjectRepository.delete(findSubjectByIdentifier(subjectid, true));
	}

	public Subject save(Subject subject) {
		return subjectRepository.save(subject);
	}

}
