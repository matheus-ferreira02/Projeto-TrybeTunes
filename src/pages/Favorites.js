import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musics: [],
    };
  }

  componentDidMount() {
    this.getFavoriteSongsAPI();
  }

  getFavoriteSongsAPI = async () => {
    const musics = await getFavoriteSongs();
    this.setState({ loading: false, musics });
  }

  removeFavorite = async ({ target: { id } }) => {
    this.setState({ loading: true });
    const { musics } = this.state;

    const track = musics.find(({ trackId }) => trackId === Number(id));

    await removeSong(track);

    const newMusics = musics.filter((music) => music.trackId !== Number(id));
    this.setState({ loading: false, musics: newMusics });
  }

  render() {
    const { loading, musics } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header favorites="favorites" />
        { loading ? <Loading />
          : (
            musics.map((music) => {
              const { trackName, trackId, previewUrl, checked, artworkUrl100 } = music;

              return (
                <MusicCard
                  key={ trackId }
                  name={ trackName }
                  preview={ previewUrl }
                  id={ trackId }
                  checked={ checked }
                  onChange={ this.removeFavorite }
                  thumb={ artworkUrl100 }
                />
              );
            })
          )}
      </div>
    );
  }
}
