/* ============================================================
   MAIN APPLICATION INITIALIZATION & UTILITIES
   ============================================================ */

const App = {
    cache: {
        courses: [],
        user: null
    },
    
    init() {
        this.loadCourses();
        this.setupEventListeners();
        console.log('CourseTrack application initialized');
    },
    
    loadCourses() {
        const stored = localStorage.getItem('courses');
        this.cache.courses = stored ? JSON.parse(stored) : [];
    },
    
    saveCourses() {
        localStorage.setItem('courses', JSON.stringify(this.cache.courses));
    },
    
    setupEventListeners() {
        // Add global event listeners here
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}