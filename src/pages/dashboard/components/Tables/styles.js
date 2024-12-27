import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    fontWeight: "bold",
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
    fontWeight: "bold",
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    fontWeight: "bold",
  }
}));
