import axios from 'axios';
import { Box } from '@mui/material';
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

  // On mount, make a GET request to the /api/policyholders endpoint
  useEffect(() => {
    getPolicyholders();
  }, []);

  return policyholders?.length ? (
    <Box sx={{ textAlign: 'center' }}>
      {policyholders.map((policyholder) => {
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
      })}
    </Box>
  ) : (
    <>Empty state would go here</>
  );
}

export default PolicyholdersView;
