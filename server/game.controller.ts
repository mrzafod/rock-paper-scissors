import {
  GameUserChoice,
  GameUserRoundResult,
} from '../imports/types/game.types';

type GameRound = Map<string, GameUserChoice>;

type RoundResultKey = `${GameUserChoice}.${GameUserChoice}`;

type RoundResolution = {
  firstUserWins?: boolean;
  lastUserWins?: boolean;
  message: string;
};

export const roundResolutionMap: Record<RoundResultKey, RoundResolution> = {
  // Draws
  'rock.rock': { message: 'Rock loves Rock' },
  'paper.paper': { message: 'Paper loves Paper' },
  'scissors.scissors': { message: 'Scissors loves Scissors' },
  'lizard.lizard': { message: 'Lizard loves Lizard' },
  'spock.spock': { message: 'Spock loves Spock' },

  // Rock
  'rock.scissors': { firstUserWins: true, message: 'Rock crushes Scissors' },
  'scissors.rock': { lastUserWins: true, message: 'Rock crushes Scissors' },
  'rock.lizard': { firstUserWins: true, message: 'Rock crushes Lizard' },
  'lizard.rock': { lastUserWins: true, message: 'Rock crushes Lizard' },
  'rock.paper': { lastUserWins: true, message: 'Paper covers Rock' },
  'paper.rock': { firstUserWins: true, message: 'Paper covers Rock' },
  'rock.spock': { lastUserWins: true, message: 'Spock vaporizes Rock' },
  'spock.rock': { firstUserWins: true, message: 'Spock vaporizes Rock' },

  // Paper
  'paper.scissors': { lastUserWins: true, message: 'Scissors cuts Paper' },
  'scissors.paper': { firstUserWins: true, message: 'Scissors cuts Paper' },
  'paper.lizard': { lastUserWins: true, message: 'Lizard eats Paper' },
  'lizard.paper': { firstUserWins: true, message: 'Lizard eats Paper' },
  'paper.spock': { firstUserWins: true, message: 'Paper disproves Spock' },
  'spock.paper': { lastUserWins: true, message: 'Paper disproves Spock' },

  // Scissors
  'scissors.lizard': {
    firstUserWins: true,
    message: 'Scissors decapitates Lizard',
  },
  'lizard.scissors': {
    lastUserWins: true,
    message: 'Scissors decapitates Lizard',
  },
  'scissors.spock': { lastUserWins: true, message: 'Spock smashes Scissors' },
  'spock.scissors': { firstUserWins: true, message: 'Spock smashes Scissors' },

  // Lizard
  'lizard.spock': { firstUserWins: true, message: 'Lizard poisons Spock' },
  'spock.lizard': { lastUserWins: true, message: 'Lizard poisons Spock' },
};

export class GameController {
  private openRound: GameRound = new Map();

  reset() {
    this.openRound.clear();
  }

  handleUserExit(userId: string) {
    this.openRound.delete(userId);
  }

  handleUserChoice(
    userId: string,
    userChoice: GameUserChoice
  ): GameUserRoundResult[] {
    this.openRound.set(userId, userChoice);
    if (this.openRound.size == 1) return [];

    const [firstUserId, lastUserId] = Array.from(this.openRound.keys());
    const [firstUserChoice, lastUserChoice] = Array.from(
      this.openRound.values()
    );
    const roundResultKey = `${firstUserChoice}.${lastUserChoice}` as const;

    this.openRound.clear();

    const resolution = roundResolutionMap[roundResultKey];

    const firstUserResult: GameUserRoundResult = {
      userId: firstUserId,
      userChoice: firstUserChoice,
      opponentUserId: lastUserId,
      opponentChoice: lastUserChoice,
      status: 'draw',
      message: resolution.message,
    };
    const lastUserResult: GameUserRoundResult = {
      userId: lastUserId,
      userChoice: lastUserChoice,
      opponentUserId: firstUserId,
      opponentChoice: firstUserChoice,
      status: 'draw',
      message: resolution.message,
    };

    // First user wins
    if (resolution.firstUserWins) {
      firstUserResult.status = 'win';
      lastUserResult.status = 'lose';
    }

    // Second user wins
    if (resolution.lastUserWins) {
      firstUserResult.status = 'lose';
      lastUserResult.status = 'win';
    }

    return [firstUserResult, lastUserResult];
  }
}
