import { css } from '@emotion/react';
import { IoMdPlay } from 'react-icons/io';

export const Header = () => {
  return (
    <div css={containerStyle}>
      <IoMdPlay />
      <span>Data</span>
      <span>Mind</span>
      <span> AI</span>
    </div>
  );
};

const containerStyle = css`
  height: 56px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  padding-left: 20px;
  

  > svg {
    color: #29ebd6;
  }

  > span:last-child {
    color: #a8a6ef;
    margin-left: 4px;
  }
`;
