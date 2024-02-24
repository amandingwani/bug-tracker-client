import { Project } from "src/redux/types";

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
function descendingComparator(a: Project, b: Project, orderBy: keyof Project) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (orderBy === "name") {
    return -a[orderBy].localeCompare(b[orderBy]);
  }
  if (orderBy === "owner") {
    const aName = a.owner.firstName + a.owner.lastName;
    const bName = b.owner.firstName + b.owner.lastName;
    return -aName.localeCompare(bName);
  }
  if (orderBy === 'status' || orderBy === 'createdAt') {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
}
export function getComparator(order: 'asc' | 'desc', orderBy: keyof Project) {
  return order === 'desc'
    ? (a: Project, b: Project) => descendingComparator(a, b, orderBy)
    : (a: Project, b: Project) => -descendingComparator(a, b, orderBy);
}

type ApplyFilterProps = {
  inputData: Project[],
  comparator: ReturnType<typeof getComparator>
  filterName: string,
}

export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps): Project[] {
  const stabilizedThis = inputData.map((value: Project, index: number): [Project, number] => [value, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (project) => project.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
