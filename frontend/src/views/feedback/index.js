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


const customers = [
    {
        id: '123',
        address: {
            country: 'USA',
            state: 'West Virginia',
            city: 'Parkersburg',
            street: '2849 Fulton Street'
        },
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Ekaterina Tankova',
        interviewDate: '21-12-2020',
        role: 'Software Engineer',
        team: 'Eco-System Engineering'
    },
];

const GET_INTERVIEWS_URL = 'http://demo3190284.mockable.io/getInterviews'

class InterviewFeedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            selectedFile: []
        }
    }
    componentDidMount() {
        console.log('hiiiiiiiiiii loading')
        this.fetchCustomers();
        this.timer = setInterval(() => this.fetchCustomers(), 5000);
    }


    fetchCustomers = (() => {
        fetch(GET_INTERVIEWS_URL)
            .then((response) => response.json())
            .then((result) => {
                this.setState({ customers: customers });
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
