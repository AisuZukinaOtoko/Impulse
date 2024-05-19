const sql = require('mssql');
const dbRequest = require('../api/boilerplate');

jest.mock('mssql');

describe('dbRequest', () => {
    let mockConnect;
    let mockRequest;
    let mockPool;

    beforeEach(() => {
        mockRequest = {
            query: jest.fn()
        };

        mockPool = {
            connect: jest.fn().mockResolvedValue(mockPool),
            request: jest.fn().mockReturnValue(mockRequest),
            close: jest.fn().mockResolvedValue()
        };

        mockConnect = sql.connect.mockResolvedValue(mockPool);
        sql.close.mockResolvedValue();

        // Mock console.error to suppress error messages during testing
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should execute a query and return results', async () => {
        // Arrange
        const query = "SELECT * FROM dbo.users";
        const expectedResult = { recordset: [{ id: 1, name: 'John Doe' }] };
        mockRequest.query.mockResolvedValue(expectedResult);

        // Act
        const result = await dbRequest(query);

        // Assert
        expect(result).toEqual(expectedResult);
        expect(mockConnect).toHaveBeenCalledTimes(1);
        expect(mockRequest.query).toHaveBeenCalledWith(query);
        expect(sql.close).toHaveBeenCalledTimes(1);
    });

    it('should handle SQL errors gracefully', async () => {
        // Arrange
        const query = "SELECT * FROM dbo.users";
        const expectedError = new Error('SQL error');
        mockRequest.query.mockRejectedValue(expectedError);

        // Act
        const result = await dbRequest(query);

        // Assert
        expect(result).toBeUndefined();
        expect(mockConnect).toHaveBeenCalledTimes(1);
        expect(mockRequest.query).toHaveBeenCalledWith(query);
        expect(sql.close).toHaveBeenCalledTimes(1);
        // Ensure console.error was called with the error
        expect(console.error).toHaveBeenCalledWith('SQL error', expectedError);
    });
});
