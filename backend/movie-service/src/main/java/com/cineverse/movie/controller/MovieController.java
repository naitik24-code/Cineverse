package com.cineverse.movie.controller;

import com.cineverse.movie.entity.Booking;
import com.cineverse.movie.entity.Movie;
import com.cineverse.movie.entity.ShowSchedule;
import com.cineverse.movie.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    // Movies Catalog endpoints
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable Long id) {
        return movieService.getMovieById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        try {
            Movie createdMovie = movieService.saveMovie(movie);
            return ResponseEntity.ok(createdMovie);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Ticket Bookings endpoints
    @PostMapping("/bookings")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking) {
        try {
            Booking savedBooking = movieService.saveBooking(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getBookings(@RequestParam(required = false) String username) {
        if (username != null && !username.trim().isEmpty()) {
            return ResponseEntity.ok(movieService.getBookingsByUsername(username));
        }
        return ResponseEntity.ok(movieService.getAllBookings());
    }

    // Show Schedules endpoints
    @PostMapping("/schedules")
    public ResponseEntity<?> addSchedule(@RequestBody ShowSchedule schedule) {
        try {
            ShowSchedule savedSchedule = movieService.saveSchedule(schedule);
            return ResponseEntity.ok(savedSchedule);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/schedules")
    public ResponseEntity<List<ShowSchedule>> getSchedules(@RequestParam(required = false) Long movieId) {
        if (movieId != null) {
            return ResponseEntity.ok(movieService.getSchedulesByMovieId(movieId));
        }
        return ResponseEntity.ok(movieService.getAllSchedules());
    }

    @PostMapping("/schedules/{id}/block-seats")
    public ResponseEntity<?> blockSeats(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String seats = request.get("seats");
            ShowSchedule updatedSchedule = movieService.blockSeats(id, seats);
            return ResponseEntity.ok(updatedSchedule);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
