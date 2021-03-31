import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    makeStyles
  } from '@material-ui/core';
  import Page from 'src/components/Page';
  import Toolbar from './Toolbar';
  import Results from './Results'
  import data from './data'
import axios from 'axios';
  
const useStyles = makeStyles((theme) => ({
root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
}
}));


function VacancyListView() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:9090/vacancies")
      .then(val=>{
        console.log(val.data);
        setCustomers(val.data)
      });
    }, []);

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

export default VacancyListView
