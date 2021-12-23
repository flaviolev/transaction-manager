package com.zuehlke.financemanager.controller;

import com.zuehlke.financemanager.exception.AmountExceedBalanceException;
import com.zuehlke.financemanager.exception.SameUserTransactionNotAllowedException;
import com.zuehlke.financemanager.models.Transaction;
import com.zuehlke.financemanager.payload.response.MessageResponse;
import com.zuehlke.financemanager.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.ResponseEntity.ok;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {


    @Autowired
    TransactionService transactionService;


    @GetMapping()
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        Optional<List<Transaction>> transactions = transactionService.getAllTransactionsByUsername();
        return new ResponseEntity<>(transactions.get(), HttpStatus.OK);
    }

    @PostMapping
    @ExceptionHandler(AmountExceedBalanceException.class)
    public ResponseEntity<?> addTransaction(@RequestBody Transaction transaction) throws AmountExceedBalanceException, SameUserTransactionNotAllowedException {
        try {
            transactionService.addTransaction(transaction);
            return ok(new MessageResponse("Transaction created successfully!"));
        } catch (AmountExceedBalanceException amountExceedBalanceException) {

            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(amountExceedBalanceException.getMessage());


        }
        catch (SameUserTransactionNotAllowedException sameUserTransactionNotAllowedException) {

            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body(sameUserTransactionNotAllowedException.getMessage());


        }


    }

}