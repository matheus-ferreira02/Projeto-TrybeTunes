import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../components/Form';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_CARACTER = 3;

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      loading: false,
      redirect: false,
    };
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  submitButton = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const { inputName } = this.state;

    await createUser({ name: inputName });

    this.setState({ redirect: true });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputName: value });
  };

  createForm = () => {
    const { inputName } = this.state;
    const disabledButton = inputName.length >= MIN_CARACTER;

    return (
      <Form
        placeholder="Nome"
        testInput="login-name-input"
        testBtn="login-submit-button"
        id="input_name"
        className="form-login"
        value={ inputName }
        onChange={ this.handleChange }
        textBtn="Entrar"
        disabled={ disabledButton }
        onClick={ this.submitButton }
      />
    );
  };

  render() {
    const { loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : this.createForm() }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}
