import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { PostSortProps } from './postTypes';

// ----------------------------------------------------------------------

export default function PostSort({ options, onSort }: PostSortProps) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
