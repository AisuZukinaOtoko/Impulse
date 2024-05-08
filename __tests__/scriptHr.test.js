const { toggleActive, toggleDeActive, ExitNav } = require('../public/js_files/scriptUser');

describe('toggleActive function', () => {
  test('Adds active class to element', () => {
    const element = document.createElement('section');

    toggleActive(element);
    expect(element.classList.contains('active')).toBe(true);
  });
});

describe('toggleDeActive function', () => {
  test('Removes active class from element', () => {
    const element = document.createElement('section');
    element.classList.add('active');

    toggleDeActive(element);
    expect(element.classList.contains('active')).toBe(false);
  });
});

describe('ExitNav function', () => {
  test('Deactivates all navigation elements and hides sections', () => {
    const profile = document.createElement('section');
    const settings = document.createElement('section');
    const notifications = document.createElement('section');
    const logout = document.createElement('section');

    profile.classList.add('active');
    settings.classList.add('active');
    notifications.classList.add('active');
    logout.classList.add('active');

    const profileSection = document.createElement('section');
    const settingsSection = document.createElement('section');
    const notificationsSection = document.createElement('section');
    const logoutSection = document.createElement('section');

    profileSection.style.display = 'block';
    settingsSection.style.display = 'block';
    notificationsSection.style.display = 'block';
    logoutSection.style.display = 'block';

    ExitNav();

    expect(profile.classList.contains('active')).toBe(false);
    expect(settings.classList.contains('active')).toBe(false);
    expect(notifications.classList.contains('active')).toBe(false);
    expect(logout.classList.contains('active')).toBe(false);

    expect(profileSection.style.display).toBe('none');
    expect(settingsSection.style.display).toBe('none');
    expect(notificationsSection.style.display).toBe('none');
    expect(logoutSection.style.display).toBe('none');
  });
});
