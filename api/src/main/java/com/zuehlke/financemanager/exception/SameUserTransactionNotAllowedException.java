package com.zuehlke.financemanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class SameUserTransactionNotAllowedException extends ResponseStatusException {

    public SameUserTransactionNotAllowedException(String message) {
        super(HttpStatus.NOT_ACCEPTABLE, message);
    }
}
