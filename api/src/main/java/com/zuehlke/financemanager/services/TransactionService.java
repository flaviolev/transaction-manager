package com.zuehlke.financemanager.services;

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

    public static final long MINIMUM_VALID_BALANCE = 0L;

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

        return Optional.empty();
    }

    @Transactional
    public void addTransaction(Transaction transaction) throws AmountExceedBalanceException, SameUserTransactionNotAllowedException {
        Optional<User> source = userRepository.findByUsername(transaction.getSource());
        Optional<User> target = userRepository.findByUsername(transaction.getTarget());

        saveTransaction(transaction, source, target);


    }

    private void saveTransaction(Transaction transaction, Optional<User> source, Optional<User> target) {
        if (source.equals(target)) {
            throw new SameUserTransactionNotAllowedException("Cannot perform transaction on yourself!");
        }

        Long newAmount = transaction.getAmount();
        if (!hasSourceValideBalance(source, newAmount)) {
            throw new AmountExceedBalanceException("Amount exceed your balance!");
        }

        long sourceBalance = calculateSourceBalance(getSourceBalance(source), newAmount);
        Transaction sourceTransaction = createTransaction(transaction, source, sourceBalance, -transaction.getAmount());
        long targetBalance = calculateTargetBalance(target, newAmount);
        createTransaction(transaction, target, targetBalance, transaction.getAmount());
        Transaction targetTransaction = createTransaction(transaction, target, targetBalance, transaction.getAmount());

        transactionRepository.save(sourceTransaction);
        transactionRepository.save(targetTransaction);


        source.get().setBalance(sourceBalance);
        target.get().setBalance(targetBalance);

        userRepository.save(source.get());
        userRepository.save(target.get());
    }

    private Transaction createTransaction(Transaction transaction, Optional<User> account, long balance, long amount) {
        return new Transaction(transaction.getId(), transaction.getSource(), transaction.getTarget(), amount, new Date(), account.get(), balance);
    }

    private long calculateTargetBalance(Optional<User> target, Long newAmount) {
        return target.get().getBalance() + newAmount;
    }

    private long calculateSourceBalance(Long sourceBalance, Long amount) {
        return sourceBalance - amount;
    }

    private boolean hasSourceValideBalance(Optional<User> source, Long amount) {
        Long sourceBalance = getSourceBalance(source);
        return calculateSourceBalance(sourceBalance, amount) > MINIMUM_VALID_BALANCE;
    }

    private Long getSourceBalance(Optional<User> source) {
        return source.get().getBalance();
    }
}
