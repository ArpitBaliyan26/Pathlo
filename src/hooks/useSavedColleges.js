import { useState, useEffect, useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'savedCollegeIds';

function getSavedIds() {
  try {
    const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.warn('Error reading saved colleges from localStorage', error);
    return [];
  }
}

export function useSavedColleges() {
  const [savedIds, setSavedIds] = useState(getSavedIds);

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedIds));
    } catch (error) {
      console.warn('Error writing saved colleges to localStorage', error);
    }
  }, [savedIds]);

  const addCollege = useCallback((id) => {
    setSavedIds((prevIds) => [...new Set([...prevIds, id])]);
  }, []);

  const removeCollege = useCallback((id) => {
    setSavedIds((prevIds) => prevIds.filter((savedId) => savedId !== id));
  }, []);

  const isCollegeSaved = useCallback((id) => savedIds.includes(id), [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((savedId) => savedId !== id)
        : [...new Set([...prevIds, id])]
    );
  }, []);

  return { savedIds, addCollege, removeCollege, isCollegeSaved, toggleSave };
}
