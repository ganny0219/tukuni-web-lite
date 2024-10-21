import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const date = new Date();
  const timestamp = date.getTime().toString();
  const randomNum = Math.floor(Math.random() * 1000).toString();
  const randomString = `${timestamp}-${randomNum}`;

  const directoryPath = path.join(process.cwd(), "public/images/product");
  const filePath = path.join(
    directoryPath,
    `${randomString}${path.extname(file.name)}`
  );

  await fs.promises.mkdir(directoryPath, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.promises.writeFile(filePath, buffer);

  return NextResponse.json(
    { path: `/images/product/${randomString}${path.extname(file.name)}` },
    { status: 200 }
  );
}
