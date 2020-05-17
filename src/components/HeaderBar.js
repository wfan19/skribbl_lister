import React from 'react';
import { Menu, Icon, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

function HeaderBar({ children }) {
  return (
    <div>
      <Menu>
        <Link to="/">
          <Menu.Item>
            <h2>Skribbl Lister</h2>
          </Menu.Item>
        </Link>

        <Menu.Item position="right">
          <Icon name="user circle"/>
        </Menu.Item>
      </Menu>
      
      <main>
        {children}
      </main>
    </div>
  );
}

export default HeaderBar;
