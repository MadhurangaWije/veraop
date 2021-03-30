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
    Tab,
    Button
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
    const [values, setValues] = useState({
        interviewVideo: null,
        candidateId: null,
        result: null,
    });

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
    // const Add_INTERVIEW_RESULT = 'http://localhost:9090/addResult';



    const AddResults = (candidateId) => {
        const formData = new FormData();
        formData.append("result", values.result);
        console.log('values.result', values.result)
        formData.append("candidateId", candidateId);
        console.log('candidateId', candidateId)
        formData.append("interviewVideo", values.interviewVideo);
        console.log('values.interviewVideo', values.interviewVideo)
        console.log('formData', formData)

        axios.post('http://localhost:9090/uploadInterview', formData)
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
                                <TableCell>

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
                                                {customer.candidateName}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {moment(customer.scheduledDate).format('DD/MM/YYYY')}
                                    </TableCell>
                                    <TableCell>
                                        <input type="file" name="interviewVideo" onChange={(e) => setValues({
                                            ...values,
                                            interviewVideo: e.target.files[0]
                                        })} />

                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            name="result"
                                            onChange={(e) => setValues({
                                                ...values,
                                                result: e.target.value
                                            })}
                                            required
                                            variant="outlined"
                                        >
                                            {customer.result ? customer.result : ''}
                                        </TextField>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="primary"
                                            variant="contained"
                                            onClick={() => AddResults(customer.candidateId)}>
                                            Done
                                        </Button>
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
