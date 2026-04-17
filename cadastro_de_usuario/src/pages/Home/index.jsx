import { useState, useEffect } from "react";
import './style.css'

function Home() {

  // conecta com meu banco de dados mongodb e pega os dados dos usuarios cadastrados
  
  const users = [
    {
      id: "ds48ds5d1s",
			name: "jota",
			age: 63,
			email: "pedro@gmail.com"
    }
  ];

  
  //roda o servidro: npm run dev

  return (
    <>
      <div className='container'>
        <form action="">
            <h1>Cadastro de Usuário</h1>
            <input type="text" placeholder='Digite seu nome' />
            <input type="email" placeholder='Digite seu email' />
            <input type="age" placeholder='Digite sua Idade' />
            <button type='submit'>Cadastrar</button>
        </form>

        {users.map((item)=> (
          <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.age}</p>
          </div>
        ))}

      </div>
    </>
  )
}

export default Home
