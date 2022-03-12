package com.nhs.bcss.controller;

import java.security.Principal;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhs.bcss.domain.SubjectTask;
import com.nhs.bcss.services.MapValidationErrorService;
import com.nhs.bcss.services.SubjectService;
import com.nhs.bcss.services.SubjectTaskService;
import com.nhs.bcss.validator.SubjectValidator;

import io.swagger.annotations.Api;


@RestController
@RequestMapping("/api/backlog")
//@CrossOrigin
@Api(value = "Backlog", description = "Subject Tasks pertaining to user in PPMTool Management System")
public class BacklogController {

    @Autowired
    private SubjectTaskService subjectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private SubjectValidator subjectValidator;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    // https://stackoverflow.com/questions/17967114/how-to-efficiently-remove-duplicates-from-an-array-without-using-set
    public static String[] removeDuplicates(String[] arr) {
        HashSet<String> set = new HashSet<>();
        Map<String, Integer> keepOrder = new HashMap<>();
        final int len = arr.length;
        // changed end to len
        int countPos = 0;
        for (int i = 0; i < len; i++) {
            set.add(arr[i]);
            if (set.size() > countPos) {
                keepOrder.put(arr[i], countPos);
                countPos++;
            } else {
                // keepOrder.put(arr[i], countPos);
            }

        }

        String[] whitelist = new String[set.size()];
        int i = 0;
        for (Iterator<String> it = set.iterator(); it.hasNext(); ) {
            String unit = it.next();
            int pos = keepOrder.get(unit);
            whitelist[pos] = unit;
        }

        return whitelist;
    }

    


    private String getCurrentDateTime() {
        Calendar calendar = new GregorianCalendar();

        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH); // Jan = 0, not 1
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        int weekOfYear = calendar.get(Calendar.WEEK_OF_YEAR);
        int weekOfMonth = calendar.get(Calendar.WEEK_OF_MONTH);

        int hour = calendar.get(Calendar.HOUR); // 12 hour clock
        int hourOfDay = calendar.get(Calendar.HOUR_OF_DAY); // 24 hour clock
        int minute = calendar.get(Calendar.MINUTE);
        int second = calendar.get(Calendar.SECOND);
        int millisecond = calendar.get(Calendar.MILLISECOND);

        return String.valueOf(year) + String.valueOf(month) + String.valueOf(dayOfMonth) + String.valueOf(hourOfDay)
                + String.valueOf(minute) + String.valueOf(second);
    }

   

    /*
     * Subject Task Operations
     *
     */
    @GetMapping("/subjectTask/{backlog_id}/{pt_id}")
    public ResponseEntity<?> getSubjectTaskBySequence(@PathVariable String backlog_id, @PathVariable String pt_id,
                                                      Principal principal) {
        SubjectTask subjectTask = subjectTaskService.findSubjectTaskBySubjectSequence(backlog_id, pt_id,
                principal.getName());
        return new ResponseEntity<SubjectTask>(subjectTask, HttpStatus.OK);
    }

    @PostMapping("/subjectTask/{backlog_id}")
    public ResponseEntity<?> addSubjectTaskToBacklog(@Valid @RequestBody SubjectTask subjectTask, BindingResult
            result,
                                                     @PathVariable String backlog_id, Principal principal) {
        // show delete
        // custom exception

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        SubjectTask subjectTask1 = subjectTaskService.addSubjectTask(backlog_id, subjectTask, principal.getName());

        return new ResponseEntity<SubjectTask>(subjectTask1, HttpStatus.CREATED);

    }

    @PatchMapping("/subjectTask/{backlog_id}/{pt_id}")
    public ResponseEntity<?> updateSubjectTask(@Valid @RequestBody SubjectTask subjectTask, BindingResult result,
                                               @PathVariable String backlog_id, @PathVariable String pt_id, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null)
            return errorMap;

        SubjectTask updatedTask = subjectTaskService.updateSubjectTaskBySubjectSequence(subjectTask, backlog_id, pt_id,
                principal.getName());

        return new ResponseEntity<SubjectTask>(updatedTask, HttpStatus.OK);

    }

    @DeleteMapping("/subjectTask/{backlog_id}/{pt_id}")
    public ResponseEntity<?> deleteSubjectTask(@PathVariable String backlog_id, @PathVariable String pt_id,
                                               Principal principal) {
        subjectTaskService.deleteSubjectTaskBySubjectSequence(backlog_id, pt_id, principal.getName());

        return new ResponseEntity<String>("Subject Task " + pt_id + " was deleted successfully", HttpStatus.OK);
    }

}
