import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Iconify from 'src/components/iconify';

import ProjectDetails from '../project-details';

import { Project } from 'src/redux/types';

import { TicketsView } from 'src/sections/tickets/view';
import { UsersView } from 'src/sections/users/view';
import { useAppSelector } from 'src/redux/hooks';
import { selectReqStatus } from 'src/redux/slices/projectsSlice';
import { RouterLink } from 'src/routes/components';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';

// ----------------------------------------------------------------------

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProjectDetailsPage({ project }: { project?: Project }) {
  const reqStatus = useAppSelector(selectReqStatus);

  const [tabValue, setTabValue] = useState(2);

  const breadcrumbs = [
    <Link
      component={RouterLink}
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: 1,
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.16),
        },
      }}
    >
      <Iconify icon="ic:round-home" />
    </Link>,
    <Link component={RouterLink} underline="hover" key="2" color="inherit" href="/projects">
      Projects
    </Link>,
    <Typography
      key="2"
      color="text.primary"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: '1',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {project?.name}
    </Typography>,
  ];

  const loading = reqStatus.name === 'loadProjects' && reqStatus.status === 'loading';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {breadcrumbs}
      </Breadcrumbs>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Users" {...a11yProps(1)} />
          <Tab label="Tickets" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabValue} index={0}>
        {loading ? (
          <Skeleton variant="rounded" height={450} sx={{ mt: 4 }}></Skeleton>
        ) : (
          <ProjectDetails project={project} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        {loading ? (
          <Skeleton variant="rounded" height={450} sx={{ mt: 4 }}></Skeleton>
        ) : (
          project && <UsersView project={project} />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <TicketsView project={project} sx={{ mt: 4 }} projectView={true} />
      </CustomTabPanel>
    </Container>
  );
}
