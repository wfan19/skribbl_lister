import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function Header({ children }) {
  return (
    <div>
      <Menu>
        <Menu.Item>
          <h2>Skribbl Lister</h2>
        </Menu.Item>

        <Menu.Item position="right">
          <Icon name="user circle" />
        </Menu.Item>
      </Menu>
      
      <main>
        {children}
      </main>
    </div>
  );
}

export default Header;
