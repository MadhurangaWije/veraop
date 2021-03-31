import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
import {
  ConsoleLogger,
  DefaultDeviceController,
  DefaultMeetingSession,
  LogLevel,
  MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';
import { result } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, ...rest }) => {

  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);



  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const GET_CHIME_INFO = "http://localhost:9090/getChimeMeetingInfo";

  const startMeeting = async () => {
    const meeting = {};
    const attendee = {}
    fetch(GET_CHIME_INFO)
      .then((response) => response.json())
      .then((result) => {
        meeting = result.meeting;
        attendee = result.attendee;
      }).catch((e) => {
        console.log(e);
      });
    //chime related
    const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.INFO);
    const deviceController = new DefaultDeviceController(logger);
    const configuration = new MeetingSessionConfiguration(meeting, attendee);
    const meetingSession = new DefaultMeetingSession(configuration, logger, deviceController);

    try {
      const audioInputs = await meetingSession.audioVideo.listAudioInputDevices();
      await meetingSession.audioVideo.chooseAudioInputDevice(audioInputs[0].deviceId);
      console.log('audioInputs', audioInputs)
    } catch (err) {
      console.log('err', err)

      // handle error - unable to acquire audio device perhaps due to permissions blocking
    }

    const audioOutputElement = document.getElementById('chime-audio');
    meetingSession.audioVideo.bindAudioElement(audioOutputElement);
    meetingSession.audioVideo.start();
  }


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Role
                </TableCell>
                <TableCell>
                  Team
                </TableCell>
                <TableCell>
                  Schedualed Time
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (

                <TableRow
                  hover
                  key={customer.candidateId}
                  selected={selectedCustomerIds.indexOf(customer.candidateId) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.candidateId) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.candidateId)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >

                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.candidateName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.position}
                  </TableCell>
                  <TableCell>
                    {customer.division}
                  </TableCell>
                  <TableCell>
                    {moment(customer.scheduledDate).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={startMeeting}
                    >
                      Start Meeting
                    </Button>
                    <audio id="chime-audio" display="none"></audio>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
