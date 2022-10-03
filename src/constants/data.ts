import { PolicyHoldersType } from 'types';

export const fakeData: PolicyHoldersType = {
  name: 'Mr. Policy',
  age: 32,
  address: {
    line1: '789 Hold Ave',
    line2: undefined,
    city: 'Los Angeles',
    state: 'CA',
    postalCode: '90035',
  },
  phoneNumber: '818-123-4567',
  isPrimary: false,
};
