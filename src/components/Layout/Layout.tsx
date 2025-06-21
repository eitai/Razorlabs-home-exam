/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { SideBar } from '../../features/SideBar/SideBar';
import { Header } from '../../features/Header/Header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div css={layoutStyle}>
      <SideBar />
      <div css={contentWrapperStyle}>
        <Header />
        <main css={mainStyle}>{children}</main>
      </div>
    </div>
  );
};

const layoutStyle = css`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const contentWrapperStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  width: 100%;
`;

const mainStyle = css`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;
