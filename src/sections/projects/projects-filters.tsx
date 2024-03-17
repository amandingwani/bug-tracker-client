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
import { alpha } from '@mui/material/styles';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import capitalize from 'lodash/capitalize';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ProjectStatusArr, ProjectStatusMap } from 'src/redux/types';
import { FilterData, OWNER_OPTIONS, defaultFilterValues } from './types';

// ----------------------------------------------------------------------

interface ProjectsFiltersProps {
  isXs: boolean;
  openFilter: boolean;
  onOpenFilter?: React.MouseEventHandler<HTMLButtonElement>;
  onCloseFilter: () => void;
  filterData: FilterData;
  setFilterData: React.Dispatch<React.SetStateAction<FilterData>>;
}

export default function ProjectsFilters({
  isXs,
  openFilter,
  onOpenFilter,
  onCloseFilter,
  filterData,
  setFilterData,
}: ProjectsFiltersProps) {
  const {
    handleSubmit,
    // formState: { errors },
    reset,
    control,
  } = useForm<FilterData>({ defaultValues: filterData });

  const onSubmit: SubmitHandler<FilterData> = (data) => {
    setFilterData(data);
    onCloseFilter();
  };

  const renderOwner = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Owner</Typography>
      <Controller
        render={({ field }) => (
          <RadioGroup aria-label="owner" {...field}>
            {OWNER_OPTIONS.map((item) => (
              <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
            ))}
          </RadioGroup>
        )}
        name="owner"
        control={control}
      />
    </Stack>
  );

  const renderStatus = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Status</Typography>

      <FormGroup aria-label="status">
        {ProjectStatusArr.map((item) => (
          <Controller
            key={item}
            render={({ field }) => (
              <FormControlLabel
                key={item}
                control={<Checkbox {...field} checked={field.value} />}
                label={capitalize(ProjectStatusMap[item])}
              />
            )}
            name={
              ('status.' + item) as
                | 'status.OPEN'
                | 'status.IN_PROGRESS'
                | 'status.ON_HOLD'
                | 'status.COMPLETED'
                | 'status.CANCELED'
                | 'status.TESTING'
                | 'status.DEPLOYED'
            }
            control={control}
          />
        ))}
      </FormGroup>
    </Stack>
  );

  return (
    <>
      {isXs ? (
        <IconButton
          disableRipple
          color="inherit"
          onClick={onOpenFilter}
          sx={{
            borderRadius: 1,
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.text.secondary, 0.16),
            },
          }}
        >
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      ) : (
        <Button
          disableRipple
          color="inherit"
          endIcon={<Iconify icon="ic:round-filter-list" />}
          onClick={onOpenFilter}
        >
          Filters&nbsp;
        </Button>
      )}

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: {
            width: '300px',
            maxWidth: '80%',
            overflow: 'hidden',
          },
        }}
      >
        {/* <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': {
              height: 1,
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        > */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2, height: '8vh' }}
        >
          <Typography variant="h4" align="center" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              height: '92vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Scrollbar>
              <Stack
                spacing={{ xs: 1, sm: 2, md: 3 }}
                paddingX={{ xs: 2, sm: 2, md: 3 }}
                paddingTop={{ xs: 2, sm: 2, md: 3 }}
                direction={'column'}
                justifyContent="space-evenly"
                alignItems="flex-start"
              >
                {renderOwner}

                {renderStatus}
              </Stack>
            </Scrollbar>

            <Divider />

            <Stack
              spacing={3}
              padding={{ xs: 1, sm: 1, md: 2 }}
              // paddingX={{ xs: 2, sm: 2, md: 3 }}
              direction="row"
              flexWrap="wrap"
              justifyContent={'space-between'}
            >
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
                  reset(defaultFilterValues);
                }}
                // startIcon={<Iconify icon="ic:round-clear-all" />}
              >
                Reset
              </Button>
            </Stack>
          </Box>
        </form>
        {/* </Scrollbar> */}
      </Drawer>
    </>
  );
}
