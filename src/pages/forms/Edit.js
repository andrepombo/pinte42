import React from 'react'
//import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/ColabHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import EditForm from './EditForm';
import ColabEquipes from '../tables/ColabEquipes';
import { Grid } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function EditColab() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Editar Colaborador"
                subTitle="Edite os campos do formulário"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
               <EditForm/>
            </Paper>
            <Grid item xs={12}>
                 <ColabEquipes/>
            </Grid>
        </>
    )
}