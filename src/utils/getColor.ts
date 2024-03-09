import { LabelColor } from 'src/components/label/labelSubTypes';
import { ProjectStatus, TicketPriority, TicketStatus, TicketType } from 'src/redux/types';

export const getTicketTypeLabelColor = (type: TicketType) => {
  let typeLabelColor: LabelColor;
  switch (type) {
    case 'BUG':
      typeLabelColor = 'error';
      break;
    case 'TASK':
      typeLabelColor = 'success';
      break;

    default:
      typeLabelColor = 'success';
      break;
  }
  return typeLabelColor;
};

export const getTicketStatusLabelColor = (status: TicketStatus) => {
  let statusLabelColor: LabelColor;
  switch (status) {
    case 'OPEN':
      statusLabelColor = 'warning';
      break;
    case 'IN_PROGRESS':
      statusLabelColor = 'info';
      break;
    case 'TO_BE_TESTED':
      statusLabelColor = 'secondary';
      break;
    case 'CLOSED':
      statusLabelColor = 'success';
      break;

    default:
      statusLabelColor = 'info';
      break;
  }
  return statusLabelColor;
};

export const getTicketPriorityLabelColor = (priority: TicketPriority) => {
  let priorityLabelColor: LabelColor;
  switch (priority) {
    case 'HIGH':
      priorityLabelColor = 'warning';
      break;
    case 'URGENT':
      priorityLabelColor = 'error';
      break;
    case 'NORMAL':
      priorityLabelColor = 'info';
      break;
    case 'LOW':
      priorityLabelColor = 'success';
      break;

    default:
      priorityLabelColor = 'info';
      break;
  }
  return priorityLabelColor;
};

export const getProjectStatusLabelColor = (status: ProjectStatus) => {
  let statusLabelColor: LabelColor;
  switch (status) {
    case 'OPEN':
      statusLabelColor = 'success';
      break;
    case 'IN_PROGRESS':
      statusLabelColor = 'info';
      break;
    case 'ON_HOLD':
      statusLabelColor = 'warning';
      break;
    case 'COMPLETED':
      statusLabelColor = 'success';
      break;
    case 'CANCELED':
      statusLabelColor = 'error';
      break;
    case 'TESTING':
      statusLabelColor = 'secondary';
      break;
    case 'DEPLOYED':
      statusLabelColor = 'primary';
      break;

    default:
      statusLabelColor = 'default';
      break;
  }
  return statusLabelColor;
};
