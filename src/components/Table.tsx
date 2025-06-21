import { css } from '@emotion/react';
import { TableProps } from '../types/tableTypes';

export const Table = ({ diagnosticData }: TableProps) => {
  return (
    <div css={containerStyle}>
      <table css={tableStyle}>
        <thead css={theadStyle}>
          <tr>
            <th css={thStyle}>Diagnostic date</th>
            <th css={thStyle}>Fault type</th>
            <th css={thStyle}>Severity</th>
          </tr>
        </thead>
        <tbody>
          {diagnosticData.map((item) => (
            <tr key={item.id} css={rowStyle}>
              <td css={[tdStyle, roundedLeft]}>{item.date}</td>
              <td css={tdStyle}>{item.faultType}</td>
              <td css={[tdStyle, roundedRight]}>{item.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const containerStyle = css`
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin-top: 1rem;
  background-color: white;
`;

const tableStyle = css`
  width: 100%;
  font-size: 0.875rem;
  border-spacing: 0 8px;
  background-color: #f3f4f6;
  padding-inline: 10px;
`;

const theadStyle = css`
  background-color: #f3f4f6;
  color: #5c6676;
  font-weight: 500;
  text-align: left;
`;

const thStyle = css`
  padding: 5px 24px;
`;

const rowStyle = css`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const tdStyle = css`
  padding: 16px 24px;
`;

const roundedLeft = css`
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const roundedRight = css`
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;
