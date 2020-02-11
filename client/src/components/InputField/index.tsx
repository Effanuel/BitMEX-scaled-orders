import React from "react";
// COMPONENTS
import {
  TextField,
  withStyles,
  makeStyles,
  FormControl,
  InputLabel,
  Tooltip,
  Button
} from "@material-ui/core";

import "./InputField.module.css";
import cx from "classnames";

type Props = {
  id: string;
  label?: string;
  value: any;
  stop?: boolean;
  tooltip?: any;
  placeholder?: string;
  t_placement?: any;
  onChange: (arg0: any) => void;
};

// const Input = withStyles({
//   // root: {
//   //   "& label": {
//   //     color: "grey",
//   //     marginBottom: 10,
//   //     "&.Mui-focused": {
//   //       color: "grey"
//   //     }
//   //   }
//   // }
// })(TextField);

const useStyles = makeStyles(theme => ({
  label: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: "14px"
  },
  stop: {
    "& .MuiInput-input": {
      borderColor: "#cf6679",
      "&:focus": {
        borderColor: "#cf6679"
      }
    }
  },
  tooltip: {
    color: "red"
  }
}));
const handleFocus = (event: any) => event.target.select();
function InputField({
  id,
  label,
  value,
  stop = false,
  tooltip,
  placeholder,
  t_placement = "top-end",
  onChange
}: Props) {
  const classes = useStyles();
  return (
    // <div>
    //   <label htmlFor={label}>{label}</label>
    //   <OverlayTrigger
    //     placement={t_placement}
    //     overlay={<Tooltip id="tooltip-disabled">{tooltip}</Tooltip>}
    //   >
    //     <span id="icon">?</span>
    //   </OverlayTrigger>
    //   <InputGroup>
    //     <FormControl
    //       // pattern="[0-9]*"
    //       style={stop ? { borderColor: "#cf6679" } : {}}
    //       type="number"
    //       id={id}
    //       value={value || ""}
    //       onChange={onChange}
    //       autoComplete="off"
    //       placeholder={placeholder}
    //     />
    //   </InputGroup>
    // </div>
    // enterDelay={500} leaveDelay={200}
    <FormControl>
      {/*<Tooltip title={tooltip} placement={t_placement} enterDelay={500} arrow disableFocusListener disableTouchListener>*/}
      <label className={classes.label}>{label}</label>
      {/*</Tooltip>*/}

      <TextField
        placeholder={placeholder}
        type="number"
        id={id}
        value={value || ""}
        onChange={onChange}
        onFocus={handleFocus}
        InputProps={{
          disableUnderline: true
        }}
        className={cx({
          [classes.stop]: stop
        })}
      />
    </FormControl>
  );
}

export { InputField };
