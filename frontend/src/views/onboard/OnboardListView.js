import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    makeStyles,
    Toolbar
} from '@material-ui/core';
import Page from 'src/components/Page';
// import Toolbar from './Toolbar';
import OnboardListItem from './OnboardListItem';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const OnboardListView = () => {
    const classes = useStyles();
    const [employees, setEmployeeList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await loadOnboardInfo();
        };
        fetchData();
    }, []);

    const loadOnboardInfo = async () => {
        axios.get('http://localhost:9090/onboard')
            .then((res) => {
                setEmployeeList(res.data);
            });
    };

    return (
        <Page
            className={classes.root}
            title="Onboarded Employees"
        >
            <Container maxWidth={false}>
                <Box mt={3}>
                    <OnboardListItem employees={employees} />
                </Box>
            </Container>
        </Page>
    );
};

export default OnboardListView;
