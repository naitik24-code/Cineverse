import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import SeatManagement from './pages/SeatManagement';
import Card from './components/Card';
import Button from './components/Button';
import './App.css';

const INITIAL_MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.7,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. Faced with dwindling resources on Earth, a group of scientists and pilots embark on the most important mission in human history.",
    reviews: [
      { id: 1, author: "Alice Smith", rating: 5, comment: "An absolute masterpiece of modern science fiction. The soundtrack by Hans Zimmer is legendary!" },
      { id: 2, author: "Bob Jones", rating: 4, comment: "Visually stunning and emotionally heavy. Slightly confusing at the end but brilliant." }
    ]
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    reviews: [
      { id: 1, author: "Charlie Brown", rating: 5, comment: "Heath Ledger's performance is legendary. Best comic book movie ever made." }
    ]
  },
  {
    id: 3,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
    reviews: [
      { id: 1, author: "David Miller", rating: 5, comment: "Mind-bending and original. The hallway fight scene is incredible!" }
    ]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: "Thriller",
    year: 1994,
    rating: 8.9,
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&auto=format&fit=crop&q=80",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption in Los Angeles.",
    reviews: [
      { id: 1, author: "Emma Watson", rating: 4, comment: "Tarantino at his finest. The dialogue is top-notch." }
    ]
  },
  {
    id: 5,
    title: "Gladiator",
    genre: "Action",
    year: 2000,
    rating: 8.5,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&auto=format&fit=crop&q=80",
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    reviews: [
      { id: 1, author: "Frank Castle", rating: 5, comment: "Are you not entertained? A cinematic classic!" }
    ]
  },
  {
    id: 6,
    title: "The Godfather",
    genre: "Drama",
    year: 1972,
    rating: 9.2,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
    overview: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    reviews: [
      { id: 1, author: "Grace Hopper", rating: 5, comment: "The definition of perfect cinema. Every shot is art." }
    ]
  }
];

