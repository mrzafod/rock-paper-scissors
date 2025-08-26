import React from 'react';
import { createRoot } from 'react-dom/client';
import GameRound from './components/GameRound';

const GameRoundMemo = React.memo(GameRound);

Meteor.startup(() => {
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  root.render(<GameRoundMemo />);
});
