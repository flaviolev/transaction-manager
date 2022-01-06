package com.zuehlke.financemanager.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.payload.request.LoginRequest;
import com.zuehlke.financemanager.payload.response.JwtResponse;
import com.zuehlke.financemanager.repository.UserRepository;
import com.zuehlke.financemanager.security.jwt.AuthEntryPointJwt;
import com.zuehlke.financemanager.security.jwt.JwtUtils;
import com.zuehlke.financemanager.services.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.IOException;
import java.text.MessageFormat;

import static org.hamcrest.MatcherAssert.assertThat;

import static org.mockito.Mockito.verify;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
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