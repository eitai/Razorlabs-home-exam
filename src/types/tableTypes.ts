import { DiagnosticType } from './diagnosticTypes';

export interface TableProps {
  diagnosticData: DiagnosticType[];
  setDiagnosticData: (data: DiagnosticType[]) => void;
}
