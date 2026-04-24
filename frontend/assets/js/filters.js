/* ============================================================
   FILTER & SEARCH UTILITIES
   ============================================================ */

function searchCourses(courses, searchTerm) {
    if (!searchTerm) return courses;
    const term = searchTerm.toLowerCase();
    return courses.filter(course => 
        (course.name || '').toLowerCase().includes(term) ||
        (course.code || '').toLowerCase().includes(term)
    );
}

function filterCourses(courses, filters = {}) {
    let result = [...courses];
    if (filters.status) {
        result = result.filter(course => course.status === filters.status);
    }
    if (filters.search) {
        result = searchCourses(result, filters.search);
    }
    return result;
}

function sortCourses(courses, field = 'startDate', ascending = true) {
    return [...courses].sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (typeof aVal === 'string') {
            return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return ascending ? aVal - bVal : bVal - aVal;
    });
}

function paginateCourses(courses, page = 1, pageSize = 10) {
    const total = courses.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return {
        items: courses.slice(startIndex, endIndex),
        page, pageSize, total, totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
    };
}