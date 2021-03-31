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
const axios = require('axios');

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

  const getChimeInfo = () => {
    let meeting = {};
    let attendee = {}
    axios.get(GET_CHIME_INFO).then(resp => {
      meeting = resp.data.meetingObject;
      attendee = resp.data.attendeeObject;
      startVideo(meeting, attendee);
    });




  }

  const startVideo = async (meeting, attendee) => {
    try {
      const meetingId = meeting.meetingId;
      const joinToken = attendee.joinToken;
      let clientId = '';
      let isMeetingHost = '';
      let requestPath = `join?clientId=${clientId}`;
      if (!meetingId) {
        isMeetingHost = true;
      } else {
        requestPath += `&meetingId=${meetingId}`;
      }

      if (isMeetingHost) {
        // document.getElementById("meeting-link").innerText = window.location.href + "?meetingId=" + meetingId;
      }

      const configuration = new MeetingSessionConfiguration(
        meeting,
        attendee
      );
      const logger = new ConsoleLogger('ChimeMeetingLogs', LogLevel.INFO);
      const deviceController = new DefaultDeviceController(logger);
      window.meetingSession = new DefaultMeetingSession(
        configuration,
        logger,
        deviceController
      );
      const audioInputs = await meetingSession.audioVideo.listAudioInputDevices();
      const videoInputs = await meetingSession.audioVideo.listVideoInputDevices();

      await meetingSession.audioVideo.chooseAudioInputDevice(
        audioInputs[0].deviceId
      );
      await meetingSession.audioVideo.chooseVideoInputDevice(
        videoInputs[0].deviceId
      );
      const observer = {
        videoTileDidUpdate: (tileState) => {
          // Ignore a tile without attendee ID and other attendee's tile.
          if (!tileState.boundAttendeeId) {
            return;
          }
          updateTiles(meetingSession);
        },
      };
      meetingSession.audioVideo.addObserver(observer);
      const audioOutputElement = document.getElementById("chime-audio");
      meetingSession.audioVideo.bindAudioElement(audioOutputElement);
      meetingSession.audioVideo.start();
      document.getElementById("meeting-id").innerText = meetingId
      document.getElementById("join-token").innerText = joinToken;

    } catch (err) {
      console.error(err);
    }
  }

  const updateTiles = (meetingSession) => {
    const tiles = meetingSession.audioVideo.getAllVideoTiles();
    tiles.forEach(tile => {
      let tileId = tile.tileState.tileId
      var videoElement = document.getElementById("video-" + tileId);

      if (!videoElement) {
        videoElement = document.createElement("video");
        videoElement.id = "video-" + tileId;
        document.getElementById("video-list").append(videoElement);
        meetingSession.audioVideo.bindVideoElement(
          tileId,
          videoElement
        );
      }
    })
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
                <TableCell>Meeting Id</TableCell>
                <TableCell>Join Token</TableCell>
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
                      onClick={getChimeInfo}
                    >
                      Create Meeting
                    </Button>
                    <audio id="chime-audio" display="none"></audio>
                    <div id="video-list" width="100%" height="100%"></div>
                    <div id='meeting-link'></div>
                  </TableCell>
                  <TableCell id="meeting-id">
                  </TableCell>
                  <TableCell id="join-token">
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
