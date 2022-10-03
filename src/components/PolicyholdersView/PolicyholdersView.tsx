import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import InfoTable from '../InfoTable';

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

type GetPolicyholdersResponse = {
  policyHolders: PolicyholdersType[];
};

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState<
    PolicyholdersType[] | undefined
  >();

  // TODO: error and loading
  const getPolicyholders = async () => {
    let { data } = await axios.get<GetPolicyholdersResponse>(
      'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
    );
    setPolicyholders(data.policyHolders);
  };

  const createPolicyholder = async () => {
    // Hardcoding this data for the purpose of this assignment.
    const fakeData = {
      name: 'Mr. Policy',
      age: 32,
      address: {
        line1: '789 Hold Ave',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90035',
      },
      phoneNumber: '818-123-4567',
    };
    let response = await axios.post(
      'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
      fakeData
    );
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
