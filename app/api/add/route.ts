import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import CryptoJS from "crypto-js";

const SECRET = "super_tajny_klucz";

export async function POST(req: Request) {
  try {
    const { service, login, password } = await req.json();

    if (!service || !login || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Szyfrowanie hasła
    const encrypted = CryptoJS.AES.encrypt(password, SECRET).toString();

    // Ścieżka do pliku w głównym katalogu projektu
    const filePath = path.join(process.cwd(), "passwords.txt");

    // Format: Serwis;Login;Hasło
    const entry = `${service.trim()};${login.trim()};${encrypted}\n`;

    // Zapis do pliku (doda plik jeśli nie istnieje)
    fs.appendFileSync(filePath, entry, "utf8");

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("API ADD ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
