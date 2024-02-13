import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

// import { projects } from 'src/_mock/projects';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
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

// ----------------------------------------------------------------------

export default function ProjectsPage() {
  const dispatch = useAppDispatch();

  const projects = useAppSelector(selectProjects);

  const projectsLoading =
    projects.reqStatus.name === 'loadProjects' && projects.reqStatus.status === 'loading';

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const [orderBy, setOrderBy] = useState('createdAt');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedProject, setSelectedProject] = useState<ProjectUpdate | null>(null);

  const [filterData, setFilterData] = useState<FilterData>(defaultFilterData);

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

  const handleSort = (_event: React.MouseEvent<HTMLSpanElement>, id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
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
    e: React.MouseEvent<HTMLButtonElement>
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
                  { id: '' },
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

                  {!noProjects && dataFiltered.length === 0 && !notFound && (
                    <TableEmpty
                      heading="No projects found!"
                      msg="Adjust filters to discover matching projects."
                      colSpan={6}
                    />
                  )}

                  {noProjects && !notFound && (
                    <TableEmpty
                      heading="Your project list is empty."
                      msg="Ready to start something new?"
                      colSpan={6}
                    />
                  )}

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        {dataFiltered.length > 5 && (
          <TablePagination
            page={page}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Card>

      <AlertDialog
        loading={projects.reqStatus.status === 'loading'}
        open={openAlert}
        handleClose={handleAlertClose}
        handleAction={handlePermanentDelete}
        title="Delete project ?"
        message="The project and all tickets under it will be permanently deleted"
      />
    </Container>
  );
}
