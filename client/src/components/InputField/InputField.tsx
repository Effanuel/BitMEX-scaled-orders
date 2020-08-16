import React from 'react';
import cx from 'classnames';
import {TextField, makeStyles, FormControl, Tooltip} from '@material-ui/core';
import './InputField.module.css';

const useStyles = makeStyles(() => ({
  label: {color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px'},
  stop: {'& .MuiInput-input': {borderColor: '#cf6679', '&:focus': {borderColor: '#cf6679'}}},
  tooltip: {color: 'red'},
}));

type Props = {
  id: string;
  label?: string;
  value: any;
  stop?: boolean;
  tooltip?: string;
  placeholder?: string;
  t_placement?: any;
  onChange: (arg0: any) => void;
};

function InputField({id, label, value, stop = false, tooltip, placeholder, t_placement = 'top-end', onChange}: Props) {
  const classes = useStyles();
  const handleFocus = React.useCallback((event: any) => event.target.select(), []);

  const renderTooltip = () => {
    return (
      <>
        {tooltip ? (
          <Tooltip
            title={tooltip}
            placement={t_placement}
            enterDelay={500}
            arrow
            disableFocusListener
            disableTouchListener
          >
            <label style={{color: 'grey', marginLeft: '5px'}}>?</label>
          </Tooltip>
        ) : null}
      </>
    );
  };
  return (
    <FormControl>
      <div style={{flexDirection: 'row'}}>
        <label className={classes.label}>{label}</label>
        {renderTooltip()}
      </div>

      <TextField
        placeholder={placeholder}
        type="number"
        id={id}
        value={value || ''}
        onChange={onChange}
        onFocus={handleFocus}
        InputProps={{disableUnderline: true}}
        className={cx({[classes.stop]: stop})}
      />
    </FormControl>
  );
}

export {InputField};
