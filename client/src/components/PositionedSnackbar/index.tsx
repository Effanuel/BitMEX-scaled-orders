import React, {useState, useEffect} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';

import {clearNotifications} from 'redux/modules/notify';
import {NotifyType} from 'redux/modules/notify/types';
import {Notification} from 'redux/middlewares/notification';
import {AppState} from 'redux/models/state';

import {NotificationBar} from '../';
import styles from './styles.module.css';

interface State extends Notification {
  isVisible: boolean;
}

const initialState: Readonly<State> = {
  isVisible: false,
  message: '',
  type: NotifyType.None,
};

export const PositionedSnackbar = React.memo(() => {
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();
  const {notification, notification_type} = useSelector(
    (state: AppState) => ({
      notification: state.notify.message,
      notification_type: state.notify.type,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (notification !== '') {
      openSnackBar();
    }
  }, [notification, notification_type]);

  function handleClose() {
    closeSnackBar();
    dispatch(clearNotifications());
  }

  function openSnackBar() {
    setState((prevState) => ({
      ...prevState,
      isVisible: true,
      message: notification,
      type: notification_type,
    }));
  }

  function closeSnackBar() {
    setState((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  }

  const {isVisible, message, type} = state;
  const anchorOrigin: any = {vertical: 'top', horizontal: 'center'};
  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      autoHideDuration={3000}
      open={isVisible}
      onClose={handleClose}
      className={styles.snackbar}
    >
      <NotificationBar notificationType={type} message={message} />
    </Snackbar>
  );
});
