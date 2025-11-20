import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json();

    // Remove prefixo data:image
    const base64 = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    // Pegamos apenas os primeiros bytes como "amostra" rápida
    const sampleSize = Math.min(1000, buffer.length);
    const sample = buffer.slice(0, sampleSize);

    let sum = 0;
    let min = 255;
    let max = 0;

    // iterando pelo Buffer usando índices
    for (let i = 0; i < sample.length; i++) {
      const v = sample[i];
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
    }

    const avg = sum / sampleSize;

    // Regra super simples: se a média estiver em tons de pele centralizados
    const selfie = avg > 60 && avg < 200; // ajuste se quiser mais rigor

    return NextResponse.json({
      selfie,
      avg,
      min,
      max,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no backend" }, { status: 500 });
  }
}
