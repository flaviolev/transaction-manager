package com.zuehlke.financemanager.repository;

import com.zuehlke.financemanager.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository  extends JpaRepository<Transaction, Long> {
}
