import { getLocation, replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import logo from '../../../logo-420-x-108.png';
import { IRegisterValidation } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { getErrorMessageResponse } from '../../../utils';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { RESPONSE_STATUS_SUCCESS, RESPONSE_STATUS_USER_ALREADY } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../../auth/redux/authReducer';
import { fetchThunk } from '../../common/redux/thunk';
import RegisterForm from '../components/RegisterForm';

interface Props {}

const RegisterPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [locations, setLocations] = useState([]);

  const getState = React.useCallback(
    async (pid: number) => {
      const json = await dispatch(fetchThunk(API_PATHS.getLocation + '?pid=' + pid, 'get'));

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        return json.data;
      }
      setErrorMessage(getErrorMessageResponse(json));
      return json;
    },
    [dispatch],
  );

  const onRegister = async (values: IRegisterValidation) => {
    setErrorMessage('');
    setLoading(true);

    const json = await dispatch(
      fetchThunk(API_PATHS.signUp, 'post', {
        email: values.email,
        password: values.password,
        repeatPassword: values.rePassword,
        region: +values.region,
        state: +values.state,
        gender: values.gender,
        name: values.name,
      }),
    );

    setLoading(false);
    console.log('json status code: ', json.code);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      dispatch(setUserInfo(json.data));
      Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: 1 });
      dispatch(replace(ROUTES.login));
      return;
    } else if (json?.code === RESPONSE_STATUS_USER_ALREADY) {
      setErrorMessage('Tài khoản đã tồn tại!');
      return;
    }

    setErrorMessage(getErrorMessageResponse(json));
  };

  const getLocation = React.useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setLocations(json.data);
    }
  }, [dispatch]);

  useEffect(() => {
    getLocation();
    return () => {};
  }, [getLocation]);

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={logo} alt="" style={{ maxWidth: '250px', margin: '32px' }} />
      <RegisterForm
        state={getState}
        locations={locations}
        onLoading={loading}
        onRegister={onRegister}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default RegisterPage;
