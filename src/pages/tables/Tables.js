import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
//import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
// import Widget from "../../components/Widget";
// import Table from "../dashboard/components/Table/Table";

// data
// import mock from "../dashboard/mock";
// import Example from "./posts5"
// import Posts from './posts4'
// import Cards from './Cards'
import Boards from './Boards'

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  // const classes = useStyles();
  return (
    <>
      <PageTitle title="Obras" />
      <Grid container spacing={4}>
        {/* <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Name", "Company", "City", "State"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}

        {/* <Grid item xs={12}>
            <Example />
        </Grid> */}

        <Grid item xs={12}>
            <Boards />
        </Grid>

        {/* <Grid item xs={12}>
            <Cards />
        </Grid> */}
      </Grid>
    </>
  );
}
