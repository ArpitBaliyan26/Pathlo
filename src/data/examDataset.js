import exams from './exams.json';

const difficultyOptions = [
  { value: 'Hard', label: 'Hard', color: 'rose', icon: '🔴' },
  { value: 'Moderate', label: 'Moderate', color: 'amber', icon: '🟡' },
  { value: 'Easy', label: 'Easy', color: 'emerald', icon: '🟢' },
];

const examCategories = [
  { value: 'tech', label: 'Engineering', icon: '⚡', color: 'blue' },
  { value: 'business', label: 'Management', icon: '📈', color: 'amber' },
  { value: 'liberal_arts', label: 'Liberal Arts', icon: '📚', color: 'rose' },
  { value: 'research', label: 'Research', icon: '🔬', color: 'emerald' },
  { value: 'new_age', label: 'New Age', icon: '💻', color: 'purple' },
];

export { exams, difficultyOptions, examCategories };
export default exams;