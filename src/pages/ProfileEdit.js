import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      nameUser: '',
      email: '',
      description: '',
      image: '',
      disabledBtn: true,
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
    const { name, email, description, image } = user;
    this.setState({
      loading: false,
      nameUser: name,
      email,
      description,
      image,
    });
  }

  validationBtn = () => {
    const { nameUser, email, description, image } = this.state;

    const errorsCases = [
      !nameUser.length,
      !email.length,
      !description.length,
      !image.length,
    ];

    const filledForm = errorsCases.every((error) => error !== true);
    this.setState({ disabledBtn: !filledForm });
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, () => this.validationBtn());
  }

  saveUser = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const { nameUser, email, image, description } = this.state;
    await updateUser({ name: nameUser, email, image, description });

    const { history } = this.props;
    history.push('/profile');
  }

  createForm = () => {
    const {
      nameUser,
      email,
      description,
      image,
      disabledBtn } = this.state;

    return (
      <form className="form-edit-profile">
        <label htmlFor="image">
          <div className="image">
            { image.length
              ? <img data-testid="profile-image" src={ image } alt="Imagem de perfil" />
              : <i className="fas fa-user" />}
          </div>
          <br />
          <input
            value={ image }
            id="image"
            onChange={ this.handleChange }
            data-testid="edit-input-image"
            placeholder="Insira um link"
          />
        </label>

        <label htmlFor="name">
          Nome
          <br />
          <span>Fique a vontade para usar seu nome social</span>
          <input
            value={ nameUser }
            id="nameUser"
            onChange={ this.handleChange }
            data-testid="edit-input-name"
            placeholder="Digite seu nome"
          />
        </label>

        <label htmlFor="email">
          Email
          <br />
          <span>Escolha um e-mail que consulte diariamente</span>
          <input
            type="email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
            data-testid="edit-input-email"
            placeholder="usuario@usuario.com.br"
          />
        </label>

        <label htmlFor="description">
          Descrição
          <textarea
            value={ description }
            id="description"
            onChange={ this.handleChange }
            data-testid="edit-input-description"
            placeholder="Sobre mim"
          />
        </label>

        <button
          type="submit"
          data-testid="edit-button-save"
          disabled={ disabledBtn }
          onClick={ this.saveUser }
        >
          Editar perfil
        </button>
      </form>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : this.createForm() }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
