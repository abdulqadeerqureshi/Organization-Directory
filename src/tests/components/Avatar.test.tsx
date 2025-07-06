import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '../../components/Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="John Doe" />);
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(image).toHaveAttribute('alt', 'John Doe');
  });

  it('renders fallback when src is not provided', () => {
    render(<Avatar src="" alt="John Doe" />);
    
    // Look for the User icon using the test id
    const fallbackIcon = screen.getByTestId('avatar-fallback-icon');
    expect(fallbackIcon).toBeInTheDocument();
    
    // Should not render an img element
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders fallback when image fails to load', () => {
    render(<Avatar src="https://example.com/broken-image.jpg" alt="John Doe" />);
    
    const image = screen.getByRole('img');
    // Simulate image load error
    fireEvent.error(image);
    
    // After error, should show fallback
    const fallbackIcon = screen.getByTestId('avatar-fallback-icon');
    expect(fallbackIcon).toBeInTheDocument();
    
    // Should not render an img element after error
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { container } = render(<Avatar src="https://example.com/avatar.jpg" alt="John Doe" size="lg" />);
    
    const avatarContainer = container.firstChild;
    expect(avatarContainer).toHaveClass('w-16', 'h-16');
  });

  it('renders custom fallback', () => {
    const customFallback = <span>JD</span>;
    render(<Avatar src="" alt="John Doe" fallback={customFallback} />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByTestId('avatar-fallback-icon')).not.toBeInTheDocument();
  });
});