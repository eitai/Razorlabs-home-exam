import { DiagnosticType } from './diagnosticTypes';
import { Dispatch, SetStateAction } from 'react';

export interface ModalProps {
  isModalOpened: boolean;
  onClose: () => void;
  setDiagnosticData: Dispatch<SetStateAction<DiagnosticType[]>>;
}

export interface FormValues {
  faultType: string;
  severity: string;
}
