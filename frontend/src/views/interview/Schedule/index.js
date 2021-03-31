import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

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
  Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ScheduleInterview = (props) => {
  const classes = useStyles();
  const location = useLocation();
  console.log(location.pathname.split("/"));
  const [values, setValues] = useState({
    position: null,
    ladivisionstName: null,
    scheduledDate: null,
    candidateName: null,
    candidateEmailAddress: null,
    interviewerName: null,
    interviewerName: null
  });

  console.log(props);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [jobApplication, setJobApplication] = useState({});

  useEffect(()=>{
    axios.get(`http://localhost:9090/applications/${location.pathname.split("/")[3]}`)
    .then(res=>{
      console.log(res.data);
      setJobApplication(res.data);
    })
    .catch(err=>{
      console.log(err);
    });
  },[]);

  const ADD_SCHEDULE_INTERVIEW = 'http://localhost:9090/addScheduledInterviews';

  const scheduleInterview = () => {
    const data = {
      position: values.position,
      division: values.division,
      scheduledDate: moment(values.time).format('YYYY-MM-DD HH:mm:ss'),
      candidateName: values.candidateName,
      candidateEmailAddress: values.candidateEmailAddress,
      interviewerName: values.interviewerName,
      interviewerEmailAddress: values.interviewerEmailAddress
    }

    // fetch(ADD_SCHEDULE_INTERVIEW, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: data
    // });
    axios.post(ADD_SCHEDULE_INTERVIEW, data)
      .then((res) => {
        console.log(res);
      });
  }

  return (
    <Page
      className={classes.root}
      title="Interview Schedule"
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
                subheader="The information can be edited"
                title="Schedule Interview"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      disabled
                      name="position"
                      value={jobApplication.vacancy.jobBand}
                      onChange={(e) => setValues({
                        ...values,
                        position: e.target.value
                      })}
                      required
                      variant="outlined"
                    >

                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      id="datetime-local"
                      label="Interview Time"
                      type="datetime-local"
                      name="time"
                      defaultValue="2021-01-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setValues({
                        ...values,
                        time: e.target.value
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item
                    md={6}
                    xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      value={jobApplication.vacancy.team}
                      name="division"
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        division: e.target.value
                      })}
                    >

                    </TextField>
                  </Grid>

                </Grid>

                <Grid container spacing={3}>
                  <Grid item
                    md={6}
                    xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      value={`${jobApplication.firstName} ${jobApplication.lastName}`}
                      name="candidateName"
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        candidateName: e.target.value
                      })}
                    >
                    </TextField>
                  </Grid>

                  <Grid item
                    md={6}
                    xs={12}>
                    <TextField
                      fullWidth
                      disabled
                      value={jobApplication.email}
                      name="candidateEmailAddress"
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        candidateEmailAddress: e.target.value
                      })}
                    >

                    </TextField>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item
                    md={6}
                    xs={12}>
                    <TextField
                      fullWidth
                      label="Add Interviewer Name"
                      name="interviewerName"
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        interviewerName: e.target.value
                      })}
                    >

                    </TextField>
                  </Grid>

                  <Grid item
                    md={6}
                    xs={12}>
                    <TextField
                      fullWidth
                      label="Add Interviewer Email"
                      name="interviewerEmailAddress"
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        interviewerEmailAddress: e.target.value
                      })}
                    >

                    </TextField>
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
                  onClick={scheduleInterview}
                >
                  Schedule Interview
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

ScheduleInterview.propTypes = {};

export default ScheduleInterview;
