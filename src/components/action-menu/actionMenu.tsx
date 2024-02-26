import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  Project,
  ProjectStatus,
  ProjectStatusArr,
  ProjectStatusMap,
  Ticket,
  TicketPriority,
  TicketPriorityArr,
  TicketStatus,
  TicketStatusArr,
  TicketStatusMap,
  TicketType,
  TicketTypeArr,
} from 'src/redux/types';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAndLoadTicket } from 'src/redux/slices/projectsSlice';

type ActionMenuBaseProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

type ActionMenuProps =
  | (ActionMenuBaseProps & {
      ticket: Ticket;
      fieldLoadingObj: {
        priority: boolean;
        status: boolean;
        type: boolean;
      };
      setFieldLoadingObj: React.Dispatch<
        React.SetStateAction<{
          priority: boolean;
          status: boolean;
          type: boolean;
        }>
      >;
      project?: never;
    })
  | (ActionMenuBaseProps & { ticket?: never; project: Project });

export default function ActionMenu(props: ActionMenuProps) {
  const dispatch = useAppDispatch();

  // const [fieldLoading, setFieldLoading] = useState<boolean>(false);
  const field = props.anchorEl?.getAttribute('data-field');
  const menuItems: {
    label: string;
    value: ProjectStatus | TicketPriority | TicketStatus | TicketType;
  }[] = [];

  // const menuItems: { label: string; onClick: React.MouseEventHandler<HTMLLIElement> }[] = [];

  const onSubmit = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    value: ProjectStatus | TicketPriority | TicketStatus | TicketType
  ) => {
    handleClose();
    if (props.ticket) {
      if (field === 'priority') {
        if (value === props.ticket.priority) return;
        props.setFieldLoadingObj({ ...props.fieldLoadingObj, priority: true });
      } else if (field === 'status') {
        if (value === props.ticket.status) return;
        props.setFieldLoadingObj({ ...props.fieldLoadingObj, status: true });
      } else if (field === 'type') {
        if (value === props.ticket.type) return;
        props.setFieldLoadingObj({ ...props.fieldLoadingObj, type: true });
      }
      dispatch(
        updateAndLoadTicket(
          {
            id: props.ticket.id,
            title: props.ticket.title,
            description: props.ticket.description,
            priority: field === 'priority' ? (value as TicketPriority) : props.ticket.priority,
            status: field === 'status' ? (value as TicketStatus) : props.ticket.status,
            type: field === 'type' ? (value as TicketType) : props.ticket.type,
            projectId: props.ticket.project.id,
            assigneeId: props.ticket.assignee ? props.ticket.assignee.id : null,
          },
          () => {
            if (field === 'priority') {
              props.setFieldLoadingObj({ ...props.fieldLoadingObj, priority: false });
            } else if (field === 'status') {
              props.setFieldLoadingObj({ ...props.fieldLoadingObj, status: false });
            } else if (field === 'type') {
              props.setFieldLoadingObj({ ...props.fieldLoadingObj, type: false });
            }
          },
          () => {
            if (field === 'priority') {
              props.setFieldLoadingObj({ ...props.fieldLoadingObj, priority: false });
            } else if (field === 'status') {
              props.setFieldLoadingObj({ ...props.fieldLoadingObj, status: false });
            } else if (field === 'type') {
              props.setFieldLoadingObj({ ...props.fieldLoadingObj, type: false });
            }
          }
        )
      );
    }
  };

  if (props.project && field === 'status') {
    ProjectStatusArr.forEach((status) => {
      menuItems.push({ label: ProjectStatusMap[status], value: status });
    });
  } else if (props.ticket) {
    if (field === 'type') {
      TicketTypeArr.forEach((type) => {
        menuItems.push({ label: type, value: type });
      });
    } else if (field === 'priority') {
      TicketPriorityArr.forEach((prio) => {
        menuItems.push({ label: prio, value: prio });
      });
    } else if (field === 'status') {
      TicketStatusArr.forEach((status) => {
        menuItems.push({ label: TicketStatusMap[status], value: status });
      });
    }
  }

  const handleClose = () => {
    props.setAnchorEl(null);
  };

  // if (anchorEl) {
  //   // handleClose();
  //   setFieldLoading(true);
  // }

  return (
    <Menu
      id="action-menu"
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'action-button',
      }}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.value} onClick={(event) => onSubmit(event, item.value)}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
}
