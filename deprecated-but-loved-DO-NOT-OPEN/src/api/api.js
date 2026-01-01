import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_SANITY_API_URL;

const headers = {
  'Content-Type': 'application/json',
}

export async function fetchApiData(query) {
  try {
    const response = await axios.post(API_URL, { query }, { headers });

    return response.data;
  } catch (err) {
    console.error('Error making Sanity API request:', err);
  }
}

export async function getAboutData() {
  const query = `*[_type == 'aboutPage']`;
  return fetchApiData(query);
}

export async function getSocialData() {
  const query = `*[_type == 'social']`;
  return fetchApiData(query);
}

export async function getPageInfo() {
  const query = `*[_type == 'pageInfo']`;
  return fetchApiData(query);
}

export async function getExperience() {
  const query = `*[_type == 'experience']`;
  return fetchApiData(query);
}

export async function getProjects() {
  const query = `*[_type == 'project']`;
  return fetchApiData(query);
}

export async function getSocials() {
  const query = `*[_type == 'social']`;
  return fetchApiData(query);
}
