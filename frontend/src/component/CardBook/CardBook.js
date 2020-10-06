import React from 'react';
import './CardBook.css';
function CardBook({ judul, pengarang, kuantitas, id, deleteBook }) {
  return (
    <div className="card-book">
      <div className="card-judul">{judul}</div>

      <div className="card-pengarang">{pengarang}</div>
      <div className="card-desc">x{kuantitas}</div>
      <div className="card-desc">
        <button>Edit</button>
        <button style={{ marginLeft: '10px' }} onClick={() => deleteBook(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default CardBook;
