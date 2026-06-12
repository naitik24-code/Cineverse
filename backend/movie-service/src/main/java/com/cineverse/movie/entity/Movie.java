package com.cineverse.movie.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String genre;

    @Column(name = "release_year", nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Double rating;

    @Column(length = 1000)
    private String image;

    @Column(length = 2000)
    private String overview;

    @Transient
    private List<Map<String, Object>> reviews = new ArrayList<>();
}
