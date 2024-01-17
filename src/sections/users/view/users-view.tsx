import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { projects } from 'src/_mock/projects';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UsersTableRow from '../users-table-row';
import UsersTableHead from '../users-table-head';
import TableEmptyRows from '../table-empty-rows';
import UsersTableToolbar from '../users-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

import {
  removeContributorThunk,
  selectReqStatus,
  selectError,
  setReqStatus,
} from 'src/redux/slices/projectsSlice';
import { selectUser } from 'src/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Project, Contributor } from 'src/redux/types';

import AlertDialog from 'src/components/alertDialog';
import AddUser from '../addUser';
import { updateAndShowNotification } from 'src/redux/slices/notificationSlice';

// ----------------------------------------------------------------------

interface Props {
  project: Project;
}

export default function UsersTable(props: Props) {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const reqStatus = useAppSelector(selectReqStatus);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedUser, setSelectedUser] = useState<Contributor | null>(null);

  const [openAlert, setOpenAlert] = useState(false);

  let users: Contributor[] = [];
  if (user) {
    // if user is not owner of project (therefore, already in contributors), then just add the owner
    if (user.id !== props.project.owner.id) {
      users = props.project.contributors.concat(props.project.owner);
    }
    // else user is owner of project, add user to contributors
    else {
      users = props.project.contributors.concat({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        registered: true,
        email: user.email,
      });
    }
  }

  const handleRemoveContributor = async () => {
    if (selectedUser) {
      dispatch(
        removeContributorThunk({ id: props.project.id, email: selectedUser.email }, () => {
          handleAlertClose();
          dispatch(updateAndShowNotification({ severity: 'success', message: 'User removed!' }));
        })
      );
    }
  };

  const handleAlertClickOpen = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenAlert(false);
    setSelectedUser(null);
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

  const onAddUserClick: React.MouseEventHandler<HTMLButtonElement> = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedUser(null);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Card sx={{ mt: 4 }}>
      <AddUser openDrawer={openDrawer} onCloseDrawer={onCloseDrawer} projectId={props.project.id} />

      <Card>
        <UsersTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          onAddUserClick={user?.id === props.project.owner.id ? onAddUserClick : undefined}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 600 }}>
              <UsersTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'User Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Contributor) => (
                    <UsersTableRow
                      key={row.id}
                      user={row}
                      actionAllowed={user!.id === props.project.owner.id && user!.id !== row.id}
                      setOpenDrawer={setOpenDrawer}
                      setSelectedUser={setSelectedUser}
                      handleAlertClickOpen={handleAlertClickOpen}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
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
        loading={reqStatus.status === 'loading'}
        open={openAlert}
        handleClose={handleAlertClose}
        handleAction={handleRemoveContributor}
        title="Remove user from this project?"
        message=""
      />
    </Card>
  );
}
