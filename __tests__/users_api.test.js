const request = require('supertest');
const express = require('express');
const usersRouter = require('../api/users/users'); 
const dbRequest = require('../api/boilerplate');

jest.mock('../api/boilerplate'); // Mocking the dbRequest module

const app = express();
app.use(express.json()); 
app.use('/api', usersRouter); 

describe('Users API', () => {
    describe('GET /users', () => {
        it('should fetch all users', async () => {
            // Arrange
            const mockData = { recordset: [{ id: 1, Name: 'Uhone', LastName: 'Nndwams', email: 'uhone@example.com', permissions: 1, phoneNo: '1234567890' }] };
            dbRequest.mockResolvedValue(mockData);

            // Act
            const response = await request(app).get('/api/users');

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockData);
        });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            // Arrange
            const newUser = { Name: 'Alice', LastName: 'Smith', email: 'alice@example.com', permissions: 1, phoneNo: '9876543210' };
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).post('/api/users').send(newUser);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if any field is missing', async () => {
            // Act
            const response = await request(app).post('/api/users').send({ Name: 'Bob', LastName: 'Johnson', permissions: 1 }); // Missing email and phoneNo

            // Assert
            expect(response.status).toBe(400);
            expect(response.text).toBe("An error occured.");
        });
    });

    describe('DELETE /users/delete/:email', () => {
        it('should delete a user by email', async () => {
            // Arrange
            const mockResponse = { rowsAffected: 1 };
            dbRequest.mockResolvedValue(mockResponse);

            // Act
            const response = await request(app).delete('/api/users/delete/test@example.com'); 

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockResponse);
        });

        it('should return 400 if email is not provided', async () => {
            // Act
            const response = await request(app).delete('/api/users/delete/'); // No email provided

            // Assert
            expect(response.status).toBe(404); 
        });
    });
});
