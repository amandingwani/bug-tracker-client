import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type msgAndHeading = {
  heading: string;
  msg: string;
  query?: never;
};

type Query = { query: string; heading?: never; msg?: never };

type TableEmptyProps = msgAndHeading | Query;

export default function TableEmpty({ heading, msg, query }: TableEmptyProps) {
  let mainContent: JSX.Element;

  if (query) {
    mainContent = (
      <>
        <Typography variant="h6" paragraph>
          Not found
        </Typography>

        <Typography variant="body2">
          No results found for &nbsp;
          <strong>&quot;{query}&quot;</strong>.
          <br /> Try checking for typos or using complete words.
          <br /> Or try adjusting filters.
        </Typography>
      </>
    );
  } else {
    mainContent = (
      <>
        <Typography variant="h6" paragraph>
          {heading}
        </Typography>

        <Typography variant="body2">{msg}</Typography>
      </>
    );
  }

  return (
    <Paper
      sx={{
        textAlign: 'center',
        py: 3,
        px: 2,
      }}
    >
      {mainContent}
    </Paper>
  );
}
