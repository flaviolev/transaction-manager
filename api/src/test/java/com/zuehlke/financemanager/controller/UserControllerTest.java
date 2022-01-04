package com.zuehlke.financemanager.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.payload.request.LoginRequest;
import com.zuehlke.financemanager.payload.response.JwtResponse;
import com.zuehlke.financemanager.repository.UserRepository;
import com.zuehlke.financemanager.security.jwt.AuthEntryPointJwt;
import com.zuehlke.financemanager.security.jwt.JwtUtils;
import com.zuehlke.financemanager.security.services.UserDetailsServiceImpl;
import com.zuehlke.financemanager.security.services.UserService;
import org.aspectj.lang.annotation.Before;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.IOException;
import java.text.MessageFormat;

import static java.util.Arrays.asList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = UserController.class)
public class UserControllerTest {

    @MockBean
    private UserDetailsServiceImpl userService;
    @MockBean
    private UserRepository userRepository;
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private AuthEntryPointJwt authEntryPointJwt;
    @MockBean
    private JwtUtils jwtUtils;


    JwtResponse jwtResponse;
    User testUser;

    @BeforeEach
    public void setUp() throws Exception {
        testUser = createTestUser("username", "user@email.com", "password");
        retrieveJwtAuthenticationResponse();
    }

    @Test
    public void existsByUsername() throws Exception {
        String username = "username";
        Mockito.when(userRepository.existsByUsername(username)).thenReturn(true);

        mockMvc.perform(get(MessageFormat.format("/api/user/{0}", username)))
                .andExpect(status().is(200));
    }

    @Test
    public void findBalanceByUsername() throws Exception {
        Mockito.when(userService.findBalanceByUsername()).thenReturn(1000L);

        mockMvc.perform(get("/api/balance")).andExpect(status().is(200));
    }

    private void retrieveJwtAuthenticationResponse() throws Exception {
        LoginRequest loginRequest = new LoginRequest("username", "password");
        MvcResult mvcResult = mockMvc
                .perform(post("/api/auth/signin")
                        .accept(APPLICATION_JSON)
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(toJson(loginRequest))
                )
                .andExpect(status().isOk())
                .andDo(print())
                .andReturn();
        MockHttpServletResponse response = mvcResult.getResponse();
        String jsonResponseAsString = response.getContentAsString();
        ObjectMapper mapper = new ObjectMapper();
        jwtResponse = mapper.readValue(jsonResponseAsString, JwtResponse.class);
    }

    protected static byte[] toJson(Object object) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return mapper.writeValueAsBytes(object);
    }

    protected User createTestUser(String username, String email,  String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setBalance(1000L);
        return userRepository.save(user);
    }

//    @Test
//    public void testGetUserById() {
//        User u = new User();
//        u.setId(1l);
//        assertThat(userExists, is(exists));
//        verify(userRepository).findOne(1l);
//        assertEquals(1l, user.getId().longValue());
//        assertThat(user.getId(), is(1l));
//    }

}