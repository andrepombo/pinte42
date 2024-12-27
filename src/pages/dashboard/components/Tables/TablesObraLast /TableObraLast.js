import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
//import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../../../../components/PageTitle/PageTitle";
// import Widget from "../../../../../components/Widget/Widget";
// import Table from "../../Table/Table";

// data
// import Cards from '../Cards'
// import Boards from '../Boards'
import CardsLib from "./CardsLib";
import CardsIni from "./CardsIni";
import CardsFin from "./CardsFin";
import CardsEnt from "./CardsEnt";

// const useStyles = makeStyles(theme => ({
//   tableOverflow: {
//     overflow: 'auto'
//   }
// }))

export default function TableCards() {
  // const classes = useStyles();
  return (
    <>
      {/* <PageTitle /> */}
      <Grid container spacing={2}>
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

        {/* <Grid item xs={12}>
            <Boards />
        </Grid> */}

        <Grid item lg={6} md={6} sm={6} xs={12}>
            <CardsLib />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
            <CardsIni />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
            <CardsFin />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
            <CardsEnt />
        </Grid>
      </Grid>
    </>
  );
}
