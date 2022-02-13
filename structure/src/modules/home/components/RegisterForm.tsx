import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IRegisterValidation, ILocationParams } from '../../../models/auth';
import { validateRegister, validRegister } from '../../auth/utils';

interface Props {
  onRegister(values: IRegisterValidation): void;
  onLoading: boolean;
  errorMessage: string;
  locations: Array<ILocationParams>;
  state(pid: number): Promise<any>;
}

const RegisterForm = (props: Props) => {
  const { onRegister, onLoading, errorMessage, state, locations } = props;

  const [states, setStates] = React.useState<ILocationParams[]>();
  const [genderChecked, setGenderChecked] = React.useState(0);
  const [validate, setValidate] = React.useState<IRegisterValidation>();
  const [formValues, setFormValues] = React.useState<IRegisterValidation>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
    gender: 'male',
    region: '',
    state: '',
  });
  const [defaultState, setDefaultState] = React.useState(true);

  const handleChangeRadio = () => {
    setFormValues({ ...formValues, gender: genderChecked === 1 ? 'male' : 'female' });
    setGenderChecked((prev) => 1 - prev);
  };

  const handleSubmit = React.useCallback(() => {
    const validate = validateRegister(formValues);
    setValidate(validate);

    if (!validRegister(validate)) {
      return;
    }

    onRegister(formValues);
  }, [onRegister, formValues]);

  const renderState = (pid: number) => {
    state(pid).then((response) => {
      setStates(response);
    });
  };

  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      onSubmit={(e) => {
        e.preventDefault(); // Không cho gửi form
        handleSubmit();
      }}
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <div className="form-group mb-2">
        <FormattedMessage id="email" />
        <input
          type="email"
          className="form-control"
          value={formValues.email}
          onChange={(e) => {
            setFormValues({ ...formValues, email: e.target.value });
          }}
        />

        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}
      </div>
      <div className="form-group mb-3">
        <FormattedMessage id="password" />
        <input
          type="password"
          className="form-control"
          onChange={(e) => {
            setFormValues({ ...formValues, password: e.target.value });
          }}
        />

        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>
      <div className="form-group mb-3">
        <FormattedMessage id="rePassword" />
        <input
          type="password"
          className="form-control"
          onChange={(e) => {
            setFormValues({ ...formValues, rePassword: e.target.value });
          }}
        />

        {!!validate?.rePassword && (
          <small className="text-danger">
            <FormattedMessage id={validate?.rePassword} />
          </small>
        )}
      </div>

      <div className="form-group mb-3">
        <FormattedMessage id="name" />
        <input
          type="text"
          className="form-control"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              name: e.target.value,
            })
          }
        />

        {!!validate?.name && (
          <small className="text-danger">
            <FormattedMessage id={validate?.name} />
          </small>
        )}
      </div>
      <div className="form-group mb-3">
        <FormattedMessage id="gender" />
        <div className="d-flex justify-content-around" style={{ width: 150 }}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              checked={genderChecked === 0}
              onChange={handleChangeRadio}
            />
            <label className="form-check-label">Nam</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              checked={genderChecked === 1}
              onChange={handleChangeRadio}
            />
            <label className="form-check-label">Nữ</label>
          </div>
        </div>
      </div>
      <div className="form-group mb-3">
        <FormattedMessage id="region" />
        <select
          className="form-control"
          onChange={(e) => {
            setFormValues({ ...formValues, region: e.target.value, state: '' });
            renderState(+e.target.value);
            setDefaultState(true);
          }}
        >
          <option defaultValue="" selected>
            --- Chọn Thành Phố ---
          </option>
          {locations.map((location, index) => (
            <option value={location.id} key={index}>
              {location.name}
            </option>
          ))}
        </select>

        {!!validate?.region && (
          <small className="text-danger">
            <FormattedMessage id={validate?.region} />
          </small>
        )}
      </div>

      {formValues.region ? (
        <div className="form-group mb-3">
          <FormattedMessage id="state" />
          <select
            className="form-control"
            onChange={(e) => {
              setFormValues({ ...formValues, state: e.target.value });
              setDefaultState(false);
            }}
          >
            <option defaultValue="" selected={defaultState}>
              --- Chọn Khu Vực ---
            </option>
            {states?.map((element, index) => {
              return (
                <option value={element.id} key={index}>
                  {element.name}
                </option>
              );
            })}
          </select>

          {!!validate?.state && (
            <small className="text-danger">
              <FormattedMessage id={validate?.state} />
            </small>
          )}
        </div>
      ) : null}

      <div className="row  justify-content-around">
        <div className="col-md-auto">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={onLoading}
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {onLoading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
