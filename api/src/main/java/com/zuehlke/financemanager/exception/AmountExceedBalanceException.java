package com.zuehlke.financemanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AmountExceedBalanceException extends ResponseStatusException {

    public AmountExceedBalanceException(String message){
        super(HttpStatus.NOT_ACCEPTABLE, message);
    }

}
