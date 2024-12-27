import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  typo: {
    color: theme.palette.text.hint,
  },
  time: {
    color: theme.palette.text.hint,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  button: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
}));
