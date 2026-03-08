// tem q ter do firebase 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";


const auth = getAuth();
// variavel de login e cad p pegar pelo id
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
//msg se der algum erro
const msgLogin = document.getElementById("msgLogin");
const msgCadastro = document.getElementById("msgCadastro");

//fazer mudar a tela de login para cadastro c 1 botao
window.mostrarCadastro = function() {
  loginForm.style.display = "none";
  cadastroForm.style.display = "block";
  msgLogin.textContent = "";
}

window.mostrarLogin = function() {
  cadastroForm.style.display = "none";
  loginForm.style.display = "block";
  msgCadastro.textContent = "";
}

// o login primeiro a abrir
mostrarLogin();

loginForm.addEventListener("submit", async function(e){  // vai enviar o formulário
  e.preventDefault();

  const email = document.getElementById("loginuser").value.trim(); //manda oq foi digitado 
  const senha = document.getElementById("loginpass").value;

  if (!email || !senha) { // !se tiver vazio 
    msgLogin.textContent = "Preencha todos os campos!";
    msgLogin.className = "mensagem erro";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    msgLogin.textContent = "Login realizado com sucesso!";
    msgLogin.className = "mensagem sucesso";
    console.log("Usuário logado:", userCredential.user);

 
  } catch (error) {

    if (error.code === "auth/user-not-found") {
      msgLogin.textContent = "Usuário não encontrado!";
    } 
    else if (error.code === "auth/wrong-password") {
      msgLogin.textContent = "Senha incorreta!";
    } 
    else if (error.code === "auth/invalid-email") {
      msgLogin.textContent = "Email inválido!";
    } 
    else {
      msgLogin.textContent = "Erro ao fazer login.";
    } 

  msgLogin.className = "mensagem erro";
}
  

});


// ===== CADASTRO =====
cadastroForm.addEventListener("submit", async function(e){ // td aq é da tela de cadastro 
  e.preventDefault();

  const email = document.getElementById("cadastroemail").value;
  const senha = document.getElementById("cadastropass").value;

  if (!email || !senha) {
    msgCadastro.textContent = "Preencha todos os campos!";
    msgCadastro.className = "mensagem erro";
    return; // n ir p próximo se esse der errado
  }

  if (senha.length < 6) {
    msgCadastro.textContent = "A senha deve ter pelo menos 6 caracteres!";
    msgCadastro.className = "mensagem erro";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    msgCadastro.textContent = "Cadastro realizado com sucesso!"; 
    msgCadastro.className = "mensagem sucesso"; // style 
    console.log("Usuário criado:", userCredential.user);
  } 

  catch (error) {
    if (error.code === "auth/email-already-in-use") {
      msgCadastro.textContent = "Esse email já está cadastrado!";
    }
    else if (error.code === "auth/invalid-email") {
    msgCadastro.textContent = "Email inválido!";
    }
    else if (error.code === "auth/weak-password") {
      msgCadastro.textContent = "A senha é muito fraca!";
    }
    else {
      msgCadastro.textContent = "Erro ao cadastrar usuário.";
    }

  msgCadastro.className = "mensagem erro";
  }
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuário está logado:", user.email);
  } else {
    console.log("Nenhum usuário logado");
  }
});

