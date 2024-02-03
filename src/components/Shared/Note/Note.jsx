const Note = ({ text }) => {
  return (
    <p>
      <span className="text-red-400">[Note]:</span> {text}
    </p>
  );
};

export default Note;
