import React from 'react';
import cx from 'classnames';

import {NotifyType} from 'redux/modules/notify/types';

import SVGIcon from '../SVGIcon/SVGIcon';
import ICONS from '../SVGIcon/icons';
import styles from './styles.module.css';

export interface NotificationBarProps {
  notificationType: NotifyType;
  message: string;
}

const notificationColors: {[key in NotifyType]: string} = {
  error: 'pink',
  success: 'green',
  warning: 'orange',
  '': '',
};

export const NotificationBar = React.memo(({notificationType, message}: NotificationBarProps) => {
  const snackbar_style = cx({
    [styles.error_snackbar]: notificationType === NotifyType.error,
    [styles.success_snackbar]: notificationType === NotifyType.success,
    [styles.warning_snackbar]: notificationType === NotifyType.warning,
    [styles.snackbar_none]: notificationType === NotifyType.None,
  });

  function renderIcon() {
    // eslint-disable-next-line react/prop-types
    return <SVGIcon color={notificationColors[notificationType]} icon={ICONS[notificationType?.toUpperCase()]} />;
  }

  return (
    <div className={snackbar_style}>
      {renderIcon()}
      <span className={styles.snackbar_text}>{message}</span>
    </div>
  );
});
