/* ============================================================
   AUTHENTICATION UTILITIES
   ============================================================ */

const Auth = {
    // Check if user is logged in
    isLoggedIn() {
        return !!localStorage.getItem('user_token');
    },
    
    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem('current_user');
        return user ? JSON.parse(user) : null;
    },
    
    // Login user
    login(email, password) {
        if (!this.validateEmail(email)) {
            return { success: false, error: 'Invalid email format' };
        }
        
        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }
        
        // Mock token
        const token = 'token_' + Date.now();
        const user = { email, id: 'user_' + Date.now() };
        
        localStorage.setItem('user_token', token);
        localStorage.setItem('current_user', JSON.stringify(user));
        
        return { success: true, user, token };
    },
    
    // Register new user
    register(email, password, confirmPassword) {
        if (!this.validateEmail(email)) {
            return { success: false, error: 'Invalid email format' };
        }
        
        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }
        
        if (password !== confirmPassword) {
            return { success: false, error: 'Passwords do not match' };
        }
        
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        if (existingUsers.find(u => u.email === email)) {
            return { success: false, error: 'User already exists' };
        }
        
        // Create new user
        const user = { id: 'user_' + Date.now(),
            email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString()
        };
        
        existingUsers.push(user);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        // Auto login
        return this.login(email, password);
    },
    
    // Logout user
    logout() {
        localStorage.removeItem('user_token');
        localStorage.removeItem('current_user');
        return { success: true };
    },
    
    // Validate email format
    validateEmail(email) {
        const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return re.test(email);
    },
    
    // Simple password hash (for demo only - use proper hashing in production)
    hashPassword(password) {
        return 'hash_' + btoa(password);
    }
};

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!Auth.isLoggedIn() && !window.location.pathname.includes('login') && !window.location.pathname.includes('register')) {
        // Redirect to login if not authenticated
        // Uncomment for production: window.location.href = 'login.html';
    }
});