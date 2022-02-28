import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import fs from 'fs';
import ModalUploadImg from '../components/profile/ModalUploadImg';

interface Props {}

const ProfilePage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const profile = useSelector((state: AppState) => state.profile.user);
  const [myProfile, setMyProfile] = useState<any>({});
  const [eventHover, setEventHover] = useState(false);
  const inputFileRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    const user = await dispatch(fetchThunk('api.training.div3.pgtest.co/api/v1/user'));
  }, []);

  useEffect(() => {
    // fetchData();

    setMyProfile({ ...myProfile, ...profile, avatar: 'avatar.png' });
  }, []);

  const handleEventImage = useCallback((e: any) => {
    switch (e.type) {
      case 'mouseover':
        setEventHover(true);
        break;
      case 'mouseout':
        setEventHover(false);
        break;
      case 'click':
        inputFileRef.current.click();
        break;
      default:
        break;
    }
  }, []);

  const handleChooseImage = (e: any) => {
    e.preventDefault();
    const file = e.target.files['0'];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      setMyProfile({ ...myProfile, avatar: event.target.result });
    });
    try {
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  const onShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="container">
      <a href={ROUTES.home}>Back To Home</a>
      {showModal && (
        <ModalUploadImg onHide={onHideModal} onShow={onShowModal} show={showModal} link={myProfile.avatar} />
      )}
      <div className="body w-100 justify-content-center ">
        <div className="">
          <h1>User Detail Page</h1>
        </div>
        <div className="">
          <input type={'file'} accept="image/*" onChange={handleChooseImage} hidden={true} ref={inputFileRef} />
          <img
            src={myProfile.avatar}
            className="img-thumbnail circle float-left"
            style={{ width: 100, height: 100, borderRadius: 50 }}
            onClick={handleEventImage}
          />
        </div>
        <div className="">Name: {myProfile.name}</div>
        <div className="">Email: {myProfile.email}</div>
        <div className="">Region: {myProfile.region}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
