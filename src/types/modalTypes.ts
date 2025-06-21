import { Dispatch, SetStateAction } from 'react';
import { DiagnosticType } from './diagnosticTypes';

export interface ModalProps {
  isModalOpened: boolean;
  onClose: () => void;
  setDiagnosticData: Dispatch<SetStateAction<DiagnosticType[]>>;
}

export interface FormValues {
  faultType: string;
  severity: string;
}
