import { useState } from 'react';

import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import Scrollbar from 'src/components/scrollbar';

import ProjectTableRow from '../project-table-row';
import ProjectsTableHead from '../projects-table-head';
import TableEmptyRows from '../table-empty-rows';
import ProjectsTableToolbar from '../projects-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import { selectProjects, deleteProjectThunk } from 'src/redux/slices/projectsSlice';
import { useAppSelector, useAppDispatch } from 'src/redux/hooks';
import { Project, ProjectUpdate } from 'src/redux/types';

import AlertDialog from 'src/components/alertDialog';
import CreateOrEditProject from '../createOrEditProject';
import TableRowsLoader from '../table-rows-loader';
import { FilterData, defaultFilterData } from '../types';
import { RouterLink } from 'src/routes/components';
import Iconify from 'src/components/iconify';
import TableEmpty from 'src/components/table-empty';
import TablePaginationCustom from 'src/components/table-pagination-custom';

// ----------------------------------------------------------------------

interface ProjectsPageProps {
  filter?: string | null;
}

export default function ProjectsPage(props: ProjectsPageProps) {
  const dispatch = useAppDispatch();

  const projects = useAppSelector(selectProjects);

  const projectsLoading =
    projects.reqStatus.name === 'loadProjects' && projects.reqStatus.status === 'loading';

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const [orderBy, setOrderBy] = useState<keyof Project>('createdAt');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedProject, setSelectedProject] = useState<ProjectUpdate | null>(null);

  const projectsPageFilter: FilterData = {
    ...defaultFilterData,
    status: {
      OPEN: true,
      IN_PROGRESS: true,
      ON_HOLD: true,
      COMPLETED: true,
      CANCELED: true,
      TESTING: true,
      DEPLOYED: true,
    },
  };

  if (props.filter === 'active') {
    projectsPageFilter.status = {
      OPEN: true,
      IN_PROGRESS: true,
      ON_HOLD: false,
      COMPLETED: false,
      CANCELED: false,
      TESTING: true,
      DEPLOYED: true,
    };
  }

  const [filterData, setFilterData] = useState<FilterData>(projectsPageFilter);

  const [openAlert, setOpenAlert] = useState(false);

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
    <Typography key="2" color="text.primary">
      Projects
    </Typography>,
  ];

  const handlePermanentDelete = async () => {
    if (selectedProject) {
      dispatch(deleteProjectThunk(selectedProject.id, () => handleAlertClose()));
    }
  };

  const handleAlertClickOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
    setSelectedProject(null);
  };

  let projectsToDisplay: Project[] = [];

  const noProjects = projects.createdProjects.length + projects.otherProjects.length === 0;

  // owner filter
  if (filterData.owner === 'All')
    projectsToDisplay = [...projects.createdProjects, ...projects.otherProjects];
  else if (filterData.owner === 'Other users') projectsToDisplay = projects.otherProjects;
  else projectsToDisplay = projects.createdProjects;

  // status filter
  projectsToDisplay = projectsToDisplay.filter((p) => filterData.status[p.status]);

  const handleSort = (_event: React.MouseEvent<HTMLSpanElement>, id: keyof Project) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const onNewProjectClick: React.MouseEventHandler<HTMLButtonElement> = (
    _e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedProject(null);
  };

  const dataFiltered = applyFilter({
    inputData: projectsToDisplay,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  let mainContent = (
    <Scrollbar>
      <TableContainer sx={{ overflow: 'unset' }}>
        <Table sx={{ minWidth: 600 }}>
          <ProjectsTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleSort}
            headLabel={[
              { id: 'name', label: 'Project Name' },
              { id: 'owner', label: 'Owner' },
              { id: 'status', label: 'Status' },
              { id: 'createdAt', label: 'Created On', minWidth: 120 },
              { id: '', align: 'right', noSort: true },
            ]}
          />
          {projectsLoading ? (
            <TableBody>
              <TableRowsLoader rowsNum={5} />
            </TableBody>
          ) : (
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Project) => (
                  <ProjectTableRow
                    key={row.id}
                    project={row}
                    setOpenDrawer={setOpenDrawer}
                    setSelectedProject={setSelectedProject}
                    handleAlertClickOpen={handleAlertClickOpen}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
              />
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Scrollbar>
  );

  let divider = false;
  if (!projectsLoading) {
    if (notFound) {
      mainContent = <TableEmpty query={filterName} />;
      divider = true;
    } else {
      if (noProjects) {
        mainContent = (
          <TableEmpty heading="Your project list is empty." msg="Ready to start something new?" />
        );
        divider = true;
      } else {
        if (dataFiltered.length === 0) {
          mainContent = (
            <TableEmpty
              heading="No projects found!"
              msg="Adjust filters to discover matching projects."
            />
          );
          divider = true;
        }
      }
    }
  }

  return (
    <Container maxWidth="xl">
      <CreateOrEditProject
        openDrawer={openDrawer}
        onCloseDrawer={onCloseDrawer}
        selectedProject={selectedProject}
      />

      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {breadcrumbs}
      </Breadcrumbs>

      <Card sx={{ mt: 2 }}>
        <ProjectsTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          onNewProjectClick={onNewProjectClick}
          filterData={filterData}
          setFilterData={setFilterData}
        />

        {divider && <Divider variant="middle" />}
        {mainContent}

        {dataFiltered.length > 5 && (
          <TablePaginationCustom
            page={page}
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Card>

      <AlertDialog
        loading={projects.reqStatus.status === 'loading'}
        open={openAlert}
        handleClose={handleAlertClose}
        handleAction={handlePermanentDelete}
        title="Delete project?"
        message="The project and all tickets under it will be permanently deleted"
      />
    </Container>
  );
}
