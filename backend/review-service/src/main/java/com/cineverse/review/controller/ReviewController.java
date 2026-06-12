package com.cineverse.review.controller;

import com.cineverse.review.entity.Review;
import com.cineverse.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        try {
            Review createdReview = reviewService.addReview(review);
            return ResponseEntity.ok(createdReview);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Review>> getReviews(@RequestParam(required = false) Long movieId) {
        if (movieId != null) {
            return ResponseEntity.ok(reviewService.getReviewsByMovieId(movieId));
        }
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }
}
