"use client";

import { useState, useRef } from "react";
import { Navigation } from "../../components/nav";

export default function FaceAuthPage() {
  const [status, setStatus] = useState<null | "loading" | "real" | "fake">(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function abrirCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Não foi possível acessar a câmera: " + err);
    }
  }

  async function validarAuth() {
    if (!videoRef.current) return;

    // Captura frame da câmera
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Converte para base64
    const imageData = canvas.toDataURL("image/png");

    setStatus("loading");

    try {
      const res = await fetch("/api/face-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageData }),
      });

      const data = await res.json();
      setStatus(data.status);
    } catch (err) {
      alert("Erro ao enviar imagem: " + err);
      setStatus(null);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto text-zinc-200">
      <Navigation />

      <h1 className="text-4xl font-bold mb-6 text-zinc-100">
        Autenticador Facial
      </h1>

      <p className="text-zinc-400 mb-6">
        O Autenticador Facial verifica se a imagem do usuário é real ou falsificada.
      </p>

      <button
        onClick={abrirCamera}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded mb-4"
      >
        Abrir câmera
      </button>

      <div className="mb-6">
        <video
          ref={videoRef}
          autoPlay
          className="w-full max-w-sm rounded border border-zinc-700"
        />
      </div>

      <button
        onClick={validarAuth}
        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded"
      >
        Validar autenticação
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
