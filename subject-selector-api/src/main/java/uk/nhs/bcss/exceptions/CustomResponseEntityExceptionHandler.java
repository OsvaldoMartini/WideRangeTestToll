package uk.nhs.bcss.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    // Subject Exception Handlers
    @ExceptionHandler
    public final ResponseEntity<Object> handleSubjectIdException(SubjectIdException ex, WebRequest request){
        SubjectIdExceptionResponse exceptionResponse = new SubjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleSubjectNotFoundException(SubjectNotFoundException ex, WebRequest request){
        SubjectNotFoundExceptionResponse exceptionResponse = new SubjectNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

   
   
    
}
