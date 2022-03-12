package com.nhs.bcss.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nhs.bcss.domain.Backlog;
import com.nhs.bcss.domain.SubjectTask;
import com.nhs.bcss.exceptions.SubjectNotFoundException;
import com.nhs.bcss.repositories.SubjectTaskRepository;

@Service
public class SubjectTaskService {



    @Autowired
    private SubjectTaskRepository subjectTaskRepository;


    @Autowired
    private SubjectService subjectService;


    public SubjectTask addSubjectTask(String subjectIdentifier, SubjectTask subjectTask, String username){


            //PTs to be added to a specific subject, subject != null, BL exists
            Backlog backlog =  subjectService.findSubjectByIdentifier(subjectIdentifier, true).getBacklog(); //backlogRepository.findBySubjectIdentifier(subjectIdentifier);
            //set the bl to pt
            System.out.println(backlog);
            subjectTask.setBacklog(backlog);
            //we want our subject sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
            Integer BacklogSequence = backlog.getPTSequence();
            // Update the BL SEQUENCE
            BacklogSequence++;

            backlog.setPTSequence(BacklogSequence);

            //Add Sequence to Subject Task
            subjectTask.setSubjectSequence(backlog.getSubjectIdentifier()+"-"+BacklogSequence);
            subjectTask.setSubjectIdentifier(subjectIdentifier);

            //INITIAL priority when priority null

            //INITIAL status when status is null
            if(subjectTask.getStatus()==""|| subjectTask.getStatus()==null){
                subjectTask.setStatus("TO_DO");
            }

            //Fix bug with priority in Spring Boot Server, needs to check null first
            if(subjectTask.getPriority()==null||subjectTask.getPriority()==0){ //In the future we need subjectTask.getPriority()== 0 to handle the form
                subjectTask.setPriority(3);
            }

    		if (subjectTask.getTaskType()==null) {
    			subjectTask.setTaskType("PROJECT_TASK");
    		}
            
            return subjectTaskRepository.save(subjectTask);


    }

    public Iterable<SubjectTask>findBacklogById(String id, String username){

        subjectService.findSubjectByIdentifier(id, true);

        return subjectTaskRepository.findBySubjectIdentifierOrderByPriority(id);
    }


    public SubjectTask findSubjectTaskBySubjectSequence(String backlog_id, String pt_id, String username){

        //make sure we are searching on an existing backlog
        subjectService.findSubjectByIdentifier(backlog_id, true);


        //make sure that our task exists
        SubjectTask subjectTask = subjectTaskRepository.findBySubjectSequence(pt_id);

        if(subjectTask == null){
            throw new SubjectNotFoundException("Subject Task '"+pt_id+"' not found");
        }

        //make sure that the backlog/subject id in the path corresponds to the right subject
        if(!subjectTask.getSubjectIdentifier().equals(backlog_id)){
            throw new SubjectNotFoundException("Subject Task '"+pt_id+"' does not exist in subject: '"+backlog_id);
        }


        return subjectTask;
    }

    public SubjectTask updateSubjectTaskBySubjectSequence(SubjectTask updatedTask, String backlog_id, String pt_id, String username){
        
    	SubjectTask subjectTask = findSubjectTaskBySubjectSequence(backlog_id, pt_id, username);

        subjectTask = updatedTask;

        return subjectTaskRepository.save(subjectTask);
    }


    public void deleteSubjectTaskBySubjectSequence(String backlog_id, String pt_id, String username){
        SubjectTask subjectTask = findSubjectTaskBySubjectSequence(backlog_id, pt_id, username);
        subjectTaskRepository.delete(subjectTask);
    }

}
