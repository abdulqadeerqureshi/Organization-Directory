import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/Button';
import { Eye } from 'lucide-react';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-gray-600');
  });

  it('renders with icon', () => {
    render(<Button icon={Eye}>With Icon</Button>);
    
    const button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    
    const button = screen.getByText('Custom');
    expect(button).toHaveClass('custom-class');
  });
});