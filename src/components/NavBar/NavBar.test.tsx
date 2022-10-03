import links from 'constants/links';
import { renderWithProviders } from 'utils/test';
import NavBar from './NavBar';

describe('NavBar', () => {
  const defaultProps = {
    links,
  };

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
