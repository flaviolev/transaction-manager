package com.zuehlke.financemanager.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @BeforeEach
    public void setUp() {
        roleRepository.save(new Role(ERole.ROLE_USER));
    }

    @Test
    public void findByName() {
        Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);
        assertThat(userRole).isNotEmpty();
    }
}