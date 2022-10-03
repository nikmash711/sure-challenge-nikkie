import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import InfoTable from 'components/InfoTable';
import { fakeData } from 'constants/data';
import { PolicyholdersType } from 'types';

type PolicyholdersResponseType = {
  policyHolders: PolicyholdersType[];
};

function PolicyholdersView() {
  const [policyholders, setPolicyholders] = useState<
    PolicyholdersType[] | undefined
  >();

  // TODO: handle error and loading states in both fns below.
  const getPolicyholders = async () => {
    try {
      let { data } = await axios.get<PolicyholdersResponseType>(
        'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
      );
      setPolicyholders(data.policyHolders);
    } catch (e) {
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
    } catch (e) {
      console.log(e);
    }
  };

  // On mount, make a GET request to the /api/policyholders endpoint.
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
        <div>This is where empty state UI would go!</div>
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
