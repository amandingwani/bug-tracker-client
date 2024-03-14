export const OWNER_OPTIONS = ['All', 'Me', 'Other users'] as const;
export type OwnerOptions = (typeof OWNER_OPTIONS)[number];

export const ASSIGNEE_OPTIONS = ['All', 'Me', 'Other users', 'Unassigned'] as const;
export type AssigneeOptions = (typeof ASSIGNEE_OPTIONS)[number];

export type StatusFilter = {
  OPEN: boolean;
  IN_PROGRESS: boolean;
  TO_BE_TESTED: boolean;
  CLOSED: boolean;
};

export type TypeFilter = {
  BUG: boolean;
  TASK: boolean;
};

export type PriorityFilter = {
  URGENT: boolean;
  HIGH: boolean;
  NORMAL: boolean;
  LOW: boolean;
};

export type FilterData = {
  author: OwnerOptions;
  assignee: AssigneeOptions;
  status: StatusFilter;
  type: TypeFilter;
  priority: PriorityFilter;
};

export const defaultFilterData: FilterData = {
  author: 'All',
  assignee: 'Me',
  status: {
    OPEN: true,
    CLOSED: false,
    IN_PROGRESS: true,
    TO_BE_TESTED: true,
  },
  type: {
    BUG: true,
    TASK: true,
  },
  priority: {
    URGENT: true,
    HIGH: true,
    NORMAL: true,
    LOW: true,
  },
};
