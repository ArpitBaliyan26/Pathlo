import colleges from './colleges.js';

const categoryMeta = {
  tech: {
    label: 'Engineering',
    icon: '⚡',
    color: 'blue',
    description: 'Engineering and computer science tracks',
    link: '/colleges?category=tech',
  },
  business: {
    label: 'Business',
    icon: '📈',
    color: 'amber',
    description: 'Management and commerce pathways',
    link: '/colleges?category=business',
  },
  liberal_arts: {
    label: 'Liberal Arts',
    icon: '🎨',
    color: 'rose',
    description: 'Interdisciplinary arts, humanities, and social sciences',
    link: '/colleges?category=liberal_arts',
  },
  research: {
    label: 'Research',
    icon: '🔬',
    color: 'emerald',
    description: 'Research-driven science and medical tracks',
    link: '/colleges?category=research',
  },
  new_age: {
    label: 'New Age',
    icon: '💻',
    color: 'purple',
    description: 'Industry-first and bootcamp-style programs',
    link: '/colleges?category=new_age',
  },
  online: {
    label: 'Distance / Flexible',
    icon: '📡',
    color: 'sky',
    description: 'Online degrees and flexible entry - study from anywhere',
    link: '/colleges?category=online',
  },
};
const tagCounts = colleges.reduce((accumulator, college) => {
  (college.tags || []).forEach((tag) => {
    accumulator[tag] = (accumulator[tag] || 0) + 1;
  });
  return accumulator;
}, {});

const typeOrder = ['Government', 'Private'];

function normalizeType(type) {
  if (type === 'Government') return 'Government';
  return 'Private';
}

function normalizeCollege(college) {
  const courses = college.courses || [];
  const name = college.name || 'College';
  return {
    ...college,
    type: normalizeType(college.type),
    description: college.description || '',
    courses,
    coursesOffered: courses,
    annualFees: college.annualFees || college.fees || '',
    image: college.image || '',
    youtubeUrl: college.youtubeUrl || '',
    redditUrl: college.redditUrl || '',
    officialWebsite: college.officialWebsite || college.website || '',
    nirfRank: college.nirfRank ?? null,
    shortName: college.shortName || name.slice(0, 3).toUpperCase(),
  };
}

export const normalizedColleges = colleges.map(normalizeCollege);
export const categories = Object.entries(categoryMeta).map(([id, meta]) => ({
  id,
  ...meta,
  count: `${normalizedColleges.filter((college) => college.category === id).length} colleges`,
}));

export const collegeFilterGroups = [
  {
    id: 'category',
    label: 'Field',
    options: categories.map((category) => ({
      value: category.id,
      label: category.label,
      icon: category.icon,
      color: category.color,
      tooltip: category.description,
    })),
  },
  {
    id: 'type',
    label: 'Type',
    options: typeOrder
      .filter((type) => normalizedColleges.some((college) => college.type === type))
      .map((type) => ({
        value: type,
        label: type,
        icon: type === 'Government' ? '🏛️' : '🏫',
        color: type === 'Government' ? 'emerald' : 'purple',
      })),
  },
  {
    id: 'tag',
    label: 'Tag',
    options: Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tag, count]) => ({
        value: tag,
        label: tag,
        icon: '🏷️',
        color: 'indigo',
        tooltip: `${count} colleges`,
      })),
  },
];

export default normalizedColleges;
