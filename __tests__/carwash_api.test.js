const request = require('supertest');
const express = require('express');
const carwashRouter = require('../api/carwash/carwash'); // Adjust the path as necessary
const dbRequest = require('../api/boilerplate');

jest.mock('../api/boilerplate'); // Mock the dbRequest module

const app = express();
app.use(express.json()); // For parsing application/json
app.use('/api', carwashRouter); // Mount the router on the app

describe('Carwash API', () => {
    describe('GET /carwash', () => {
        it('should fetch all carwash bookings', async () => {
            // Arrange
            const mockData = { recordset: [{ id: 1, date: '2024-01-01', slot: 'morning', email: 'test@example.com', carModel: 'Tesla Model 3' }] };
            dbRequest.mockResolvedValue(mockData);

            // Act
            const response = await request(app).get('/api/carwash');

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });
    });

    describe('POST /carwash', () => {
        it('should create a new carwash booking', async () => {
            // Arrange
            const newBooking = { date: '2024-01-01', slot: 'afternoon', email: 'test@example.com', carModel: 'BMW X5' };
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).post('/api/carwash').send(newBooking);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if any field is missing', async () => {
            // Act
            const response = await request(app).post('/api/carwash').send({ date: '2024-01-01', slot: 'afternoon' }); // Missing email and carModel

            // Assert
            expect(response.status).toBe(400);
            expect(response.text).toBe("An error occured.");
        });
    });

    describe('DELETE /carwash/delete/:id', () => {
        it('should delete a carwash booking by id', async () => {
            // Arrange
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).delete('/api/carwash/delete/123e4567-e89b-12d3-a456-426614174000'); // Example UUID

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if id is not provided', async () => {
            // Act
            const response = await request(app).delete('/api/carwash/delete/'); // No id provided

            // Assert
            expect(response.status).toBe(404); // Express will return 404 if route is not matched
        });
    });
});
