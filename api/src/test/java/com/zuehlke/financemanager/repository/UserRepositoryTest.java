package com.zuehlke.financemanager.repository;

import com.zuehlke.financemanager.BaseTest;
import com.zuehlke.financemanager.models.ERole;
import com.zuehlke.financemanager.models.Role;
import com.zuehlke.financemanager.models.User;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest extends BaseTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
//    @Autowired
//    protected PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp(){
        User actualUser = createTestUser("test user", "user@email.com", "test password");
        assertThat(actualUser).hasFieldOrProperty("email");
    }

    @Test
    public void findByUsername() {
    }

    @Test
    public void existsByUsername() {
    }

    @Test
    public void existsByEmail() {
    }

    protected User createTestUser(String username, String email,  String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setBalance(1000L);
        return userRepository.save(user);
    }
}