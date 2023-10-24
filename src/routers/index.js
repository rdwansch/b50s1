const HomeRouter = require('./HomeRouter');
const ContactRouter = require('./ContactRouter');
const ProjectRouter = require('./ProjectRouter');
const TestimonialRouter = require('./TestimonialRouter');
const AuthRouter = require('./AuthRouter');

module.exports = {
  Home: HomeRouter,
  Contact: ContactRouter,
  Project: ProjectRouter,
  Testimonial: TestimonialRouter,
  Auth: AuthRouter,
};
