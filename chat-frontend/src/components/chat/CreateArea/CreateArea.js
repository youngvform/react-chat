import React from 'react';
import styles from './CreateArea.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const CreateArea = ({ title, user, onChangeInput, onChatCreate, onCreateCancel, isError }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }

  return (
    <div className={cx('create-area')}>
      <input 
        name="title"
        placeholder="방 제목을 입력해주세요."
        value={title}
        onChange={handleChange}
        className={cx('title')}
      />
      <input 
        name="user" 
        placeholder="유저 이름을 입력해주세요."
        value={user}
        onChange={handleChange}
      />
      <Button onClick={onChatCreate} type="confirm" >확인</Button>
      <Button onClick={onCreateCancel} type="cancel" >취소</Button>
      {
        isError && <div className={cx('error')}>제목과 유저 이름을 함께 입력해주세요.</div>
      }
    </div>
  )
}

export default CreateArea;