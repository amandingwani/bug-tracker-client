import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
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
import TableRowsLoader from '../table-rows-loader';
import {
  emptyRows,
  applyFilter,
  getComparator,
  filterTicketsAssignedToMe,
  filterTicketsCreatedByMe,
} from '../utils';

import { selectProjects, deleteTicketThunk } from 'src/redux/slices/projectsSlice';
import { selectUser } from 'src/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Project, Ticket } from 'src/redux/types';

import AlertDialog from 'src/components/alertDialog';
import CreateOrEditTicket from '../createOrEditTicket';
import { FilterData, defaultFilterData } from '../types';
import { SxProps, Theme } from '@mui/material/styles';
import TableEmpty from 'src/components/table-empty';

// ----------------------------------------------------------------------

interface TicketsPageProps {
  project?: Project;
  sx?: SxProps<Theme>;
}

export default function TicketsPage(props: TicketsPageProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const projects = useAppSelector(selectProjects);

  const projectsLoading =
    projects.reqStatus.name === 'loadProjects' && projects.reqStatus.status === 'loading';

  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>(undefined);

  const [filterData, setFilterData] = useState<FilterData>(
    props.project ? { ...defaultFilterData, assignee: 'All' } : defaultFilterData
  );

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const [orderBy, setOrderBy] = useState('createdAt');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setOpenAlert] = useState(false);

  const afterSuccessfulTicketDelete = () => {
    handleAlertClose();
  };

  const handlePermanentDelete = async () => {
    if (selectedTicket) {
      dispatch(
        deleteTicketThunk(
          { id: selectedTicket.id, project: { id: selectedTicket.project.id } },
          afterSuccessfulTicketDelete
        )
      );
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

  const noTickets = allTickets.length === 0;

  // const ticketsAssignedToMe: Ticket[] = filterTicketsAssignedToMe(allTickets, user?.id);
  // const ticketsCreatedByMe: Ticket[] = filterTicketsCreatedByMe(allTickets, user?.id);

  let ticketsToDisplay: Ticket[] = [];

  if (user) {
    ticketsToDisplay = allTickets.filter((t) => {
      let filterBool =
        filterData.status[t.status] && filterData.type[t.type] && filterData.priority[t.priority];

      if (filterData.author === 'Me' && t.author.id !== user.id) filterBool = false;
      else if (filterData.author === 'Other users' && t.author.id === user.id) filterBool = false;

      if (filterData.assignee === 'Me' && t.assignee?.id !== user.id) filterBool = false;
      else if (
        filterData.assignee === 'Other users' &&
        (t.assignee === null || t.assignee?.id === user.id)
      ) {
        filterBool = false;
      } else if (filterData.assignee === 'Unassigned' && t.assignee) filterBool = false;

      return filterBool;
    });
  }

  const dataFiltered = applyFilter({
    inputData: ticketsToDisplay,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Card sx={props.sx}>
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
          filterData={filterData}
          setFilterData={setFilterData}
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
                  { id: 'createdAt', label: 'Created On', minWidth: 120 },
                  { id: '', align: 'right' },
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
                    emptyRows={emptyRows(page, rowsPerPage, dataFiltered.length)}
                  />

                  {!noTickets && dataFiltered.length === 0 && !notFound && (
                    <TableEmpty
                      heading="No tickets found."
                      msg="Adjust filters to discover matching tickets or check back later."
                      colSpan={10}
                    />
                  )}

                  {noTickets && !notFound && (
                    <TableEmpty
                      heading="Great news! No pending tickets at the moment."
                      msg="Start by creating new tickets or check back later."
                      colSpan={10}
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
        title="Delete ticket ?"
        message="Ticket will be permanently deleted."
      />
    </Card>
  );
}
