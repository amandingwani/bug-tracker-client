import { useEffect, useState } from 'react';

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
import {
  emptyRows,
  applyFilter,
  getComparator,
  filterTicketsAssignedToMe,
  filterTicketsCreatedByMe,
} from '../utils';

import { selectProjects, deleteTicket } from 'src/redux/slices/projectsSlice';
import { selectUser } from 'src/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Project, Ticket } from 'src/redux/types';

import AlertDialog from 'src/components/alertDialog';
import CreateOrEditTicket from '../createOrEditTicket';

// ----------------------------------------------------------------------

interface TicketsPageProps {
  filterSelected?: { assign: boolean; created: boolean };
  project?: Project;
}

export default function TicketsPage(props: TicketsPageProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const projects = useAppSelector(selectProjects);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);

  const [filterSelected, setFilterSelected] = useState(
    props.filterSelected ?? { assign: true, created: false }
  );

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [orderBy, setOrderBy] = useState('title');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (projects.status === 'succeeded') {
      handleAlertClose();
    }
    return () => {
      console.log('Tickets-view unmounting');
    };
  }, [projects.status]);

  const handlePermanentDelete = async () => {
    if (selectedTicket) {
      dispatch(deleteTicket(selectedTicket.id));
    }
  };

  const handleAlertClickOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
    setSelectedTicket(undefined);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedTicket(undefined);
  };

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (event.target.name === 'assign') {
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

  const onNewTicketClick: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenDrawer(true);
  };

  let allTickets: Ticket[] = [];

  if (props.project?.tickets) {
    allTickets = props.project.tickets;
  } else {
    const allProjects = [...projects.createdProjects, ...projects.otherProjects];
    allTickets = allProjects.map((project) => [...project.tickets]).flat();
  }

  const ticketsAssignedToMe: Ticket[] = filterTicketsAssignedToMe(allTickets, user?.id);
  const ticketsCreatedByMe: Ticket[] = filterTicketsCreatedByMe(allTickets, user?.id);

  let ticketsToDisplay: Ticket[] = [];

  if (filterSelected.assign && filterSelected.created && ticketsAssignedToMe && ticketsCreatedByMe)
    ticketsToDisplay = ticketsAssignedToMe.concat(ticketsCreatedByMe);
  else if (filterSelected.assign) ticketsToDisplay = ticketsAssignedToMe;
  else if (filterSelected.created) ticketsToDisplay = ticketsCreatedByMe;

  const dataFiltered = applyFilter({
    inputData: ticketsToDisplay,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Card>
      <CreateOrEditTicket
        openDrawer={openDrawer}
        onCloseDrawer={onCloseDrawer}
        project={props.project}
        selectedTicket={selectedTicket}
      />

      <Card>
        <TicketsTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterSelected={filterSelected}
          handleCheckboxClick={handleCheckboxClick}
          onNewTicketClick={onNewTicketClick}
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
                  { id: 'assignee', label: 'Assignee' },
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
                    <TicketTableRow
                      key={row.id}
                      ticket={row}
                      setOpenDrawer={setOpenDrawer}
                      setSelectedTicket={setSelectedTicket}
                      handleAlertClickOpen={handleAlertClickOpen}
                    />
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
            count={ticketsToDisplay.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Card>

      <AlertDialog
        loading={projects.status === 'loading'}
        open={openAlert}
        handleClose={handleAlertClose}
        handleAction={handlePermanentDelete}
        title="Delete ticket ?"
        message="Ticket will be permanently deleted."
      />
    </Card>
  );
}
