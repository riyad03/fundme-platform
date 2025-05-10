package com.example.datahub.dao.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donation")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal amount;

    @Column(name = "donor_name")
    private String donorName;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "project_id")  // Add this line
    private String projectId;     // Add this field

    public void setAmount(BigDecimal bigDecimal) {
        amount=bigDecimal;
    }

    public void setDonorName(String testUser) {
        donorName=testUser;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getDonorName() {
        return donorName;
    }

    public Long getId() {
        return id;
    }



    // Add getter and setter
    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }


    // Getters and setters
}