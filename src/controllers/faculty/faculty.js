import { getFacultyById , getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler 
const facultyListPage = (req, res) => {
    const sortBy = req.query?.sort || 'name';
    const faculty = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty,
        currentSort: sortBy,
    });
};

// Route handler 
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);

    // If faculty member doesn't exist, create 404 error
    if (!facultyMember) {
        const err = new Error(`Faculty member ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }

    // Handle sorting if requested
    // const sortBy = req.query.sort || 'time';
    // const sortedSections = getSortedSections(course.sections, sortBy);

    res.render('faculty/detail', {
        title: facultyMember.name,
        faculty: facultyMember,
    });
};

export { facultyListPage, facultyDetailPage };