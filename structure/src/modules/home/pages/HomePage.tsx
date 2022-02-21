import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ROUTES } from '../../../configs/routes';

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="container">
      <div className="body justify-content-center align-items-center">
        <div className="d-flex justify-content-around border rounded">
          <a href={ROUTES.photo} className="">
            Photos Page
          </a>
          <a href={ROUTES.payroll} className="">
            Payroll Page
          </a>
          <a href={ROUTES.detailUser} className="">
            My Profile Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
