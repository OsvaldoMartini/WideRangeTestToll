package com.nhs.bcss.services;

import com.nhs.bcss.domain.User;
import com.nhs.bcss.exceptions.UsernameAlreadyExistsException;
import com.nhs.bcss.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User saveUser(User newUser) {

		try {
			newUser.setPassword(newUser.getPassword());
			// Username has to be unique (exception)
			newUser.setUsername(newUser.getUsername());
			// Make sure that password and confirmPassword match
			// We don't persist or show the confirmPassword
			newUser.setConfirmPassword("");
			return userRepository.save(newUser);

		} catch (Exception e) {
			throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
		}

	}

	public Iterable<User> findAllUserNames() {
		return userRepository.findAll();
	}

	public User findUserNameBySubject(String subjectName, String userName) {
		return userRepository.getUserNameBySubject(subjectName, userName);
	}

	public void deleteUserByIdentifier(String subjectName, String username) {
		User user = findUserNameBySubject(subjectName, username);
		if (user.getId() != null) {
			userRepository.deleteUserById(user.getId());
		}
	}

}
