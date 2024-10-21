import * as XLSX from "xlsx";

export async function parseXlsx<T>(buffer: Buffer): Promise<T[]> {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
}
