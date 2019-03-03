import React from 'react';
import raf from 'raf';
import PropTypes from 'prop-types';
import ReactHowler from 'react-howler';
import { PlayListContext } from '../context/playlist';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Song extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      position: 0,
      duration: 0
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.renderSeekPos = this.renderSeekPos.bind(this);
    this.handleLoopToggle = this.handleLoopToggle.bind(this);
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
  }

  componentWillUnmount() {
    this.clearRAF();
  }

  handleToggle() {
    this.setState({
      playing: !this.state.playing
    });
  }

  handleOnLoad() {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    });
  }

  handleOnPlay() {
    this.setState({
      playing: true
    });
    this.renderSeekPos();
  }

  handleOnEnd() {
    this.setState({
      playing: false
    });
    this.clearRAF();
  }

  handleStop() {
    this.player.stop();
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    });
    this.renderSeekPos();
  }

  handleLoopToggle() {
    this.setState({
      loop: !this.state.loop
    });
  }

  handleMuteToggle() {
    this.setState({
      mute: !this.state.mute
    });
  }

  renderSeekPos() {
    this.setState({
      position: this.player.seek()
    });
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos);
    }
  }

  clearRAF() {
    raf.cancel(this._raf);
  }

  render() {
    const { volume, playing, loop, mute, position, duration } = this.state;
    const { song } = this.props;
    return (
      <React.Fragment>
        <article className="media box single-song">
          <ReactHowler
            src={song.path}
            playing={playing}
            loop={loop}
            mute={mute}
            volume={volume}
            onPlay={this.handleOnPlay}
            onEnd={this.handleOnEnd}
            onLoad={this.handleOnLoad}
            ref={ref => (this.player = ref)}
          />
          <div className="media-content">
            <div className="content">
              <p>{song.name}</p>
              <div className="progress-container">
                <progress
                  className="progress is-primary"
                  value={position.toFixed(2)}
                  max={duration.toFixed(2)}
                />
                <span className="progress-duration">
                  {`${position.toFixed(2)} / ${duration.toFixed(2)}`}
                </span>
              </div>

              <nav className="level">
                <div className="level-left">
                  <a
                    href="#"
                    className="level-item button"
                    onClick={this.handleToggle}
                  >
                    <span className="icon is-small">
                      <FontAwesomeIcon
                        icon={['fas', playing ? 'pause' : 'play']}
                      />
                    </span>
                  </a>

                  <a
                    href="#"
                    className="level-item button"
                    onClick={this.handleStop}
                  >
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={['fas', 'stop']} />
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`level-item button ${loop ? 'is-active' : ''}`}
                    onClick={this.handleLoopToggle}
                  >
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={['fas', 'infinity']} />
                    </span>
                  </a>
                  <a
                    href="#"
                    className={`level-item button ${mute ? 'is-active' : ''}`}
                    onClick={this.handleMuteToggle}
                  >
                    <span className="icon is-small">
                      <FontAwesomeIcon icon={['fas', 'volume-mute']} />
                    </span>
                  </a>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <FontAwesomeIcon icon={['fas', 'volume-up']} />
                    <div className="volume-container">
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step=".05"
                        value={volume}
                        onChange={e =>
                          this.setState({
                            volume: parseFloat(e.target.value)
                          })
                        }
                      />
                      <span className="volume">{volume.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="media-right">
            <button
              className="delete"
              onClick={() => {
                const { dispatch } = this.context;
                dispatch({
                  type: 'remove',
                  payload: song
                });
              }}
            />
          </div>
        </article>
      </React.Fragment>
    );
  }
}

Song.contextType = PlayListContext;
Song.propTypes = {
  song: PropTypes.object.isRequired
};

export default Song;

// const Song = ({ song }) => {
//   const { dispatch } = useContext(PlayListContext);
//   const [isPlaying, play] = useState(false);
//   const [isLooping, loop] = useState(false);
//   const [isMuted, mute] = useState(false);
//   const [volume, setVolume] = useState(1.0);
//   const [position, setPosition] = useState(0);
//   const player = useRef(null);
//   let _raf;

//   function renderSongPosition() {
//     console.log(player.current, isPlaying);
//     console.log(player.current.seek());
//     setPosition(player.current.seek());

//     _raf = raf(renderSongPosition);
//   }

//   function clearSongPosition() {
//     _raf = raf.cancel(_raf);
//   }

//   console.log(isPlaying);

//   return (
//     <React.Fragment>
//       <ReactHowler
//         src={song.path}
//         playing={isPlaying}
//         loop={isLooping}
//         mute={isMuted}
//         volume={volume}
//         ref={player}
//       />
//       <div className="card">
//         <header className="card-header">
//           <p className="card-header-title">{song.name}</p>
//         </header>
//         <div className="card-content">
//           <div className="content">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
//             nec iaculis mauris.
//             {isPlaying && <div>{position}</div>}
//             <div className="volume">
//               <label>
//                 Volume:
//                 <span className="slider-container">
//                   <input
//                     type="range"
//                     min="0"
//                     max="1"
//                     step=".05"
//                     value={volume}
//                     onChange={e => setVolume(parseFloat(e.target.value))}
//                   />
//                 </span>
//                 {volume.toFixed(2)}
//               </label>
//             </div>
//           </div>
//         </div>
//         <footer className="card-footer">
//           <a
//             href="#"
//             className="card-footer-item"
//             onClick={() => {
//               play();
//               renderSongPosition();
//             }}
//           >
//             Play
//           </a>

//           <a
//             href="#"
//             className="card-footer-item"
//             onClick={() => clearSongPosition()}
//           >
//             Stop
//           </a>
//           <a href="#" className="card-footer-item" onClick={() => loop()}>
//             Loop
//           </a>
//           <a href="#" className="card-footer-item" onClick={() => mute()}>
//             Mute
//           </a>
//           <a
//             href="#"
//             className="card-footer-item"
//             onClick={() => dispatch({ type: 'remove', payload: song })}
//           >
//             Remove
//           </a>
//         </footer>
//       </div>
//     </React.Fragment>
//   );
// };

// Song.propTypes = {
//   song: PropTypes.string
// };

// export default Song;
