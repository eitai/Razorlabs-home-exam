import { css } from '@emotion/react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../../types/modalTypes';

interface CustomDropdownProps {
  title: string;
  name: keyof FormValues;
  options: string[];
  register: UseFormRegister<FormValues>;
}

export const CustomDropdown = ({ title, name, options, register }: CustomDropdownProps) => (
  <div css={container}>
    <span css={labelStyle}>{title}</span>
    <div css={selectWrapper}>
      <select css={selectStyle} {...register(name, { required: true })}>
        <option value='' hidden>
          Select {title}
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <IoChevronDownOutline size={16} css={chevronStyle} />
    </div>
  </div>
);

const container = css`
  position: relative;
`;

const labelStyle = css`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  display: block;
`;

const selectWrapper = css`
  position: relative;
`;

const selectStyle = css`
  width: 100%;
  padding: 5px 10px;
  font-size: 15px;
  border: none;
  border-bottom: 1px solid #ccc;
  appearance: none;
  background-color: transparent;
  color: #333;
  font-weight: 600;

  &:focus {
    outline: none;
    border-bottom: 2px solid #000;
  }
`;

const chevronStyle = css`
  position: absolute;
  right: 8px;
  top: 55%;
  transform: translateY(-50%);
  color: #333;
`;
