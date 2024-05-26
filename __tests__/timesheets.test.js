/**
 * @jest-environment jsdom
 */

// Polyfill for TextEncoder and TextDecoder
if (!global.TextEncoder || !global.TextDecoder) {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

const { JSDOM } = require('jsdom');
const axios = require('axios');
jest.mock('axios');

const { updateDate, Export, saveRow, clear, CalcDuration, ShowSelButtons, selAll, deselAll, delRow, ValidateData_Empty, ValidateData_Date, ValidateData_Time } = require('../public/js_files/timesheet');

beforeEach(() => {
  localStorage.clear();

  const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <span id="date"></span>
    <input type="text" id="date_col">
    <input type="text" id="task_col">
    <input type="text" id="start_col">
    <input type="text" id="end_col">
    <input type="text" id="manager_col">
    <button id="saveButton"></button>
    <button id="export-btn"></button>
    <table id="main_table">
      <thead>
        <tr><th>Task</th></tr>
      </thead>
      <tbody></tbody>
    </table>
    <button id="selButton"></button>
    <button id="deselButton"></button>
    <button id="selRows"></button>
    <button id="delSelRowsBtn"></button>
    <span id="empName"></span>
  </body></html>`);

  global.document = dom.window.document;
  global.window = dom.window;
});

describe('timesheets.js', () => {
  describe('updateDate', () => {
    it('updates the date element with the current date and time', () => {
      const dateElement = document.getElementById('date');
      updateDate();
      expect(dateElement.textContent).not.toBe('');
    });
  });

  describe('Export', () => {
    it('should run without throwing an error when exporting to PDF', () => {
      const exportButton = document.getElementById('export-btn');
      exportButton.addEventListener('click', Export);
      expect(() => exportButton.click()).not.toThrow();
    });
  });

  describe('saveRow', () => {
    it('saves a new row to the table', () => {
      document.getElementById('date_col').value = '2023-01-01';
      document.getElementById('task_col').value = 'Task 1';
      document.getElementById('start_col').value = '09:00';
      document.getElementById('end_col').value = '10:00';
      document.getElementById('manager_col').value = 'Manager 1';

      saveRow();
      const rows = document.querySelectorAll('#main_table tbody tr');
      expect(rows.length).toBe(1);
    });
  });

  describe('clear', () => {
    it('clears input fields', () => {
      document.getElementById('date_col').value = '2023-01-01';
      document.getElementById('task_col').value = 'Task 1';
      document.getElementById('start_col').value = '09:00';
      document.getElementById('end_col').value = '10:00';
      document.getElementById('manager_col').value = 'Manager 1';

      clear();

      expect(document.getElementById('date_col').value).toBe('');
      expect(document.getElementById('task_col').value).toBe('');
      expect(document.getElementById('start_col').value).toBe('');
      expect(document.getElementById('end_col').value).toBe('');
      expect(document.getElementById('manager_col').value).toBe('');
    });
  });

  describe('CalcDuration', () => {
    it('calculates the duration between start and end times', () => {
      document.getElementById('start_col').value = '09:00';
      document.getElementById('end_col').value = '10:00';
      const duration = CalcDuration();
      expect(duration).toBe('1hr(s) 0mins');
    });
  });

  describe('ShowSelButtons', () => {
    it('shows select and deselect buttons', () => {
      ShowSelButtons();
      const selButton = document.getElementById('selButton');
      const deselButton = document.getElementById('deselButton');
      expect(selButton.classList.contains('hidden')).toBe(false);
      expect(deselButton.classList.contains('hidden')).toBe(false);
    });
  });

  describe('selAll', () => {
    it('selects all checkboxes', () => {
      const table = document.getElementById('main_table').querySelector('tbody');
      table.innerHTML = '<tr><td><input type="checkbox" class="checkboxes"></td></tr>';
      selAll();
      const checkbox = table.querySelector('.checkboxes');
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('deselAll', () => {
    it('deselects all checkboxes', () => {
      const table = document.getElementById('main_table').querySelector('tbody');
      table.innerHTML = '<tr><td><input type="checkbox" class="checkboxes" checked></td></tr>';
      deselAll();
      const checkbox = table.querySelector('.checkboxes');
      expect(checkbox.checked).toBe(false);
    });
  });

  describe('delRow', () => {
    it('deletes selected rows from the table', () => {
      const table = document.getElementById('main_table').querySelector('tbody');
      table.innerHTML = `
        <tr><td><input type="checkbox" class="checkboxes" checked></td><td>Task 1</td></tr>
        <tr><td><input type="checkbox" class="checkboxes"></td><td>Task 2</td></tr>
      `;
      delRow();
      const rows = table.querySelectorAll('tr');
      expect(rows.length).toBe(1);
      expect(rows[0].textContent).toContain('Task 2');
    });
  });

  describe('ValidateData_Empty', () => {
    it('validates that all fields are filled', () => {
      const result = ValidateData_Empty('2023-01-01', 'Task 1', '09:00', '10:00', 'Manager 1');
      expect(result).toBe(true);
    });

    it('returns false if any field is empty', () => {
      const result = ValidateData_Empty('2023-01-01', '', '09:00', '10:00', 'Manager 1');
      expect(result).toBe(false);
    });
  });

  describe('ValidateData_Date', () => {
    it('validates that the date is not in the future', () => {
      const result = ValidateData_Date('2023-01-01');
      expect(result).toBe(true);
    });

    it('returns false if the date is in the future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      const result = ValidateData_Date(futureDate.toISOString().split('T')[0]);
      expect(result).toBe(false);
    });
  });

  describe('ValidateData_Time', () => {
    it('validates that end time is after start time', () => {
      const result = ValidateData_Time('09:00', '10:00');
      expect(result).toBe(true);
    });

    it('returns false if end time is before or equal to start time', () => {
      let result = ValidateData_Time('10:00', '09:00');
      expect(result).toBe(false);
      result = ValidateData_Time('09:00', '09:00');
      expect(result).toBe(false);
    });
  });
});
