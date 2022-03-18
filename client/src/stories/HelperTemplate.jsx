import React from 'react';

import { Header } from './Header';
import './HelperTemplate.scss';

export const HelperTemplate = () => {
  const [user, setUser] = React.useState();

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />
    </article>
  );
};
