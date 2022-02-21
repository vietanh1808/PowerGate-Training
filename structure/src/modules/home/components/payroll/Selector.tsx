import React from 'react';

interface Props {
  style?: Object;
  data: Array<string>;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

const Selector = (props: Props) => {
  const { style, data, onChange, placeholder } = props;

  return (
    <select className="form-select" style={style} onChange={onChange}>
      <option value={''} selected hidden>
        {placeholder}
      </option>
      {data.map((element, index) => (
        <option value={element} key={index}>
          {element}
        </option>
      ))}
    </select>
  );
};

export default Selector;
