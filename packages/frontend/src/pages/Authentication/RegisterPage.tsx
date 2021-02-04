import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterOptions, useAuth } from '../../contexts/AuthenticationContext';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Mask, MaskHolder } from './components/Mask';

export const RegisterPage: FunctionComponent = () => {
  const {
    actions: { register },
  } = useAuth();

  const [values, setValues] = useState<RegisterOptions>({
    email: '',
    password: '',
    username: '',
  });

  const [confirmPassword, setConfirmPassword] = useState({
    confirmation: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const passwordConfirmation = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword({ confirmation: e.target.value });
  };

  const onSubmitFire = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (values.password !== confirmPassword.confirmation) {
      setFormError('passwords do not correspond');
    } else {
      try {
        await register(values);
      } catch (e) {
        setFormError(e.message);
      }
    }
  };

  return (
    <MaskHolder>
      <form onSubmit={onSubmitFire}>
        <Mask>
          <p style={{ color: '#000', textAlign: 'center' }}>{formError}</p>
          <Input name="username" type="text" label="Username" onChange={fieldDidChange} required={true} />
          <Input name="email" type="email" label="Email" onChange={fieldDidChange} required={true} />
          <Input name="password" label="Password" type="password" onChange={fieldDidChange} required={true} />
          <Input
            name="confirmation"
            label="Confirm password"
            type="password"
            onChange={passwordConfirmation}
            required={true}
          />
          <Button color="primary" type="submit">
            Register
          </Button>
          <Link to="/login">Back to Login</Link>
        </Mask>
        <p style={{ color: '#000', textAlign: 'center' }}>{formError}</p>
      </form>
    </MaskHolder>
  );
};
