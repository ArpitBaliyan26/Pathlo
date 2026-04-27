import colleges from './colleges.js';

const detailOverrides = {
  'col-007': {
    about: 'BITS Pilani is among India\'s most respected private engineering institutions. Known for its flexible dual-degree options, Practice School program (real-world internships), and strong alumni network in product companies, startups, and core engineering.',
    alumni: [
      { name: 'Sriharsha Majety', role: 'Co-founder & CEO, Swiggy' },
      { name: 'Phanindra Sama', role: 'Co-founder, redBus' },
      { name: 'Revathi Advaithi', role: 'CEO, Flex' },
    ],
    externalLinks: [
      { label: 'BITS Pilani – Student Reviews on YouTube', url: 'https://www.youtube.com/results?search_query=BITS+Pilani+review+campus+life', icon: '▶️' },
      { label: 'r/BITSPilani – Reddit Community', url: 'https://www.reddit.com/r/BITSPilani', icon: '💬' },
      { label: 'Quora: Is BITS Pilani worth it?', url: 'https://www.quora.com/Is-BITS-Pilani-worth-it', icon: '❓' },
    ],
  },
  'col-017': {
    about: "Masters' Union is built around practitioner-led business learning with heavy exposure to operators, founders, and industry mentors. It appeals most to students who want a modern business curriculum tied closely to tech, startups, and live business problems.",
    alumni: [],
    externalLinks: [
      { label: 'Masters\' Union Review on YouTube', url: 'https://www.youtube.com/results?search_query=Masters+Union+review', icon: '▶️' },
      { label: 'Quora: Masters\' Union – Is it worth it?', url: 'https://www.quora.com/Is-Masters-Union-worth-it', icon: '❓' },
    ],
  },
  'col-027': {
    about: 'Ashoka University is known for liberal arts and sciences education centered on seminars, writing, interdisciplinary exploration, and close faculty interaction. It suits students who want flexibility in choosing majors and a discussion-driven learning environment.',
    alumni: [],
    externalLinks: [
      { label: 'Ashoka University – Student Life on YouTube', url: 'https://www.youtube.com/results?search_query=Ashoka+University+review+student+life', icon: '▶️' },
      { label: 'r/AashokaUniversity – Reddit', url: 'https://www.reddit.com/search/?q=Ashoka+University', icon: '💬' },
      { label: 'Quora: Ashoka University – worth the fees?', url: 'https://www.quora.com/Is-Ashoka-University-worth-it', icon: '❓' },
    ],
  },
  'col-037': {
    about: 'IISc Bengaluru is one of India\'s strongest destinations for advanced science and research-led education. It is best suited for students who want deep STEM training, laboratory exposure, and a long-term path into research, academia, or advanced engineering.',
    alumni: [
      { name: 'Sudha Murty', role: 'Chairperson, Infosys Foundation' },
      { name: 'K. Sivan', role: 'Former Chairman, ISRO' },
      { name: 'V.K. Saraswat', role: 'Former Director General, DRDO' },
    ],
    externalLinks: [
      { label: 'IISc Review – YouTube', url: 'https://www.youtube.com/results?search_query=IISc+Bangalore+review+BS+research', icon: '▶️' },
      { label: 'Reddit: IISc Admissions & Life', url: 'https://www.reddit.com/search/?q=IISc+Bangalore', icon: '💬' },
      { label: 'Quora: IISc BS Research – Is it good?', url: 'https://www.quora.com/Is-IISc-BS-research-program-good', icon: '❓' },
    ],
  },
  'col-045': {
    about: 'Scaler School of Technology (SST) is a modern software-focused program that emphasizes hands-on programming, product thinking, and mentorship from working engineers. It is designed for students who value applied learning and an industry-first curriculum.',
    alumni: [],
    externalLinks: [
      { label: 'SST Review – YouTube', url: 'https://www.youtube.com/results?search_query=Scaler+School+of+Technology+review', icon: '▶️' },
      { label: 'Reddit: Scaler SST – Is it worth it?', url: 'https://www.reddit.com/search/?q=Scaler+School+of+Technology', icon: '💬' },
      { label: 'Quora: Scaler School of Technology', url: 'https://www.quora.com/search?q=Scaler+School+of+Technology', icon: '❓' },
    ],
  },
  'col-057': {
    about: 'IIM Ahmedabad is consistently ranked India\'s #1 business school. Its PGP (MBA) is among the most sought-after programs in Asia. Known for case-method learning, strong peer cohorts, and alumni who lead some of India\'s most prominent companies.',
    alumni: [
      { name: 'Raghuram Rajan', role: 'Former Governor, Reserve Bank of India' },
      { name: 'Falguni Nayar', role: 'Founder & CEO, Nykaa' },
      { name: 'Sanjeev Bikhchandani', role: 'Founder, Info Edge (Naukri.com)' },
    ],
    externalLinks: [
      { label: 'IIM Ahmedabad – Campus Life on YouTube', url: 'https://www.youtube.com/results?search_query=IIM+Ahmedabad+review+campus+life', icon: '▶️' },
      { label: 'Reddit: IIM Ahmedabad Admissions', url: 'https://www.reddit.com/search/?q=IIM+Ahmedabad', icon: '💬' },
      { label: 'Quora: Is IIM Ahmedabad worth it?', url: 'https://www.quora.com/Is-IIM-Ahmedabad-worth-it', icon: '❓' },
    ],
  },
  'col-060': {
    about: 'ISB Hyderabad is a world-class business school co-founded with Kellogg, Wharton, and London Business School. Its PGP MBA attracts working professionals with 2+ years experience. Known for global faculty, dual campus, and outstanding placement outcomes.',
    alumni: [
      { name: 'Neeraj Arora', role: 'Former Chief Business Officer, WhatsApp' },
      { name: 'Ankur Warikoo', role: 'Entrepreneur & Content Creator' },
      { name: 'Viren Shetty', role: 'Executive Vice Chairman, Narayana Health' },
    ],
    externalLinks: [
      { label: 'ISB Hyderabad Review – YouTube', url: 'https://www.youtube.com/results?search_query=ISB+Hyderabad+review', icon: '▶️' },
      { label: 'Reddit: ISB Experience', url: 'https://www.reddit.com/search/?q=ISB+Hyderabad', icon: '💬' },
      { label: 'Quora: ISB vs IIMs – Which is better?', url: 'https://www.quora.com/search?q=ISB+vs+IIM', icon: '❓' },
    ],
  },
  'col-030': {
    about: 'OP Jindal Global University is a multidisciplinary private university known for law, public policy, international affairs, and global academic exposure. Ideal for students interested in global careers, social impact, journalism, and legal education.',
    alumni: [
      { name: 'Student community rapidly growing', role: 'Founded 2009 – alumni network building' },
    ],
    externalLinks: [
      { label: 'JGU Review – YouTube', url: 'https://www.youtube.com/results?search_query=OP+Jindal+Global+University+review', icon: '▶️' },
      { label: 'Reddit: JGU Jindal Global', url: 'https://www.reddit.com/search/?q=Jindal+Global+University', icon: '💬' },
      { label: 'Quora: OP Jindal University – Is it worth it?', url: 'https://www.quora.com/search?q=OP+Jindal+Global+University', icon: '❓' },
    ],
  },
  'col-056': {
    about: 'JNU is one of India\'s most distinguished central universities. Known for deep intellectual culture, affordable education, strong social sciences and humanities, and one of the lowest tuition fees among high-quality universities.',
    alumni: [
      { name: 'Sitaram Yechury', role: 'General Secretary, CPI(M)' },
      { name: 'Nirmala Sitharaman', role: 'Finance Minister of India' },
      { name: 'Arvind Kejriwal', role: 'Chief Minister, Delhi' },
    ],
    externalLinks: [
      { label: 'JNU Campus Life – YouTube', url: 'https://www.youtube.com/results?search_query=JNU+Delhi+campus+life+review', icon: '▶️' },
      { label: 'Reddit: JNU Admissions', url: 'https://www.reddit.com/search/?q=JNU+Delhi+admissions', icon: '💬' },
      { label: 'Quora: JNU – Courses & Campus Life', url: 'https://www.quora.com/search?q=JNU+Delhi', icon: '❓' },
    ],
  },
  'col-063': {
    about: 'IIT Madras BS in Data Science is a landmark online program – the first of its kind by an IIT. No JEE required. Open to all 10+2 pass students. Fully flexible – you can pause and re-join. Many students complete it alongside a job or another degree.',
    alumni: [],
    externalLinks: [
      { label: 'IIT Madras BS DS – Full Review on YouTube', url: 'https://www.youtube.com/results?search_query=IIT+Madras+BS+Data+Science+review', icon: '▶️' },
      { label: 'Reddit: r/IITMBS Community', url: 'https://www.reddit.com/r/IITMBS', icon: '💬' },
      { label: 'Quora: IIT Madras Online BS – Worth it?', url: 'https://www.quora.com/search?q=IIT+Madras+BS+Data+Science', icon: '❓' },
    ],
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

/* ─── Generate research links for ANY college ──────────────────── */
function generateResearchLinks(college) {
  const q = encodeURIComponent(college.name);
  const campusQ = encodeURIComponent(`${college.name} campus`);
  const googleReviewsQ = encodeURIComponent(`${college.name} google reviews`);
  const redditQ = encodeURIComponent(`site:reddit.com ${college.name}`);
  const nameShort = college.shortName || college.name;
  return [
    {
      platform: 'youtube',
      label: `${nameShort} – YouTube Campus Search`,
      url: `https://www.youtube.com/results?search_query=${campusQ}`
    },
    {
      platform: 'google',
      label: `Google Reviews – ${nameShort}`,
      url: `https://www.google.com/search?q=${googleReviewsQ}`
    },
    {
      platform: 'reddit',
      label: `Reddit – ${nameShort} Discussions`,
      url: `https://www.google.com/search?q=${redditQ}`
    },
    {
      platform: 'quora',
      label: `Quora: Is ${nameShort} worth it?`,
      url: `https://www.quora.com/search?q=${q}`
    },
  ];
}

function buildDetail(college) {
  const override = detailOverrides[college.id] || {};

  // Keep a consistent 4-button research set for every college.
  const externalLinks = generateResearchLinks(college);

  return {
    officialWebsite: college.officialWebsite || null,
    campusTourUrl: null,
    about: override.about || college.description || '',
    entryExams: college.entryExams || [],
    highlights: override.highlights || buildHighlights(college),
    reviews: [],
    alumni: override.alumni || [],
    externalLinks,
  };
}


export const collegeDetails = Object.fromEntries(
  colleges.map((college) => [college.id, buildDetail(college)])
);

export function getCollegeDetail(id) {
  return collegeDetails[id] || null;
}
