import React, { useState, Component } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    },
});


const GET_INTERVIEWS_URL = 'http://localhost:9090/getCompletedInterviews'

class InterviewFeedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            selectedFile: []
        }
    }
    componentDidMount() {
        this.fetchCustomers();
    }


    fetchCustomers = (() => {
        fetch(GET_INTERVIEWS_URL)
            .then((response) => response.json())
            .then((result) => {
                this.setState({ customers: result });
            }).catch((e) => {
                console.log(e);
            });
    });

    render() {
        return (
            <Page
                className={styles.root}
                title="Candidates"
            >
                <Container maxWidth={false}>
                    <Toolbar />
                    <Box mt={3}>
                        <Results customers={this.state.customers} selectedFile={this.state.selectedFile} />
                    </Box>
                </Container>
            </Page>
        );
    }
}

export default InterviewFeedback;
