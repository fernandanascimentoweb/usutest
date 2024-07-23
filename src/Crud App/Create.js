import React, { useState } from 'react';
import './Home.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



function Create() {

  const [inputData, setInputData] = useState({
    name: '',
    telefone: '',
    email: '',
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://data1-cv7s.onrender.com/users', inputData)
    .then(res => {
      alert(" Cadastrado com sucesso ! ")
      navigate('/')
    })

  }

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
      <div className='bloco'>
        <h2>Inserir Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Nome : </label>
            <input type="text" name="name" required className='form-control' onChange={(e) => setInputData({...inputData, name: e.target.value})} />
          </div>
          <div>
            <label htmlFor='telefone'>Telefone : </label>
            <input type="text" name="telefone" required className='form-control' onChange={(e) => setInputData({...inputData, telefone: e.target.value})}  />
          </div>
          <div>
            <label htmlFor='email'>E-mail : </label>
            <input type="text" name="email" required className='form-control' onChange={(e) => setInputData({...inputData, email: e.target.value})} />
          </div><br />
          <input type="submit" value="Gravar" className="btn-create" />
        </form>
      </div>
    </>
  )
}

export default Create