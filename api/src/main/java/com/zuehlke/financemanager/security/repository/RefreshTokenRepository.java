package com.zuehlke.financemanager.security.repository;

import com.zuehlke.financemanager.models.User;
import com.zuehlke.financemanager.security.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    @Override
    Optional<RefreshToken> findById(Long id);

    Optional<RefreshToken> findByToken(String token);

    @Modifying
    int deleteByUser(User user);
}

