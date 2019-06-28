import React, { Component } from 'react';
import styles from './PageTemplate.scss'
import classNames from 'classnames/bind';
import HeaderContainer from 'containers/common/HeaderContainer';

const cx = classNames.bind(styles);

class PageTemplate extends Component {

  render () {
    const { children, disabled } = this.props;
    return (
      <div className={cx('page-template')}>
        <HeaderContainer disabled={disabled}/>
        <main>
          {children}
        </main>
      </div>
    )
  }

}

export default PageTemplate;
