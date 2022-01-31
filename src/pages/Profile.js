import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.getUserAPI();
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  getUserAPI = async () => {
    const user = await getUser();
    this.setState({ loading: false, user });
  }

  render() {
    const { loading, user: { name, email, image, description } } = this.state;

    return (
      <div data-testid="page-profile">
        <Header profile="profile-link" />
        { loading ? <Loading />
          : (
            <section className="profile">
              <div>
                <div className="image">
                  { image.length
                    ? <img data-testid="profile-image" src={ image } alt={ name } />
                    : <i className="fas fa-user" />}
                </div>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>

              <div className="section">
                <h3>Nome</h3>
                <p>{ name }</p>
              </div>

              <div className="section">
                <h3>E-mail</h3>
                <p>{ email }</p>
              </div>

              <div className="section">
                <h3>Descrição</h3>
                <p>{ description }</p>
              </div>
            </section>
          )}
      </div>
    );
  }
}
