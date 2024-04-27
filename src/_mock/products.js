// import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

const PRODUCT_NAME = [
  'Frontend Development Fundamentals',
  'Introduction to Data Science',
  'Advanced Machine Learning',
  'Public Speaking and Communication',
];
const PRODUCT_DESCRIPTION = [
  'Learn the basics of frontend development, covering HTML, CSS, and JavaScript, with hands-on exercises and projects.',
  'Explore data science concepts and tools, including Python, Pandas, and Matplotlib, and apply them to real-world datasets.',
  'Dive deep into machine learning algorithms, focusing on supervised and unsupervised learning techniques.',
  'Enhance your public speaking and communication skills, with practical tips and exercises.',
];

const PRODUCT_COVERS = [
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example cover image
  'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];
// ----------------------------------------------------------------------

export const products = [...Array(PRODUCT_NAME.length)].map((_, index) => {
  return {
    id: faker.string.uuid(),
    cover: PRODUCT_COVERS[index],
    name: PRODUCT_NAME[index],
    description: PRODUCT_DESCRIPTION[index],
    price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
  };
});