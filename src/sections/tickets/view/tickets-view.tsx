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
import ProjectTableRow from '../tickets-table-row';
import ProjectsTableHead from '../tickets-table-head';
import TableEmptyRows from '../table-empty-rows';
import ProjectsTableToolbar from '../tickets-table-toolbar';
import { emptyRows, applyFilter, getComparator, filterTicketsAssignedToMe } from '../utils';

import { selectProjects } from 'src/redux/slices/projectsSlice';
import { selectUser } from 'src/redux/slices/authSlice';
import { useAppSelector } from 'src/redux/hooks';
import { Ticket } from 'src/redux/types';

// ----------------------------------------------------------------------

export default function ProjectsPage() {
  const projects = useAppSelector(selectProjects);
  const user = useAppSelector(selectUser);

  const allProjects = [...projects.createdProjects, ...projects.otherProjects];

  const allTickets = allProjects.map((project) => [...project.tickets]).flat();

  const ticketAssignedToMe = filterTicketsAssignedToMe(allTickets, user?.id);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const dataFiltered = applyFilter({
    inputData: ticketAssignedToMe,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Card>
        <ProjectsTableToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }} stickyHeader>
              <ProjectsTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'ID', align: 'center' },
                  { id: 'title', label: 'Title' },
                  { id: 'project', label: 'Project' },
                  { id: 'author', label: 'Author' },
                  { id: 'asignee', label: 'Assignee' },
                  { id: 'status', label: 'Status' },
                  { id: 'type', label: 'Type' },
                  { id: 'priority', label: 'Priority' },
                  { id: 'createdAt', label: 'Created At' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Ticket) => (
                    <ProjectTableRow key={row.id} ticket={row} />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, allProjects.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {allProjects.length > 5 && (
          <TablePagination
            page={page}
            component="div"
            count={allProjects.length}
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
