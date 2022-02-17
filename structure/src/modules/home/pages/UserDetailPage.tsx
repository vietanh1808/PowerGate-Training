import { replace } from 'connected-react-router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';

const UserDetailPage = () => {
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  useEffect(() => {
    if (history.action === 'POP') {
      dispatch(replace(ROUTES.home));
    }
    return () => {};
  }, []);

  return <div>UserDetailPage</div>;
};

export default UserDetailPage;
