/* ============================================================
   REPORTS & PRINTING UTILITIES
   ============================================================ */

function generateCourseReport(course) {
    return {
        ...course,
        generatedAt: new Date().toLocaleString()
    };
}

function printCourse(course) {
    const printWindow = window.open('', '', 'width=800,height=600');
    const html = `
        <!DOCTYPE html>
        <html><head><title>Course Report - ${course.name}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .section { margin: 20px 0; padding: 10px; border: 1px solid #ccc; }
            h2 { color: #333; }
            h3 { color: #666; border-bottom: 2px solid #0984e3; padding-bottom: 5px; }
            p { margin: 10px 0; }
        </style>
        </head><body>
        <h2>${course.name}</h2>
        <div class="section">
            <h3>Course Information</h3>
            <p><strong>Code:</strong> ${course.code || 'N/A'}</p>
            <p><strong>Start Date:</strong> ${new Date(course.startDate).toLocaleDateString()}</p>
            <p><strong>Duration:</strong> ${course.duration} days</p>
            <p><strong>Participants:</strong> ${course.participants || 'N/A'}</p>
        </div>
        </body></html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 250);
}

function downloadCoursesCSV(courses) {
    const headers = ['Name', 'Code', 'Start Date', 'Duration', 'Participants'];
    const rows = courses.map(course => [
        course.name,
        course.code || 'N/A',
        new Date(course.startDate).toLocaleDateString(),
        course.duration,
        course.participants || 'N/A'
    ]);
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `courses-report-${Date.now()}.csv`;
    link.click();
}