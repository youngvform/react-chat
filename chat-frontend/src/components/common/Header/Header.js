import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.scss';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class Header extends Component {


  render() {
    const { onClick, isChat, onExit, disabled} = this.props;
    const buttonName = !isChat ? "나가기" : "방 만들기";

    return(
      <div className={cx('header')}>
        <div className={cx('contents')}>
          <Button url="/" disabled={disabled}>
            react-chat
          </Button>
        </div>
        <div className={cx('right')}>
          <Button onClick={onClick}>
            {buttonName}
          </Button>
        </div>
      </div>
    )
  }
  
}

export default Header;