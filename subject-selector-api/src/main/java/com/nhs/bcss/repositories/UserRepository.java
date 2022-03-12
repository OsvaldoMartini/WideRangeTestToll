package com.nhs.bcss.repositories;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhs.bcss.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {


	//@Query("FROM User ")
	User findByUsername(String username);
	
	//@Query("FROM User ")
    User getById(Long id);

    //@Query("From User") 
    @Override
    Iterable<User> findAll();
 
	//@Query("select auto.subjectIdentifier from Subject auto where auto.subjectIdentifier = :subjectId and auto.subjectLeader = :subjectLeader order by created_At desc")
	@Query("select user from Subject proj, User user \n"
			+ "where proj.id = subject_id \n"
			+ "and proj.subjectIdentifier = :subjectName \n"
			+ "and user.username = :userName \n"
			+ "order by proj.subjectIdentifier desc")
	User getUserNameBySubject(@Param("userName") String userName, @Param("subjectName") String subjectName);

	 
	//@Query("select auto.subjectIdentifier from Subject auto where auto.subjectIdentifier = :subjectId and auto.subjectLeader = :subjectLeader order by created_At desc")
	@Transactional
	@Modifying
	@Query("Delete User \n"
			+ "where id = :userId \n")
	int deleteUserById(@Param("userId") Long userId);

	
}
