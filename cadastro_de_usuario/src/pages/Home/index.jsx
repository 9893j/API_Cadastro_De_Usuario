import { useState, useEffect } from "react";
import api from "../../services/api";
import "./style.css";

function Home() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        name,
        email,
        age: Number(age)
      });

      const response = await api.get("/users");
      setUsers(response.data);

      // limpa inputs
      setName("");
      setEmail("");
      setAge("");

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Usuário</h1>

        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="number"
          placeholder="Digite sua idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {users.map((item) => (
        <div className="user-card" key={item.id}>
          <p>{item.name}</p>
          <p>{item.email}</p>
          <p>{item.age}</p>

          <button onClick={() => handleDelete(item.id)}>
            Deletar
          </button>
        </div>
      ))}

    </div>
  );
}

export default Home;