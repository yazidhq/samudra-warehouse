import React, { useState } from "react";
import DataTable from "react-data-table-component";

const Table = ({ columns, record }) => {
  const [searchText, setSearchText] = useState("");

  const filteredData = record.filter((item) => {
    return Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
      />
    </div>
  );
};

export default Table;
