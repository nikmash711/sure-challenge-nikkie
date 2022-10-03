import links from 'constants/links';
import { renderWithProviders } from 'utils/test';
import NavBar from './NavBar';

describe('NavBar', () => {
  const defaultProps = {
    links,
  };

  // I tweaked the test below to use the actual links we use in the app.
  it('should render NavBar links', () => {
    const { getByTestId } = renderWithProviders(<NavBar {...defaultProps} />);
    links.map((link) =>
      expect(getByTestId(link['data-testid'])).toBeInTheDocument()
    );
  });

  it('should render an `href` attribute for each link', () => {
    const { getByTestId } = renderWithProviders(<NavBar {...defaultProps} />);
    links.map((link) =>
      expect(getByTestId(link['data-testid'])).toHaveAttribute(
        'href',
        link.href
      )
    );
  });
});
