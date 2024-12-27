import React from 'react'
//import EmployeeForm from "./EmployeeForm";
import PageHeader from "../../components/ColabHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import EquipeForm from './EquipeForm';
import ColabEquipes from '../tables/ColabEquipes';
import { Grid } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function EquipeColab() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Equipe"
                subTitle="Membros da Equipe"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
               <EquipeForm/>
            </Paper>
            
            {/* <Grid item xs={12}>
                 <ColabEquipes/>
            </Grid> */}
        </>
    )
}