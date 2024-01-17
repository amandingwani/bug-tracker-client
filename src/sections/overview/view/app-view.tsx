import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';

import { useAppSelector } from 'src/redux/hooks';
import { selectUser, selectWelcomeBackMsg } from 'src/redux/slices/authSlice';
import { selectProjects } from 'src/redux/slices/projectsSlice';

import { getDashboardData, type DashboardData } from '../utils';

// ----------------------------------------------------------------------

export default function AppView() {
  const user = useAppSelector(selectUser);
  const welcomeBackMsg = useAppSelector(selectWelcomeBackMsg);

  const projects = useAppSelector(selectProjects);

  const loading =
    projects.reqStatus.name === 'loadProjects' && projects.reqStatus.status === 'loading';

  let dashboardData: DashboardData | null = null;

  if (user) {
    dashboardData = getDashboardData(projects, user.id);
  }

  // console.log(dashboardData);

  const renderUrgent = (
    <AppWidgetSummary
      title="Urgent Priority Tickets"
      total={dashboardData?.ticketPriorityCount.URGENT}
      color="error"
      icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
    />
  );

  const renderHigh = (
    <AppWidgetSummary
      title="High Priority Tickets"
      total={dashboardData?.ticketPriorityCount.HIGH}
      color="warning"
      icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
    />
  );

  const renderActiveTickets = (
    <AppWidgetSummary
      title="Active Tickets"
      total={dashboardData?.activeTickets}
      color="warning"
      icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
    />
  );

  const renderActiveProjects = (
    <AppWidgetSummary
      title="Active Projects"
      total={dashboardData?.activeProjects}
      color="primary"
      icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
    />
  );

  const renderTypeChart = (
    <AppCurrentVisits
      title="Tickets by Type"
      chart={{
        series: [
          { label: 'BUG', value: dashboardData?.ticketTypeCount.BUG },
          { label: 'TASK', value: dashboardData?.ticketTypeCount.TASK },
        ],
      }}
    />
  );

  const renderPriorityChart = (
    <AppCurrentVisits
      title="Tickets by Priority"
      chart={{
        series: [
          { label: 'URGENT', value: dashboardData?.ticketPriorityCount.URGENT },
          { label: 'HIGH', value: dashboardData?.ticketPriorityCount.HIGH },
          { label: 'NORMAL', value: dashboardData?.ticketPriorityCount.NORMAL },
          { label: 'LOW', value: dashboardData?.ticketPriorityCount.LOW },
        ],
        colors: ['#ff0000', '#ffd700', '#00ffff', '#87cefa'],
      }}
    />
  );

  const renderStatusChart = (
    <AppCurrentVisits
      title="Tickets by Status"
      chart={{
        series: [
          { label: 'OPEN', value: dashboardData?.ticketStatusCount.OPEN },
          { label: 'IN PROGRESS', value: dashboardData?.ticketStatusCount.IN_PROGRESS },
          { label: 'TO BE TESTED', value: dashboardData?.ticketStatusCount.TO_BE_TESTED },
          // { label: 'CLOSED', value: dashboardData?.ticketStatusCount.CLOSED },
        ],
      }}
    />
  );

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi {user?.firstName}
        {welcomeBackMsg} 👋
      </Typography>

      {dashboardData && (
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            {loading ? <Skeleton variant="rounded">{renderUrgent}</Skeleton> : renderUrgent}
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            {loading ? <Skeleton variant="rounded">{renderHigh}</Skeleton> : renderHigh}
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            {loading ? (
              <Skeleton variant="rounded">{renderActiveTickets}</Skeleton>
            ) : (
              renderActiveTickets
            )}
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            {loading ? (
              <Skeleton variant="rounded">{renderActiveProjects}</Skeleton>
            ) : (
              renderActiveProjects
            )}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {loading ? <Skeleton variant="rounded">{renderTypeChart}</Skeleton> : renderTypeChart}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {loading ? (
              <Skeleton variant="rounded">{renderPriorityChart}</Skeleton>
            ) : (
              renderPriorityChart
            )}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {loading ? (
              <Skeleton variant="rounded">{renderStatusChart}</Skeleton>
            ) : (
              renderStatusChart
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
