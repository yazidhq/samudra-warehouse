const Image = ({ src, width, style }) => {
  return (
    <img src={src} className={`img-fluid ${style}`} width={width} alt="" />
  );
};

export default Image;
