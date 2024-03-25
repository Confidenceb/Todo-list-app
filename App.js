import { useState } from "react";
import "./index.css";

/*function App() {
  const [item, setItem] = useState([]);

  function handleAddItem(item) {
    setItem((items) => [...items, item]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Todo-list</p>
      </header>
      <hr className="hr"></hr>

      <AddItem items={item} setItem={setItem} />
    </div>
  );
}
*/

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(text) {
    const newItem = {
      id: Date.now(), // Use the current timestamp as a simple unique ID
      text: text,
    };
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Todo-list</p>
      </header>
      <hr className="hr"></hr>
      <AddItem handleAddItem={handleAddItem} />
      {items.length > 0 ? (
        <TasksList items={items} handleDeleteItems={handleDeleteItems} />
      ) : (
        <p>No task available</p>
      )}
    </div>
  );
}

export default App;

function TasksList({ items, handleDeleteItems }) {
  return (
    <div className="tasks-list">
      <ul className="tasks-list-items">
        {items.map((item) => (
          <li key={item.id} className="tasks-list-item">
            <div className="container-for-text-and-btn">
              <p className="tasks-list-item-text">{item.text}</p>
              <div className="btn-group">
                <Button onClick={() => handleDeleteItems(item.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/*
function AddItem({ items, setItem }) {
  const [addItem, setAddItem] = useState("");
  return (
    <form className="add-item-form">
      <input
        type="text"
        className="add-item-input"
        placeholder="add item..."
        //onChange={(e) => setAddItem(e.target.value)}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          setItem(addItem);
        }}
      >
        Add
      </Button>
    </form>
  );
}
*/

function AddItem({ handleAddItem }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="add-item-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue.trim()) {
          handleAddItem(inputValue);
          setInputValue(""); // Clear input after submission
        } // Clear input after submission
      }}
    >
      <input
        type="text"
        className="add-item-input"
        placeholder="Add item..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
}
