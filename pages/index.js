import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import { library as fontawesome } from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle,
  faMinusCircle,
  faPlay,
  faPause,
  faInfinity,
  faStop,
  faVolumeMute,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../layouts/main';
import { SongList, Playlist } from '../components';
import { PlayListContextProvider } from '../context/playlist';
import '../style/index.scss';

fontawesome.add(
  faPlusCircle,
  faMinusCircle,
  faPlay,
  faPause,
  faInfinity,
  faStop,
  faVolumeMute,
  faVolumeUp
);

const Index = ({ songs }) => {
  return (
    <Layout>
      <PlayListContextProvider>
        <section className="columns is-fullheight section">
          <SongList songs={songs} set />
          <div className="column is-9 playlist">
            <Playlist />
          </div>
        </section>
      </PlayListContextProvider>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const res = await axios.get('http://localhost:3000/api/songs');

  // Transform
  const songList = res.data.map(song => {
    const songName = song.match(/([^/]+$)/g)[0];
    return {
      path: song,
      name: songName,
      id: nanoid()
    };
  });
  return {
    songs: songList
  };
};

Index.propTypes = {
  songs: PropTypes.array
};

export default Index;
