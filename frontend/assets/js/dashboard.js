/* ============================================================
   DASHBOARD INTERACTIVE FUNCTIONALITY
   ============================================================ */

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.search-input');
const courseCards = document.querySelectorAll('.course-card');
const btnNewCourse = document.querySelector('.btn-new-course');
const navItems = document.querySelectorAll('.nav-item');

// State
let currentFilter = 'ALL';
let currentSearch = '';

/* ============================================================
   FILTER FUNCTIONALITY
   ============================================================ */

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Update current filter
        currentFilter = button.textContent.trim();

        // Apply filter
        filterCourses();
    });
});

function filterCourses() {
    courseCards.forEach(card => {
        const badge = card.querySelector('.course-badge');
        const badgeText = badge.textContent.trim().toUpperCase();
        const title = card.querySelector('.course-title').textContent.toLowerCase();

        let showCard = true;

        // Check status filter
        if (currentFilter !== 'ALL') {
            const filterMap = {
                'UPCOMING': badgeText === 'UPCOMING',
                'ONGOING': badgeText === 'ONGOING',
                'COMPLETED': badgeText === 'COMPLETED'
            };
            showCard = filterMap[currentFilter] || false;
        }

        // Check search filter
        if (currentSearch) {
            showCard = showCard && title.includes(currentSearch.toLowerCase());
        }

        // Show or hide card
        card.style.display = showCard ? 'block' : 'none';
    });

    // Show "no results" message if needed
    updateNoResultsMessage();
}

/* ============================================================
   SEARCH FUNCTIONALITY
   ============================================================ */

searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    filterCourses();
});

/* ============================================================
   NO RESULTS MESSAGE
   ============================================================ */

function updateNoResultsMessage() {
    const visibleCards = Array.from(courseCards).filter(card => card.style.display !== 'none');

    // Remove existing no-results message
    const existingMessage = document.querySelector('.no-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Add no-results message if no courses visible
    if (visibleCards.length === 0) {
        const coursesSection = document.querySelector('.courses-section');
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results-message';
        noResultsDiv.innerHTML = `
            <p style="text-align: center; color: var(--color-text-secondary); padding: var(--spacing-2xl); font-size: var(--font-size-base);">
                No courses found. Try adjusting your search or filters.
            </p>
        `;
        coursesSection.appendChild(noResultsDiv);
    }
}

/* ============================================================
   NEW COURSE BUTTON
   ============================================================ */

btnNewCourse.addEventListener('click', (e) => {
    e.preventDefault();
    // Navigate to add-course page
    window.location.href = 'add-course.html';
});

/* ============================================================
   ACTION BUTTONS
   ============================================================ */

document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const card = button.closest('.course-card');
        const courseTitle = card.querySelector('.course-title').textContent;
        const action = button.classList[1]; // edit, delete, or report

        switch(action) {
            case 'edit':
                handleEditCourse(card);
                break;
            case 'delete':
                handleDeleteCourse(card, courseTitle);
                break;
            case 'report':
                handleGenerateReport(card);
                break;
        }
    });
});

function handleEditCourse(card) {
    const courseTitle = card.querySelector('.course-title').textContent;
    console.log(`Editing course: ${courseTitle}`);
    // Navigate to edit-course page with course data
    // window.location.href = `edit-course.html?course=${encodeURIComponent(courseTitle)}`;
    alert(`Edit functionality for "${courseTitle}" - Coming soon!`);
}

function handleDeleteCourse(card, courseTitle) {
    if (confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
        card.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => {
            card.remove();
            filterCourses();
            console.log(`Deleted course: ${courseTitle}`);
        }, 300);
    }
}

function handleGenerateReport(card) {
    const courseTitle = card.querySelector('.course-title').textContent;
    console.log(`Generating report for: ${courseTitle}`);
    alert(`Report generation for "${courseTitle}" - Coming soon!`);
}

/* ============================================================
   SIDEBAR NAVIGATION
   ============================================================ */

navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));

        // Add active class to clicked item
        item.classList.add('active');

        // Get the nav text
        const navText = item.querySelector('.nav-text').textContent.trim().toUpperCase();
        const filterMap = {
            'ALL COURSES': 'ALL',
            'UPCOMING': 'UPCOMING',
            'ONGOING': 'ONGOING',
            'COMPLETED': 'COMPLETED'
        };

        // Update filter buttons and current filter
        if (filterMap[navText]) {
            currentFilter = filterMap[navText];
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.trim() === currentFilter) {
                    btn.classList.add('active');
                }
            });
            filterCourses();
        }
    });
});

/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard loaded successfully');
    // Initialize with default filter
    filterCourses();
});

/* ============================================================
   STYLES FOR ANIMATIONS
   ============================================================ */

const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    .no-results-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: var(--spacing-2xl);
    }
`;
document.head.appendChild(style);