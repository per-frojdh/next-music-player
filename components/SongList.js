import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { PlayListContext } from '../context/playlist';

const SongList = ({ songs }) => {
  const { state, dispatch } = useContext(PlayListContext);
  const [query, setQuery] = useState('');

  function isInList(song) {
    return state.songs.find(i => i.id === song.id);
  }
  return (
    <aside className="column is-3 is-fullheight">
      <nav className="panel">
        <p className="panel-heading">Ljudeffekter</p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              className="input is-small"
              type="text"
              placeholder="search"
              onChange={e => setQuery(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>
        <div className="song-list">
          {songs &&
            songs.map(song => {
              if (song.name.includes(query)) {
                const isAdded = isInList(song);
                const cls = classnames({
                  'panel-block': true,
                  'is-active': isAdded
                });

                return (
                  <a
                    className={cls}
                    key={song.name}
                    onClick={() => {
                      if (isAdded) {
                        dispatch({
                          type: 'remove',
                          payload: song
                        });
                      } else {
                        dispatch({
                          type: 'add',
                          payload: song
                        });
                      }
                    }}
                  >
                    <span className="panel-icon">
                      <FontAwesomeIcon
                        icon={['fas', isAdded ? 'minus-circle' : 'plus-circle']}
                      />
                    </span>
                    {song.name}
                  </a>
                );
              }

              return null;
            })}
        </div>
      </nav>
    </aside>
  );
};

SongList.propTypes = {
  songs: PropTypes.array
};

export default SongList;
