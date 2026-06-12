package com.cineverse.review;

import com.cineverse.review.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ReviewServiceApplication implements CommandLineRunner {

	@Autowired
	private ReviewService reviewService;

	public static void main(String[] args) {
		SpringApplication.run(ReviewServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		reviewService.initDefaultReviews();
	}
}
