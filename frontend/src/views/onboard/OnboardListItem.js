import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
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
    Modal,
    TextField,
    Grid,
    Container,
    Button
} from '@material-ui/core';
import Page from 'src/components/Page';
import getInitials from 'src/utils/getInitials';
import OnboardView from './OnboardView';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2, 4, 3),
        margin: theme.spacing(60, -20, 50, 70)
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        margin: theme.spacing(10, 10, 10)
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
        // transform: `translate(-10%, -10%)`
    };
};

const OnboardListItem = ({ className, employees, ...rest }) => {
    const classes = useStyles();
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [isModalOpen, setModelOpenStatus] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [selectedEmployee, setSelectedEmployee] = useState({});

    const openModal = (employee) => {
        setSelectedEmployee(employee);
        setModelOpenStatus(true);
    }

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


    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Modal
                open={isModalOpen}
                onClose={() => { setModelOpenStatus(false); }}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}
            >
                <div style={modalStyle} className={classes.paper}>
                    <Page className={classes.root} title="Onboard">
                        <Container maxWidth="lg">
                            <Grid container spacing={3}>
                                <Grid item lg={6} md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="First name"
                                        name="firstName"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.firstName}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        name="lastName"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.lastName}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Recidential Address"
                                        name="recidentialAddress"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.address}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email address"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.emailAddress}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12} />
                                <Grid item lg={6} md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Bank"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.bank}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Account Number"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.accountNo}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Branch"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.branch}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Branch Code"
                                        aria-readonly
                                        variant="outlined"
                                        value={selectedEmployee.branchCode}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </Page>
                </div>
            </Modal>
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedCustomerIds.length === employees.length}
                                        color="primary"
                                        indeterminate={
                                            selectedCustomerIds.length > 0
                                            && selectedCustomerIds.length < employees.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    User ID
                </TableCell>
                                <TableCell>
                                    Name
                </TableCell>
                                <TableCell>
                                    Email Address
                </TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.slice(0, limit).map((employee) => (
                                <TableRow
                                    hover
                                    key={employee.id}
                                    selected={selectedCustomerIds.indexOf(employee.id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCustomerIds.indexOf(employee.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, employee.id)}
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
                                                {employee.userId}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {employee.firstName + ' ' + employee.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {employee.emailAddress}
                                    </TableCell>
                                    <TableCell>
                                        {/* <div>
                                            <table>
                                                <tr>
                                                    <td>Bank:</td>
                                                    <td>{employee.bank}</td>
                                                </tr>
                                                <tr>
                                                    <td>Branch:</td>
                                                    <td>{employee.branch}</td>
                                                </tr>
                                                <tr>
                                                    <td>Branch Code:</td>
                                                    <td>{employee.branchCode}</td>
                                                </tr>
                                                <tr>
                                                    <td>Account Number:  </td>
                                                    <td>{employee.accountNo}</td>
                                                </tr>
                                            </table>
                                        </div> */}
                                        <Button onClick={() => openModal(employee)}>View Info</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={employees.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

OnboardListItem.propTypes = {
    className: PropTypes.string,
    employees: PropTypes.array.isRequired
};

export default OnboardListItem;
