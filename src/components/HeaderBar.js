/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

function HeaderBar({ children }) {
  return (
    <div>
      <Menu style={{marginBottom: '1rem'}}>
        <Link to="/">
          <Menu.Item>
            <h2>Skribbl Lister</h2>
          </Menu.Item>
        </Link>

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

HeaderBar.propTypes = {
  children: PropTypes.element.isRequired,
};

HeaderBar.defaultProps = {
};

export default HeaderBar;
