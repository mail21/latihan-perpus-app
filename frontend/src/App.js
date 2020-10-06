import React, { useState, useEffect } from 'react';
import './App.css';
import CardBook from './component/CardBook/CardBook';
import Modal from './component/Modal/Modal';
import axios from 'axios';

function App() {
  const [allBook, setAllBook] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:3000/getBuku').then((res) => setAllBook(res.data));
  });

  const deleteBook = (id) => {
    let r = window.confirm('Are you Sure??');
    if (r == true) {
      axios.delete(`http://localhost:3000/deleteBuku/${id}`);
    }
  };

  return (
    <div className="App">
      <h1>Perpustakaan</h1>
      <button onClick={() => setIsModalOpen((prev) => !prev)}>Add New Buku +</button>
      <br />
      {isModalOpen ? <Modal isModalOpen={isModalOpen} set={setIsModalOpen} /> : <></>}
      {allBook.map((el) => (
        <CardBook key={el.id} {...el} deleteBook={deleteBook} />
      ))}
    </div>
  );
}

export default App;
