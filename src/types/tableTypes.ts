import { Dispatch, SetStateAction } from 'react';
import { DiagnosticType } from './diagnosticTypes';

export interface TableProps {
  diagnosticData: DiagnosticType[];
  setDiagnosticData: Dispatch<SetStateAction<DiagnosticType[]>>;
}
