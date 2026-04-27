import { useState, useEffect, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'savedExamIds';

function getSavedExamIds() {
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) return [];

    const parsed = JSON.parse(item);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((id) => typeof id === 'string' && id.trim().length > 0)
      .map((id) => id.trim());
  } catch (error) {
    console.warn('Error reading saved exams from localStorage', error);
    return [];
  }
}

export function useSavedExams() {
  const [savedExamIds, setSavedExamIds] = useState(getSavedExamIds);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedExamIds));
    } catch (error) {
      console.warn('Error writing saved exams to localStorage', error);
    }
  }, [savedExamIds]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        setSavedExamIds(getSavedExamIds());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const isExamSaved = useCallback((id) => savedExamIds.includes(id), [savedExamIds]);

  const toggleExamSave = useCallback((id) => {
    setSavedExamIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((savedId) => savedId !== id)
        : [...new Set([...prevIds, id])]
    );
  }, []);

  return { savedExamIds, isExamSaved, toggleExamSave };
}
