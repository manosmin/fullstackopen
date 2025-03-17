interface RadioButtonProps {
    button: string;
    value: string;
    handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({ button, value, handleSelect }: RadioButtonProps) => {
  return (
    <label>
    {button}
    <input
        type="radio"
        id={button}
        name={button}
        value={button}
        checked={button === value}
        onChange={handleSelect}
    />
    </label>
  );
}

export default RadioButton;