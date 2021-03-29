import React, { useState } from 'react';
import {
  Grid,
  Container,
  TextField,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button,
  makeStyles
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Page from 'src/components/Page';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Onboard = () => {
  const classes = useStyles();
  const params = useParams();
  const [values, setValues] = useState({
    selectedBankDetail: null,
    selectedNic: null,
    firstName: null,
    lastName: null,
    address: null,
    emailAddress: null,
    userId: null
  });

  const bankDetailSelectHandler = (event) => {
    setValues({
      ...values,
      selectedBankDetail: event.target.files[0]
    });
  };

  const nicSelectHandler = (event) => {
    setValues({
      ...values,
      selectedNic: event.target.files[0]
    });
  };

  const postData = async () => {
    const fd = new FormData();
    fd.append('bankDetailImage', values.selectedBankDetail, values.selectedBankDetail.name);
    fd.append('nicImage', values.selectedNic, values.selectedNic.name);
    fd.append('firstName', values.firstName);
    fd.append('lastName', values.lastName);
    fd.append('address', values.address);
    fd.append('emailAddress', values.emailAddress);
    fd.append('userId', params.id);

    axios.post('http://localhost:9090/onboard', fd)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <Page className={classes.root} title="Onboard">
      <Container maxWidth="lg">
        <Card>
          <CardHeader
            subheader="Please provide following information"
            title="Onboard Yourself"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  required
                  variant="outlined"
                  onChange={(e) => setValues({
                    ...values,
                    firstName: e.target.value
                  })}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the last name"
                  label="Last name"
                  name="lastName"
                  required
                  variant="outlined"
                  onChange={(e) => setValues({
                    ...values,
                    lastName: e.target.value
                  })}
                />
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <TextField
                  fullWidth
                  helperText="Enter your recidential address"
                  label="Recidential Address"
                  name="recidentialAddress"
                  required
                  variant="outlined"
                  onChange={(e) => setValues({
                    ...values,
                    address: e.target.value
                  })}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Enter your email address"
                  label="Email address"
                  name="emailAddress"
                  required
                  variant="outlined"
                  onChange={(e) => setValues({
                    ...values,
                    emailAddress: e.target.value
                  })}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12} />
              <Divider />
              <Grid item lg={3} md={3} xs={12}>
                <input
                  accept="image/*"
                  type="file"
                  id="bank-detail-input"
                  style={{ display: 'none' }}
                  onChange={bankDetailSelectHandler}
                />
                <label htmlFor="bank-detail-input">
                  <Button variant="raised" component="span" className={classes.button}>
                    Upload Bank Details
                  </Button>
                </label>
              </Grid>
              <Grid item lg={9} md={9} xs={12}>
                <p>
                  {values.selectedBankDetail == null ? '' : values.selectedBankDetail.name}
                </p>
              </Grid>
              <Grid item lg={3} md={3} xs={12}>
                <input
                  accept="image/*"
                  type="file"
                  id="nic-input"
                  style={{ display: 'none' }}
                  onChange={nicSelectHandler}
                />
                <label htmlFor="nic-input">
                  <Button variant="raised" component="span" className={classes.button}>
                    Upload NIC
                  </Button>
                </label>
              </Grid>
              <Grid item lg={9} md={9} xs={12}>
                <p>
                  {values.selectedNic == null ? '' : values.selectedNic.name}
                </p>
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Button type="button" onClick={postData}>Submit</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

      </Container>
    </Page>

  );
};

export default withStyles(useStyles)(Onboard);
