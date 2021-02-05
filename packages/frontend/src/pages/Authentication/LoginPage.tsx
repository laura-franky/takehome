import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { UnauthorizedLayout } from '../../components/UnauthorizedLayout';
import { LoginOptions, useAuth } from '../../contexts/AuthenticationContext';
import { Input } from './components/Input';
import { StyledLink } from './components/Link';
import { Mask, MaskHolder } from './components/Mask';
import { StyledButton } from './components/StyledButton';

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
    <UnauthorizedLayout>
      <MaskHolder>
        <form onSubmit={onSubmitForm}>
          <Mask>
            <p id="formError" style={{ color: '#000000', textAlign: 'center' }}>
              {formError}
            </p>
            <Input name="username" type="text" label="Username" onChange={fieldDidChange} required={true} />
            <Input name="password" label="Password" type="password" onChange={fieldDidChange} required={true} />
            <StyledButton type="submit">Log in</StyledButton>
            <StyledLink to="/register">Register</StyledLink>
          </Mask>
        </form>
      </MaskHolder>
    </UnauthorizedLayout>
  );
};
