import { useState, useEffect } from "react";
import { v4 as id } from "uuid";
import "./Note.css";

const Note = () => {
  // object waiting for inputs values
  const [inputValue, setInputValue] = useState({
    id: "",
    inputTitle: "",
    inputText: "",
  });

  // array waiting for inputs to build notes
  const [notes, setNotes] = useState([]);

  // empty variable waiting for the object to be edited
  const [editNote, setEditNote] = useState(null);

  //
  // function to pass input values to the object
  const handleUserInput = (e) => {
    setInputValue({
      ...inputValue,
      id: id(),
      [e.target.name]: e.target.value,
    });
  };

  // function to submit user inputs if not missing, populate the array and restore the inputValue
  const addUserInput = (e) => {
    e.preventDefault();

    if (inputValue.inputTitle === "" || inputValue.inputText === "") {
      alert("Something is missing");
      return;
    } else {
      setNotes([inputValue, ...notes]);
    }

    setInputValue({
      inputTitle: "",
      inputText: "",
    });
  };

  // function for removing the note
  const removeNote = (idNum) => {
    const newNotes = notes.filter((note) => note.id !== idNum);
    setNotes(newNotes);
  };

  //functions for updating and saving the values of the edited note
  const updateNote = (noteToEdit) => {
    setEditNote(noteToEdit);
  };

  const updateTheVal = (e) => {
    setEditNote({
      ...editNote,
      [e.target.name]: e.target.value,
    });
  };

  const saveValuesUpdated = () => {
    const newNotes = notes.filter((note) => {
      return note.id !== editNote.id;
    });
    setNotes([editNote, ...newNotes]);
    setEditNote(null);
  };

  // handle local storage to save notes
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes") || [];
    const notesToBeRendered = JSON.parse(storedNotes);
    setNotes(notesToBeRendered);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <form className="form">
        <textarea
          maxLength={20}
          onChange={handleUserInput}
          value={inputValue.inputTitle}
          placeholder="Title"
          name="inputTitle"
        ></textarea>
        <textarea
          onChange={handleUserInput}
          value={inputValue.inputText}
          placeholder="Text"
          name="inputText"
        ></textarea>
        <button onClick={addUserInput} type="submit">
          create
        </button>
      </form>

      <div className="notes-container">
        {notes.map((note) => {
          return (
            <div key={note.id} className="note">
              {editNote?.id !== note.id ? (
                <PrototypeNote
                  inputTitle={note.inputTitle}
                  inputText={note.inputText}
                  clickEdit={() => updateNote(note)}
                  clickDelete={() => removeNote(note.id)}
                  readOnly={true}
                />
              ) : (
                <EditableNote
                  inputTitle={editNote.inputTitle}
                  inputText={editNote.inputText}
                  changeUpdateValues={updateTheVal}
                  clickSaveChanges={saveValuesUpdated}
                  readOnly={false}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

//
const PrototypeNote = ({
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

export default Note;
