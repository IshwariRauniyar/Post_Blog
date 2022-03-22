import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import HelpIcon from "@material-ui/icons/Help";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Message = ({ msg, icon }) => (
  <>
    <Grid container direction="row" justifyContent="center">
      <Grid item>{icon}</Grid>
      <Grid item>
        <Typography variant="subtitle1">{msg}</Typography>
      </Grid>
    </Grid>
  </>
);
toast.configure();
const Toast = {
  default(msg) {
    return toast(<Message msg={msg} />);
  },
  success(msg) {
    return toast.success(<Message msg={msg} icon={<CheckIcon />} />);
  },
  info(msg) {
    return toast.info(<Message msg={msg} icon={<InfoIcon />} />);
  },
  warn(msg) {
    return toast.warn(<Message msg={msg} icon={<HelpIcon />} />);
  },
  error(msg) {
    return toast.error(<Message msg={msg} icon={<WarningIcon />} />);
  },
};
export default Toast;
