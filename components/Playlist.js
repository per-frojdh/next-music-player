import React, { useContext } from 'react';
import { PlayListContext } from '../context/playlist';
import { Song } from './';

const Playlist = () => {
  const { state } = useContext(PlayListContext);
  return (
    <React.Fragment>
      {state.songs &&
        state.songs.map(song => <Song key={song.id} song={song} />)}
    </React.Fragment>
  );
};

export default Playlist;
