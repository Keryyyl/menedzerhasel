import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const { id } = await req.json();

  const filePath = path.join(process.cwd(), "passwords.txt");

  const lines = fs.readFileSync(filePath, "utf-8")
    .split("\n")
    .filter(Boolean);

  lines.splice(id, 1);

  fs.writeFileSync(filePath, lines.join("\n"));

  return Response.json({ success: true });
}
