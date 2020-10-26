import React, { useState, useEffect } from 'react';
import './App.css';
import CardBook from './component/CardBook/CardBook';
import Modal from './component/Modal/Modal';
import axios from 'axios';
import { context } from './context';

function App() {
  const [allBook, setAllBook] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { URL } = context;
  useEffect(() => {
    axios.get(`${URL}/getBuku`).then((res) => setAllBook(res.data));
  }, []);

  const deleteBook = (id) => {
    let r = window.confirm('Are you Sure??');
    if (r == true) {
      axios.delete(`${URL}/deleteBuku/${id}`);
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
