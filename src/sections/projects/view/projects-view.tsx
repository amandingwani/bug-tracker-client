import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { projects } from 'src/_mock/projects';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import ProjectTableRow from '../project-table-row';
import ProjectsTableHead from '../projects-table-head';
import TableEmptyRows from '../table-empty-rows';
import ProjectsTableToolbar from '../projects-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import { selectProjects } from 'src/redux/slices/projectsSlice';
import { useAppSelector } from 'src/redux/hooks';
import { Project, ProjectCreateInput, ProjectUpdate } from 'src/redux/types';
import CreateOrEditProject from '../createOrEditProject';

// ----------------------------------------------------------------------

export default function ProjectsPage() {
  const projects = useAppSelector(selectProjects);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedProject, setSelectedProject] = useState<ProjectUpdate | null>(null);

  const [filterSelected, setFilterSelected] = useState({ other: true, created: true });

  let projectsToDisplay: Project[] = [];

  if (filterSelected.other && filterSelected.created)
    projectsToDisplay = [...projects.createdProjects, ...projects.otherProjects];
  else if (filterSelected.other) projectsToDisplay = projects.otherProjects;
  else if (filterSelected.created) projectsToDisplay = projects.createdProjects;

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (event.target.name === 'other') {
      setFilterSelected({ ...filterSelected, other: checked });
    } else if (event.target.name === 'created')
      setFilterSelected({ ...filterSelected, created: checked });
  };

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
    <Container>
      <CreateOrEditProject
        openDrawer={openDrawer}
        onCloseDrawer={onCloseDrawer}
        selectedProject={selectedProject}
      />

      <Card>
        <ProjectsTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          onNewProjectClick={onNewProjectClick}
          filterSelected={filterSelected}
          handleCheckboxClick={handleCheckboxClick}
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
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Project) => (
                    <ProjectTableRow
                      key={row.id}
                      project={row}
                      setOpenDrawer={setOpenDrawer}
                      setSelectedProject={setSelectedProject}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, projectsToDisplay.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {projectsToDisplay.length > 5 && (
          <TablePagination
            page={page}
            component="div"
            count={projectsToDisplay.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Card>
    </Container>
  );
}
