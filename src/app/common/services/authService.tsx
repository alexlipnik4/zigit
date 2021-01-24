import { LoginInfo } from '../../components/pages/Login/Login.model';

export const login = async (user: LoginInfo) => {
  const response = await fetch(
    'https://private-052d6-testapi4528.apiary-mock.com/authenticate',
    {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'content-Type': 'application/json',
      },
    },
  );
  const json = await response.json();

  return json;
};
