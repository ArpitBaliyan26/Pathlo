import colleges from './colleges.js';

const detailOverrides = {
  'col-001': {
    about:
      'IIT Delhi combines flagship engineering programs with strong design, entrepreneurship, and research ecosystems. It is especially attractive for students looking for rigorous academics with access to labs, startups, and interdisciplinary opportunities.',
  },
  'col-017': {
    about:
      "Masters' Union is built around practitioner-led business learning with heavy exposure to operators, founders, and industry mentors. It appeals most to students who want a modern business curriculum tied closely to tech, startups, and live business problems.",
  },
  'col-027': {
    about:
      'Ashoka University is known for liberal arts and sciences education centered on seminars, writing, interdisciplinary exploration, and close faculty interaction. It suits students who want flexibility in choosing majors and a discussion-driven learning environment.',
  },
  'col-037': {
    about:
      'IISc Bengaluru is one of India\'s strongest destinations for advanced science and research-led education. It is best suited for students who want deep STEM training, laboratory exposure, and a long-term path into research, academia, or advanced engineering.',
  },
  'col-045': {
    about:
      'Scaler School of Technology is a modern software-focused program that emphasizes hands-on programming, product thinking, and mentorship from working engineers. It is designed for students who value applied learning and an industry-first curriculum.',
  },
};

function buildHighlights(college) {
  const highlights = [];

  if (college.courses?.length) {
    highlights.push(`Popular programs: ${college.courses.slice(0, 3).join(', ')}`);
  }

  if (college.entryExams?.length) {
    highlights.push(`Entry routes: ${college.entryExams.join(', ')}`);
  }

  if (college.tags?.length) {
    highlights.push(`Focus areas: ${college.tags.slice(0, 3).join(', ')}`);
  }

  return highlights;
}

function buildDetail(college) {
  const override = detailOverrides[college.id] || {};

  return {
    officialWebsite: college.officialWebsite || null,
    campusTourUrl: null,
    about: override.about || college.description || '',
    entryExams: college.entryExams || [],
    highlights: override.highlights || buildHighlights(college),
    reviews: [],
    alumni: [],
    externalLinks: [],
  };
}

export const collegeDetails = Object.fromEntries(
  colleges.map((college) => [college.id, buildDetail(college)])
);

export function getCollegeDetail(id) {
  return collegeDetails[id] || null;
}
