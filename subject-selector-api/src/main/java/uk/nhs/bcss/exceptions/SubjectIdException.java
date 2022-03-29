package uk.nhs.bcss.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SubjectIdException extends RuntimeException {

    public SubjectIdException(String message) {
        super(message);
    }
}
