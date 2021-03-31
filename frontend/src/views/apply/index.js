import React, { useState } from 'react';
import axios from 'axios';

import {
  makeStyles,
  Card,
  CardHeader,
  Divider,
  Grid,
  CardContent,
  TextField,
  Container,
  Box,
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {}
}));

const JobApplyView = (className, ...rest) => {
  const classes = useStyles();
  const location = useLocation();
  const initialState = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    mobileNumber: undefined,
    address: undefined,
    linkedInOrBlog: undefined,
    openSourceContributions: undefined,
    totalYearsOfWorkExperience: undefined,
    highestEduQualification: undefined,
    degree: undefined,
    university: undefined,
    yearOfGraduation: undefined,
    currentDesignation: undefined,
    companyName: undefined,
    workDuration: undefined,
    publications: undefined,
    achievements: undefined,
    fileName: "",
    vacancyId: location.pathname.split("/")[2],
    selectedFile: null
  };
  const [values, setValues] = useState(initialState);
  console.log(values.vacancyId);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleUpload = (e)=>{
    setValues({
      ...values,
      selectedFile: e.target.files[0],
      fileName: e.target.files[0].name
    });
  }

  function upload(){
    console.log(values.selectedFile);

    const url = "https://037uigezig.execute-api.us-east-2.amazonaws.com/default/cvUpoadFunction";
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({key: values.selectedFile.name})
    })
    .then(res=>res.json())
    .then((res)=>{
      console.log(res);
      fetch(res.URL, {
        method: 'PUT',
        mode: 'cors',
        body: values.selectedFile
      })
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  const onSubmitJobApplicationForm = ()=>{
    upload();
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      mobileNumber: values.mobileNumber,
      address: values.address,
      linkedInOrBlog: values.linkedInOrBlog,
      openSourceContributions: values.openSourceContributions,
      totalYearsOfWorkExperience: values.totalYearsOfWorkExperience,
      highestEduQualification: values.highestEduQualification,
      degree: values.degree,
      university: values.university,
      yearOfGraduation: values.yearOfGraduation,
      currentDesignation: values.currentDesignation,
      companyName: values.companyName,
      workDuration: values.workDuration,
      publications: values.publications,
      achievements: values.achievements,
      fileName: values.fileName,
      vacancyId: values.vacancyId
    };


    axios.post('http://localhost:9090/applications', data)
    .then((res) => {
      console.log(res);
      alert("Job Application Submitted!");
      setValues(initialState);
    });
  }

  return (
    <Page
      className={classes.root}
      title="Job Application"
    >
      <Container lg={12}>
        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          <form
          >
            <Card>
              <CardHeader
                subheader="Eco-System Engineering Team"
                title="Software Engineer"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Card>
                        <CardHeader title="Personal Information"/>
                    </Card>

                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={(e) => setValues({
                        ...values,
                        lastName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={(e) => setValues({
                        ...values,
                        email: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      name="mobileNumber"
                      value={values.mobileNumber}
                      onChange={(e) => setValues({
                        ...values,
                        mobileNumber: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={values.address}
                      onChange={(e) => setValues({
                        ...values,
                        address: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="LinkedIn/Blog"
                      name="linkedInOrBlog"
                      value={values.linkedInOrBlog}
                      onChange={(e) => setValues({
                        ...values,
                        linkedInOrBlog: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Open Source Contributions"
                      name="openSourceContributions"
                      value={values.openSourceContributions}
                      onChange={(e) => setValues({
                        ...values,
                        openSourceContributions: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Total Years of Work Experience"
                      name="totalYearsOfWorkExperience"
                      value={values.totalYearsOfWorkExperience}
                      onChange={(e) => setValues({
                        ...values,
                        totalYearsOfWorkExperience: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  
                </Grid>
                <Divider/>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Card>
                        <CardHeader title="Educational Qualifications"/>
                    </Card>

                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Highest Educational Qualification"
                      name="highestEduQualification"
                      value={values.highestEduQualification}
                      onChange={(e) => setValues({
                        ...values,
                        highestEduQualification: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Degree/Certificate Awarded"
                      name="degree"
                      value={values.degree}
                      onChange={(e) => setValues({
                        ...values,
                        degree: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="University / Institute"
                      name="university"
                      value={values.university}
                      onChange={(e) => setValues({
                        ...values,
                        university: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Year of Graduation"
                      name="yearOfGraduation"
                      value={values.yearOfGraduation}
                      onChange={(e) => setValues({
                        ...values,
                        yearOfGraduation: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Card>
                        <CardHeader title="Details of Work Experience"/>
                    </Card>

                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Current Designation"
                      name="currentDesignation"
                      value={values.currentDesignation}
                      onChange={(e) => setValues({
                        ...values,
                        currentDesignation: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Company Name"
                      name="companyName"
                      value={values.companyName}
                      onChange={(e) => setValues({
                        ...values,
                        companyName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Work Duration"
                      name="workDuration"
                      value={values.workDuration}
                      onChange={(e) => setValues({
                        ...values,
                        workDuration: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Divider/>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Card>
                        <CardHeader title="Publications"/>
                    </Card>

                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Publications"
                      name="publications"
                      value={values.publications}
                      onChange={(e) => setValues({
                        ...values,
                        publications: e.target.value
                      })}
                      variant="outlined"
                    />
                  </Grid> 
                </Grid>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Card>
                        <CardHeader title="Achievements"/>
                    </Card>

                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Achievements"
                      name="achievements"
                      value={values.achievements}
                      onChange={(e) => setValues({
                        ...values,
                        achievements: e.target.value
                      })}
                      variant="outlined"
                    />
                  </Grid> 
                </Grid>
                <Divider/>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Card>
                        <CardHeader title="Upload CV"/>
                    </Card>

                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <input type="file" onChange={handleUpload}/>
                  </Grid> 
                </Grid>
              </CardContent>
              <Divider />
              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onSubmitJobApplicationForm}
                >
                  Submit
                </Button>
              </Box>
              <Divider />
            </Card>
          </form>
        </Grid>
      </Container>
    </Page>
  );
};

JobApplyView.propTypes = {};

export default JobApplyView;
