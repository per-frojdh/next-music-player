import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Nav = () => {
  const [mute, setMute] = useState(true);

  function globalMute() {
    if (window.Howler) {
      setMute(!mute);
      window.Howler.mute(mute);
    }
  }

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item">Fyrtornet - Ljudeffekter</a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <a
            className={`button is-primary ${mute ? 'is-active' : ''}`}
            onClick={() => globalMute()}
          >
            <span className="icon is-small">
              <FontAwesomeIcon
                icon={['fas', mute ? 'volume-up' : 'volume-mute']}
              />
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
