import {dataURL} from '../../assets/dummies/dummyData';

export const fetchData = async (currentPage?: number) => {
  const APIURL = `${dataURL}?_limit=10${
    currentPage && `&_page=${currentPage}`
  }`;

  try {
    const urlFetch = await fetch(APIURL);
    if (urlFetch.status === 200) {
      const result = await urlFetch.json();
      return result;
    }
  } catch (error) {
    return error;
  }
};

export default fetchData;
