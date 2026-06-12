package com.cineverse.movie.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "show_schedules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long movieId;

    @Column(nullable = false)
    private String movieTitle;

    @Column(nullable = false)
    private String showDate;

    @Column(nullable = false)
    private String showTime;

    @Column(length = 2000)
    private String blockedSeats = ""; // comma-separated seat ids like "A-1,A-2"
}
