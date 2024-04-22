// Import necessary modules and dependencies
const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from 'app.js'
const Blog = require('../models/article'); // Import the Blog model

// Mock user data for testing
const mockUser = {
  _id: 'user123',
  username: 'testuser',
};

// Mock blog data for testing
const mockBlog = {
  _id: 'blog123',
  title: 'Test Blog',
  description: 'This is a test blog',
  tags: ['test', 'blog'],
  body: 'Lorem ipsum dolor sit amet...',
  author: mockUser._id,
};

// Mock request object with necessary properties and methods
const mockRequest = {
  user: mockUser, // Mock user object
  body: mockBlog, // Mock blog data in request body
  pageInfo: { page: 1, totalPages: 1 }, // Mock pageInfo
  findFilter: {}, // Mock filter object
  fields: '', // Mock fields string
  pagination: { start: 0, sizePerPage: 10 }, // Mock pagination object
};

describe('Blog Controller', () => {
  // Test case for creating a new blog
  test('Should create a new blog', async () => {
    const res = await request(app)
      .post('/blogs')
      .set('Authorization', 'Bearer mocktoken') // Set authorization header
      .send(mockBlog); // Send mock blog data

    // Assertions
    expect(res.statusCode).toBe(201); // Expect status code to be 201 (Created)
    expect(res.body.status).toBe(true); // Expect status field to be true
    expect(res.body.data).toHaveProperty('_id'); // Expect data to have _id property
    expect(res.body.data.title).toBe(mockBlog.title); // Expect title to match mock blog title
  });

  // Test case for getting blogs
  test('Should get blogs', async () => {
    const res = await request(app)
      .get('/blogs')
      .query({ page: 1, limit: 10 }); // Mock query parameters for pagination

    // Assertions
    expect(res.statusCode).toBe(200); // Expect status code to be 200 (OK)
    expect(res.body.status).toBe(true); // Expect status field to be true
    expect(res.body.data).toHaveLength(1); // Expect data array to have length 1
    expect(res.body.data[0]._id).toBe(mockBlog._id); // Expect first blog's _id to match mock blog _id
  });

  // Test case for getting a single blog by ID
  test('Should get a single blog by ID', async () => {
    const res = await request(app).get(`/blogs/${mockBlog._id}`);

    // Assertions
    expect(res.statusCode).toBe(200); // Expect status code to be 200 (OK)
    expect(res.body.status).toBe(true); // Expect status field to be true
    expect(res.body.data._id).toBe(mockBlog._id); // Expect blog _id to match mock blog _id
  });
});
