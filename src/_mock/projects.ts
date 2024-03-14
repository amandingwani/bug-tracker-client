import { sample, sampleSize } from 'lodash';
import { faker } from '@faker-js/faker';
import { Project, ProjectCreateInput, ProjectStatusArr, Ticket } from 'src/redux/types';
import { demoUser } from 'src/redux/constants';
import { demoContributors, generateContributor } from './contributor';
import { demoPartialTickets } from './tickets';

// ----------------------------------------------------------------------

type Projects = {
  createdProjects: Project[];
  otherProjects: Project[];
};

const projectNameAndDesc = [
  {
    name: 'Operation CodeByte',
    description:
      'Revolutionizing byte-level operations for enhanced efficiency and precision in data processing.',
  },
  {
    name: 'Project CodeHarmony',
    description:
      'Fostering collaboration and synergy among developers through a unified coding approach.',
  },
  {
    name: 'Quantum Algorithm Quest',
    description:
      'Embarking on a quest to explore and implement cutting-edge quantum algorithms for next-gen computing.',
  },
  {
    name: 'CodeCruncher Challenge',
    description:
      'A challenging coding endeavor focused on optimizing algorithms for maximum performance and speed.',
  },
  {
    name: 'Binary Fusion Initiative',
    description:
      'Bringing together the power of binary manipulation and fusion techniques for unparalleled coding solutions.',
  },
  {
    name: 'CodeCraft Chronicles',
    description:
      'Chronicling the art and science of code crafting, delving into innovative techniques and best practices.',
  },
  {
    name: 'DevOps Dynamo',
    description:
      'Dynamic development and operations synergy project, streamlining workflows and enhancing deployment.',
  },
  {
    name: 'Pixel Perfect Prototype',
    description:
      'Crafting a pixel-perfect prototype with meticulous attention to detail for a flawless user experience.',
  },
  {
    name: 'ByteBlitz Brigade',
    description:
      'Assembling a brigade of coding experts for a byte-level blitz, optimizing algorithms for lightning-fast execution.',
  },
  {
    name: 'Project CodeSprint',
    description:
      'A sprint-style project aimed at rapid development, testing, and deployment of critical features.',
  },
  {
    name: 'BugBuster Battalion',
    description:
      'Mobilizing a battalion of bug busters to identify, track, and eliminate software bugs with precision.',
  },
  {
    name: 'Neural Network Nirvana',
    description:
      'Achieving coding nirvana by exploring the realms of neural networks for advanced machine learning.',
  },
  {
    name: 'CodeQuest Conundrum',
    description:
      'Navigating through a challenging coding conundrum, pushing the boundaries of problem-solving.',
  },
  {
    name: 'Algorithmic Odyssey',
    description:
      'Embarking on an epic odyssey to discover and implement groundbreaking algorithms for diverse applications.',
  },
  {
    name: 'ByteStorm Breakthrough',
    description:
      'Breaking through the coding landscape with a storm of byte-level innovations and breakthroughs.',
  },
  {
    name: 'WebWeaver Wizardry',
    description:
      'Weaving web magic with coding wizardry to create dynamic and enchanting web applications.',
  },
  {
    name: 'CodeMancer Crusade',
    description:
      'A coding crusade, merging coding mastery and magic to conquer complex programming challenges.',
  },
  {
    name: 'Project BitShift',
    description:
      'Shifting the paradigm with a project focused on bit-level operations and optimizations.',
  },
  {
    name: 'CodeSphinx Saga',
    description:
      'Unraveling the coding saga with Sphinx-like wisdom, documenting and sharing knowledge.',
  },
  {
    name: 'ReactorCore Rampage',
    description:
      'Rampaging through coding challenges, optimizing and fortifying the core of software reactors.',
  },
  {
    name: 'DataForge Dynamics',
    description:
      'Dynamic data forging project, exploring innovative ways to manipulate and enhance data.',
  },
  {
    name: 'PixelPioneer Project',
    description:
      'Pioneering pixel-perfect solutions, pushing the boundaries of graphic and UI design in coding.',
  },
  {
    name: 'QuantumQuasar Quest',
    description:
      'Embarking on a quest to harness the power of quantum quasars for unparalleled computational speed.',
  },
  {
    name: 'CodeNinja Nexus',
    description:
      'Navigating the coding nexus with ninja-like precision, optimizing workflows and conquering challenges.',
  },
];

const ticketSelectionArray = [0, 10, 13, 18, 22, 25];
const generateCreatedProject = (index: number): Project => {
  const p: Project = {
    id: faker.number.int({ min: 1000, max: 4999 }),
    name: projectNameAndDesc[index].name,
    description: projectNameAndDesc[index].description,
    owner: {
      id: demoUser.id,
      firstName: demoUser.firstName,
      lastName: demoUser.lastName,
      email: demoUser.email,
      registered: true,
    },
    status: sample(ProjectStatusArr),
    contributors: sampleSize(demoContributors, 5),
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    tickets: [],
  };

  const tickets = demoPartialTickets.slice(
    ticketSelectionArray[index],
    ticketSelectionArray[index + 1]
  );

  tickets.forEach((t, _i, _arr) => {
    t.author = sample([...p.contributors, p.owner]);
    t.assignee = sample([sample(p.contributors), p.owner]);
    t.project = {
      id: p.id,
      name: p.name,
      contributors: p.contributors,
      owner: p.owner,
    };
  });

  p.tickets = tickets as Ticket[];

  return p;
};

const createdProjects: Project[] = [...Array(5)].map((_, index) => generateCreatedProject(index));

const generateOtherProject = (index: number): Project => {
  index = index + 5;
  const p: Project = {
    id: faker.number.int({ min: 5000, max: 8999 }),
    name: projectNameAndDesc[index].name,
    description: projectNameAndDesc[index].description,
    owner: generateContributor(),
    status: sample(ProjectStatusArr),
    contributors: [
      ...sampleSize(demoContributors, 5),
      {
        id: demoUser.id,
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        email: demoUser.email,
        registered: true,
      },
    ],
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    tickets: [],
  };

  const tickets = demoPartialTickets.slice(
    ticketSelectionArray[index - 5] + 25,
    ticketSelectionArray[index + 1 - 5] + 25
  );

  tickets.forEach((t, _i, _arr) => {
    t.author = sample(p.contributors);
    t.assignee = sample([
      sample(p.contributors),
      {
        id: demoUser.id,
        firstName: demoUser.firstName,
        lastName: demoUser.lastName,
        email: demoUser.email,
        registered: true,
      },
    ]);
    t.project = {
      id: p.id,
      name: p.name,
      contributors: p.contributors,
      owner: p.owner,
    };
  });

  p.tickets = tickets as Ticket[];

  return p;
};

const otherProjects: Project[] = [...Array(5)].map((_, index) => generateOtherProject(index));

// function capitalizeFirstLetter(string: string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

export const projects: Projects = {
  createdProjects: createdProjects,
  otherProjects: otherProjects,
};

export const generateAddProjectApiResponse = (data: ProjectCreateInput): Project => {
  return {
    id: faker.number.int({ min: 9000, max: 9999 }),
    name: data.name,
    description: data.description,
    status: data.status,
    owner: {
      id: demoUser.id,
      firstName: demoUser.firstName,
      lastName: demoUser.lastName,
      email: demoUser.email,
      registered: true,
    },
    contributors: [],
    createdAt: new Date().toISOString(),
    tickets: [],
  };
};
