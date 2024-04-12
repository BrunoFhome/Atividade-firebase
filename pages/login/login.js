import { useState, useEffect } from 'react';
import './login.css';
import { BrowserRouter, Route, Link, Navigate } from "react-router-dom";
import { db, auth } from '../../firebaseConnection';
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
// Importa funções de autenticação do Firebase para criar usuários, fazer login e logout.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
// Função principal do componente React, que será renderizada na página.
function App() {
  // Estado para armazenar o título do post.
  const [tarefa, setTarefa] = useState('');
  // Estado para armazenar o autor do post.
  const [prazo, setPrazo] = useState('');
  // Estado para armazenar o ID do post a ser editado ou excluído.
  const [idPost, setIdPost] = useState('');
  // Estado para armazenar o email e a senha do usuário.
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // Estado para verificar se o usuário está logado.
  const [user, setUser] = useState(false);
  // Estado para armazenar os detalhes do usuário logado.
  const [userDetail, setUserDetail] = useState({});
  // Estado para armazenar a lista de posts.

  // Efeito que carrega os posts do Firestore sempre que o componente é montado.
  
  // Efeito que verifica se o usuário está logado quando o componente é montado.
  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user);
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email
            
          })
        } else {
          setUser(false);
          setUserDetail({})
        }
      })
    }
    checkLogin();
    
  }, [])
  // Função para adicionar um novo post ao Firestore.

  async function handleAdd() {
    await addDoc(collection(db, "tarefa"), {
      tarefa: tarefa,
      prazo: prazo,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO")
        setPrazo('');
        setTarefa('');
      })
      .catch((error) => {
        console.log("ERRO " + error);
      })
  }




  async function novoUsuario() {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        console.log("CADASTRADO COM SUCESSO!");
        setEmail('');
        setSenha('');
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert("Senha muito fraca.");
        } else if (error.code === 'auth/email-already-in-use') {
          alert("Email já existe!");
        }
      })
  }

  async function logarUsuario() {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((value) => {
        console.log("USER LOGADO COM SUCESSO");
        console.log(value.user);
        setUserDetail({
          uid: value.user.uid,
          email: value.user.email,
        })
        setUser(true);
      

        setEmail('');
        setSenha('');
        
      })
      .catch(() => {
        console.log("ERRO AO FAZER O LOGIN");
      })
  }

  

  return (
    <div className='container'>

      <div className="input">
        
        <h2>Usuarios</h2>
        
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite um email"
        />
         <br />
        <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Informe sua senha"
        /> <br></br>

        
          <button onClick={novoUsuario}>Cadastrar</button>
          <Link to="/tarefas"><button onClick={logarUsuario}>Logar</button></Link>

        




      </div>
    </div>



  );
}
export default App;