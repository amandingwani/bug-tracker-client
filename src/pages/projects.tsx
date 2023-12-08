import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { ProjectsView } from 'src/sections/projects/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { useAppDispatch } from 'src/redux/hooks';

// ----------------------------------------------------------------------

export default function ProjectsPage() {
  const titleString = 'Projects';
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateHeader(titleString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title> {titleString} | Bug Ninja </title>
      </Helmet>

      <ProjectsView />
    </>
  );
}
