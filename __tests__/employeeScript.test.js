const {
    showsettingTile,
    showaccountTile,
    home,
    hideSidebar
  } = require('../public/js_files/scriptEmp');
  
  describe('showsettingTile function', () => {
    test('Toggles transform property of settingTile correctly', () => {
      const settingTile = document.createElement('article');
      settingTile.id = 'settingTile';
      document.body.appendChild(settingTile);

      // Initial state
      showsettingTile();
      expect(settingTile.style.transform).toBe('translateX(0)');
  
      // Toggling back
      showsettingTile();
      expect(settingTile.style.transform).toBe('translateX(-100%)');
  
      // Clean up
      document.body.removeChild(settingTile);
    });
  });
  
  describe('showaccountTile function', () => {
    test('Toggles transform property of accountTile correctly', () => {
      const accountTile = document.createElement('article');
      accountTile.id = 'accountTile';
      document.body.appendChild(accountTile);
  
      // Initial state
      showaccountTile();
      expect(accountTile.style.transform).toBe('translateX(0)');
  
      // Toggling back
      showaccountTile();
      expect(accountTile.style.transform).toBe('translateX(-100%)');
  
      // Clean up
      document.body.removeChild(accountTile);
    });
  });
  
  describe('home function', () => {
    test('Resets transform property of both tiles', () => {
      const accountTile = document.createElement('div');
      accountTile.id = 'accountTile';
      const settingTile = document.createElement('div');
      settingTile.id = 'settingTile';
      document.body.appendChild(accountTile);
      document.body.appendChild(settingTile);
  
      // Initial state
      home();
      expect(accountTile.style.transform).toBe('translateX(-100%)');
      expect(settingTile.style.transform).toBe('translateX(-100%)');
  
      // Clean up
      document.body.removeChild(accountTile);
      document.body.removeChild(settingTile);
    });
  });
  
  describe('hideSidebar function', () => {
    test('Hides sidebar and adjusts content margin', () => {
      const sidebar = document.createElement('div');
      sidebar.id = 'sidebar';
      const content = document.createElement('div');
      content.id = 'content';
      document.body.appendChild(sidebar);
      document.body.appendChild(content);
  
      // Initial state
      hideSidebar();
      expect(sidebar.style.display).toBe('none');
      expect(content.style.marginLeft).toBe('0px');
  
      // Clean up
      document.body.removeChild(sidebar);
      document.body.removeChild(content);
    });
  });