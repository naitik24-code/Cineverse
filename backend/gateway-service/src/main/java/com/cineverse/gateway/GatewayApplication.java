package com.cineverse.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        System.out.println("=== STARTING GATEWAY-SERVICE ===");
        System.out.println("AUTH_SERVICE_URL env: " + System.getenv("AUTH_SERVICE_URL"));
        System.out.println("MOVIE_SERVICE_URL env: " + System.getenv("MOVIE_SERVICE_URL"));
        System.out.println("REVIEW_SERVICE_URL env: " + System.getenv("REVIEW_SERVICE_URL"));
        System.out.println("=================================");
        SpringApplication.run(GatewayApplication.class, args);
    }
}
