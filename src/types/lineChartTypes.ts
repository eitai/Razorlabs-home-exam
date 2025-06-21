import { DiagnosticType } from './diagnosticTypes';

export interface DiagnosticDateParams {
  data: DiagnosticType[];
  selectedDate: Date;
}

export interface ChartPoint {
  date: string;
  severity: string;
  faultType: string;
  id: string;
}
