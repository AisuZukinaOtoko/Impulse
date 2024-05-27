const request = require('supertest');
const express = require('express');
const mealRouter = require('../api/meals/meals'); // Adjust the path as necessary
const dbRequest = require('../api/boilerplate')

jest.mock('../api/boilerplate'); // Mock the dbRequest module

const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api', mealRouter); 

describe('Meal API', () => {
    describe('GET /meal', () => {
        it('should fetch all meals', async () => {
            // Arrange
            const mockData = { recordset: [{ id: 1, date: '2024-01-01', type: 'breakfast', description: 'Oatmeal', email: 'test@gmail.com' }] };
            dbRequest.mockResolvedValue(mockData);

            // Act
            const response = await request(app).get('/api/meal');

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });
    });

    describe('POST /meal', () => {
        it('should create a new meal', async () => {
            // Arrange
            const newMeal = { date: '2024-01-01', type: 'lunch', description: 'Salad', email: 'test@gmail.com' };
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).post('/api/meal').send(newMeal);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if any field is missing', async () => {
            // Act
            const response = await request(app).post('/api/meal').send({ date: '2024-01-01', type: 'lunch' }); // Missing description and email

            // Assert
            expect(response.status).toBe(400);
            expect(response.text).toBe("An error occured.");
        });
    });

    describe('DELETE /meal/delete/:id', () => {
        it('should delete a meal by id', async () => {
            // Arrange
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).delete('/api/meal/delete/123e4567-e89b-12d3-a456-426614174000'); 

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if id is not provided', async () => {
            // Act
            const response = await request(app).delete('/api/meal/delete/'); // No id provided

            // Assert
            expect(response.status).toBe(404); // Express will return 404 if route is not matched
        });
    });
});
