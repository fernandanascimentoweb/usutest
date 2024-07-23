import React, { useEffect, useState } from 'react'
import './Home.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


function Update() {

    const {id} = useParams();

    const [inputData, setInputData] = useState({
        id: id,
        name: '',
        telefone: '',
        email: '',
    })

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://data1-cv7s.onrender.com/users/'+id)
        .then(res => setInputData(res.data))
        .catch(err => console.log(err))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('https://data1-cv7s.onrender.com/users/'+id , inputData)
        .then(res => {
            alert(" Alterado o Cadastrado com sucesso ! ")
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
            <h2>Alterar Cadastro</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <labeL htmlFor="id">ID :</labeL>
                    <input type="number" disabled name='id' className='form-control' value={inputData.id}  />
                </div>
                <div>
                    <label htmlFor='name'>Nome : </label>
                    <input type="text" name="name" className='form-control' value={inputData.name} onChange={(e) => setInputData({...inputData, name: e.target.value})} />
                </div>
                <div>
                    <label htmlFor='telefone'>Telefone : </label>
                    <input type="text" name="telefone" className='form-control' value={inputData.telefone} onChange={(e) => setInputData({...inputData, telefone: e.target.value})}  />
                </div>
                <div>
                    <label htmlFor='email'>E-mail : </label>
                    <input type="text" name="email" className='form-control' value={inputData.email} onChange={(e) => setInputData({...inputData, email: e.target.value})} />
                </div><br />
                <input type="submit" value="Salvar" className="btn-create" />
            </form>
      </div>
    </>
  )
}


export default Update