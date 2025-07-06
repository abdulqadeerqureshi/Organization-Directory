import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '../../components/Sidebar';

describe('Sidebar', () => {
  it('renders when open', () => {
    render(
      <Sidebar isOpen={true} onClose={() => {}} title="Test Sidebar">
        <div>Sidebar content</div>
      </Sidebar>
    );
    
    expect(screen.getByText('Test Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Sidebar isOpen={false} onClose={() => {}} title="Test Sidebar">
        <div>Sidebar content</div>
      </Sidebar>
    );
    
    // When closed, the sidebar should still be in DOM but translated off-screen
    // Check that the content is not visible by checking the transform class
    const sidebar = screen.getByText('Test Sidebar').closest('.fixed');
    expect(sidebar).toHaveClass('translate-x-full');
    
    // The backdrop should not be visible
    const backdrop = document.querySelector('.bg-black.bg-opacity-50');
    expect(backdrop).toHaveClass('opacity-0', 'pointer-events-none');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Sidebar isOpen={true} onClose={onClose} title="Test Sidebar">
        <div>Sidebar content</div>
      </Sidebar>
    );
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <Sidebar isOpen={true} onClose={onClose} title="Test Sidebar">
        <div>Sidebar content</div>
      </Sidebar>
    );
    
    const backdrop = document.querySelector('.bg-black.bg-opacity-50');
    fireEvent.click(backdrop!);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Sidebar isOpen={true} onClose={onClose} title="Test Sidebar">
        <div>Sidebar content</div>
      </Sidebar>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders without title', () => {
    render(
      <Sidebar isOpen={true} onClose={() => {}}>
        <div>Sidebar content</div>
      </Sidebar>
    );
    
    expect(screen.getByText('Sidebar content')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});