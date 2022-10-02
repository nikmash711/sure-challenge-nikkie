import axios from 'axios';
import { useEffect, useState } from 'react';

function PolicyholdersView() {
  const [data, setData] = useState(null);

  const getData = async () => {
    let response = await axios.get(
      'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
    );
    setData(response?.data);
  };

  // On mount, make a GET request to the /api/policyholders endpoint
  useEffect(() => {
    getData();
  }, []);

  return null;
}

export default PolicyholdersView;
