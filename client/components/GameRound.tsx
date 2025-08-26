import React, { useCallback } from 'react';
import { GameUserChoice } from '../../imports/types/game.types';
import { useGameController } from '../hooks/useGameController';
import ChoicesForm from './ChoicesForm';
import { WaitingScreen } from './WaitingScreen';
import RoundResult from './RoundResult';

const GameRound: React.FC = () => {
  const {
    gameActivity,
    userChoice,
    commitUserChoice,
    roundResult,
    startNewRound,
  } = useGameController();

  const onUserChoiceChange = useCallback(
    (userBet: GameUserChoice) => {
      commitUserChoice(userBet);
    },
    [commitUserChoice]
  );

  const onNewRound = useCallback(() => {
    startNewRound();
  }, [startNewRound]);

  const isWaitingScreen = !gameActivity;
  const isChoiceForm = gameActivity && !roundResult;
  const isResultScreen = gameActivity && !!roundResult;

  return (
    <React.Fragment>
      {isWaitingScreen ? <WaitingScreen /> : null}
      {isChoiceForm ? (
        <ChoicesForm userChoice={userChoice} onChoice={onUserChoiceChange} />
      ) : null}
      {isResultScreen ? (
        <RoundResult result={roundResult} onNewRound={onNewRound} />
      ) : null}
    </React.Fragment>
  );
};

export default GameRound;
