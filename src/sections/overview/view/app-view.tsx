import { lazy, Suspense } from 'react';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useResponsive } from 'src/hooks/use-responsive';

const AppCurrentVisits = lazy(() => import('../app-current-visits'));
import AppWidgetSummary from '../app-widget-summary';

import { useAppSelector } from 'src/redux/hooks';
import { selectUser, selectWelcomeBackMsg } from 'src/redux/slices/authSlice';
import { selectProjects } from 'src/redux/slices/projectsSlice';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { getDashboardData, type DashboardData } from '../utils';
import {
  getTicketPriorityLabelColor,
  getTicketStatusLabelColor,
  getTicketTypeLabelColor,
} from 'src/utils/getColor';

// ----------------------------------------------------------------------

export default function AppView() {
  const theme = useTheme();
  const isXs = useResponsive('only', 'xs');
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
      color={alpha('#ff0000', 0.15)}
      icon={<Iconify icon="tabler:urgent" width={50} />}
      href="/tickets?filter=urgent"
    />
  );

  const renderHigh = (
    <AppWidgetSummary
      title="High Priority Tickets"
      total={dashboardData?.ticketPriorityCount.HIGH}
      color={alpha('#FFF5CC', 0.7)}
      icon={<Iconify icon="iconoir:priority-high" width={48} />}
      href="/tickets?filter=high"
    />
  );

  const icon = (name: string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 44, height: 44 }} />
  );

  const renderActiveTickets = (
    <AppWidgetSummary
      title="Active Tickets"
      total={dashboardData?.activeTickets}
      color={alpha('#CAFDF5', 0.7)}
      icon={icon('ic_tickets')}
      href="/tickets"
    />
  );

  const renderActiveProjects = (
    <AppWidgetSummary
      title="Active Projects"
      total={dashboardData?.activeProjects}
      color={alpha('#EFD6FF', 0.7)}
      icon={icon('ic_projects')}
      href="/projects?filter=active"
    />
  );

  const appChartSkeleton = <Skeleton variant="rounded" height={492}></Skeleton>;

  const renderTypeChart = (
    <Suspense fallback={appChartSkeleton}>
      <AppCurrentVisits
        title="Tickets by Type"
        chart={{
          series: [
            { label: 'BUG', value: dashboardData?.ticketTypeCount.BUG },
            { label: 'TASK', value: dashboardData?.ticketTypeCount.TASK },
          ],
          colors: [
            alpha(theme.palette[getTicketTypeLabelColor('BUG')].main, 0.9),
            alpha(theme.palette[getTicketTypeLabelColor('TASK')].main, 0.9),
          ],
        }}
      />
    </Suspense>
  );

  const renderPriorityChart = (
    <Suspense fallback={appChartSkeleton}>
      <AppCurrentVisits
        title="Tickets by Priority"
        chart={{
          series: [
            { label: 'URGENT', value: dashboardData?.ticketPriorityCount.URGENT },
            { label: 'HIGH', value: dashboardData?.ticketPriorityCount.HIGH },
            { label: 'NORMAL', value: dashboardData?.ticketPriorityCount.NORMAL },
            { label: 'LOW', value: dashboardData?.ticketPriorityCount.LOW },
          ],
          colors: [
            alpha(theme.palette[getTicketPriorityLabelColor('URGENT')].main, 0.9),
            alpha(theme.palette[getTicketPriorityLabelColor('HIGH')].main, 0.9),
            alpha(theme.palette[getTicketPriorityLabelColor('NORMAL')].main, 0.9),
            alpha(theme.palette[getTicketPriorityLabelColor('LOW')].main, 0.9),
          ],
        }}
      />
    </Suspense>
  );

  const renderStatusChart = (
    <Suspense fallback={appChartSkeleton}>
      <AppCurrentVisits
        title="Tickets by Status"
        chart={{
          series: [
            { label: 'OPEN', value: dashboardData?.ticketStatusCount.OPEN },
            { label: 'IN PROGRESS', value: dashboardData?.ticketStatusCount.IN_PROGRESS },
            { label: 'TO BE TESTED', value: dashboardData?.ticketStatusCount.TO_BE_TESTED },
            // { label: 'CLOSED', value: dashboardData?.ticketStatusCount.CLOSED },
          ],
          colors: [
            alpha(theme.palette[getTicketStatusLabelColor('OPEN')].main, 0.9),
            alpha(theme.palette[getTicketStatusLabelColor('IN_PROGRESS')].main, 0.9),
            alpha(theme.palette[getTicketStatusLabelColor('TO_BE_TESTED')].main, 0.9),
          ],
        }}
      />
    </Suspense>
  );

  const appWidgetSkeleton = <Skeleton variant="rounded" height={isXs ? 100 : 164}></Skeleton>;

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
