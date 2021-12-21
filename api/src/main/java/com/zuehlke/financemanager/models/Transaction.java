package com.zuehlke.financemanager.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id;

    private Long amount;

    private String source;

    private String target;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Transaction(Long id, String source, String target, Long amount, Date createdAt,User user) {
        this.id=id;
        this.source=source;
        this.target=target;
        this.amount=amount;
        this.createdAt=createdAt;
        this.user=user;
    }

}
