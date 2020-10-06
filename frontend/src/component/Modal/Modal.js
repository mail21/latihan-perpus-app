import React from 'react';
import './Modal.css';
import axios from 'axios';

function Modal({ isModalOpen, set }) {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const data = {
      id: e.target[0].value,
      id_lokasi: e.target[1].value,
      judul: e.target[2].value,
      pengarang: e.target[3].value,
      kuantitas: e.target[4].value,
    };
    axios.post('http://localhost:3000/addBuku', data);
    set(false);
  };

  return (
    <div
      className="modal"
      style={isModalOpen ? {} : { display: 'none' }}
      onClick={(e) => {
        if (e.target.className === 'modal') {
          set((prev) => !prev);
        }
      }}
    >
      <div className="modal-content">
        <span className="close" onClick={() => set((prev) => !prev)}>
          &times;
        </span>
        <form onSubmit={onSubmit}>
          <h1>Form Buku baru</h1>
          <label>ID :</label>
          <input type="text" name="id" placeholder="id" />
          <br />
          <label>id Lokasi :</label>
          <input type="text" name="idLokasi" placeholder="idLokasi" />
          <br />
          <label>Judul :</label>
          <input type="text" name="judul" placeholder="Judul" />
          <br />
          <label>pengarang :</label>
          <input type="text" name="pengarang" placeholder="pengarang" />
          <br />
          <label>Kuantitas :</label>
          <input type="text" name="kuantitas" placeholder="kuantitas" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
