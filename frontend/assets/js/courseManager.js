/* ============================================================
   COURSE MANAGER - ADD/EDIT/DELETE OPERATIONS
   ============================================================ */

function validateCourseData(courseData) {
    const errors = [];
    if (!courseData.name || courseData.name.trim() === '') {
        errors.push('Course name is required');
    }
    if (!courseData.startDate) {
        errors.push('Start date is required');
    }
    if (!courseData.duration || courseData.duration <= 0) {
        errors.push('Duration must be greater than 0');
    }
    return { isValid: errors.length === 0, errors };
}

function createCourse(courseData) {
    const validation = validateCourseData(courseData);
    if (!validation.isValid) return { success: false, errors: validation.errors };
    
    const course = {
        id: 'course_' + Date.now(),
        ...courseData,
        createdAt: new Date().toISOString()
    };
    
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    return { success: true, course };
}

function updateCourse(courseId, courseData) {
    const validation = validateCourseData(courseData);
    if (!validation.isValid) return { success: false, errors: validation.errors };
    
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const index = courses.findIndex(c => c.id === courseId);
    
    if (index === -1) return { success: false, errors: ['Course not found'] };
    
    courses[index] = { ...courses[index], ...courseData, updatedAt: new Date().toISOString() };
    localStorage.setItem('courses', JSON.stringify(courses));
    return { success: true, course: courses[index] };
}

function deleteCourse(courseId) {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const filtered = courses.filter(c => c.id !== courseId);
    
    if (filtered.length === courses.length) return { success: false, errors: ['Course not found'] };
    
    localStorage.setItem('courses', JSON.stringify(filtered));
    return { success: true };
}

function getAllCourses() {
    return JSON.parse(localStorage.getItem('courses') || '[]');
}

function getCourse(courseId) {
    const courses = getAllCourses();
    return courses.find(c => c.id === courseId) || null;
}