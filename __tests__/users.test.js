// users.test.js
const { verify } = require('../../Impulse/api/users/users');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

test('Check that when incomplete parameters are passed the function returns an error', () => {
    const res = mockResponse();
    let name = null, LastName = "nd", email = "u@gmail", permissions = 1, phoneNo = "0824567890";

    verify(name, LastName, email, permissions, phoneNo, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("An error occurred.");
});

test('Check that when all parameters are passed the function does not return an error', () => {
    const res = mockResponse();
    let name = "John", LastName = "Doe", email = "john.doe@example.com", permissions = 1, phoneNo = "0824567890";

    verify(name, LastName, email, permissions, phoneNo, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
});
