package com.zuehlke.financemanager.authentication;

import com.zuehlke.financemanager.user.User;
import lombok.Data;

import javax.persistence.*;
import java.time.Instant;

@Entity(name = "refreshtoken")
@Data
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Instant expiryDate;


}
