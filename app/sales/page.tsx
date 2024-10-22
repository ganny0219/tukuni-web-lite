"use client";
import { apiSWR } from "@/hooks/swr";
import { useState } from "react";
import { Sale } from "@prisma/client";
import Table from "@/components/table";
import TableHead from "@/components/table/table-head";
import TableBody from "@/components/table/table-body";
import SalesTableData from "./components/sales-table-data";
import PrimaryButton from "@/components/button/primary-button";
import {
  getLastMonth,
  getLastWeek,
  getThisMonth,
  getThisWeek,
  getToday,
} from "@/utils/date";

const headerTitles = ["Id", "Price", "Quantity", "Total", "Action"];

export default function SalesPage() {
  const [date, setDate] = useState(getToday());

  const { data: sales, mutate } = apiSWR<Sale[]>(`/sales`, date);

  if (!sales) return;

  const labaKotor = sales.reduce((tot, sales) => {
    const total = sales.sellPrice * sales.quantity;
    return (tot += total);
  }, 0);

  const labaBersin = sales.reduce((tot, sales) => {
    const total = (sales.sellPrice - sales.buyPrice) * sales.quantity;
    return (tot += total);
  }, 0);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-row w-full">
          <h1 className="text-3xl">Sales List</h1>
          <PrimaryButton title="Today" onClick={() => setDate(getToday())} />
          <PrimaryButton title="Yesterday" onClick={() => {}} />
          <PrimaryButton
            title="Last Week"
            onClick={() => setDate(getLastWeek())}
          />
          <PrimaryButton
            title="This Week"
            onClick={() => setDate(getThisWeek())}
          />
          <PrimaryButton
            title="Last Month"
            onClick={() => setDate(getLastMonth())}
          />
          <PrimaryButton
            title="This Month"
            onClick={() => setDate(getThisMonth())}
          />
        </div>

        <p>Laba Kotor: Rp.{labaKotor}</p>
        <p>Laba Bersih: Rp.{labaBersin}</p>
        {/* <div className="w-full max-w-[200px]">
          <Input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div> */}
      </div>
      <Table data={sales}>
        <TableHead titles={headerTitles} />
        <TableBody>
          {sales?.map((data, index) => {
            return <SalesTableData key={index} sales={data} mutate={mutate} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
}
