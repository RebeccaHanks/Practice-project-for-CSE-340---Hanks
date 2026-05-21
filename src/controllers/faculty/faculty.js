import { getFacultyBySlug, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler
const facultyListPage = async (req, res) => {
    const sortBy = req.query?.sort || 'name';
    const faculty = await getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty,
        currentSort: sortBy,
    });
};

// Route handler
const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.slugId;

    const facultyMember = await getFacultyBySlug(facultySlug);

    // If faculty member doesn't exist, create 404 error
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: facultyMember.name,
        faculty: facultyMember,
    });
};

export { facultyListPage, facultyDetailPage };