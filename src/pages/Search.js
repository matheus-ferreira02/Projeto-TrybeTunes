import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/Form';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_CARACTER = 2;

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      inputSearch: '',
      albumArtist: '',
      searchValue: '',
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputSearch: value });
  }

  findAlbum = async (event) => {
    event.preventDefault();

    const { inputSearch } = this.state;
    this.setState({ inputSearch: '', loading: true });

    const albumArtist = await searchAlbumsAPI(inputSearch);

    this.setState({ albumArtist, loading: false, searchValue: inputSearch });
  }

  showForm = () => {
    const { inputSearch } = this.state;
    const disabledButton = inputSearch.length >= MIN_CARACTER;

    return (
      <Form
        testInput="search-artist-input"
        testBtn="search-artist-button"
        id="input_search"
        value={ inputSearch }
        onChange={ this.handleChange }
        textBtn="Pesquisar"
        disabled={ disabledButton }
        onClick={ this.findAlbum }
        icon={ <i className="fas fa-search" /> }
        className="formSearch"
        placeholder="Nome do artista"
      />
    );
  }

  showAlbumArtist = () => {
    const { albumArtist, searchValue } = this.state;
    const text = `Resultado de álbuns de: ${searchValue}`;
    return (
      <section className="albums">
        <p>{ text }</p>

        {albumArtist.map((album) => (
          <Link
            data-testid={ `link-to-album-${album.collectionId}` }
            to={ `album/${album.collectionId}` }
            key={ album.collectionId }
          >
            <section className="card_album">
              <img src={ album.artworkUrl100 } alt="Imagem do album" />
              <h1>{ album.collectionName }</h1>
              <h2>{ album.artistName }</h2>
            </section>
          </Link>
        ))}
      </section>
    );
  }

  render() {
    const { loading, albumArtist, searchValue } = this.state;
    const noResults = searchValue.length > 0 && albumArtist.length === 0;

    return (
      <div data-testid="page-search">
        <Header search="search" />

        { loading ? <Loading /> : this.showForm() }

        { albumArtist.length > 0 && this.showAlbumArtist() }

        { noResults && (
          <span
            className="notFoundAlbum"
          >
            Nenhum álbum foi encontrado
          </span>) }
      </div>
    );
  }
}
