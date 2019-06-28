import React from 'react';
import styles from './CreateModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

const cx = classNames.bind(styles);

const CreateModal = ({ visible, title, user, onCancel, onCreate, onChange, onKeyPress }) => {

  return (
    <ModalWrapper visible={visible}>
      <div className={cx('form')}>
        <div onClick={onCancel} className={cx('close')}>&times;</div>
        <div className={cx('modal-name')}>방 만들기</div>
        <div className={cx('description')}>정보를 입력하세요</div>
        <input type="text" placeholder="방 제목" value={title} onChange={onChange} onKeyPress={onKeyPress}/>
        <input type="text" placeholder="유저 이름" value={user} onChange={onChange} onKeyPress={onKeyPress}/>
        <div className={cx('create')} onClick={onCreate}>만들기</div>
      </div>
    </ModalWrapper>
  );
}

export default CreateModal;