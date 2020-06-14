import React from 'react';
// COMPONENTS
import { SVGIcon } from '../';
import ICONS from '../SVGIcon/icons';
// STYLES
import styles from './styles.module.css';
import cx from 'classnames';

import { NotifyType } from 'redux/modules/notify/types';

export interface Props {
  notificationType: NotifyType;
  message: string;
}

const notificationColors: { [key in NotifyType]: string } = {
  error: 'pink',
  success: 'green',
  warning: 'orange',
  '': '',
};

const NotificationBar = React.memo(({ notificationType, message }: Props) => {
  const snackbar_style = cx({
    [styles.error_snackbar]: notificationType === NotifyType.error,
    [styles.success_snackbar]: notificationType === NotifyType.success,
    [styles.warning_snackbar]: notificationType === NotifyType.warning,
    [styles.snackbar_none]: notificationType === NotifyType.None,
  });

  function renderIcon() {
    // eslint-disable-next-line react/prop-types
    return <SVGIcon color={notificationColors[notificationType]} icon={ICONS[notificationType.toUpperCase()]} />;
  }

  return (
    <div className={snackbar_style}>
      {renderIcon()}
      <span className={styles.snackbar_text}>{message}</span>
    </div>
  );
});

export { NotificationBar };
