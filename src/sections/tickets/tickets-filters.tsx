import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import _ from 'lodash';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ColorPicker } from 'src/components/color-utils';
import {
  TicketPriorityArr,
  TicketStatusArr,
  TicketStatusMap,
  TicketTypeArr,
} from 'src/redux/types';
import { FilterData, OWNER_OPTIONS, ASSIGNEE_OPTIONS, defaultFilterData } from './types';

// ----------------------------------------------------------------------

interface TicketsFiltersProps {
  openFilter: boolean;
  onOpenFilter?: React.MouseEventHandler<HTMLButtonElement>;
  onCloseFilter: () => void;
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
}

export default function TicketsFilters({
  openFilter,
  onOpenFilter,
  onCloseFilter,
  filterData,
  setFilterData,
}: TicketsFiltersProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    reset,
    control,
  } = useForm<FilterData>({ defaultValues: filterData });

  const onSubmit: SubmitHandler<FilterData> = (data) => {
    setFilterData(data);
    // console.log(data);
  };

  const renderAuthor = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Author</Typography>
      <Controller
        render={({ field }) => (
          <RadioGroup aria-label="author" {...field}>
            {OWNER_OPTIONS.map((item) => (
              <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        )}
        name="author"
        control={control}
      />
    </Stack>
  );

  const renderAssignee = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Assignee</Typography>
      <Controller
        render={({ field }) => (
          <RadioGroup aria-label="assignee" {...field}>
            {ASSIGNEE_OPTIONS.map((item) => (
              <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        )}
        name="assignee"
        control={control}
      />
    </Stack>
  );

  const renderStatus = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Status</Typography>

      <FormGroup aria-label="status">
        {TicketStatusArr.map((item) => (
          <Controller
            key={item}
            render={({ field }) => (
              <FormControlLabel
                key={item}
                control={<Checkbox {...field} checked={field.value} />}
                label={_.capitalize(TicketStatusMap[item])}
              />
            )}
            name={
              ('status.' + item) as
                | 'status.OPEN'
                | 'status.IN_PROGRESS'
                | 'status.TO_BE_TESTED'
                | 'status.CLOSED'
            }
            control={control}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderType = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Type</Typography>

      <FormGroup aria-label="type">
        {TicketTypeArr.map((item) => (
          <Controller
            key={item}
            render={({ field }) => (
              <FormControlLabel
                key={item}
                control={<Checkbox {...field} checked={field.value} />}
                label={_.capitalize(item)}
              />
            )}
            name={('type.' + item) as 'type.BUG' | 'type.TASK'}
            control={control}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  const renderPriority = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Priority</Typography>

      <FormGroup aria-label="priority">
        {TicketPriorityArr.map((item) => (
          <Controller
            key={item}
            render={({ field }) => (
              <FormControlLabel
                key={item}
                control={<Checkbox {...field} checked={field.value} />}
                label={_.capitalize(item)}
              />
            )}
            name={
              ('priority.' + item) as
                | 'priority.URGENT'
                | 'priority.HIGH'
                | 'priority.NORMAL'
                | 'priority.LOW'
            }
            control={control}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: {
            width: '400px',
            maxWidth: '80%',
          },
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 1, py: 2 }}
          >
            <Typography variant="h4" align="center" p={'10px'}>
              Filters
            </Typography>
            <IconButton onClick={onCloseFilter}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Stack>

          <Divider />

          <Stack spacing={3} padding={2}>
            <Box
              justifyContent="center"
              alignItems="center"
              sx={{
                paddingX: {
                  xs: 1,
                  md: 2,
                },
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} pb={3}>
                  {renderAuthor}

                  {renderAssignee}

                  {renderPriority}

                  {renderStatus}

                  {renderType}
                </Stack>
                <Stack spacing={{ xs: 2, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                  <Button
                    size="large"
                    type="submit"
                    color="primary"
                    variant="contained"
                    // startIcon={<Iconify icon="ic:round-clear-all" />}
                  >
                    Filter
                  </Button>
                  <Button
                    size="large"
                    type="button"
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      reset(defaultFilterData);
                    }}
                    // startIcon={<Iconify icon="ic:round-clear-all" />}
                  >
                    Reset
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
