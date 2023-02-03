import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "execution_block", headerName: "execution_block", width: 250 },
  { field: "interface", headerName: "interface", width: 400 }
];

const rows = [
  {
    id: 1,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 2,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 3,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 4,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 5,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 6,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 7,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 8,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 9,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  },
  {
    id: 10,
    interface: "http://schema.skao.int/ska-data-product-meta/0.1",
    execution_block: "eb-m001-20191031-12345"
  }
];

const DataProductsTable = () => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

export default DataProductsTable