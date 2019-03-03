import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from '../components';

const Layout = ({ children }) => (
  <div>
    <Nav />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.object
};
export default Layout;
