import _ from "lodash";
import { Ticket, TicketPriorityArr } from "src/redux/types";

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
function descendingComparator(a: Ticket, b: Ticket, orderBy: keyof Ticket) {
  if (orderBy !== 'assignee' && a[orderBy] === null) {
    return 1;
  }
  if (orderBy !== 'assignee' && b[orderBy] === null) {
    return -1;
  }
  // case insensitive comparision
  if (orderBy === "title") {
    return -a[orderBy].localeCompare(b[orderBy]);
  }
  if (orderBy === "author") {
    const aName = a.author.firstName + a.author.lastName;
    const bName = b.author.firstName + b.author.lastName;
    return -aName.localeCompare(bName);
  }
  if (orderBy === "assignee") {
    let aName: string, bName: string;
    a.assignee ? aName = a.assignee.firstName + a.assignee.lastName : aName = 'Unassigned'
    b.assignee ? bName = b.assignee.firstName + b.assignee.lastName : bName = 'Unassigned'
    return -aName.localeCompare(bName);
  }
  if (orderBy === 'priority') {
    return TicketPriorityArr.indexOf(a.priority) - TicketPriorityArr.indexOf(b.priority);
  }
  if (orderBy === 'project') {
    return -a[orderBy].name.localeCompare(b[orderBy].name);
  }
  if (orderBy === 'id' || orderBy === 'status' || orderBy === 'createdAt' || orderBy === 'type') {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
  }
  return 0;
}
export function getComparator(order: 'asc' | 'desc', orderBy: keyof Ticket) {
  return order === 'desc'
    ? (a: Ticket, b: Ticket) => descendingComparator(a, b, orderBy)
    : (a: Ticket, b: Ticket) => -descendingComparator(a, b, orderBy);
}

type ApplyFilterProps = {
  inputData: Ticket[],
  comparator: ReturnType<typeof getComparator>
  filterName: string,
}

export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  inputData = _.uniqBy(inputData, 'id');

  const stabilizedThis = inputData.map((value: Ticket, index: number): [Ticket, number] => [value, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (ticket: Ticket) => ticket.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}

export function filterTicketsAssignedToMe(tickets: Ticket[], userId: number | undefined) {
  if (userId) {
    return tickets.filter((ticket) => ticket.assignee?.id === userId);
  }
  return [];
}

export function filterTicketsCreatedByMe(tickets: Ticket[], userId: number | undefined) {
  if (userId) {
    return tickets.filter((ticket) => ticket.author.id === userId);
  }
  return [];
}