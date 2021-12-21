package com.zuehlke.financemanager.controller;

import com.zuehlke.financemanager.exception.AmountExceedBalanceException;
import com.zuehlke.financemanager.models.Transaction;
import com.zuehlke.financemanager.payload.response.MessageResponse;
import com.zuehlke.financemanager.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {


    @Autowired
    TransactionService transactionService;


    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return new ResponseEntity<List<Transaction>>(transactions, HttpStatus.OK);
    }

    @PostMapping
    @ExceptionHandler(AmountExceedBalanceException.class)
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction) throws AmountExceedBalanceException {
        try {
            transactionService.addTransaction(transaction);
            return ok(new MessageResponse("Transaction created successfully!"));
        } catch (AmountExceedBalanceException exception) {

            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(exception.getMessage());

        }


    }

}