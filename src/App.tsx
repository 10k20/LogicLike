import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import { Course } from './components/Course/Course';
import { Sidebar } from './components/Sidebar/Sidebar';
import { fetchCourses } from './utils/api';
import { CourseType } from './utils/types';

function App() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);

        const uniqueTags = new Set<any>();
        fetchedCourses.forEach(course => {
          course.tags.forEach(tagObj => {
            if (tagObj) {
              uniqueTags.add(tagObj);
            }
          });
        });

        setTags(Array.from(uniqueTags));
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const filteredCourses = selectedTag
    ? courses.filter(course => course.tags.some(tagObj => tagObj === selectedTag))
    : courses;

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <Sidebar themes={tags} onTagClick={handleTagClick}/>
      <main>
        <div className="courses">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Course key={course.id} course={course} />
            ))
          ) : (
            <div>Нет доступных курсов.</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
