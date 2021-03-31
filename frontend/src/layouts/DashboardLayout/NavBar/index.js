import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
// import {
//   AlertCircle as AlertCircleIcon,
//   Lock as LockIcon,
//   Settings as SettingsIcon,
//   ShoppingBag as ShoppingBagIcon,
//   User as UserIcon,
//   UserPlus as UserPlusIcon,
//   Users as UsersIcon
// } from 'react-feather';
import FindInPageOutlinedIcon from '@material-ui/icons/FindInPageOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import AssistantOutlinedIcon from '@material-ui/icons/AssistantOutlined';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Human Resource Manager (Talent Acquition)',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: DashboardOutlinedIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/job_roles',
    icon: WorkOutlineIcon,
    title: 'Job Roles'
  },
  {
    href: '/app/vacancies',
    icon: AssistantOutlinedIcon,
    title: 'Vacancies'
  },
  {
    href: '/app/candidates',
    icon: PeopleAltOutlinedIcon,
    title: 'Candidates'
  },
  {
    href: '/app/interview',
    icon: FindInPageOutlinedIcon,
    title: 'Interview Scheduling'
  },
  {
    href: '/app/feedback',
    icon: AssignmentIndOutlinedIcon,
    title: 'Interview Feedback'
  },
  {
    href: '/app/requests',
    icon: AssignmentIndOutlinedIcon,
    title: 'Requests'
  },
  {
    href: '/app/onboard',
    icon: AttachFileOutlinedIcon,
    title: 'Onboarding'
  },
  {
    href: '/app/customers',
    icon: QuestionAnswerOutlinedIcon,
    title: 'Chat'
  },
  {
    href: '/app/customers',
    icon: SettingsOutlinedIcon,
    title: 'Administration'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
          style={{ textAlign: 'center' }}
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
          style={{ textAlign: 'center' }}
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
