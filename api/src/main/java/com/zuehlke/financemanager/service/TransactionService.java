package com.zuehlke.financemanager.service;

import com.zuehlke.financemanager.exception.AmountExceedBalanceException;
import com.zuehlke.financemanager.exception.SameUserTransactionNotAllowedException;
import com.zuehlke.financemanager.models.Transaction;
import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.repository.TransactionRepository;
import com.zuehlke.financemanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class TransactionService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TransactionRepository transactionRepository;

    public Optional<List<Transaction>> getAllTransactionsByUsername() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();

        Optional<User> currentUser = userRepository.findByUsername(currentPrincipalName);
        if (currentUser.isPresent()) {
            Long currentId = currentUser.get().getId();
            return transactionRepository.findByUserId(currentId);
        }

        return null;
    }

    @Transactional
    public void addTransaction(Transaction transaction) throws AmountExceedBalanceException, SameUserTransactionNotAllowedException {
        Optional<User> source = userRepository.findByUsername(transaction.getSource());
        Optional<User> target = userRepository.findByUsername(transaction.getTarget());

        if (source.equals(target)) {
            throw new SameUserTransactionNotAllowedException("Cannot perform transaction on yourself!");
        } else {
            Long newAmount = transaction.getAmount();
            if ((source.get().getBalance() >= 0) && (source.get().getBalance() >= newAmount)) {
                long sourceBalance = source.get().getBalance() - newAmount;
                Transaction sourceTransaction = new Transaction(transaction.getId(), transaction.getSource(), transaction.getTarget(), -transaction.getAmount(), new Date(), source.get(), sourceBalance);
                long targetBalance = target.get().getBalance() + newAmount;
                Transaction targetTransaction = new Transaction(transaction.getId(), transaction.getSource(), transaction.getTarget(), transaction.getAmount(), new Date(), target.get(), targetBalance);

                transactionRepository.save(sourceTransaction);
                transactionRepository.save(targetTransaction);


                source.get().setBalance(sourceBalance);
                target.get().setBalance(targetBalance);

                userRepository.save(source.get());
                userRepository.save(target.get());


            } else {
                throw new AmountExceedBalanceException("Amount exceed your balance!");
            }
        }


    }





}
