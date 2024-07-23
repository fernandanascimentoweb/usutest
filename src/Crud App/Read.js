import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


function Read() {

  const {id} = useParams()

  const [Data, setdata] = useState([])

  useEffect(() => {
    axios.get('https://data1-cv7s.onrender.com/users/'+id)
    .then(res => setdata(res.data))
    .catch(err => console.log(err))
  }, [id]);

  return (
    <>
      <div>
          <nav className='navbar'>
            <h2>
                <Link to={`/`}>Words Cad</Link>
            </h2>
            <ul className='menu'>
                <li>
                    <Link to={`/`} >Home</Link>
                </li>
            </ul>        
          </nav>
      </div>
      <div className='container'>
        <h2>Cadastro de Usuarios</h2>
        <table className='table-read'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td >{Data.name}</td>
              <td >{Data.telefone}</td>
              <td >{Data.email}</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <div className='botao'>
        <Link className='item' to="/" > Voltar </Link>
      </div>
    
      </div>
        
    </>
  )
}

export default Read