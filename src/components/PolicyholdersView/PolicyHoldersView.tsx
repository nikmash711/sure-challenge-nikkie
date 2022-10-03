import axios from 'axios';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import InfoTable from 'components/InfoTable';
import { fakeData } from 'constants/data';
import { PolicyHoldersType } from 'types';

type PolicyHoldersResponseType = {
  policyHolders: PolicyHoldersType[];
};

function PolicyHoldersView() {
  const [policyHolders, setPolicyHolders] = useState<
    PolicyHoldersType[] | undefined
  >();

  // TODO: handle error and loading states in both fns below.
  const getPolicyHolders = async () => {
    try {
      let { data } = await axios.get<PolicyHoldersResponseType>(
        'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders'
      );
      setPolicyHolders(data.policyHolders);
    } catch (e) {
      console.log(e);
    }
  };

  const createPolicyHolder = async () => {
    try {
      let { data } = await axios.post<PolicyHoldersResponseType>(
        'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
        fakeData
      );
      setPolicyHolders(data.policyHolders);
    } catch (e) {
      console.log(e);
    }
  };

  // On mount, make a GET request to the /api/policyHolders endpoint.
  useEffect(() => {
    getPolicyHolders();
  }, []);

  return (
    <Box sx={{ textAlign: 'center' }}>
      {policyHolders?.length ? (
        policyHolders.map((policyholder) => {
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
        onClick={createPolicyHolder}
        variant="outlined"
        color="primary"
        size="large"
      >
        Add a policyholder
      </Button>
    </Box>
  );
}

export default PolicyHoldersView;
