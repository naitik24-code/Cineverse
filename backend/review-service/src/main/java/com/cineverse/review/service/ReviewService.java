package com.cineverse.review.service;

import com.cineverse.review.entity.Review;
import com.cineverse.review.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        if (review.getRating() < 1 || review.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByMovieId(Long movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public void initDefaultReviews() {
        if (reviewRepository.count() == 0) {
            // Movie 1: Interstellar
            reviewRepository.save(new Review(null, 1L, "Alice Smith", 5, "An absolute masterpiece of modern science fiction. The soundtrack by Hans Zimmer is legendary!"));
            reviewRepository.save(new Review(null, 1L, "Bob Jones", 4, "Visually stunning and emotionally heavy. Slightly confusing at the end but brilliant."));
            
            // Movie 2: The Dark Knight
            reviewRepository.save(new Review(null, 2L, "Charlie Brown", 5, "Heath Ledger's performance is legendary. Best comic book movie ever made."));
            
            // Movie 3: Inception
            reviewRepository.save(new Review(null, 3L, "David Miller", 5, "Mind-bending and original. The hallway fight scene is incredible!"));
            
            // Movie 4: Pulp Fiction
            reviewRepository.save(new Review(null, 4L, "Emma Watson", 4, "Tarantino at his finest. The dialogue is top-notch."));
            
            // Movie 5: Gladiator
            reviewRepository.save(new Review(null, 5L, "Frank Castle", 5, "Are you not entertained? A cinematic classic!"));
            
            // Movie 6: The Godfather
            reviewRepository.save(new Review(null, 6L, "Grace Hopper", 5, "The definition of perfect cinema. Every shot is art."));
        }
    }
}
