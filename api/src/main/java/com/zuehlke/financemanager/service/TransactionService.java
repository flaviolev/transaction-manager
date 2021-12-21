package com.zuehlke.financemanager.service;

import com.zuehlke.financemanager.exception.AmountExceedBalanceException;
import com.zuehlke.financemanager.models.Transaction;
import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.repository.TransactionRepository;
import com.zuehlke.financemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void addTransaction(Transaction transaction) throws AmountExceedBalanceException {
        Optional<User> source = userRepository.findByUsername(transaction.getSource());
        Optional<User> target = userRepository.findByUsername(transaction.getTarget());

        Long newAmount = transaction.getAmount();
        if ((source.get().getBalance() >= 0) && (source.get().getBalance() >= newAmount)) {

            source.get().setBalance(source.get().getBalance() - newAmount);
            target.get().setBalance(target.get().getBalance() + newAmount);

            userRepository.save(source.get());
            userRepository.save(target.get());

            Transaction sourceTransaction = new Transaction(transaction.getId(), transaction.getSource(), transaction.getTarget(), -transaction.getAmount(), new Date(), source.get());
            Transaction targetTransaction = new Transaction(transaction.getId(), transaction.getSource(), transaction.getTarget(), transaction.getAmount(), new Date(), target.get());

            transactionRepository.save(sourceTransaction);
            transactionRepository.save(targetTransaction);

        } else {
            throw new AmountExceedBalanceException("Amount exceed your balance!");
        }


    }
}
