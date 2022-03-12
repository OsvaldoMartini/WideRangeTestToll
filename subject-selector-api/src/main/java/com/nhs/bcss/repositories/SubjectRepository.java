package com.nhs.bcss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhs.bcss.domain.Subject;

@Repository
public interface SubjectRepository extends CrudRepository<Subject, Long> {

	//@Query("FROM Subject") 
    Subject findBySubjectIdentifier(String subjectId);

    @Override
    //@Query("FROM Subject") 
    Iterable<Subject> findAll();

    //@Query("FROM Subject") 
  	@Query("select proj from Subject proj \n"
  			+ "order by proj.id")
      List<Subject> findAllSubjects();
    
    //@Query("FROM Subject") 
	@Query("select new com.nhs.bcss.pojos.SubjectUserPO (  \r\n "
			+ "proj.subjectIdentifier, user.username) "
			+ "from Subject proj, User user \n"
			+ "where proj.id = subject_id \n"
			+ "and user.username = :userName \n"
			+ "order by proj.subjectIdentifier desc")
    Iterable<Subject> findAllBySubjectLeader(@Param("userName") String userName);
	
    //@Query("FROM Subject") 
	@Query("select proj \r\n "
			+ "from Subject proj, User user \n"
			+ "where proj.id = subject_id \n"
			+ "and user.id = :userId \n"
			+ "order by proj.subjectIdentifier desc")
	List<Subject> findAllByUserId(@Param("userId") Long userId);
	
    
//	@Query("select prj.subjectIdentifier from Subject prj where prj.subjectId=subjectId and prj.subjectLeader= :subjectLeader order by create_At desc")
//	String[] getSubjectIdentifierAndLeader(@Param("subjectId") String subjectId, @Param("subjectLeader") String subjectLeader);
    
	//@Query("select auto.subjectIdentifier from Subject auto where auto.subjectIdentifier = :subjectId and auto.subjectLeader = :subjectLeader order by created_At desc")
	@Query("select proj.subjectIdentifier from Subject proj, User user \n"
			+ "where proj.id = subject_id \n"
			+ "and proj.subjectIdentifier = :subjectId \n"
			+ "and user.username = :userName \n"
			+ "order by proj.subjectIdentifier desc")
	String[] getSubjectIdentifierAndLeader(@Param("subjectId") String subjectId, @Param("userName") String userName);

	//@Query("select auto.subjectIdentifier from Subject auto where auto.subjectIdentifier = :subjectId and auto.subjectLeader = :subjectLeader order by created_At desc")
	@Query("select proj from Subject proj, User user \n"
			+ "where proj.id = subject_id \n"
			+ "and proj.subjectIdentifier = :subjectId \n"
			+ "and user.id = :userId \n"
			+ "order by proj.subjectIdentifier desc")
	Subject getSubjectAndUserId(@Param("subjectId") String subjectId, @Param("userId") Long userId);
	

	  //@Query("FROM Subject") 
	@Query("select proj  \r\n "
			+ "from Subject proj, User user \n"
			+ "where proj.id = subject_id \n"
			+ "and proj.subjectIdentifier = :subjectIdentifier \n"
			+ "and user.username = :userName ")
	Subject getSubjectAndUserName(@Param("subjectIdentifier") String subjectIdentifier, @Param("userName") String userName);
    
	  //@Query("FROM Subject") 
	@Query("select Distinct proj  \r\n "
			+ "from Subject proj, User user \n"
			+ "where proj.id = subject_id \n"
			//+ "and proj.subjectIdentifier = :subjectIdentifier \n"
			+ "and user.username = :userName ")
	Subject getFirstFoundUserName(@Param("userName") String userName);
	
}
