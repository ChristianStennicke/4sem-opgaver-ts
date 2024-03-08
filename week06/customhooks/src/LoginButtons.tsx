import React from 'react';
import { useAuth } from './AuthContext';

const LoginButtons: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.username}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login('Christian Stennicke')}>Login</button>
      )}
    </div>
  );
};

export default LoginButtons;
