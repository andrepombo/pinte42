import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
//import {Box, IconButton, Link} from '@material-ui/core'
//import Icon from '@mdi/react'

//icons
// import {
//   mdiFacebook as FacebookIcon,
//   mdiTwitter as TwitterIcon,
//   mdiGithub as GithubIcon,
// } from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import DashboardObra from "../../pages/dashboard/DashboardObra";

import Epis from "../../pages/tables/TableObraEpis";


import CardObra from "../../pages/tables/TableCards";
import Equipes from "../../pages/tables/TableEquipes";
import Colabs from "../../pages/tables/TableColabs";
import ColabsObra from "../../pages/tables/TableColabsObra";
import ColabDetails from "../../pages/tables/TableColabDetails";
import ColabServices from "../../pages/tables/TableColabServices";
import NewColab from "../../pages/forms/Criar";
import EditColab from "../../pages/forms/Edit";
import EquipeColab from "../../pages/forms/Equipe";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";

import TablesEpis from "../../pages/tables/TablesEpis";

import TableUsers from "../../pages/tables/TableUsers";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import ScrollToTop from "./ScrollToTop";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global 
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <ScrollToTop />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/teste2" component={DashboardObra} />
              <Route path="/app/typography" component={Typography} />
              <Route path="/app/tables" component={Tables} />
              <Route path="/app/tablesepis" component={TablesEpis} />
              
              <Route path="/app/obra/:board/:id" component={DashboardObra} />

              <Route path="/app/epis/:board" component={Epis} />

              <Route path="/app/equipes/:board/:id" component={Equipes} />
              <Route path="/app/cardobra/:board/:id" component={CardObra} />
              <Route path="/app/colabdetails/:id/:nome" component={ColabDetails} />
              <Route path="/app/colabservices/:obra_id/:id/:nome" component={ColabServices} />
              <Route path="/app/newcolab" component={NewColab} />
              <Route path="/app/editcolab/:id" component={EditColab} />
              <Route path="/app/equipecolab/:obra_id/:equipe" component={EquipeColab} />
              <Route path="/app/users" component={TableUsers}/>
              <Route path="/app/colaboradores" component={Colabs}/>
              <Route path="/app/colabsobra/:board/:obra_id" component={ColabsObra}/>
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
            {/* <Box
              mt={5}
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <div>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Flatlogic
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/about'}
                  target={'_blank'}
                  className={classes.link}
                >
                  About Us
                </Link>
                <Link
                  color={'primary'}
                  href={'https://flatlogic.com/blog'}
                  target={'_blank'}
                  className={classes.link}
                >
                  Blog
                </Link>
              </div>
              <div>
                <Link
                  href={'https://www.facebook.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="facebook">
                    <Icon
                      path={FacebookIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://twitter.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton aria-label="twitter">
                    <Icon
                      path={TwitterIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
                <Link
                  href={'https://github.com/flatlogic'}
                  target={'_blank'}
                >
                  <IconButton
                    aria-label="github"
                    style={{marginRight: -12}}
                  >
                    <Icon
                      path={GithubIcon}
                      size={1}
                      color="#6E6E6E99"
                    />
                  </IconButton>
                </Link>
              </div>
            </Box> */}
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
