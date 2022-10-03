import InstructionsBar from './InstructionsBar';
import { renderWithProviders } from '../../utils/test';
import { fireEvent } from '@testing-library/react';

describe('InstructionsBar', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  it('should render a "View challenges" button', () => {
    const { getByText } = renderWithProviders(
      <InstructionsBar {...defaultProps} />
    );
    expect(getByText('View challenges')).toBeInTheDocument();
  });

  it('should call the onClick prop when the button is clicked', () => {
    const { getByTestId } = renderWithProviders(
      <InstructionsBar {...defaultProps} />
    );
    const viewChallengesButton = getByTestId('view_challenges_button');
    fireEvent.click(viewChallengesButton);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
