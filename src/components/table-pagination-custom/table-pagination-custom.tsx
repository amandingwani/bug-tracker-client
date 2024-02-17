import TablePagination from '@mui/material/TablePagination';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function TablePaginationCustom(props: {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) {
  const isXs = useResponsive('only', 'xs');

  return (
    <TablePagination
      page={props.page}
      component="div"
      count={props.count}
      rowsPerPage={props.rowsPerPage}
      onPageChange={props.onPageChange}
      rowsPerPageOptions={[5, 10, 25]}
      onRowsPerPageChange={props.onRowsPerPageChange}
      labelRowsPerPage={isXs ? 'Rows:' : 'Rows per page:'}
    />
  );
}
