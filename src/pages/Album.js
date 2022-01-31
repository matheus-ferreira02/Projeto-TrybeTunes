import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      loading: false,
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    this.getMusicsAPI();
    this.getFavoriteTracks();
  }

  getFavoriteTracks = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState(() => ({ loading: false, favoriteSongs }));
  }

  getMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    musics.forEach((music) => {
      music.checked = false;
    });

    this.setState({ musics });
  }

  saveTrack = async ({ target: { name, checked } }) => {
    this.setState({ loading: true });
    const { musics, favoriteSongs } = this.state;

    const findIndex = musics.findIndex((music) => music.trackName === name);
    musics[findIndex].checked = !musics[findIndex].checked;

    const findTrack = musics.find(({ trackName }) => trackName === name);

    if (checked) {
      await addSong(findTrack);
      this.setState((prevState) => ({
        favoriteSongs: [...prevState.favoriteSongs, findTrack],
      }));
    } else {
      await removeSong(findTrack);
      const newFavorite = favoriteSongs
        .filter((music) => music.trackId !== findTrack.trackId);
      this.setState({ favoriteSongs: newFavorite });
    }

    this.setState({ loading: false });
  }

  showMusics = () => {
    const { musics, loading, favoriteSongs } = this.state;
    const { artworkUrl100 } = musics[0];
    const nameArtist = musics[0].artistName;
    const albumName = musics[0].collectionName;

    return (
      loading
        ? <Loading />
        : (
          <section className="album_selected">
            <div className="data-album">
              <img src={ artworkUrl100 } alt="Capa do album" />
              <h1 data-testid="album-name">{ albumName }</h1>
              <h2 data-testid="artist-name">{ nameArtist }</h2>
            </div>

            { musics.slice(1).map((music) => {
              const { trackName, trackId, previewUrl } = music;
              return (
                <MusicCard
                  key={ trackId }
                  name={ trackName }
                  preview={ previewUrl }
                  id={ trackId }
                  onChange={ this.saveTrack }
                  checked={ favoriteSongs.some((idMusic) => idMusic.trackId === trackId) }
                  favorites={ favoriteSongs }
                />);
            })}
          </section>
        ));
  }

  render() {
    const { musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { musics.length === 0 ? <Loading /> : this.showMusics() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }),
}.isRequired;
