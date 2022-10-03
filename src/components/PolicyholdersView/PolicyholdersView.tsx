import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import InfoTable from '../InfoTable';
import { fakeData } from '../../constants/data';

type PolicyholdersType = {
  name: string;
  age: number;
  address: {
    line1: string;
    line2: string | undefined;
    city: string;
    state: string;
    postalCode: string;
  };
  phoneNumber: string;
  isPrimary: boolean;
};

type PolicyholdersResponseType = {
  policyHolders: PolicyholdersType[];
};

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState<
    PolicyholdersType[] | undefined
  >();

  // TODO: error and loading
  const getPolicyholders = async () => {
    try {
      let { data } = await axios.get<PolicyholdersResponseType>(
        'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
      );
      setPolicyholders(data.policyHolders);
    } catch (e) {
      // TODO: better error handling.
      console.log(e);
    }
  };

  const createPolicyholder = async () => {
    try {
      let { data } = await axios.post<PolicyholdersResponseType>(
        'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
        fakeData
      );
      setPolicyholders(data.policyHolders);
      // Ideally in a real app, when we make a POST request it would save the data
      // in our database so the next time we do a GET or POST, the previous results
      // would also be returned.
      // If for some reason that couldn't be the case but we wanted to have good UX,
      // we could use local storage to save the returned data so we could show
      // the previously created tables to the user each time they revisit the page.
      // However, for the purpose of this challenge, since we're hardcoding the data and not
      // collecting any data from the user, it's unnecessary.
    } catch (e) {
      // TODO: better error handling.
      console.log(e);
    }
  };

  // On mount, make a GET request to the /api/policyholders endpoint
  useEffect(() => {
    getPolicyholders();
  }, []);

  return (
    <Box sx={{ textAlign: 'center' }}>
      {policyholders?.length ? (
        policyholders.map((policyholder) => {
          const { name, age, address, phoneNumber, isPrimary } = policyholder;
          const rows = [
            { key: 'Name', value: name },
            { key: 'Age', value: age },
            {
              key: 'Address',
              value: `${address.line1} ${address.line2 ? address.line2 : ''}, ${
                address.city
              }, ${address.state} ${address.postalCode}`,
            },
            { key: 'Phone number', value: phoneNumber },
            {
              key: 'Primary policyholder',
              value: isPrimary ? 'Yes' : 'No',
            },
          ];
          return (
            <InfoTable
              key={`${name}-${phoneNumber}`}
              header={policyholder.name}
              rows={rows}
              sx={{ padding: '16px 0' }}
            />
          );
        })
      ) : (
        <>Empty state</>
      )}
      <Button
        onClick={createPolicyholder}
        variant="outlined"
        color="primary"
        size="large"
      >
        Add a policyholder
      </Button>
    </Box>
  );
}

export default PolicyholdersView;
