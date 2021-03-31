import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import InterviewListView from 'src/views/interview/InterviewListView';
import ScheduleInterview from 'src/views/interview/Schedule';
import InterviewFeedback from 'src/views/feedback';
import Onboard from 'src/views/onboard/OnboardView';
import JobRoleManagementView from 'src/views/job_roles/JobRoleManagementView';
import VacancyListView from 'src/views/vacancies/VacancyListView';
import VacancyDetailView from 'src/views/vacancies/VacancyDetailView';
import RequestListView from 'src/views/requests/RequestListView';
import CreateVacancyView from 'src/views/vacancies/CreateVacancyView';
import JobApplyView from 'src/views/apply';
import ApplicationReviewView from 'src/views/review';
import CandidateRequestListView from 'src/views/requests/RequestListView';
import RequestDetailView from './views/requests/RequestDetailView';
import CandidateProfileView from './views/customer/CandidateProfileView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'candidates', element: <CustomerListView /> },
      { path: 'candidates/:id', element: <CandidateProfileView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'interview', element: <InterviewListView /> },
      { path: 'feedback', element: <InterviewFeedback /> },
      { path: 'scheduleInterview/:id', element: <ScheduleInterview /> },
      { path: 'requests', element: <RequestListView /> },
      { path: 'job_roles', element: <JobRoleManagementView /> },
      { path: 'vacancies', element: <VacancyListView /> },
      { path: 'vacancies/new', element: <CreateVacancyView /> },
      { path: 'vacancies/:id', element: <VacancyDetailView /> },
      { path: 'requests', element: <CandidateRequestListView /> },
      { path: 'requests/:id', element: <RequestDetailView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: 'onboard/:id', element: <Onboard /> },
      { path: 'review/:id', element: <ApplicationReviewView /> },
      { path: 'apply/:id', element: <JobApplyView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
