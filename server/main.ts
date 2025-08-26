import { Meteor } from 'meteor/meteor';
import { GameUserChoice } from '../imports/types/game.types';
import { SocketAction } from '../imports/types/socket.types';
import { GameController } from './game.controller';
import { createSocketService } from './socket.service';

const activeConnections = new Set<string>();

// Entry point
Meteor.startup(() => {
  const io = createSocketService();
  const gameController = new GameController();

  io.on('connection', (socket) => {
    // Count new connection
    activeConnections.add(socket.id);

    // Unlock game for all players if there is more that 2
    if (activeConnections.size > 1) {
      io.emit(SocketAction.GameActivity, true);
    }

    // On user bet handle current round and send results
    socket.on(SocketAction.UserChoice, (userChoice: GameUserChoice) => {
      const roundResult = gameController.handleUserChoice(
        socket.id,
        userChoice
      );

      roundResult.forEach((result) =>
        io.to(result.userId).emit(SocketAction.RoundResult, result)
      );
    });

    // On user asks for a new round with opponent
    socket.on(SocketAction.NewRound, (opponentUserId: string) => {
      if (activeConnections.has(opponentUserId)) {
        io.to(opponentUserId).emit(SocketAction.NewRound);
      }
    });

    // On disconnect handle game acivity and lock all Oplayers
    socket.on('disconnect', () => {
      activeConnections.delete(socket.id);
      gameController.handleUserExit(socket.id);
      if (activeConnections.size < 2) {
        gameController.reset();
        io.emit(SocketAction.GameActivity, false);
      }
    });
  });
});
