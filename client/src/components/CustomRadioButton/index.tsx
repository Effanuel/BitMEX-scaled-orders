// import React from "react";
// // COMPONENTS
// import { FormCheck } from "react-bootstrap";
// // UTILS
// import styles from "./styles.module.css";

// type Props = {
//   id: string;
//   label: any;
//   type: "radio" | "checkbox";
//   name: string;
//   defaultChecked?: boolean;
// };

// function CustomRadioButton({ id, label, type, defaultChecked, name }: Props) {
//   return (
//     <div className={styles.label}>
//       <FormCheck
//         custom
//         id={id}
//         name={name}
//         label={label}
//         type={type}
//         value={label}
//         defaultChecked={defaultChecked}
//         className={styles.label__noselect}
//       />
//     </div>
//   );
// }

// export { CustomRadioButton };
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {withStyles, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControlLabel-label':{
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      margin: '0px'
    },
    '& .MuiIconButton-root':{
      color: '#4caf50',
      padding: '2px'
    },
    margin: '0px'
  }
}));

type Props = {
  checked?: boolean;
  id: string;
  value: string;
  label: any;
  labelPlacement?: any;
}

function CustomRadioButton({checked, id, value, label, labelPlacement='end'}:Props) {
 const classes = useStyles()

  return (
        <FormControlLabel
          checked={checked}
          id={id}
          value={value}
          className={classes.root}
          label={label}
          labelPlacement={labelPlacement}
          control={<Radio size="small" />}
        />
  );
}
export {CustomRadioButton}