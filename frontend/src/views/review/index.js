import React, { useEffect, useState } from 'react';
import moment from 'moment';
import AWS from 'aws-sdk';

import clsx from 'clsx';
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
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import Page from 'src/components/Page';
import { Link } from 'react-router-dom';
import { green, orange, red } from '@material-ui/core/colors';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(() => ({
  root: {}
}));

const acceptButtonTheme = createMuiTheme({
  palette: {
    primary: green
  }
});

const onHoldButtonTheme = createMuiTheme({
  palette: {
    primary: orange
  }
});

const rejectButtonTheme = createMuiTheme({
  palette: {
    primary: red
  }
});

const ApplicationReviewView = (className, ...rest) => {
  const classes = useStyles();
  const [applicationStatus, setApplicationStatus] = useState("PENDING");
  const location = useLocation();
  const [values, setValues] = useState({
    vacancyId: '342131',
    jobBand: 'Software Engineering',
    team: 'Eco-System Engineering',
    positions: 10,
    status: 'PUBLISHED',
    reviewer1Email: undefined,
    reviewer2Email: undefined
  });

  const [feedback, setFeedback] = useState({name:'', designation:'', feedback:'', applicationId:''});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const updateApplicationStateToReviewSubmitted = ()=>{
    axios.get(`http://localhost:9090/applications/${location.pathname.split("/")[2]}/status?status=REVIEW_SUBMITTED`)
    .then(res=>{
      console.log(res);
      setApplicationStatus("REVIEW_SUBMITTED");
    })
    .catch(err=>{
      console.log(err);
    });
  }

  let downloadCV = (fileName) => {
    AWS.config.update(
      {
        accessKeyId: "AKIATSNMB5HNEQKON6MG",
        secretAccessKey: "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",
      }
    );
    let bucket = 'veraop-cv-bucket';
    let key = fileName;
    let s3 = new AWS.S3({ params: { Bucket: bucket }})
    let params = {Bucket: bucket, Key: key}
    s3.getObject(params, (err, data) => {
      let blob=new Blob([data.Body], {type: data.ContentType});
      let link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.click();
    });
  }

  const submitFeedback = () => {
    const data = {
        name: feedback.name,
        designation: feedback.designation,
        feedback: feedback.feedback,
        applicationId: feedback.applicationId
    };

    axios.post("http://localhost:9090/feedbacks", data)
    .then(res=>{
        console.log(res.data);
        updateApplicationStateToReviewSubmitted();
    })
    .catch(err=>{
        console.log(err);
    });
  }

  const [jobApplication, setJobApplication] = useState({});

  useEffect(()=>{
    axios.get(`http://localhost:9090/applications/${location.pathname.split("/")[2]}`)
    .then(res=>{
      console.log(res.data);
      setJobApplication(res.data);
      const status = res.data.status;
      const applicationId = res.data.id;
      setApplicationStatus(status);
      setFeedback({
          ...feedback,
          applicationId:applicationId
      });
    })
    .catch(err=>{
      console.log(err);
    });
  },[]);

  return (
    <Page
      className={classes.root}
      title="Job Application Review"
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
              <h4 style={{textAlign:'right', marginRight:'10px'}}>Status: {applicationStatus}</h4>
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
                      disabled
                      name="firstName"
                      value={jobApplication.firstName}
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.lastName}
                      name="lastName"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.email}
                      name="email"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.mobileNumber}
                      name="mobileNumber"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      name="address"
                      value={jobApplication.address}
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      name="linkedinOrBlog"
                      value={jobApplication.linkedInOrBlog}
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.openSourceContributions}
                      name="openSourceContributions"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.totalYearsOfWorkExperience}
                      name="totalWorkExperience"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
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
                      disabled
                      fullWidth
                      value={jobApplication.highestEduQualification}
                      name="educationalQualification"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.degree}
                      name="lastName"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.university}
                      name="university"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.yearOfGraduation}
                      name="mobileNumber"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
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
                      disabled
                      fullWidth
                      value={jobApplication.currentDesignation}
                      name="currentDesignation"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.companyName}
                      name="companyName"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
                      })}
                      required
                      variant="outlined"
                    />
                    <TextField
                      disabled
                      fullWidth
                      value={jobApplication.workDuration}
                      name="workDuration"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
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
                      disabled
                      rows={5}
                      value={jobApplication.publications}
                      name="publications"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
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
                      disabled
                      rows={5}
                      value={jobApplication.achievements}
                      name="achievements"
                      onChange={(e) => setValues({
                        ...values,
                        firstName: e.target.value
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
                          <CardHeader title="CV"/>
                      </Card>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <Box marginTop={1}>
                      <Button
                          color="secondary"
                          variant="contained"
                          onClick={()=>downloadCV(jobApplication.fileName)}
                      >
                          View
                      </Button>
                    </Box>
                  </Grid> 
                </Grid>
              </CardContent>
              <Divider/>

              <Card>
                  <CardHeader
                    title="Feedback"
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Box marginTop={1}>
                            <TextField
                                fullWidth
                                label="Name"
                                value={feedback.name}
                                name="name"
                                onChange={(e) => setFeedback({
                                    ...feedback,
                                    name: e.target.value
                                })}
                                variant="outlined"
                                />
                            </Box>
                        </Grid> 
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Box marginTop={1}>
                            <TextField
                                fullWidth
                                label="Designation"
                                value={feedback.designation}
                                name="designation"
                                onChange={(e) => setFeedback({
                                    ...feedback,
                                    designation: e.target.value
                                })}
                                variant="outlined"
                                />
                            </Box>
                        </Grid> 
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <Box marginTop={1}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Feedback"
                                value={feedback.feedback}
                                name="feedback"
                                onChange={(e) => setFeedback({
                                    ...feedback,
                                    feedback: e.target.value
                                })}
                                variant="outlined"
                                />
                            </Box>
                        </Grid> 
                    </Grid>
                  </CardContent>
              </Card>

              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                {/* <ThemeProvider theme={acceptButtonTheme} > */}
                  <Box marginRight={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={submitFeedback}
                    >
                      Submit Feedback
                    </Button>
                  </Box>
                {/* </ThemeProvider> */}
              
              </Box>

              <Divider />
            </Card>
          </form>
        </Grid>
      </Container>
    </Page>
  );
};

ApplicationReviewView.propTypes = {};

export default ApplicationReviewView;
