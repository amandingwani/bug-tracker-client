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
import TicketTableRow from '../tickets-table-row';
import TicketsTableHead from '../tickets-table-head';
import TableEmptyRows from '../table-empty-rows';
import TicketsTableToolbar from '../tickets-table-toolbar';
import ProjectDetails from '../project-details';
import {
  emptyRows,
  applyFilter,
  getComparator,
  filterTicketsAssignedToMe,
  filterTicketsCreatedByMe,
} from '../utils';

import { selectUser } from 'src/redux/slices/authSlice';
import { useAppSelector } from 'src/redux/hooks';
import { Project, Ticket } from 'src/redux/types';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export default function ProjectDetailsPage({ project }: { project: Project }) {
  const user = useAppSelector(selectUser);

  const [filterSelected, setFilterSelected] = useState({ assign: true, created: true });

  const allTickets = project.tickets;

  const ticketsAssignedToMe = filterTicketsAssignedToMe(allTickets, user?.id);
  const ticketsCreatedByMe = filterTicketsCreatedByMe(allTickets, user?.id);

  let ticketsToDisplay: Ticket[] | null = [];

  if (filterSelected.assign && filterSelected.created && ticketsAssignedToMe && ticketsCreatedByMe)
    ticketsToDisplay = ticketsAssignedToMe.concat(ticketsCreatedByMe);
  else if (filterSelected.assign) ticketsToDisplay = ticketsAssignedToMe;
  else if (filterSelected.created) ticketsToDisplay = ticketsCreatedByMe;

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (event.target.name === 'assign') {
      if (checked) {
        ticketsToDisplay = ticketsAssignedToMe;
      } else {
        ticketsToDisplay;
      }
      setFilterSelected({ ...filterSelected, assign: checked });
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

  const dataFiltered = applyFilter({
    inputData: ticketsToDisplay,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <ProjectDetails title="Project Details" project={project} />

      <Card sx={{ mt: 3 }}>
        <TicketsTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterSelected={filterSelected}
          handleCheckboxClick={handleCheckboxClick}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }} stickyHeader>
              <TicketsTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'ID', align: 'center' },
                  { id: 'title', label: 'Title' },
                  { id: 'author', label: 'Author' },
                  { id: 'asignee', label: 'Assignee' },
                  { id: 'status', label: 'Status' },
                  { id: 'type', label: 'Type' },
                  { id: 'priority', label: 'Priority' },
                  { id: 'project', label: 'Project' },
                  { id: 'createdAt', label: 'Created At', minWidth: 120 },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Ticket) => (
                    <TicketTableRow key={row.id} ticket={row} />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, ticketsToDisplay.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {ticketsToDisplay.length > 5 && (
          <TablePagination
            page={page}
            component="div"
            count={ticketsToDisplay!.length}
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
