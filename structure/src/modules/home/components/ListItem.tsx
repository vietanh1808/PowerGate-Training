import React, { memo, useEffect, useRef, useState } from 'react';

interface Props {
  index: number;
  thumbnail: string;
  title: string;
  onChangeText: (text: string, index: number) => void;
}

const ListItem = (props: Props) => {
  const { index, thumbnail, title, onChangeText } = props;

  const handleChange = (e: any) => {
    onChangeText(e.target.value, index);
  };

  const handleMouseOver = (e: any) => {
    e.currentTarget.focus();
  };

  return (
    <div
      className="d-flex justify-content-around mb-3 rounded p-2"
      style={{ backgroundColor: index % 2 === 0 ? 'grey' : 'white', border: 1, alignItems: 'center' }}
    >
      <div className="">
        <img className="rounded-circle" src={thumbnail} width={100} height={100} />
      </div>
      <div className="">
        <input
          type="text"
          className="form-control border-1"
          value={title}
          onChange={handleChange}
          onMouseOver={handleMouseOver}
        />
      </div>
    </div>
  );
};

export default memo(ListItem);
