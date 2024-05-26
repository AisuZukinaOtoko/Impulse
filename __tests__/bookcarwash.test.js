/**
 * @jest-environment jsdom
 */
require('../public/js_files/polyfills');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { checkAvail, getNextTuesdayDate, getNextThursdayDate, confirmBooking, createRow, fetchData, closePopup, closePopup1 } = require('../public/js_files/bookcarwash');

jest.mock('axios');

beforeEach(() => {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>
    <div id="popup"></div>
    <div id="popup1"></div>
    <input id="myInput">
    <table id="main_table">
      <tbody class="main_tbody"></tbody>
    </table>
    <span class="tuesday"></span>
    <span class="thursday"></span>
  </body></html>`);

  global.document = dom.window.document;
  global.window = dom.window;
});

describe('checkAvail', () => {
  it('should show popup if car count is less than 6', async () => {
    axios.get.mockResolvedValue({ data: { carCount: 5 } });

    const popup = document.getElementById('popup');
    const popup1 = document.getElementById('popup1');

    await checkAvail({ target: { id: 'buttonId', className: 'buttonClass' } });

    expect(popup.classList.contains('open-popup')).toBe(true);
    expect(popup1.classList.contains('open-popup')).toBe(false);
  });

  it('should show alternative popup if car count is 6 or more', async () => {
    axios.get.mockResolvedValue({ data: { carCount: 7 } });

    const popup = document.getElementById('popup');
    const popup1 = document.getElementById('popup1');

    await checkAvail({ target: { id: 'buttonId', className: 'buttonClass' } });

    expect(popup.classList.contains('open-popup')).toBe(false);
    expect(popup1.classList.contains('open-popup')).toBe(true);
  });
});

describe('getNextTuesdayDate', () => {
  it('should return the next Tuesday date', () => {
    const result = getNextTuesdayDate();
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    let daysUntilNextTuesday = 2 - currentDay;
    if (daysUntilNextTuesday <= 0) {
      daysUntilNextTuesday += 7;
    }
    const nextTuesdayDate = new Date(currentDate.getTime() + daysUntilNextTuesday * 24 * 60 * 60 * 1000);
    const expectedDate = nextTuesdayDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    expect(result).toBe(expectedDate);
  });
});

describe('getNextThursdayDate', () => {
  it('should return the next Thursday date', () => {
    const result = getNextThursdayDate();
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    let daysUntilNextThursday = 4 - currentDay;
    if (daysUntilNextThursday <= 0) {
      daysUntilNextThursday += 7;
    }
    const nextThursdayDate = new Date(currentDate.getTime() + daysUntilNextThursday * 24 * 60 * 60 * 1000);
    const expectedDate = nextThursdayDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });

    expect(result).toBe(expectedDate);
  });
});

describe('confirmBooking', () => {
  it('should add a new row to the table and send a POST request', () => {
    const mockInputElement = { value: 'Car Model' };
    const mockPopup = { classList: { remove: jest.fn() } };
    global.document.getElementById = jest.fn()
      .mockReturnValueOnce(mockInputElement)
      .mockReturnValueOnce(mockPopup);

    localStorage.setItem('storedData', 'email@example.com');

    buttonId = 'buttonId';
    date = 'dateValue';

    axios.post.mockResolvedValue({ data: 'response' });

    confirmBooking();

    const row = document.querySelector('tr.main_tbody');
    expect(row).not.toBeNull();
    expect(row.childElementCount).toBe(4);
    expect(row.children[0].innerText).toBe('email@example.com');
    expect(row.children[1].innerText).toBe('dateValue');
    expect(row.children[2].innerText).toBe('buttonId');
    expect(row.children[3].innerText).toBe('Car Model');

    expect(mockPopup.classList.remove).toHaveBeenCalledWith('open-popup');

    const expectedObj = {
      slot: 'buttonId',
      date: 'dateValue',
      email: 'email@example.com',
      carModel: 'Car Model'
    };
    expect(axios.post).toHaveBeenCalledWith('https://impulsewebapp.azurewebsites.net/api/carwash', expectedObj);
  });
});

describe('createRow', () => {
  it('should create a row with the provided object data', () => {
    const mockObject = {
      slot: 'slotValue',
      date: 'dateValue',
      email: 'email@example.com',
      carModel: 'Car Model'
    };

    createRow(mockObject);

    const row = document.querySelector('tr.main_tbody');
    expect(row).not.toBeNull();
    expect(row.childElementCount).toBe(4);
    expect(row.children[0].innerText).toBe('email@example.com');
    expect(row.children[1].innerText).toBe('dateValue');
    expect(row.children[2].innerText).toBe('slotValue');
    expect(row.children[3].innerText).toBe('Car Model');
  });
});

describe('fetchData', () => {
  it('should fetch data and create rows', async () => {
    const mockData = {
      data: {
        recordset: [
          { id: 1, slot: 'slot1', date: 'date1', email: 'email1@example.com', carModel: 'Model1' },
          { id: 2, slot: 'slot2', date: 'date2', email: 'email2@example.com', carModel: 'Model2' }
        ]
      }
    };
    axios.get.mockResolvedValue(mockData);

    await fetchData();

    expect(carwashData).toEqual(mockData.data.recordset);
    expect(carwashIDS).toEqual([1, 2]);

    const rows = document.querySelectorAll('tr.main_tbody');
    expect(rows.length).toBe(2);
    expect(rows[0].children[0].innerText).toBe('email1@example.com');
    expect(rows[0].children[1].innerText).toBe('date1');
    expect(rows[0].children[2].innerText).toBe('slot1');
    expect(rows[0].children[3].innerText).toBe('Model1');

    expect(rows[1].children[0].innerText).toBe('email2@example.com');
    expect(rows[1].children[1].innerText).toBe('date2');
    expect(rows[1].children[2].innerText).toBe('slot2');
    expect(rows[1].children[3].innerText).toBe('Model2');
  });
});

describe('popup functions', () => {
  it('should close popup', () => {
    const popup = document.getElementById('popup');
    popup.classList.add('open-popup');

    closePopup();

    expect(popup.classList.contains('open-popup')).toBe(false);
  });

  it('should close alternative popup', () => {
    const popup1 = document.getElementById('popup1');
    popup1.classList.add('open-popup');

    closePopup1();

    expect(popup1.classList.contains('open-popup')).toBe(false);
  });
});
