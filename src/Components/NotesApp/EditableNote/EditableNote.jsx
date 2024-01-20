const EditableNote = ({
  inputTitle,
  inputText,
  readOnly,
  clickDelete,
  clickSaveChanges,
  changeUpdateValues,
}) => {
  return (
    <div>
      <textarea
        onChange={changeUpdateValues}
        readOnly={readOnly}
        value={inputTitle}
        name="inputTitle"
      ></textarea>
      <textarea
        onChange={changeUpdateValues}
        readOnly={readOnly}
        value={inputText}
        name="inputText"
      ></textarea>
      <div className="buttons">
        <button onClick={clickSaveChanges}>save</button>
        <button onClick={clickDelete}>delete</button>
      </div>
    </div>
  );
};

export default EditableNote;
