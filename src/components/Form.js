import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const {
      className,
      placeholder,
      testInput,
      testBtn,
      id,
      value,
      onChange,
      onClick,
      textBtn,
      icon,
      disabled } = this.props;

    return (
      <form className={ className }>
        <label htmlFor={ id }>
          <input
            data-testid={ testInput }
            type="text"
            placeholder={ placeholder }
            id={ id }
            value={ value }
            onChange={ onChange }
          />
          { icon }
        </label>

        <button
          data-testid={ testBtn }
          type="submit"
          disabled={ !disabled }
          onClick={ onClick }
        >
          { textBtn }
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  testInput: PropTypes.string,
  testBtn: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  textBtn: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
}.isRequired;
