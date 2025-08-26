import React from 'react';
import { GameUserChoice } from '../../imports/types/game.types';
import { useGameChoiceList } from '../hooks/useGameChoiceAnnotation';

type ChoicesFormProps = {
  onChoice: (choice: GameUserChoice) => void;
  userChoice?: GameUserChoice | null;
};

const ChoicesForm: React.FC<ChoicesFormProps> = ({ userChoice, onChoice }) => {
  const choices = useGameChoiceList();

  const onChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChoice(e.target.value as GameUserChoice);
  };

  return (
    <form
      id='choices-form'
      className='layout'
      role='radiogroup'
      aria-label='choices-form'
      autoFocus
    >
      {choices.map((choice) => (
        <React.Fragment key={choice.key}>
          <input
            tabIndex={-1}
            className='choice-input'
            type='radio'
            name='pick'
            id={choice.key}
            value={choice.key}
            checked={userChoice === choice.key}
            onChange={onChoiceChange}
          />
          <label className='choice' htmlFor={choice.key}>
            {choice.icon}
            <span>{choice.key}</span>
          </label>
        </React.Fragment>
      ))}
    </form>
  );
};

export default ChoicesForm;
