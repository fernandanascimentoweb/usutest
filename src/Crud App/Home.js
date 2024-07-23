import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import generatePDF, {Margin} from 'react-to-pdf';


const personalizacao = {
  method: 'open',
  page: {
    margin: Margin.MEDIUM,
    format: 'A4',
    orientation: 'portrait',
  }
}

const recuperarConteudoParapdf = () =>
  document.getElementById('conteudo')


function Home() {
  
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Asc");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://data1-cv7s.onrender.com/users')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])

  
  return (
    <>
      <NavBar />
     <div className='container'>
        <h1>Cadastro de Usuarios</h1>
          <div className="search">
             <div className='pesquisa'>
              <h2>Pesquisar : </h2>
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="    Digite para pesquisar..."  />
            </div>
            <div className='alfa'>
                <p>Ordem alfabética : </p>
                <button className='btn-ordem' onClick={() => setSort("Asc")}>Asc</button>
                <button className='btn-ordem' onClick={() => setSort("Desc")}>Desc</button>
            </div>
        </div>
        <div id="conteudo">
          <div className='resp'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {data
            .sort((a, b) =>
              sort === "Asc"
               ? a.name.localeCompare(b.name) 
               : b.name.localeCompare(a.name) 
             )
            .filter((d) =>
              d.name.toLowerCase().includes(search.toLowerCase())
             )
            .map((d,i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.telefone}</td>
                <td>{d.email}</td>
                <td className='but'>
                  <Link className='btn-create' to={`/update/${d.id}`}>
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <Link className='btn-create' to={`/read/${d.id}`}>
                    <i class="fa-solid fa-eye"></i>
                   </Link>
                  <button className='btn-delete' onClick={(e) => handleDelete(d.id)}>
                    Apagar'
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        <button className='btn-pdf' onClick={() => generatePDF(recuperarConteudoParapdf,personalizacao)}>
          Imprimir PDF
        </button>
     </div>
    </>
  )

  function handleDelete(id) {
      const confirm = window.confirm("Voce quer apagar ?");
      if (confirm){
      axios.delete('https://data1-cv7s.onrender.com/users/'+id)
      .then(res => {
        useLocation.reload();
        // alert("Cadastro apagado")
        navigate("/")
      }).catch(err => console.log(err));
    }
  }

}

export default Home