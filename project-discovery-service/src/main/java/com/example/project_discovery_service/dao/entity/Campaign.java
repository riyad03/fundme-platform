package com.example.project_discovery_service.dao.entity;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "campaigns")
@Data // Lombok annotation to generate getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor // Lombok annotation to generate a no-args constructor
@AllArgsConstructor // Lombok annotation to generate an all-args constructor
@Builder
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // Unique identifier for the campaign

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;  // Foreign key referencing the project

    @Column(name = "campaign_name", nullable = false)
    private String campaignName;  // Name of the campaign

    @Column(name = "description")
    private String description;  // Description of the campaign

    @Column(name = "start_date")
    private LocalDateTime startDate;  // Start date of the campaign

    @Column(name = "end_date")
    private LocalDateTime endDate;  // End date of the campaign

    @Column(name = "status")
    private String status;  // Status of the campaign (e.g., 'Active', 'Completed')

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;  // Date and time the campaign was created

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;  // Date and time the campaign was last updated

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

