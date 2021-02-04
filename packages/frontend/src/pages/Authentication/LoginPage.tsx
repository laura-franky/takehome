import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginOptions, useAuth } from '../../contexts/AuthenticationContext';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Mask, MaskHolder } from './components/Mask';

export const LoginPage: FunctionComponent = () => {
  const {
    actions: { login },
  } = useAuth();

  const [values, setValues] = useState<LoginOptions>({
    password: '',
    username: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    try {
      await login(values);
    } catch (e) {
      setFormError(e.message);
    }
  };

  return (
    <MaskHolder>
      <form onSubmit={onSubmitForm}>
        <Mask>
          <p id="formError" style={{ color: '#000000', textAlign: 'center' }}>
            {formError}
          </p>
          <Input name="username" type="text" label="Username" onChange={fieldDidChange} required={true} />
          <Input name="password" label="Password" type="password" onChange={fieldDidChange} required={true} />
          <Button color="primary" type="submit">
            Log in
          </Button>
          <Link to="/register">Register</Link>
        </Mask>
      </form>
    </MaskHolder>
  );
};
