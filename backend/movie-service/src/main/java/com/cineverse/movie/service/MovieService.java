package com.cineverse.movie.service;

import com.cineverse.movie.entity.Booking;
import com.cineverse.movie.entity.Movie;
import com.cineverse.movie.entity.ShowSchedule;
import com.cineverse.movie.repository.BookingRepository;
import com.cineverse.movie.repository.MovieRepository;
import com.cineverse.movie.repository.ShowScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowScheduleRepository showScheduleRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${review.service.url:http://localhost:5003}")
    private String reviewServiceUrl;

    public List<Movie> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        for (Movie movie : movies) {
            populateReviews(movie);
        }
        return movies;
    }

    public Optional<Movie> getMovieById(Long id) {
        Optional<Movie> movieOpt = movieRepository.findById(id);
        movieOpt.ifPresent(this::populateReviews);
        return movieOpt;
    }

    public Movie saveMovie(Movie movie) {
        if (movie.getReviews() == null) {
            movie.setReviews(new ArrayList<>());
        }
        return movieRepository.save(movie);
    }

    @SuppressWarnings("unchecked")
    private void populateReviews(Movie movie) {
        try {
            String url = reviewServiceUrl + "/api/reviews?movieId=" + movie.getId();
            List<Map<String, Object>> reviews = restTemplate.getForObject(url, List.class);
            if (reviews != null) {
                movie.setReviews(reviews);
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch reviews from review-service: " + e.getMessage());
            movie.setReviews(new ArrayList<>());
        }
    }

    // Booking Services
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUsername(String username) {
        return bookingRepository.findByUsername(username);
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    // ShowSchedule Services
    public List<ShowSchedule> getAllSchedules() {
        return showScheduleRepository.findAll();
    }

    public List<ShowSchedule> getSchedulesByMovieId(Long movieId) {
        return showScheduleRepository.findByMovieId(movieId);
    }

    public ShowSchedule saveSchedule(ShowSchedule schedule) {
        return showScheduleRepository.save(schedule);
    }

    public ShowSchedule blockSeats(Long scheduleId, String seatsToBlock) {
        ShowSchedule schedule = showScheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("Show Schedule not found"));

        String currentBlocked = schedule.getBlockedSeats();
        Set<String> blockedSet = new LinkedHashSet<>();
        
        if (currentBlocked != null && !currentBlocked.trim().isEmpty()) {
            blockedSet.addAll(Arrays.asList(currentBlocked.split("\\s*,\\s*")));
        }
        
        if (seatsToBlock != null && !seatsToBlock.trim().isEmpty()) {
            blockedSet.addAll(Arrays.asList(seatsToBlock.split("\\s*,\\s*")));
        }

        schedule.setBlockedSeats(String.join(",", blockedSet));
        return showScheduleRepository.save(schedule);
    }

    public void initDefaultData() {
        if (movieRepository.count() == 0) {
            movieRepository.save(new Movie(null, "Interstellar", "Sci-Fi", 2014, 8.7, 
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80", 
                    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Faced with dwindling resources on Earth, a group of scientists and pilots embark on the most important mission in human history.", 
                    new ArrayList<>()));
            
            movieRepository.save(new Movie(null, "The Dark Knight", "Action", 2008, 9.0, 
                    "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80", 
                    "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 
                    new ArrayList<>()));

            movieRepository.save(new Movie(null, "Inception", "Sci-Fi", 2010, 8.8, 
                    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80", 
                    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.", 
                    new ArrayList<>()));

            movieRepository.save(new Movie(null, "Pulp Fiction", "Thriller", 1994, 8.9, 
                    "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&auto=format&fit=crop&q=80", 
                    "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption in Los Angeles.", 
                    new ArrayList<>()));

            movieRepository.save(new Movie(null, "Gladiator", "Action", 2000, 8.5, 
                    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&auto=format&fit=crop&q=80", 
                    "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.", 
                    new ArrayList<>()));

            movieRepository.save(new Movie(null, "The Godfather", "Drama", 1972, 9.2, 
                    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80", 
                    "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.", 
                    new ArrayList<>()));
        }

        if (bookingRepository.count() == 0) {
            bookingRepository.save(new Booking(null, "Naitik Pathak", "Inception", "C-2, C-3", 25.0));
        }

        if (showScheduleRepository.count() == 0) {
            showScheduleRepository.save(new ShowSchedule(null, 3L, "Inception", "2026-06-12", "18:00", "B-3,B-4,D-5,D-6,A-8"));
        }
    }
}