function App() {
  const [movies, setMovies] = useState(INITIAL_MOVIES);
  
  // App routing and authenticating states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userName, setUserName] = useState("Naitik Pathak");
  const [userRole, setUserRole] = useState("User"); // 'User', 'Theatre Owner', 'Admin'
  
  // Tab selector: 'dashboard', 'booking', or 'seat-mgmt'
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  // Seating show scheduling info message
  const [seatingInfoMsg, setSeatingInfoMsg] = useState(null);
  
  // Bookings list state
  const [bookings, setBookings] = useState([
    {
      id: 1,
      movie: "Inception",
      seats: "C-2, C-3",
      price: 25.0
    }
  ]);

  // Review submission states
  const [reviewAuthor, setReviewAuthor] = useState("Naitik Pathak");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  // Quick book trigger
  const [quickBookMovieId, setQuickBookMovieId] = useState(null);

  // Filter movies for dashboard grid
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || movie.genre === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLoginSuccess = (name, role) => {
    setUserName(name);
    setUserRole(role);
    setIsLoggedIn(true);
    setIsAuthenticating(false);
    
    // Set default tab based on role feature matrix
    if (role === 'User') {
      setActiveTab('dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('User');
    setUserName('Naitik Pathak');
    setActiveTab('dashboard');
    setSeatingInfoMsg(null);
  };

  const handleQuickBook = (movieId) => {
    setQuickBookMovieId(movieId);
    setActiveTab('booking');
  };

  const handleAddBooking = (movieTitle, seats, price) => {
    const newBooking = {
      id: Date.now(),
      movie: movieTitle,
      seats: seats.join(', '),
      price: price
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleAddNewMovie = (newMovieObj) => {
    setMovies(prev => [newMovieObj, ...prev]);
  };

  const handleShowMessage = (msg) => {
    setSeatingInfoMsg(msg);
    // Auto-clear message after 6 seconds
    setTimeout(() => {
      setSeatingInfoMsg(null);
    }, 6000);
  };

  const handleOpenMovie = (movie) => {
    setSelectedMovie(movie);
    setReviewRating(5);
    setReviewComment("");
  };

  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newReview = {
      id: Date.now(),
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment
    };

    setMovies(prevMovies =>
      prevMovies.map(movie => {
        if (movie.id === selectedMovie.id) {
          const updatedReviews = [...movie.reviews, newReview];
          const avgRating = parseFloat(
            ((movie.rating * movie.reviews.length + reviewRating) / updatedReviews.length).toFixed(1)
          );
          
          const updatedMovie = {
            ...movie,
            rating: avgRating,
            reviews: updatedReviews
          };
          
          setSelectedMovie(updatedMovie);
          return updatedMovie;
        }
        return movie;
      })
    );

    setReviewComment("");
  };

  // If not logged in, render public pages
  if (!isLoggedIn) {
    if (isAuthenticating) {
      return (
        <AuthPage 
          onLoginSuccess={handleLoginSuccess}
          onCancel={() => setIsAuthenticating(false)}
        />
      );
    }
    return (
      <LandingPage 
        onGetStarted={() => setIsAuthenticating(true)}
        trendingMovies={movies}
      />
    );
  }

  return (
    <div className="cv-app-container">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setQuickBookMovieId(null); // Clear booking pre-selects
        }} 
        userName={userName}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <div className="cv-app-layout-wrapper">
        
        {/* Scheduled Show Status Banner */}
        {seatingInfoMsg && (
          <div className="glass-card" style={{ maxWidth: '1400px', margin: '0 auto 1.5rem auto', borderColor: 'var(--primary)', color: 'var(--primary)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>📢 <strong>System Notice:</strong> {seatingInfoMsg}</span>
            <button onClick={() => setSeatingInfoMsg(null)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
          </div>
        )}

        <div className="cv-app-layout-inner">
          
          {/* Global Sidebar */}
          <Sidebar 
            activeCategory={selectedCategory} 
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              if (activeTab !== 'dashboard') {
                setActiveTab('dashboard'); // Auto-switch to dashboard when category filter selected
              }
            }}
            stats={{
              totalMovies: movies.length,
              bookingsCount: bookings.length
            }}
            userRole={userRole}
          />

          {/* Main Router */}
          <main className="cv-app-main-content">
            {activeTab === 'dashboard' && (
              <Dashboard 
                movies={filteredMovies}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onMovieClick={handleOpenMovie}
                onQuickBook={handleQuickBook}
                userRole={userRole}
                onAddNewMovie={handleAddNewMovie}
                bookingsCount={bookings.length}
              />
            )}
            {activeTab === 'booking' && (
              <BookingPage 
                movies={movies}
                bookings={bookings}
                onAddBooking={handleAddBooking}
                initialSelectedMovieId={quickBookMovieId}
              />
            )}
            {activeTab === 'seat-mgmt' && (
              <SeatManagement 
                movies={movies}
                onAddShowMessage={handleShowMessage}
              />
            )}
          </main>

        </div>
      </div>

      {/* Movie Detail Modal with Review Section */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={handleCloseMovie}>
          <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseMovie}>✕</button>
            <div className="modal-body">
              <div className="modal-body-layout">
                <div className="modal-poster-wrap">
                  <img src={selectedMovie.image} alt={selectedMovie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="modal-details">
                  <span className="movie-genre">{selectedMovie.genre}</span>
                  <h2 className="modal-title">{selectedMovie.title}</h2>
                  <div className="modal-meta">
                    <span>📅 {selectedMovie.year}</span>
                    <span>⭐ {selectedMovie.rating.toFixed(1)} / 10</span>
                  </div>
                  <p className="modal-overview">{selectedMovie.overview}</p>
                  
                  {/* Hide book buttons for manager roles */}
                  {userRole === 'User' && (
                    <Button variant="primary" style={{ marginTop: '1rem' }} onClick={() => {
                      handleCloseMovie();
                      handleQuickBook(selectedMovie.id);
                    }}>
                      Book Tickets For This Movie
                    </Button>
                  )}
                </div>
              </div>

              {/* Audience Reviews */}
              <div className="reviews-section">
                <h3 className="reviews-title">User Reviews ({selectedMovie.reviews.length})</h3>
                
                {/* Add Review Form */}
                <form className="review-form" onSubmit={handleAddReview}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Reviewer Name</label>
                      <input 
                        type="text" 
                        className="search-input" 
                        style={{ padding: '0.5rem 1rem' }} 
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Rating</label>
                      <div className="rating-select">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className={`star-btn ${reviewRating >= star ? 'filled' : ''}`}
                            onClick={() => setReviewRating(star)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Comments</label>
                    <textarea 
                      className="review-textarea" 
                      placeholder="Write your review here..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Post Review</button>
                </form>

                {/* Reviews List */}
                <div className="reviews-list">
                  {selectedMovie.reviews.map(rev => (
                    <div key={rev.id} className="review-item">
                      <div className="review-header">
                        <span className="review-author">{rev.author}</span>
                        <span className="review-stars">
                          {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                        </span>
                      </div>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))}
                  {selectedMovie.reviews.length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Be the first to review this movie!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="student-info-badge glass-card">
            <span className="student-info-item">👨‍💻 Candidate: <strong>Naitik Pathak</strong></span>
            <span className="student-info-item">🆔 Student UID: <strong>23BCB10041</strong></span>
            <span className="student-info-item">👥 Assessment Group: <strong>G16</strong></span>
            <span className="student-info-item">📋 Course Code / Assessment: <strong>Assessment SWC</strong></span>
          </div>
          <p className="footer-text">
            &copy; 2026 Cineverse. Created for SWC Assessment Submission.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
