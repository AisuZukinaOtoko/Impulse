/**
 * @jest-environment jsdom
 */

// Polyfill for TextEncoder and TextDecoder
require('../public/js_files/polyfills');

const { JSDOM } = require('jsdom');
const axios = require('axios');
jest.mock('axios');

const timesheet = require('../public/js_files/timesheet');

beforeEach(() => {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <section class="table_header">
      <h3 id="date"></h3>
    </section>
  </body></html>`);

  global.document = dom.window.document;
  global.window = dom.window;
});

describe('updateDate', () => {
  it('should update the date element with the current date', () => {
    const mockDate = new Date('2024-05-26T12:00:00Z');
    global.Date = jest.fn(() => mockDate);

    timesheet.updateDate();

    expect(document.querySelector('#date').innerText).toBe('2024-05-26 12:00');

    jest.clearAllMocks();
  });
});

describe('Export', () => {
  // It's difficult to test Export function as it involves interaction with the DOM and generating a PDF.
  // This function is better tested manually or with integration tests using a browser automation tool like Puppeteer.
});

describe('saveRow', () => {
  it('should save the entered data into the table', () => {
    document.getElementById = jest.fn().mockReturnValueOnce({ value: '2024-05-26' }) // date_col
                                          .mockReturnValueOnce({ value: 'Task A' }) // task_col
                                          .mockReturnValueOnce({ value: '08:00' }) // start_col
                                          .mockReturnValueOnce({ value: '16:00' }) // end_col
                                          .mockReturnValueOnce({ value: 'Manager A' }); // manager_col

    timesheet.CalcDuration = jest.fn().mockReturnValue('8hr(s) 0mins');

    timesheet.saveRow();

    expect(document.getElementById('main_table').innerHTML).toContain('<td>2024-05-26</td>');
    expect(document.getElementById('main_table').innerHTML).toContain('<td>Task A</td>');
    expect(document.getElementById('main_table').innerHTML).toContain('<td>08:00</td>');
    expect(document.getElementById('main_table').innerHTML).toContain('<td>16:00</td>');
    expect(document.getElementById('main_table').innerHTML).toContain('<td>Manager A</td>');
    expect(document.getElementById('main_table').innerHTML).toContain('<td>8hr(s) 0mins</td>');

    jest.clearAllMocks();
  });
});

describe('clear', () => {
  it('should clear the input fields', () => {
    document.getElementById = jest.fn().mockReturnValueOnce({ value: '2024-05-26' }) // date_col
                                          .mockReturnValueOnce({ value: 'Task A' }) // task_col
                                          .mockReturnValueOnce({ value: '08:00' }) // start_col
                                          .mockReturnValueOnce({ value: '16:00' }) // end_col
                                          .mockReturnValueOnce({ value: 'Manager A' }); // manager_col

    timesheet.clear();

    expect(document.getElementById('date_col').value).toBe('');
    expect(document.getElementById('task_col').value).toBe('');
    expect(document.getElementById('start_col').value).toBe('');
    expect(document.getElementById('end_col').value).toBe('');
    expect(document.getElementById('manager_col').value).toBe('');

    jest.clearAllMocks();
  });
});

describe('CalcDuration', () => {
  it('should calculate the duration between start and end time', () => {
    document.getElementById = jest.fn().mockReturnValueOnce({ value: '08:00' }) // start_col
                                          .mockReturnValueOnce({ value: '16:00' }); // end_col

    const duration = timesheet.CalcDuration();

    expect(duration).toBe('8hr(s) 0mins');

    jest.clearAllMocks();
  });
});

describe('ShowSelButtons', () => {
  it('should show select buttons and hide select rows button', () => {
    const checkboxes = document.querySelectorAll('.checkboxes');
    const selButton = document.querySelector('#selButton');
    const deselButton = document.querySelector('#deselButton');
    const selRowsButton = document.querySelector('#selRows');
    const delSelRowsBtn = document.querySelector('#delSelRowsBtn');

    timesheet.ShowSelButtons();

    checkboxes.forEach(chkbox => {
      expect(chkbox.style.visibility).toBe('visible');
      expect(chkbox.classList).not.toContain('hidden');
    });

    expect(selRowsButton.style.visibility).toBe('hidden');
    expect(selRowsButton.classList).toContain('hidden');
    expect(selButton.classList).not.toContain('hidden');
    expect(selButton.style.visibility).toBe('visible');
    expect(deselButton.classList).not.toContain('hidden');
    expect(deselButton.style.visibility).toBe('visible');
    expect(delSelRowsBtn.style.visibility).toBe('visible');
    expect(delSelRowsBtn.classList).not.toContain('hidden');
  });
});
