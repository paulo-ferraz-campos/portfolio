export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json();

    // Remove prefixo data:image
    const base64 = imageData.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    // Biblioteca compatível com Vercel
    const { createCanvas, loadImage } = await import("@napi-rs/canvas");

    const img = await loadImage(buffer);
    const width = img.width;
    const height = img.height;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let totalPixels = width * height;
    let skinPixels = 0;

    // Área central da selfie
    const startX = Math.floor(width * 0.35);
    const endX = Math.floor(width * 0.65);
    const startY = Math.floor(height * 0.30);
    const endY = Math.floor(height * 0.70);

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Regra de pixel de pele
        const isSkin =
          r > 90 &&
          g > 40 &&
          b < 150 &&
          r > g &&
          r - g > 15;

        if (isSkin) skinPixels++;
      }
    }

    const skinPercent =
      (skinPixels / (totalPixels * 0.3 * 0.4)) * 100;

    const selfie =
      skinPercent > 8 &&
      skinPercent < 60;

    return NextResponse.json({
      selfie,
      skinPercent: skinPercent.toFixed(2) + "%",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro no backend" },
      { status: 500 }
    );
  }
}
