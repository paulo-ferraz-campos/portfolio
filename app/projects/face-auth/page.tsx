"use client";

import { useState, useRef } from "react";

export default function ProjectViewPage() {
  const [status, setStatus] = useState<null | "loading" | "real" | "fake">(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function abrirCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("O navegador não suporta acesso à câmera.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera: " + err);
    }
  }

  function simulateAuth() {
    setStatus("loading");
    setTimeout(() => {
      const isReal = Math.random() > 0.5;
      setStatus(isReal ? "real" : "fake");
    }, 1200);
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-zinc-200">
      <h1 className="text-4xl font-bold mb-6 text-zinc-100">
        Autenticador Facial
      </h1>

      <p className="text-zinc-400 mb-6">
        <p className="text-zinc-400">
          O Autenticador Facial é uma ferramenta de verificação de identidade que garante a autenticidade da imagem do usuário.
        </p>
        <br />
        <ol className="text-zinc-400 list-decimal ml-6">
          <li>Captura e verificação da imagem: A imagem do usuário é analisada para identificar se é real ou falsificada, garantindo proteção contra fraudes e tentativas de spoofing.</li>
          <br />
          <li>Registro da autenticação: Após a validação inicial, o resultado da autenticação é registrado de forma segura, preservando a integridade dos dados.</li>
          <br />
          <li>Validação contínua: Sempre que necessário, o sistema pode validar novamente a identidade do usuário com base na autenticação previamente registrada, garantindo que apenas usuários legítimos tenham acesso aos recursos protegidos.</li>
        </ol>
        <br />
        <p className="text-zinc-400">
          O processo é seguro, confiável e rápido, proporcionando uma camada extra de proteção para aplicações que dependem da autenticação facial.
        </p>
      </p>

      {/* Botão para abrir a câmera */}
      <button
        onClick={abrirCamera}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded mb-4"
      >
        Abrir câmera
      </button>

      {/* Preview da câmera */}
      <div className="mb-6">
        <video
          ref={videoRef}
          autoPlay
          className="w-full max-w-sm rounded border border-zinc-700"
        ></video>
      </div>

      {/* Botão para simular autenticação */}
      <button
        onClick={simulateAuth}
        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded"
      >
        Simular autenticação
      </button>

      <div className="mt-6 text-lg font-medium">
        {status === "loading" && (
          <p className="text-yellow-400 animate-pulse">Verificando imagem...</p>
        )}
        {status === "real" && <p className="text-green-400">Imagem autêntica ✓</p>}
        {status === "fake" && <p className="text-red-400">Imagem falsificada ✗</p>}
      </div>
    </div>
  );
}
