import { useMemo, useState } from 'react';
import { Table } from '../Table';
import { getSortedDataByDateAndSeverity } from '../../services/lineChartService';
import { TableProps } from '../../types/tableTypes';
import { FiPlus } from 'react-icons/fi';
import { css } from '@emotion/react';
import { Modal } from '../Modal/Modal';

export const DiagnosticTable = ({ diagnosticData, setDiagnosticData }: TableProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const sortedByDateDiagnosticTableData = useMemo(() => getSortedDataByDateAndSeverity(diagnosticData), [diagnosticData]);

  const diagnosticTableProps = { setDiagnosticData, diagnosticData: sortedByDateDiagnosticTableData };

  const modalProps = { isModalOpened, onClose: () => setIsModalOpened(false), setDiagnosticData: setDiagnosticData };

  return (
    <>
      <div>
        <div css={titleWrapperStyle}>
          <span>Diagnostics</span>
          <button onClick={() => setIsModalOpened(true)}>
            <FiPlus />
            Add new
          </button>
        </div>
        <Table {...diagnosticTableProps} />
      </div>
      <Modal {...modalProps} />
    </>
  );
};

const titleWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline:15px;
  margin-top: 30px;

  > button {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #7576ec;
    color: white;
    border: none;
    padding: 2px 5px;
    border-radius: 5px;
    cursor: pointer;

  
  }
`;
