import { replace } from 'connected-react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { IUser } from '../../../models/user';
import { AppState } from '../../../redux/reducer';

interface Props {}

const UserDetailPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const profile = useSelector((state: AppState) => state.profile.user);

  return (
    <div className="container">
      <div className="row">
        <a href={ROUTES.home}>Back To Home</a>
      </div>
      <div className="row justify-content-center">
        <div className="row">User Detail Page</div>
        <div className="row">Name: {profile?.name}</div>
        <div className="row">Email: {profile?.email}</div>
        <div className="row">Region: {profile?.region}</div>
      </div>
    </div>
  );
};

export default UserDetailPage;
