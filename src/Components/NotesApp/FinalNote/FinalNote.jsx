const FinalNote = ({
  inputTitle,
  inputText,
  readOnly,
  clickDelete,
  clickEdit,
}) => {
  return (
    <div>
      <textarea
        readOnly={readOnly}
        value={inputTitle}
        name="inputTitle"
      ></textarea>
      <textarea
        readOnly={readOnly}
        value={inputText}
        name="inputText"
      ></textarea>
      <div className="buttons">
        <button onClick={clickEdit}>edit</button>
        <button onClick={clickDelete}>delete</button>
      </div>
    </div>
  );
};

export default FinalNote;
