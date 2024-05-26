// /**
 
// @jest-environment jest-environment-jsdom*/
// require('../public/js_files/polyfills');
// const { JSDOM } = require('jsdom');
// const axios = require('https://cdn.skypack.dev/axios');
// const { addRow, mealbookings, fetchData } = require('../public/js_files/bookmeals');

// // Mock Axios POST request
// jest.mock('https://cdn.skypack.dev/axios');

// describe('bookmeals.js', () => {
//     beforeEach(() => {
//         document.body.innerHTML = '<table id="mealTable"><tbody></tbody></table>';
//     });

//     describe('addRow', () => {
//         it('should add a row to the table', () => {
//             // Sample row data
//             const row = {
//                 type: 'Breakfast',
//                 date: '2024-06-01',
//                 description: 'Scrambled eggs'
//             };

//             // Call the addRow function
//             addRow(row);

//             // Check if the row is added to the table
//             const tableBody = document.querySelector('#mealTable tbody');
//             const rows = tableBody.querySelectorAll('tr');
//             expect(rows.length).toBe(1);

//             // Check if the added row contains the correct data
//             const cells = rows[0].querySelectorAll('td');
//             expect(cells[0].textContent).toBe('Breakfast');
//             expect(cells[1].textContent).toBe('2024-06-01');
//             expect(cells[2].textContent).toBe('Scrambled eggs');
//         });
//     });

//     describe('mealbookings', () => {
//         it('should make a POST request to add a meal booking', async () => {
//             // Mock successful POST request
//             axios.post.mockResolvedValueOnce({ data: 'Success' });

//             // Call the mealbookings function
//             await mealbookings();

//             // Check if axios.post is called with the correct arguments
//             expect(axios.post).toHaveBeenCalledWith(
//                 'https://impulsewebapp.azurewebsites.net/api/meal',
//                 expect.objectContaining({
//                     email: 'susan@gmail.com',
//                     // Add other expected data here
//                 })
//             );
//         });

//         it('should handle errors when making a POST request', async () => {
//             // Mock failed POST request
//             axios.post.mockRejectedValueOnce(new Error('Failed to add meal booking'));

//             // Call the mealbookings function
//             await expect(mealbookings()).rejects.toThrow('Failed to add meal booking');
//         });
//     });

//     describe('fetchData', () => {
//         it('should fetch meal data and add rows to the table', async () => {
//             // Sample meal data
//             const mealData = [
//                 { type: 'Lunch', date: '2024-06-02', description: 'Salad' },
//                 { type: 'Dinner', date: '2024-06-03', description: 'Pasta' }
//             ];

//             // Mock successful GET request
//             axios.get.mockResolvedValueOnce({ data: { recordset: mealData } });

//             // Call the fetchData function
//             await fetchData();

//             // Check if addRow is called for each meal data
//             expect(addRow).toHaveBeenCalledTimes(mealData.length);
//             mealData.forEach((meal) => {
//                 expect(addRow).toHaveBeenCalledWith(meal);
//             });
//         });

//         it('should handle errors when fetching meal data', async () => {
//             // Mock failed GET request
//             axios.get.mockRejectedValueOnce(new Error('Failed to fetch meal data'));

//             // Call the fetchData function
//             await expect(fetchData()).rejects.toThrow('Failed to fetch meal data');
//         });
//     });
// });
