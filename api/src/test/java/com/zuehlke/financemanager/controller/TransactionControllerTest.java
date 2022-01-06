package com.zuehlke.financemanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zuehlke.financemanager.exception.AmountExceedBalanceException;
import com.zuehlke.financemanager.exception.SameUserTransactionNotAllowedException;
import com.zuehlke.financemanager.models.Transaction;
import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.services.TransactionService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TransactionControllerTest {

    @MockBean
    TransactionService transactionService;
    @Autowired
    protected MockMvc mockMvc;

    @Test
    void getAllTransactions() throws Exception {
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(new Transaction(1L, "user1", "user2", 500L, new Date(), new User(), 500L));
        transactions.add(new Transaction(2L, "user1", "user2", 1000L, new Date(), new User(), 1500L));

        Mockito.when(transactionService.getAllTransactionsByUsername()).thenReturn(Optional.of(transactions));

        mockMvc.perform(get("/api/transaction")).andExpect(status().is(200))
                .andExpect(jsonPath("$.size()", Matchers.is(2)));
    }

    @Test
    void addTransaction() throws Exception {
        Transaction transaction = new Transaction(1L, "user1", "user2", 1000L, new Date(), new User(), 2000L);
        Mockito.doNothing().when(transactionService).addTransaction(transaction);

        mockMvc.perform(post("/api/transaction").contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(transaction))).andExpect(status().is(200));
    }

    @Test
    void addAmountExceedBalanceTransaction() throws Exception {
        Transaction transaction = new Transaction(1L, "user1", "user2", 1000L, new Date(), new User(), 500L);
        Mockito.doThrow(new AmountExceedBalanceException("Amount exceed your balance!")).when(transactionService).addTransaction(transaction);

        mockMvc.perform(post("/api/transaction").contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(transaction))).andExpect(status().isNotAcceptable()).andDo(print());
    }

    @Test
    void addAmountExceedBalanceTransactionToSameUser() throws Exception {
        Transaction transaction = new Transaction(1L, "user1", "user1", 1000L, new Date(), new User(), 500L);
        Mockito.doThrow(new SameUserTransactionNotAllowedException("Cannot perform transaction on yourself!")).when(transactionService).addTransaction(transaction);

        mockMvc.perform(post("/api/transaction").contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(transaction))).andExpect(status().isNotAcceptable()).andDo(print());
    }

    public static String asJsonString(final Object obj) {
        try {
            final ObjectMapper mapper = new ObjectMapper();
            final String jsonContent = mapper.writeValueAsString(obj);
            return jsonContent;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}