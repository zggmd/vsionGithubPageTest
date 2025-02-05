/**
 * Licensed Materials - Property of xxx.com
 * (C) Copyright 2022 xxx. All Rights Reserved.
 */

/**
 *
 * test
 *
 * @author rensiwei
 * @date 2022-12-19
 *
 */

import * as React from 'react';
import { useLocation, useSelector, history, Outlet } from '@umijs/max';
import { Input, NumberKeyboard, Toast, PasscodeInput, Button } from 'antd-mobile';
import { theme } from 'antd';
import { DemoBlock } from '@/components/demos';
import styles from './index.less';
import { audios } from '@/utils/constants'

let audio_ele: any

const Index = (props: any) => {
  const location = useLocation();
  const { token } = theme.useToken();
  // console.log('token', token)
  const user = useSelector((state: any) => state?.app?.user);
  React.useEffect(() => {}, []);
  const [visible, setVisible] = React.useState<any>('demo3')
  const [value, setValue] = React.useState<any>('0')
  const [ending, setEnd] = React.useState<any>(false)

  const actions = {
    onClose: () => {
      Toast.show('closed')
      setVisible('')
    },
    onInput: (key: string) => {
      Toast.show(key)
      debugger
      setValue(key)
    },
    onDelete: () => {
      Toast.show('delete')
    },
    onConfirm: () => {
      debugger
    }
  }
  const play = () => {
    const pre = window.location.pathname === '/' ? '' : window.location.pathname
    audio_ele && audio_ele.pause();
    audio_ele = null;
    const arr = [ pre + audios.before ]
    value.split('').forEach(item => {
      arr.push(pre
        + audios[item])
    })
    arr.push(pre + audios.after)
    let idx = 0
    const _deep = () => {
      const item = arr[idx]
      audio_ele = new Audio(item);
      audio_ele.src = item;
      audio_ele.play();
      audio_ele.onended = () => {
        if (idx < arr.length -1) {
          idx++;
          _deep()
        }
        return
      }
    }
    _deep()
  }
  return (
    <div className={styles.wrapper}>
      <DemoBlock className={styles.inputwrapper}>
        <PasscodeInput
          seperated
          onChange={(_value) => {
            setValue(_value)
          }}
          className={styles.input}
          length={4}
          value={value}
          plain
          // keyboard={<NumberKeyboard
          //   confirmText="确定"
          //   onInput={() => {
          //     debugger
          //   }}
          // />}
        />
        <div className={styles.btns}>
          <Button block color="primary" onClick={play} className={styles.primary} size="large">
            叫号
          </Button>
          <Button loading={ending} onClick={() => {
            setEnd(true)
            console.dir(audio_ele)
            audio_ele.pause()
            setTimeout(() => {
              setEnd(false)
            }, 500)
          }} block color="danger" size="large">
            取消
          </Button>
        </div>
      </DemoBlock>
    </div>
  )
}

export default Index;
