import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/Modal/Modal';
import { ModalProps } from '../types/modalTypes';

describe('Modal form validation', () => {
  const defaultProps: ModalProps = {
    isModalOpened: true,
    onClose: jest.fn(),
    setDiagnosticData: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Shows validation errors when submitting empty form', async () => {
    render(<Modal {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(await screen.findByText(/Fault type is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Severity is required/i)).toBeInTheDocument();
  });

  it('submits successfully when all fields are filled', async () => {
    render(<Modal {...defaultProps} />);

    const [faultSelect, severitySelect] = screen.getAllByRole('combobox');
    userEvent.selectOptions(faultSelect, 'Bearing');
    userEvent.selectOptions(severitySelect, 'Critical');

    await userEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => expect(defaultProps.onClose).toHaveBeenCalled());

    expect(defaultProps.setDiagnosticData).toHaveBeenCalledTimes(1);
  });
});
