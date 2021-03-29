import React, { useState } from 'react';
import moment from 'moment';

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

const useStyles = makeStyles(() => ({
  root: {}
}));

const ScheduleInterview = (className, ...rest) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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

    fetch(ADD_SCHEDULE_INTERVIEW, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
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
                      label="Select Job Role"
                      name="position"
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
                      label="Select Team"
                      name="division"
                      onChange={handleChange}
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
                      label="Add Candidate Name"
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
                      label="Add Candidate Email"
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
