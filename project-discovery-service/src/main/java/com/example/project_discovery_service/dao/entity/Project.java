package com.example.project_discovery_service.dao.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "Project")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String title;
    private String slogan;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "video_id")
    private Long videoId;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "live_url")
    private String liveUrl;   // URL of the uploaded live file

    @Column(name = "image_url")
    private String imageUrl;  // URL of the uploaded image file

    @Column(name = "live_id")
    private Long liveId;

    @Column(name = "image_id")
    private Long imageId;

    @Column(name = "date_started")
    private LocalDate dateStarted;

    @Column(name = "date_ended")
    private LocalDate dateEnded;

    @Column(name = "views_num")
    private Integer viewsNum;

    @Column(name = "donations_goal")
    private Double donationsGoal;

    private String status;
    private String tag;

    @Column(name = "creator_id")
    private Long creatorId;

    @Column(name = "chat_id")
    private Long chatId;
}