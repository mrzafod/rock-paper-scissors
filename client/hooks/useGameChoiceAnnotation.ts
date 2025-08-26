import { GameUserChoice } from '../../imports/types/game.types';

const choiceIcons: Record<GameUserChoice, string> = {
  rock: '🪨',
  paper: '🧻',
  scissors: '✂️',
  lizard: '🦎',
  spock: '🖖',
} as const;

const choiceList = Object.entries(choiceIcons).map(([key, icon]) => ({
  key,
  icon,
}));

export const useGameChoiceList = () => {
  return choiceList;
};

export const useGameChoiceIcons = () => {
  return choiceIcons;
};
