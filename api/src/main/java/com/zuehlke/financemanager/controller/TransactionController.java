package com.zuehlke.financemanager.controller;

import com.zuehlke.financemanager.models.Transaction;
import com.zuehlke.financemanager.repository.TransactionRepository;
import com.zuehlke.financemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
    @Autowired
    TransactionRepository transactionRepository;


    @GetMapping
        public List<Transaction> getAllTrasactions() {
        return transactionRepository.findAll();

    }


}
