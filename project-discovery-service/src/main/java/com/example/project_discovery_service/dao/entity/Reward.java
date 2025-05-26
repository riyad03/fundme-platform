package com.example.project_discovery_service.dao.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "rewards")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double amount;

    private Integer quantity; // nullable = unlimited

    private LocalDate estimatedDelivery;

    @Column(nullable = false, updatable = false)
    private LocalDate createdAt = LocalDate.now();




    // Getters and Setters

    // (Add your getter/setter methods here or use Lombok to reduce boilerplate)
}
