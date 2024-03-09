import { Contributor } from 'src/redux/types';

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// descending comparator: a < b => +1 , a > b => -1
function descendingComparator(a: Contributor, b: Contributor, orderBy: keyof Contributor | 'name') {
  if (orderBy === 'name') {
    const aName = a.firstName + a.lastName;
    const bName = b.firstName + b.lastName;
    return -aName.localeCompare(bName);
  } else {
    if (a[orderBy] === null) {
      return 1;
    }
    if (b[orderBy] === null) {
      return -1;
    }
    if (orderBy === 'email') {
      return -a[orderBy].localeCompare(b[orderBy]);
    }
    if (orderBy === 'registered') {
      if (b[orderBy] < a[orderBy]) {
        return 1;
      }
      if (b[orderBy] > a[orderBy]) {
        return -1;
      }
    }
  }
  return 0;
}
export function getComparator(order: 'asc' | 'desc', orderBy: string) {
  return order === 'desc'
    ? (a: Contributor, b: Contributor) => descendingComparator(a, b, orderBy)
    : (a: Contributor, b: Contributor) => -descendingComparator(a, b, orderBy);
}

type ApplyFilterProps = {
  inputData: Contributor[];
  comparator: ReturnType<typeof getComparator>;
  filterName: string;
};

export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  const stabilizedThis = inputData.map(
    (value: Contributor, index: number): [Contributor, number] => [value, index]
  );

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user: Contributor) =>
        (user.lastName ? user.firstName + ' ' + user.lastName : user.firstName)
          .toLowerCase()
          .indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}

export const isEmailDomainAllowed = (email: string) => {
  const allowedDomains = ['gmail.com'];
  const [, domain] = email.split('@');
  return allowedDomains.includes(domain);
};
