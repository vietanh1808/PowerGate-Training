import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ROUTES } from '../../../configs/routes';

interface Props {}

const HomePage = (props: Props) => {
  return (
    <div className="container-fluid h-100 d-flex flex-column align-self-center align-items-center">
      <div className="body ">
        <div className=" ">
          <div>
            <a href={ROUTES.photo} className="">
              Photos Page
            </a>
          </div>
          <div>
            <a href={ROUTES.payroll} className="">
              Payroll Page
            </a>
          </div>
          <div>
            <a href={ROUTES.detailUser} className="">
              My Profile Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
