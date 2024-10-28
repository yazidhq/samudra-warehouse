import DataTable from "react-data-table-component";

const Table = ({ columns, record }) => {
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
    <DataTable
      customStyles={customStyles}
      columns={columns}
      data={record}
      pagination
    />
  );
};

export default Table;
