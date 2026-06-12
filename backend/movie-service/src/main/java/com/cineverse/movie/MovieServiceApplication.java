package com.cineverse.movie;

import com.cineverse.movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class MovieServiceApplication implements CommandLineRunner {

	@Autowired
	private MovieService movieService;

	public static void main(String[] args) {
		SpringApplication.run(MovieServiceApplication.class, args);
	}



	@Override
	public void run(String... args) throws Exception {
		movieService.initDefaultData();
	}
}
