package com.zuehlke.financemanager.user;

import com.zuehlke.financemanager.user.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.text.MessageFormat;

import static org.hamcrest.MatcherAssert.assertThat;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @MockBean
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    protected MockMvc mockMvc;

    @Test
    public void existsByUsername() throws Exception {
        Mockito.when(userDetailsService.existsByUsername("username")).thenReturn(true);

        mockMvc.perform(get(MessageFormat.format("/api/user/{0}", "username")))
                .andExpect(status().is(200)).andExpect(content().string("true"));
    }

    @Test
    public void findBalanceByUsername() throws Exception {
        Mockito.when(userDetailsService.findBalanceByUsername()).thenReturn(1000L);

        mockMvc.perform(get("/api/user/balance")).andExpect(status().is(200)).
                andExpect(content().string("1000")).andExpect(content().string("1000"));
    }
}