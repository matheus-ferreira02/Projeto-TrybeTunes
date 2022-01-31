import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      username: '',
    };
  }

  componentDidMount() {
    this.getUsername();
  }

  getUsername = async () => {
    const { name } = await getUser();
    this.setState({ loading: false, username: name });
  }

  showHeader = () => {
    const { username } = this.state;

    return (
      <>
        <div className="user">
          <div className="user-logo">
            <i className="fas fa-user" />
            <p data-testid="header-user-name">
              { username }
            </p>
          </div>
        </div>

        <div className="nav">
          <Link to="/search">
            <span data-testid="link-to-search">
              Pesquisa
            </span>
          </Link>

          <Link to="/favorites">
            <span data-testid="link-to-favorites">
              Favoritas
            </span>
          </Link>

          <Link to="/profile">
            <span data-testid="link-to-profile">
              Perfil
            </span>
          </Link>
        </div>
      </>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <header data-testid="header-component">
          { loading ? <Loading /> : this.showHeader() }
        </header>
      </div>
    );
  }
}
