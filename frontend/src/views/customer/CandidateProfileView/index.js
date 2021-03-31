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
import { useNavigate } from 'react-router-dom';

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

const CandidateProfileView = (className, ...rest) => {
  const classes = useStyles();
  const [applicationStatus, setApplicationStatus] = useState("PENDING");
  const location = useLocation();
  let navigate = useNavigate();
  const [values, setValues] = useState({
    vacancyId: '342131',
    jobBand: 'Software Engineering',
    team: 'Eco-System Engineering',
    positions: 10,
    status: 'PUBLISHED',
    reviewer1Email: undefined,
    reviewer2Email: undefined
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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
      // link.download=url;
      link.click();
    });
  }

  const hrReviewRequest = ()=>{
    axios.get(`http://localhost:9090/applications/${location.pathname.split("/")[3]}/status?status=REVIEW_REQUESTED`)
    .then(res=>{
      console.log(res);
      setApplicationStatus("REVIEW_REQUESTED");
    })
    .catch(err=>{
      console.log(err);
    });
  }

  const scheduleInterview = () => {
    navigate(`/app/scheduleInterview/${jobApplication.id}`, {jobApplication: jobApplication});
  }

  const sendEmail = (toAddress)=>{
    const code = uuidv4();
    AWS.config.update({region: 'us-east-2'});
    AWS.config.update(
      {
        accessKeyId: "AKIATSNMB5HNEQKON6MG",
        secretAccessKey: "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",
      }
    );
    const params = {
      Destination: { /* required */
        CcAddresses: [],
        ToAddresses: [
          toAddress
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
           Charset: "UTF-8",
           Data: `Hi, you have been assigned to review a new recruitment candidate profile. Please be kind to review and provide your feedback in this link <a>http://localhost:3000/review/${jobApplication.id}?code=${code}</a>`
          },
          Text: {
           Charset: "UTF-8",
           Data: "TEXT_FORMAT_BODY"
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: 'VERAOP Profile Screening Feedback'
         }
        },
      Source: '123kanishka@gmail.com', /* required */
      ReplyToAddresses: [],
    };

    const sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    sendPromise.then(
      function(data) {
        console.log(data.MessageId);
        hrReviewRequest();
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
  }

  const [jobApplication, setJobApplication] = useState({});
  const [feedback, setFeedback] = useState({});

  

  useEffect(()=>{
    axios.get(`http://localhost:9090/applications/${location.pathname.split("/")[3]}`)
    .then(res=>{
      console.log(res.data);
      setJobApplication(res.data);
      const status = res.data.status;
      setApplicationStatus(status);
    })
    .catch(err=>{
      console.log(err);
    });
  },[]);

  useEffect(()=>{
    axios.get(`http://localhost:9090/feedbacks/application/${location.pathname.split("/")[3]}`)
    .then(res=>{
      console.log(res.data);
      setFeedback(res.data[0]);
    })
    .catch(err=>{
      console.log(err);
    });
  },[]);

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
              <h4>{applicationStatus}</h4>
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
              <Divider />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Reviewer 1
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {jobApplication.status === "HR_ACCEPTED"?  <TableRow>
                    <TableCell>
                      <TextField
                        fullWidth
                        label="E-mail"
                        name="reviewer1Email"
                        onChange={(e) => setValues({
                          ...values,
                          reviewer1Email: e.target.value
                        })}
                        variant="outlined"
                      />
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={()=>sendEmail(values.reviewer1Email)}
                      >
                        Request
                      </Button>
                    </TableCell>

                  </TableRow>:undefined}
                  {jobApplication.status === "REVIEW_SUBMITTED"?  <TableRow>
                    <TableCell>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        disabled
                        value={feedback.name}
                        onChange={(e) => setValues({
                          ...values,
                          reviewer1Email: e.target.value
                        })}
                        variant="outlined"
                      />
                    </TableCell>

                  </TableRow>:undefined}
                  {jobApplication.status === "REVIEW_SUBMITTED"?  <TableRow>
                    <TableCell>
                      <TextField
                        fullWidth
                        label="Designation"
                        name="designation"
                        disabled
                        value={feedback.designation}
                        onChange={(e) => setValues({
                          ...values,
                          reviewer1Email: e.target.value
                        })}
                        variant="outlined"
                      />
                    </TableCell>

                  </TableRow>:undefined}
                  <TableRow>
                    <TableCell>
                      <Card>
                        <CardContent>
                          <TextField
                            fullWidth
                            disabled
                            multiline
                            rows={5}
                            value={feedback.feedback}
                            name="reviewer1Feedback"
                            onChange={(e) => setValues({
                              ...values,
                              firstName: e.target.value
                            })}
                            variant="outlined"
                          />
                        </CardContent>
                      </Card>

                    </TableCell>

                  </TableRow>
                </TableBody>
              </Table>
              <Divider/>

              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                <ThemeProvider theme={acceptButtonTheme} >
                  <Box marginRight={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={scheduleInterview}
                    >
                      Accept And Schedule Interviews
                    </Button>
                  </Box>
                </ThemeProvider>

                <ThemeProvider theme={rejectButtonTheme} >
                  <Box marginRight={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={scheduleInterview}
                    >
                      Reject
                    </Button>
                  </Box>
                </ThemeProvider>
              
              </Box>

              <Divider />
            </Card>
          </form>
        </Grid>
      </Container>
    </Page>
  );
};

CandidateProfileView.propTypes = {};

export default CandidateProfileView;
