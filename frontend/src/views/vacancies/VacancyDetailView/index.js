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
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {}
}));

const VacancyDetailView = (className, ...rest) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    vacancyId: '342131',
    jobBand: 'Software Engineering',
    team: 'Eco-System Engineering',
    positions: 10,
    status: 'PUBLISHED'
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
                title="Vacancy Details"
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
                      label="Job Band"
                      name="jobBand"
                      onChange={(e) => setValues({
                        ...values,
                        jobBand: e.target.value
                      })}
                      required
                      variant="outlined"
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
                      label="Team"
                      name="team"
                      onChange={handleChange}
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        team: e.target.value
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
                      label="Positions"
                      name="positions"
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        position: e.target.value
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
                      label="Status"
                      name="status"
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        status: e.target.value
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
                  Save
                </Button>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                p={1}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={scheduleInterview}
                >
                  Generate Link
                </Button>
                
                <Link to={"https://www.google.com"} >
                    <CardHeader
                        title="https://www.google.com"
                    />
                </Link>
                
              </Box>
              <Divider />
            </Card>
          </form>
        </Grid>
      </Container>
    </Page>
  );
};

VacancyDetailView.propTypes = {};

export default VacancyDetailView;
