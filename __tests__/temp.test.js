const { multiply } = require('../src/script');

// Test multiply function
test('Multiplies 3 * 4 to equal 12', () => {
  expect(multiply(3, 4)).toBe(12);
});

test('Multiplies 5 * 10 to equal 50', () => {
    expect(multiply(5, 10)).toBe(50);
});