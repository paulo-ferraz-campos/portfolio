import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json();

    // Remove prefixo data:image
    const base64 = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    // Lê header simples do JPEG ou PNG – sem decodificar tudo
    const stats = analyzeImageBuffer(buffer);

    return NextResponse.json(stats);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no backend" }, { status: 500 });
  }
}


// ------------ Análise simples de imagem SEM CANVAS ------------

// Detecta se é PNG ou JPEG e extrai largura/altura lendo apenas os headers
function analyzeImageBuffer(buffer: Buffer) {
  // Detecta formato
  const isPNG = buffer.slice(1, 4).toString() === "PNG";
  const isJPEG = buffer[0] === 0xFF && buffer[1] === 0xD8;

  let width = 0;
  let height = 0;

  if (isPNG) {
    // Em PNG: largura e altura ficam no IHDR (bytes 16–24)
    width = buffer.readUInt32BE(16);
    height = buffer.readUInt32BE(20);
  }

  if (isJPEG) {
    // Faz uma varredura simples até achar SOF0
    let i = 2;
    while (i < buffer.length) {
      if (buffer[i] === 0xFF && buffer[i + 1] === 0xC0) {
        height = buffer.readUInt16BE(i + 5);
        width = buffer.readUInt16BE(i + 7);
        break;
      }
      i++;
    }
  }

  // Selfie costuma ser vertical
  const isVertical = height > width;

  // Detecta se a imagem é muito uniforme (foto editada / documento / print)
  const sample = buffer.subarray(0, 2000);
  const avg = sample.reduce((s, v) => s + v, 0) / sample.length;

  // Contraste simples
  let min = 255, max = 0;
  for (const v of sample) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const contrast = max - min;

  // Verifica se média de cor parece pele (bem aproximado)
  const isSkinTone = avg > 80 && avg < 200;

  const isLikelySelfie =
    isVertical &&
    contrast > 30 &&
    isSkinTone;

  return {
    width,
    height,
    isVertical,
    contrast,
    avgColor: avg,
    isSkinTone,
    selfie: isLikelySelfie
  };
}
