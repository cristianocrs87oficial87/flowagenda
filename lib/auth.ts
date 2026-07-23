import { supabase } from "./supabase";

export interface CadastroEmpresa {
  nome: string;
  responsavel: string;
  telefone: string;
  email: string;
  senha: string;
  categoria: string;
}

function gerarSlug(nome: string) {
  return (
    nome
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Math.floor(Math.random() * 9999)
  );
}

// LOGIN

export async function login(email: string, senha: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });
}

// LOGOUT

export async function logout() {
  return await supabase.auth.signOut();
}

// USUÁRIO LOGADO

export async function usuarioAtual() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

// EMPRESA DO USUÁRIO

export async function empresaAtual() {
  const user = await usuarioAtual();

  if (!user) return null;

  const { data, error } = await supabase
    .from("empresas")
    .select("*")
    .eq("usuario_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("empresaAtual:", error);
    return null;
  }

  return data;
}

// RECUPERAR SENHA

export async function recuperarSenha(email: string) {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/redefinir-senha`,
  });
}

// CRIAR CONTA

export async function criarConta(dados: CadastroEmpresa) {
  const slug = gerarSlug(dados.nome);

  const { data, error } = await supabase.auth.signUp({
    email: dados.email,
    password: dados.senha,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  const usuario = data.user;

  if (!usuario) {
    return {
      success: false,
      message: "Usuário não criado.",
    };
  }

  const { error: erroEmpresa } = await supabase
    .from("empresas")
    .insert({
      usuario_id: usuario.id,
      nome: dados.nome,
      responsavel: dados.responsavel,
      telefone: dados.telefone,
      email: dados.email,
      categoria: dados.categoria,
      slug,
      hora_abertura: "08:00",
      hora_fechamento: "18:00",
      intervalo: 30,
      dias_semana: [1, 2, 3, 4, 5],
      ativo: true,
    });

  if (erroEmpresa) {
    return {
      success: false,
      message: erroEmpresa.message,
    };
  }

  return {
    success: true,
    slug,
  };
}