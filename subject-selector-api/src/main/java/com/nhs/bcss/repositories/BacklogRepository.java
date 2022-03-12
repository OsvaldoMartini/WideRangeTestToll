package com.nhs.bcss.repositories;

import com.nhs.bcss.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {

	//@Query("FROM Backlog") 
	Backlog findBySubjectIdentifier(String Identifier);
}
