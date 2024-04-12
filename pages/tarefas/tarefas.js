import { useState, useEffect } from 'react';
import './tarefas.css';
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

  const [posts, setPosts] = useState([]);
  // Efeito que carrega os posts do Firestore sempre que o componente é montado.
  useEffect(() => {
    async function loadPosts() {
      const unsub = onSnapshot(collection(db, "tarefa"), (snapshot) => {
        let listaPost = [];
        snapshot.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            prazo: doc.data().prazo,
          })
        })
        setPosts(listaPost);
      })
    }
    loadPosts();
  }, [])
  // Efeito que verifica se o usuário está logado quando o componente é montado.
 
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

  async function buscarPost() {
    const postsRef = collection(db, "tarefa");
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            tarefa: doc.data().tarefa,
            prazo: doc.data().prazo,
          })
        })
        setPosts(lista);
      })
      .catch((error) => {
        console.log("DEU ALGUM ERRO AO BUSCAR");
      })
  }

  async function editarPost() {
    const docRef = doc(db, "tarefa", idPost);
    await updateDoc(docRef, {
      tarefa: tarefa,
      prazo: prazo
    })
      .then(() => {
        console.log("TAREFA ATUALIZADA!");

        setIdPost('');
        setTarefa('');
        setPrazo('');
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async function excluirPost(id) {
    const docRef = doc(db, "tarefa", id);
    await deleteDoc(docRef)
      .then(() => {
        alert("TAREFA DELETADA COM SUCESSO!");
      })
  }

  

  

  async function fazerLogout() {
    await signOut(auth)
    setUser(false);
    setUserDetail({});
  }

  return (
    <div>
      <div className='container0'>
      <h1>To-do List</h1>
      {user && (
        <div>
          <strong>Seja bem-vindo(a) (Você está logado!)</strong> <br />
          <span>ID: {userDetail.uid} - Email: {userDetail.email}</span> <br />
          <button onClick={fazerLogout}>Sair da conta</button>
          <br /> <br />
        </div>
      )}
      </div>
        <br />

      <div className="container1">
        <h2>TAREFAS</h2>
        <div className='container2'>
        <label>ID da tarefa:</label>
        <input
          placeholder='Digite o ID da tarefa'
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        /> <br />
        <label>Tarefa:</label>
        <textarea
          type="text"
          placeholder='Digite a tarefa'
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
        />
        <label>Prazo:</label>
        <input
          type="date"
          placeholder="Prazo da Tarefa"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
        />
        </div>
        <button className='btn1' onClick={handleAdd}>Cadastrar</button>
        <button className='btn1' onClick={buscarPost}>Buscar tarefa</button> <br />
        <button className='btn1' onClick={editarPost}>Atualizar tarefa</button>
        </div>
        <div className='container3'>
        <ul>
          {posts.map((post) => {
            return (
              <li className='bloco' key={post.id}>
                <span>ID da tarefa: {post.id}</span> <br />
                <span>Tarefa: {post.tarefa} </span> <br />
                <span>Prazo: {post.prazo}</span> <br />
                <button className='btn'onClick={() => excluirPost(post.id)}>Excluir</button> <br /> <br />
              </li>

            )
          })}
        </ul>
        </div>
        
      
    </div>
  );
}
export default App;