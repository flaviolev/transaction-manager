package com.zuehlke.financemanager.services;

import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserDetailsServiceImplTest {
    @MockBean
    private UserRepository userRepository;

    @Autowired
    protected UserDetailsServiceImpl userService;

    @Test
    @WithMockUser(username = "user1", roles = {"USER", "ADMIN"})
    public void findBalanceByUsername() {
        Mockito.when(userRepository.findByUsername("user1")).thenReturn(
                Optional.ofNullable(createTestUser("user1", "user1@zuehlke.com", "user1")));
        Long balance = userService.findBalanceByUsername();
        assertThat(balance).isEqualTo(1000L);
    }

    @Test
    public void existsByUsernameUser1() {
        Mockito.when(userRepository.existsByUsername("user1")).thenReturn(true);
        boolean userExists = userService.existsByUsername("user1");
        assertThat(userExists).isEqualTo(true);
    }

    protected User createTestUser(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setBalance(1000L);
        return user;
    }
}