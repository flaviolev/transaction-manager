package com.zuehlke.financemanager.service;

import com.zuehlke.financemanager.models.Transaction;
import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.payload.response.MessageResponse;
import com.zuehlke.financemanager.repository.TransactionRepository;
import com.zuehlke.financemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class TransactionService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TransactionRepository transactionRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Transactional
    public void addTransaction(Transaction transaction) {
        Optional<User> source = userRepository.findByUsername(transaction.getSource());
        Optional<User> target = userRepository.findByUsername(transaction.getTarget());

        Long newAmount = transaction.getAmount();

        source.get().setBalance(source.get().getBalance() - newAmount);
        target.get().setBalance(target.get().getBalance() + newAmount);

        userRepository.save(source.get());
        userRepository.save(target.get());

        Transaction sourceTransaction = new Transaction(transaction.getId(), transaction.getSource(), transaction.getTarget(), -transaction.getAmount(),new Date(), source.get());
        Transaction targetTransaction = new Transaction(transaction.getId(), transaction.getSource(), transaction.getTarget(), transaction.getAmount(), new Date(),target.get());

        transactionRepository.save(sourceTransaction);
        transactionRepository.save(targetTransaction);


    }
}
