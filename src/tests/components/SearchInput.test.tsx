import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '../../components/SearchInput';

describe('SearchInput', () => {
  it('renders with placeholder', () => {
    render(
      <SearchInput 
        value="" 
        onChange={() => {}} 
        placeholder="Search users..." 
      />
    );
    
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('shows clear button when value is present', () => {
    render(<SearchInput value="test" onChange={() => {}} />);
    
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });

  it('calls onChange with empty string when clear button is clicked', () => {
    const onChange = vi.fn();
    render(<SearchInput value="test" onChange={onChange} />);
    
    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);
    
    expect(onChange).toHaveBeenCalledWith('');
  });
});