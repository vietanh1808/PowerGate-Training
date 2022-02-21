import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { IItemParams } from '../../../models/item';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import ListItem from '../components/ListItem';
import { setPhoto } from '../redux/itemReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../configs/routes';
import { clearUserInfo } from '../../auth/redux/authReducer';

interface Props {}

const nextIndexItem = 9;

const PhotoPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const photo = useSelector((state: AppState) => state.items.photo);
  const profile = useSelector((state: AppState) => state.profile);

  const [clonePhoto, setClonePhoto] = useState<Array<IItemParams>>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [currentIndexItem, setCurrentIndexItem] = useState(0);

  const handleConfirm = () => {
    const newItems = [...clonePhoto];

    dispatch(setPhoto([...newItems]));
    setDisableButton(true);
  };

  const handleChangeText = (text: string, index: number) => {
    handleDisableButton();
    const newItems = [...clonePhoto];

    const cloneItem = { ...newItems[index], title: text };
    newItems[index] = cloneItem;

    setClonePhoto(newItems);
  };

  const handleDisableButton = useCallback(() => {
    // vẫn re-render
    setDisableButton(false);
  }, [disableButton]);

  const handleReset = () => {
    setDisableButton(true);
    setClonePhoto(photo);
  };

  const listenToScroll = useCallback(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;

    if (scrolled === 1) {
      // position is End of Page
      fetchData();
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dispatch(
        fetchThunk(
          `https://jsonplaceholder.typicode.com/photos?_start=${currentIndexItem}&_end=${
            currentIndexItem + nextIndexItem
          }`,
          'get',
        ),
      );
      setLoading(false);
      setClonePhoto((prev) => {
        return [...prev, ...data];
      });
      dispatch(setPhoto([...clonePhoto, ...data]));
      setCurrentIndexItem((prev) => prev + nextIndexItem);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleLogout = () => {
    setLoading(true);
    Cookies.remove(ACCESS_TOKEN_KEY);
    dispatch(clearUserInfo(profile));
    dispatch(replace(ROUTES.login));
    setLoading(false);
  };

  const handleClickDetail = () => {
    dispatch(replace(ROUTES.detailUser));
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    setLoadingPage(true);
    fetchData();
    setLoadingPage(false);
    return () => {
      window.removeEventListener('scroll', listenToScroll);
    };
  }, []);

  return (
    <div className="container mt-3 justify-content-center" style={{ width: '100%', maxWidth: 500, borderWidth: 1 }}>
      {loadingPage === true ? (
        <div className="spinner-border justify-content-center" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-primary m-2" onClick={handleClickDetail}>
                Profile
              </button>
              <button type="button" className="btn btn-primary m-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div className="col">
              <button disabled={disableButton} type="button" className="btn btn-primary m-2" onClick={handleConfirm}>
                Confirm
              </button>
              <button type="button" className="btn btn-primary m-2" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
          {clonePhoto.map((element, index) => (
            <ListItem
              onChangeText={handleChangeText}
              key={index}
              index={index}
              thumbnail={element.thumbnailUrl}
              title={element.title}
            />
          ))}
          {loading === true ? (
            <div className="spinner-border justify-content-center" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <div>End of Page</div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(PhotoPage);
