// userIntergration.test.js
const request = require('supertest');
const app = require('../../Impulse/app');

describe('User Routes', () => {
    it('should insert a user when all parameters are provided', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                Name: 'John',
                LastName: 'Doe',
                email: 'john.doe@example.com',
                permissions: 1,
                phoneNo: '0824567890'
            });

        expect(res.status).toBe(200);
    });

    it('should return an error when some parameters are missing', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                Name: 'John',
                LastName: 'Doe'
                // Missing email, permissions, phoneNo
            });

        expect(res.status).toBe(400);
    });
});
