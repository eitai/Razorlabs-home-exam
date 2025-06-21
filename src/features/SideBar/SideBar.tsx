import { css } from '@emotion/react';
import { BiSolidFactory } from 'react-icons/bi';
import { GoInfo } from 'react-icons/go';
import { CiBellOn } from 'react-icons/ci';
import { MdOutlineInsertDriveFile } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import { IconType } from 'react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { RxExit } from 'react-icons/rx';

interface SideBarNavItemType {
  icon: IconType;
  pageRoute: string;
}

const SideBarNavItems: SideBarNavItemType[] = [
  { pageRoute: '/diagnostic', icon: BiSolidFactory },
  { pageRoute: '/info', icon: GoInfo },
  { pageRoute: '/notifications', icon: CiBellOn },
  { pageRoute: '/reports', icon: MdOutlineInsertDriveFile },
  { pageRoute: '/settings', icon: GoGear },
];

export const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div css={containerStyle}>
      <div css={routesWrapperStyle}>
        {SideBarNavItems.map(({ icon: Icon, pageRoute }) => (
          <div
            key={pageRoute}
            css={iconWrapperStyle({ isCurrentPage: pageRoute === location.pathname })}
            onClick={() => navigate(pageRoute)}
          >
            <Icon />
          </div>
        ))}
      </div>

      <div>
        <RxExit />
      </div>
    </div>
  );
};

const iconWrapperStyle = ({ isCurrentPage }: { isCurrentPage: boolean }) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${isCurrentPage ? '#29ebd6' : 'transperant'};
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  > svg {
    color: ${isCurrentPage ? '#000000' : '#ffffff'};
    font-size: 25px;
    transition: color 0.3s ease;
  }
`;

const routesWrapperStyle = css`
display: flex;
flex-direction: column;
gap: 25px;
`;

const containerStyle = css`
  width: 38px;
  background-color: #302d6a;
  padding: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh; 
`;
