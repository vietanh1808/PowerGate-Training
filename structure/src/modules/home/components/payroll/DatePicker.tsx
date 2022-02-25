import React, { useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (event: any) => void;
  min?: string;
  placeholder?: string;
  id: string;
}

const DatePicker = (props: Props) => {
  const { value, onChange, min, placeholder, id } = props;
  const [typeInput, setTypeInput] = useState('text');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setTypeInput('date');
  };

  const handleTest = (e: any) => {
    console.log('test');
  };

  return (
    <input
      id={id}
      ref={inputRef}
      min={min}
      className="form-input"
      type={typeInput}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onClick={handleClick}
    />
  );
};

export default DatePicker;
