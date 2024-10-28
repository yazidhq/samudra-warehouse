const Button = ({ color, children }) => {
  return <button className={`btn btn-${color}`}>{children}</button>;
};

export default Button;
