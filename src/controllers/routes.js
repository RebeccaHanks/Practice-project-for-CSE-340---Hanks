import { Router } from 'express';

import { addDemoHeaders } from '../middleware/demo/headers.js';
import { catalogPage, courseDetailPage } from './catalog/catalog.js';
import { facultyListPage, facultyDetailPage} from "./faculty/faculty.js";
import { homePage, aboutPage, demoPage, testErrorPage } from './index.js';
import contactRoutes from './forms/contact.js';
import registrationRoutes from './forms/registration.js';
import loginRoutes from './forms/login.js';
import { processLogout, showDashboard } from './forms/login.js';
import { requireLogin } from '../middleware/auth.js';

// import {
//     contactValidation,
//     registrationValidation,
//     loginValidation,
//     updateAccountValidation
// } from '../middleware/validation/forms.js';


// Create a new router instance
const router = Router();

router.use('/catalog', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/catalog.css">');
    next();
});

router.use('/faculty', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/faculty.css">');
    next();
});

router.use('/contact', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contact.css">');
    next();
});

// Add registration-specific styles to all registration routes
router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/registration.css">');
    next();
});

// Add login-specific styles to all login routes
router.use('/login', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/login.css">');
    next();
});

// Login routes
router.use('/login', loginRoutes);

// Authentication routes
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);

// Registration routes
router.use('/register', registrationRoutes);

// Contact form routes
router.use('/contact', contactRoutes);

// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Course catalog routes
router.get('/catalog', catalogPage);
router.get('/catalog/:slugId', courseDetailPage);
//Faculty list routes
router.get('/faculty', facultyListPage);
router.get('/faculty/:slugId', facultyDetailPage);
// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);

// Route to trigger a test error
router.get('/test-error', testErrorPage);

export default router;