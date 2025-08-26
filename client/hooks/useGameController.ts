import { useCallback, useEffect, useState } from 'react';
import {
  GameUserChoice,
  GameUserRoundResult,
} from '../../imports/types/game.types';
import { SocketAction } from '../../imports/types/socket.types';
import { useSocket } from './useSocket';

export const useGameController = () => {
  const [roundResult, setRoundResult] = useState<GameUserRoundResult | null>();
  const [gameActivity, setGameActivity] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<GameUserChoice | null>();
  const socket = useSocket();

  const commitUserChoice = useCallback(
    (choice: GameUserChoice) => {
      if (!socket) return;
      socket.emit(SocketAction.UserChoice, choice);
      setUserChoice(choice);
    },
    [socket]
  );

  const startNewRound = useCallback(() => {
    setRoundResult(() => null);
    setUserChoice(() => null);

    if (!socket || !roundResult) return;
    socket.emit(SocketAction.NewRound, roundResult.opponentUserId);
  }, [socket, roundResult]);

  useEffect(() => {
    if (!socket) return;

    // On game activity
    socket.on(SocketAction.GameActivity, (activity: boolean) => {
      setGameActivity(() => activity);
      if (!activity) {
        setRoundResult(() => null);
        setUserChoice(() => null);
      }
    });

    // On round result
    socket.on(SocketAction.RoundResult, (result: GameUserRoundResult) =>
      setRoundResult(result)
    );

    // On new round
    socket.on(SocketAction.NewRound, () => {
      setRoundResult(() => null);
      setUserChoice(() => null);
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  return {
    gameActivity,
    userChoice,
    roundResult,
    commitUserChoice,
    startNewRound,
  };
};
