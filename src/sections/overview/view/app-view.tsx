import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';

import { useAppSelector } from 'src/redux/hooks';
import { selectUser, selectWelcomeBackMsg } from 'src/redux/slices/authSlice';
import { selectProjects } from 'src/redux/slices/projectsSlice';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
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
      icon={<Iconify icon="tabler:urgent" width={50} />}
    />
  );

  const renderHigh = (
    <AppWidgetSummary
      title="High Priority Tickets"
      total={dashboardData?.ticketPriorityCount.HIGH}
      color="warning"
      icon={<Iconify icon="iconoir:priority-high" width={48} />}
    />
  );

  const icon = (name: string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 44, height: 44 }} />
  );

  const renderActiveTickets = (
    <AppWidgetSummary
      title="Active Tickets"
      total={dashboardData?.activeTickets}
      color="warning"
      icon={icon('ic_tickets')}
    />
  );

  const renderActiveProjects = (
    <AppWidgetSummary
      title="Active Projects"
      total={dashboardData?.activeProjects}
      color="primary"
      icon={icon('ic_projects')}
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

  const appWidgetSkeleton = <Skeleton variant="rounded" height={164}></Skeleton>;
  const appChartSkeleton = <Skeleton variant="rounded" height={492}></Skeleton>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi {user?.firstName}
        {welcomeBackMsg} 👋
      </Typography>

      {dashboardData && (
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            {loading ? appWidgetSkeleton : renderUrgent}
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            {loading ? appWidgetSkeleton : renderHigh}
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            {loading ? appWidgetSkeleton : renderActiveTickets}
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            {loading ? appWidgetSkeleton : renderActiveProjects}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {loading ? appChartSkeleton : renderTypeChart}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {loading ? appChartSkeleton : renderPriorityChart}
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            {loading ? appChartSkeleton : renderStatusChart}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
