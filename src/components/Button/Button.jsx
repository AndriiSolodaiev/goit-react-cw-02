const Button = ({ text, clickHendler }) => {
  return <button onClick={clickHendler}>{text}</button>;
};

export default Button;
