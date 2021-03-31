import React, {useState} from 'react';
import {
    Box,
    Container,
    makeStyles
  } from '@material-ui/core';
  import Page from 'src/components/Page';
  import Toolbar from './Toolbar';
  import Results from './Results'
  import data from './data'
  
const useStyles = makeStyles((theme) => ({
root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
}
}));


function JobRoleManagementView() {
    const [customers] = useState(data);
    return (
        <Page
        className={useStyles.root}
        title="Candidates"
      >
        <Container maxWidth={false}>
          <Toolbar />
            <Box mt={3}>
            <Results customers={customers} />
            </Box>
        </Container>
      </Page>
    )
}

export default JobRoleManagementView
