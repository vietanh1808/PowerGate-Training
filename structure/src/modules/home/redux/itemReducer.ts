import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IItemParams } from '../../../models/item';

export interface ItemState {
  photo: Array<IItemParams>
}

export const setPhoto = (photo: Array<IItemParams>) => {
  return setPhotoAction(photo);
};

const setPhotoAction = createCustomAction('item/setPhoto', (photo: Array<IItemParams>) => ({
    photo
  }));

const actions = { setPhotoAction };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: ItemState = {
    photo: []
  }, // truyền initstal Title tại đây
  action: Action,
) {
  switch (action.type) {
    case getType(setPhotoAction):
      return  { ...state, photo: action.photo };
    default:
      return state;
  }
}
