import axios from 'axios';
import { CourseType } from "./types";
import { API_BASE_URL } from './constants';

export const fetchCourses = async () => {
  try {
    const response = await axios.get<CourseType[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};