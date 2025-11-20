import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Imagem recebida no backend:");
    console.log(body.imageData?.slice(0, 50) + "...");

    return NextResponse.json({ status: "real" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
