package com.example.user_project_service.dao.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data               // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor  // generates no-arg constructor
@AllArgsConstructor // generates all-args constructor
@Builder            // optional: allows fluent builder pattern
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(length = 500)
    private String description;


    @ManyToMany
    @JoinTable(
            name = "user_followers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private Set<User> followers = new HashSet<>();


    @ManyToMany(mappedBy = "followers")
    private Set<User> following = new HashSet<>();


    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "log_id")
    private Log log;*/

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}

