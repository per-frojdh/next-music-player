import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';

const playListReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { songs: [...state.songs, action.payload] };
    case 'remove':
      return {
        songs: state.songs.filter(song => song.path !== action.payload.path)
      };
    default:
      throw new Error();
  }
};

const PlayListContext = createContext();
const initialState = {
  songs: []
};

const PlayListContextProvider = props => {
  const [state, dispatch] = useReducer(playListReducer, initialState);
  const value = { state, dispatch };
  return (
    <PlayListContext.Provider value={value}>
      {props.children}
    </PlayListContext.Provider>
  );
};

PlayListContextProvider.propTypes = {
  children: PropTypes.object
};

export { PlayListContext, PlayListContextProvider };
