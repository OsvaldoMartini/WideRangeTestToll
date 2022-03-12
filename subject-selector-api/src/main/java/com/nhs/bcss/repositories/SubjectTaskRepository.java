package com.nhs.bcss.repositories;

import com.nhs.bcss.domain.SubjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectTaskRepository extends CrudRepository<SubjectTask, Long> {

	//@Query("FROM SubjectTask")    
	List<SubjectTask> findBySubjectIdentifierOrderByPriority(String id);

	//@Query("FROM SubjectTask")
    SubjectTask findBySubjectSequence(String sequence);
    
	@Override
	Iterable<SubjectTask> findAll();
}
