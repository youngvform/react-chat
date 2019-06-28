import React, { Component } from 'react';
import styles from './Input.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Input = ({ inputMessage, onClick, onChangeInput }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      onClick();
    }
  }

  return (
    <div className={cx('message-input')}>
      <input type="text" name="inputMessage" placeholder="메시지를 입력해주세요." value={inputMessage} onChange={handleChange} onKeyPress={handleKeyPress} />
      <Button type="send" onClick={onClick}>전송</Button>
    </div>
  );
  
}

export default Input;