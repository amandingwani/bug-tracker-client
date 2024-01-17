import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { ProjectDetailsView } from 'src/sections/projectDetails/view';

import { updateHeader } from 'src/redux/slices/pageSlice';
import { selectProjects } from 'src/redux/slices/projectsSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

// ----------------------------------------------------------------------

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const id = parseInt(projectId!);
  const projects = useAppSelector(selectProjects);

  const project =
    projects.createdProjects.find((p) => p.id === id) ||
    projects.otherProjects.find((p) => p.id === id);

  let headerString: string | null = null;
  if (project) {
    headerString = project.name;
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (headerString) {
      dispatch(updateHeader(headerString));
      localStorage.setItem('BUG_NINJA_PAGE_HEADER', headerString);
    }
  }, [dispatch, headerString]);

  return (
    <>
      <Helmet>
        <title> Project | Bug Ninja </title>
      </Helmet>

      <ProjectDetailsView project={project} />
    </>
  );
}
