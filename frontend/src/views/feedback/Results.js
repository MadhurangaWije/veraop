import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
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
    TextField,
    Tab
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Results = ({ className, customers, selectedFile, ...rest }) => {
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
    const ADD_VIDEO_TO_S3 = 'http://localhost:9090/uploadInterview';
    const Add_INTERVIEW_RESULT = 'http://localhost:9090/addResult';


    const onFileChange = (event, id) => {
        // Update the state
        const selectedFile = event.target.files[0];
        const formData = new FormData();
        formData.append("interviewVideo", selectedFile);
        formData.append("candidateId", id);
        axios.post(ADD_VIDEO_TO_S3, formData)
            .then((res) => {
                console.log(res);
            });
    };

    const onAddFeedback = (event, id) => {
        console.log(event.target.value);
        const result = event.target.value;
        const formData = new FormData();
        formData.append("result", result);
        formData.append("candidateId", id);
        axios.post(Add_INTERVIEW_RESULT, formData)
            .then((res) => {
                console.log(res);
            });
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
                                    Interview Date
                </TableCell>
                                <TableCell>
                                    Interview Video
                </TableCell>
                                <TableCell>
                                    Feedback
                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.slice(0, limit).map((customer) => (
                                <TableRow
                                    hover
                                    key={customer.id}
                                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, customer.id)}
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
                                                {customer.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {moment(customer.scheduledDate).format('DD/MM/YYYY')}
                                    </TableCell>
                                    <TableCell>
                                        <input type="file" onChange={(event) => { onFileChange(event, customer.id) }} />

                                    </TableCell>
                                    <TableCell>
                                        <TextField

                                            // label="Select Job Role"
                                            name="result"
                                            onKeyUp={(event) => { onAddFeedback(event, customer.id) }}
                                            required
                                            variant="outlined"
                                        >

                                        </TextField>
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
    customers: PropTypes.array.isRequired,
    selectedFile: PropTypes.string,
};

export default Results;
