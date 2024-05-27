const request = require('supertest');
const express = require('express');
const feedbackRouter = require('../api/feedback/feedback'); // Adjust the path as necessary
const dbRequest = require('../api/boilerplate');

jest.mock('../api/boilerplate'); // Mock the dbRequest module

const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api', feedbackRouter); // Mount the router on the app

describe('Feedback API', () => {
    describe('GET /feedback', () => {
        it('should fetch all feedbacks', async () => {
            // Arrange
            const mockData = { recordset: [{ id: 1, project_reference: 'Project1', description: 'Test feedback', email: 'test@example.com', date: '2024-01-01' }] };
            dbRequest.mockResolvedValue(mockData);

            // Act
            const response = await request(app).get('/api/feedback');

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });
    });

    describe('GET /feedback/:email', () => {
        it('should return 400 if email parameter is missing', async () => {
            // Act
            let email;
            
            const response = await request(app).get('/api/feedback/'+email);
            
            // Assert
            expect(response.status).toBe(400);
            expect(response.text).toBe("An error occured.");
        });
    });
    

    describe('POST /feedback', () => {
        it('should create a new feedback', async () => {
            // Arrange
            const newFeedback = { project_reference: 'Project2', description: 'Another feedback', email: 'test@example.com', date: '2024-01-02' };
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).post('/api/feedback').send(newFeedback);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if any field is missing', async () => {
            // Act
            const response = await request(app).post('/api/feedback').send({ project_reference: 'Project3', description: 'Feedback3' }); // Missing email and date

            // Assert
            expect(response.status).toBe(400);
            expect(response.text).toBe("An error occured.");
        });
    });

    describe('DELETE /feedback/delete/:id', () => {
        it('should delete a feedback by id', async () => {
            // Arrange
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).delete('/api/feedback/delete/123e4567-e89b-12d3-a456-426614174000'); // Example UUID

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if id is not provided', async () => {
            // Act
            const response = await request(app).delete('/api/feedback/delete/'); // No id provided

            // Assert
            expect(response.status).toBe(404); // Express will return 404 if route is not matched
        });
    });
});
