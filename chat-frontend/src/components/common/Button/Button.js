import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Button = ({ children, url, type = "default", onClick, disabled }) => {

  const Element = url && !disabled ? Link : Div;

  return (
    <div className={cx('button', type)}> 
      <Element 
        to={url}
        onClick={onClick}
        className={cx({'disabled' : disabled })}
      >
        {children}
      </Element>
    </div>
  );
}

export default Button;