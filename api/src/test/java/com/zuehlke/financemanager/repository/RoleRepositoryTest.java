package com.zuehlke.financemanager.repository;

import com.zuehlke.financemanager.BaseTest;
import com.zuehlke.financemanager.models.ERole;
import com.zuehlke.financemanager.models.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RoleRepositoryTest extends BaseTest {

    @Autowired
    private RoleRepository roleRepository;

    @Test
    public void findByName() {
        Optional<Role> userRole = roleRepository.findByName(ERole.ROLE_USER);
        assertThat(userRole).isNotEmpty();
    }
}