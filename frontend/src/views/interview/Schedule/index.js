import React, { useState } from 'react';
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

const states = [
  {
    value: 'Software-Engineer',
    label: 'Software Engineer'
  },
  {
    value: 'Senior-Software-Engineer',
    label: 'Senior Software Engineer'
  },
  {
    value: 'Tech-Lead',
    label: 'Tech Lead'
  }
];

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

  return (
    <Page
      className={classes.root}
      title="Interview Schedule"
    >
      <Container maxWidth="false">
        <Grid
          item
          lg={8}
          md={6}
          xs={12}
        >
          <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}
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
                      name="state"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
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
                      defaultValue="2021-01-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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
