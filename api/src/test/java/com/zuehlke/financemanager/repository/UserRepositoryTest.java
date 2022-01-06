package com.zuehlke.financemanager.repository;

import com.zuehlke.financemanager.BaseTest;
import com.zuehlke.financemanager.models.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest extends BaseTest {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
//    @Autowired
//    protected PasswordEncoder passwordEncoder;
User actualUser;

    @BeforeEach
    public void setUp(){
        actualUser = createTestUser("test user", "user@email.com", "test password");
        assertThat(actualUser).hasFieldOrProperty("email");
    }

    @Test
    public void findByUsername() {
        Optional<User> foundByUsername=userRepository.findByUsername("test user");
        assertThat(foundByUsername.get()).isEqualTo(actualUser);
    }

    @Test
    public void existsByUsername() {
        Boolean userExistsByUsername=userRepository.existsByUsername("test user");
        assertThat(userExistsByUsername).isTrue();
    }

    @Test
    public void existsByEmail() {
        Boolean userExistsByEmail=userRepository.existsByEmail("user@email.com");
        assertThat(userExistsByEmail).isTrue();
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