package com.cineverse.movie.repository;

import com.cineverse.movie.entity.ShowSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowScheduleRepository extends JpaRepository<ShowSchedule, Long> {
    List<ShowSchedule> findByMovieId(Long movieId);
}
