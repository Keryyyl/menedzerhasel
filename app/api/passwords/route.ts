import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import CryptoJS from "crypto-js";

const SECRET = "super_tajny_klucz";

export async function GET() {
  const filePath = path.join(process.cwd(), "passwords.txt");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "");
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n").filter(line => line.trim() !== "");

  const data = lines.map((line, index) => {
    const [service, login, encrypted] = line.split(";");
    let decrypted = "";

    try {
      if (encrypted) {
        const bytes = CryptoJS.AES.decrypt(encrypted.trim(), SECRET);
        decrypted = bytes.toString(CryptoJS.enc.Utf8);
      }
    } catch (e) {
      decrypted = "BŁĄD";
    }

    return { id: index, service, login, password: decrypted || "Błąd klucza" };
  });

  return NextResponse.json(data);
}
