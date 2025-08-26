export type GameUserChoice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

export type GameUserRoundResult = {
  userId: string;
  userChoice: GameUserChoice;
  opponentUserId: string;
  status: 'win' | 'lose' | 'draw';
  opponentChoice: GameUserChoice;
  message: string;
};
