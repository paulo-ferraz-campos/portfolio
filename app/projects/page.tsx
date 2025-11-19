import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";

export const revalidate = 60;

const projects = [
  {
    page: "gestor-de-documentos",
    title: "Gestor de Documentos",
    description:
      "Plataforma para organizar, versionar e compartilhar documentos internos de forma simples e segura."
  },
  {
    page: "person",
    title: "Automação de Relatórios",
    description:
      "Ferramenta que gera relatórios automáticos de vendas, financeiro e estoque sem necessidade de planilhas."
  },
  {
    page: "face-auth",
    title: "Autenticador Facial",
    description:
      "O Autenticador Facial é uma ferramenta que verifica se a imagem do usuário é real ou falsificada, registra a autenticação de forma segura e permite validações futuras para garantir que apenas usuários legítimos tenham acesso aos recursos protegidos."
  },
  {
    page: "controle-de-estoque-simples",
    title: "Controle de Estoque Inteligente",
    description:
      "App simples para pequenas empresas controlarem entradas, saídas e alertas de reposição."
  },
  {
    page: "assinatura-eletronica",
    title: "Assinatura Eletrônica",
    description:
      "Ferramenta para enviar, assinar e validar documentos com assinatura digital."
  },
  {
    page: "gestor-de-tarefas-empresarial",
    title: "Gerenciador de Tarefas Empresarial",
    description:
      "Sistema para organizar tarefas entre equipes, com status, prazos e acompanhamento."
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">

        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projetos
          </h2>
          <p className="mt-4 text-zinc-400">
            Soluções desenvolvidas para facilitar processos internos de empresas.
          </p>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.page}>
              <Article project={project} />
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
