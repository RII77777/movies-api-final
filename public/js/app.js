let token = '';
let currentUser = null;

function showMessage(elementId, message, type = 'success') {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = `message ${type}`;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

function updateUserInfo(user) {
    const userInfo = document.getElementById('userInfo');
    if (user) {
        currentUser = user;
        userInfo.innerHTML = `
            <i class="fas fa-user-circle"></i>
            ${user.email} (${user.role})
            <button onclick="logout()" class="btn btn-small" style="margin-left: 10px; background: #e53e3e;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        `;
        userInfo.style.display = 'block';
        
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('movieSection').style.display = 'block';
        document.getElementById('reviewSection').style.display = 'block';
    } else {
        currentUser = null;
        userInfo.style.display = 'none';
        
        document.getElementById('authSection').style.display = 'block';
        document.getElementById('movieSection').style.display = 'none';
        document.getElementById('reviewSection').style.display = 'none';
    }
}

async function register() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    if (password.length < 6) {
        showMessage('authMessage', 'Password must be at least 6 characters', 'error');
        return;
    }

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        
        if (res.ok) {
            showMessage('authMessage', 'Registration successful! You can now login.', 'success');
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';
        } else {
            showMessage('authMessage', data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        showMessage('authMessage', 'Network error. Please try again.', 'error');
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        
        if (res.ok) {
            token = data.token;
            showMessage('authMessage', 'Login successful!', 'success');
            updateUserInfo(data.user);
            loadMovies();
            loadReviews();
            
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
        } else {
            showMessage('authMessage', data.message || 'Login failed', 'error');
        }
    } catch (error) {
        showMessage('authMessage', 'Network error. Please try again.', 'error');
    }
}

function logout() {
    token = '';
    updateUserInfo(null);
    showMessage('authMessage', 'Logged out successfully', 'success');
}

async function addMovie() {
    if (!currentUser || currentUser.role !== 'admin') {
        showMessage('movieMessage', 'Only admins can add movies', 'error');
        return;
    }

    const movie = {
        title: document.getElementById('title').value,
        director: document.getElementById('director').value,
        year: parseInt(document.getElementById('year').value),
        genre: document.getElementById('genre').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value
    };

    if (Object.values(movie).some(value => !value)) {
        showMessage('movieMessage', 'All fields are required', 'error');
        return;
    }

    try {
        const res = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(movie)
        });

        const data = await res.json();
        
        if (res.ok) {
            showMessage('movieMessage', 'Movie added successfully!', 'success');
            loadMovies();
            
            document.getElementById('title').value = '';
            document.getElementById('director').value = '';
            document.getElementById('year').value = '';
            document.getElementById('genre').value = '';
            document.getElementById('description').value = '';
            document.getElementById('image').value = '';
        } else {
            showMessage('movieMessage', data.message || 'Failed to add movie', 'error');
        }
    } catch (error) {
        showMessage('movieMessage', 'Network error. Please try again.', 'error');
    }
}

async function addReview() {
    if (!currentUser) {
        showMessage('reviewMessage', 'Please login first', 'error');
        return;
    }

    const review = {
        movieId: document.getElementById('movieId').value,
        text: document.getElementById('text').value,
        rating: parseInt(document.getElementById('rating').value)
    };

    if (review.text.length < 10 || review.text.length > 1000) {
        showMessage('reviewMessage', 'Review must be between 10 and 1000 characters', 'error');
        return;
    }

    if (!review.rating || review.rating < 1 || review.rating > 5) {
        showMessage('reviewMessage', 'Rating must be between 1 and 5', 'error');
        return;
    }

    try {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(review)
        });

        const data = await res.json();
        
        if (res.ok) {
            showMessage('reviewMessage', 'Review added successfully!', 'success');
            loadReviews();
            
            document.getElementById('movieId').value = '';
            document.getElementById('text').value = '';
            document.getElementById('rating').value = '';
        } else {
            showMessage('reviewMessage', data.message || 'Failed to add review', 'error');
        }
    } catch (error) {
        showMessage('reviewMessage', 'Network error. Please try again.', 'error');
    }
}

async function loadMovies() {
    try {
        const res = await fetch('/api/movies');
        const movies = await res.json();

        const container = document.getElementById('movies');
        if (container) {
            container.innerHTML = '';

            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';
                
                movieCard.innerHTML = `
                    <img src="${movie.image || 'https://via.placeholder.com/300x200'}" alt="${movie.title}">
                    <div class="movie-content">
                        <h3>${movie.title}</h3>
                        <p><strong>Director:</strong> ${movie.director}</p>
                        <p><strong>Year:</strong> ${movie.year}</p>
                        <p><strong>Genre:</strong> ${movie.genre}</p>
                        <p>${movie.description ? movie.description.substring(0, 100) + '...' : 'No description'}</p>
                        <div class="movie-id">ID: ${movie._id}</div>
                    </div>
                `;
                
                container.appendChild(movieCard);
            });
        }
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

async function loadReviews() {
    try {
        const res = await fetch('/api/reviews');
        const reviews = await res.json();

        const container = document.getElementById('reviews');
        if (container) {
            container.innerHTML = '';

            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.className = 'review-card';
                
                reviewCard.innerHTML = `
                    <div class="review-header">
                        <span class="review-author">${review.userId ? review.userId.email : 'Anonymous'}</span>
                        <span class="review-rating">${review.rating}/5</span>
                    </div>
                    <div class="review-text">${review.text}</div>
                    <div class="review-movie">
                        Movie: ${review.movieId ? review.movieId.title : 'Unknown'}
                    </div>
                `;
                
                container.appendChild(reviewCard);
            });
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    loadReviews();

    const savedToken = localStorage.getItem('token');
    if (savedToken) {
        token = savedToken;
    }
});