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
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import data from '../../job_roles/JobRoleManagementView/data';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {}
}));

const VacancyCreateView = (className, ...rest) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [values, setValues] = useState({
    team: '',
    positions: 0,
    jobBandId: 4,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const findJobBandById = (id) =>{
    const selectedBand = data.filter(band=>{
        return parseInt(band.jdId) == id;
    });
    return selectedBand[0];
  }

  const createVacancy = ()=>{

      const data = {
        jobBand: findJobBandById(values.jobBandId).title,
        team: values.team,  
        positions: values.positions
      }


      axios.post('http://localhost:9090/vacancies', data)
      .then((res) => {
        console.log(res);
        alert("Vacancy Creation Success!");
        navigate("/app/vacancies");
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
                    <FormControl fullWidth variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Job Band</InputLabel>
                        <Select
                        name="jobBandId"
                        fullWidth
                        value={values.jobBandId}
                        onChange={handleChange}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={4}>Associate Software Engineer</MenuItem>
                        <MenuItem value={5}>Software Engineer</MenuItem>
                        <MenuItem value={6}>Senior Software Engineer</MenuItem>
                        <MenuItem value={7}>Associate Technical Lead</MenuItem>
                        <MenuItem value={8}>Technical Lead</MenuItem>
                        <MenuItem value={9}>Senior Technical Lead</MenuItem>
                        <MenuItem value={10}>Associate Director/Architect</MenuItem>
                        </Select>
                    </FormControl>
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
                      value={values.team}
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
                      value={values.positions}
                      required
                      variant="outlined"
                      onChange={(e) => setValues({
                        ...values,
                        positions: e.target.value
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
                  onClick={createVacancy}
                >
                  Save
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

VacancyCreateView.propTypes = {};

export default VacancyCreateView;
