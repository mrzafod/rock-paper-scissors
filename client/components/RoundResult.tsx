import React from 'react';
import { GameUserRoundResult } from '../../imports/types/game.types';
import { useGameChoiceIcons } from '../hooks/useGameChoiceAnnotation';

type RoundResultProps = {
  result: GameUserRoundResult;
  onNewRound: () => void;
};

const RoundResult: React.FC<RoundResultProps> = ({ result, onNewRound }) => {
  const choiceIcons = useGameChoiceIcons();

  return (
    <main id='round-result' className='layout' aria-label='round-result'>
      <div
        className={result.status == 'win' ? 'choice choice-active' : 'choice'}
      >
        {choiceIcons[result.userChoice]}
        <span>{result.userChoice}</span>
      </div>
      <div>
        <h1>It is a {result.status}!</h1>
        <h3>
          <em>{result.message}</em>
        </h3>
        <button className='button' onClick={onNewRound}>
          New round
        </button>
      </div>
      <div
        className={result.status == 'lose' ? 'choice choice-active' : 'choice'}
      >
        {choiceIcons[result.opponentChoice]}
        <span>{result.opponentChoice}</span>
      </div>
    </main>
  );
};

export default RoundResult;
