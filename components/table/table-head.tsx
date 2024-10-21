import React from "react";

type Props = {
  titles: string[];
};

function TableHead({ titles }: Props) {
  return (
    <thead>
      <tr className="text-left text-black">
        {titles.map((title, index) => {
          return <th key={index}>{title}</th>;
        })}
      </tr>
    </thead>
  );
}

export default TableHead;
