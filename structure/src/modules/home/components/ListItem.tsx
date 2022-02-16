import React, { memo, useEffect, useRef, useState } from 'react';

interface Props {
  index: number;
  thumbnail: string;
  title: string;
  onChangeText: (text: string, index: number) => void;
}

const ListItem = (props: Props) => {
  const { index, thumbnail, title, onChangeText } = props;

  return (
    <div
      className="d-flex justify-content-around mb-3  "
      style={{ backgroundColor: index % 2 === 0 ? 'grey' : 'white', border: 1, alignItems: 'center' }}
    >
      <div className="">
        <img src={thumbnail} width={100} height={100} />
      </div>
      <div className="">
        <input
          type="text"
          className="form-control border-1"
          value={title}
          onChange={(e) => {
            onChangeText(e.target.value, index);
          }}
          onMouseOver={(e) => {
            e.currentTarget.focus();
          }}
        />
      </div>
    </div>
  );
};

export default ListItem;
