import { css } from '@emotion/react';
import { CustomDropdown } from '../CustomDropdown/CustomDropdown';
import { DatePicker } from '../../features/DatePicker/DatePicker';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { FormValues, ModalProps } from '../../types/modalTypes';
import { FaultDropdownOptions, SeverityDropdownOptions } from '../../services/modalService';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const Modal = ({ isModalOpened, onClose, setDiagnosticData }: ModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerPopupOpened, setIsDatePickerPopupOpened] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      faultType: '',
      severity: '',
    },
  });

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: FormValues) => {
    setDiagnosticData((prev) => [
      ...prev,
      {
        ...data,
        date: format(selectedDate, 'yyyy-MM-dd'),
        id: uuidv4(),
      },
    ]);

    onCloseModal();
  };

  const datePickerProps = { selectedDate, setSelectedDate, isDatePickerPopupOpened };

  return (
    <div css={[overlayStyle, isModalOpened ? fadeIn : fadeOut]} onClick={onCloseModal}>
      <div css={[modalStyle, isModalOpened ? fadeIn : fadeOut]} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div css={titleStyle}>Add new diagnostic</div>
          <div css={fieldGroup}>
            <label css={labelStyle}>Diagnostic Date</label>
            <div css={datePickerWrapper} onClick={() => setIsDatePickerPopupOpened((prev) => !prev)}>
              <DatePicker {...datePickerProps} />
              <IoChevronDownOutline size={16} css={chevronIcon} />
            </div>
          </div>
          <div css={fieldGroup}>
            <CustomDropdown title='Fault Type' name='faultType' options={FaultDropdownOptions} register={register} />
            {errors.faultType && <span css={errorText}>Fault type is required</span>}
          </div>
          <div css={fieldGroup}>
            <CustomDropdown title='Severity' name='severity' options={SeverityDropdownOptions} register={register} />
            {errors.severity && <span css={errorText}>Severity is required</span>}
          </div>
          <div css={btnsWrapperStyle}>
            <button type='button' css={cancelBtnStyle} onClick={onCloseModal}>
              Cancel
            </button>
            <button type='submit' css={saveBtnStyle}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: opacity 0.25s ease, visibility 0.25s ease;
`;

const modalStyle = css`
  background: white;
  width: 320px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1001;
  transition: opacity 0.25s ease;
`;

const fadeIn = css`
  opacity: 1;
  visibility: visible;
`;

const fadeOut = css`
  opacity: 0;
  visibility: hidden;
`;

const titleStyle = css`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
  color: #333;
`;

const fieldGroup = css`
  margin-bottom: 16px;
`;

const labelStyle = css`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  display: block;
`;

const datePickerWrapper = css`
  position: relative;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  cursor: pointer;
`;

const chevronIcon = css`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
`;

const btnsWrapperStyle = css`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const cancelBtnStyle = css`
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
`;

const saveBtnStyle = css`
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #7073ea;
  color: white;
  cursor: pointer;
`;

const errorText = css`
  color: red;
  font-size: 12px;
  margin-top: 4px;
  display: block;
`;
