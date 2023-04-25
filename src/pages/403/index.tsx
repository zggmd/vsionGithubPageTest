import * as React from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { history } from '@umijs/max';

export const duration = 200;

interface NotFoundProps {}
const NotFound = (props: NotFoundProps) => {
  return (
    <div className={styles.wrapper403}>
      <div className={styles.content}>
        <div className={styles.img}></div>
        <div className={styles.text}>抱歉，你无权访问该页面</div>
        <div className={styles.btn}>
          <Button
            size="large"
            type="primary"
            ghost
            onClick={() => {
              history.push('/')
            }}
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
