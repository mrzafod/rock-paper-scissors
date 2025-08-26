import React from 'react';

export const WaitingScreen: React.FC = () => {
  return (
    <main className='layout' id='waiting-screen' aria-label='waiting-scren'>
      <h1>Waiting for the Spock</h1>
      <span className='buzzer'>🛸</span>
    </main>
  );
};
