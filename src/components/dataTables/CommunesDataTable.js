
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { exportCSV, exportExcel, exportPdf } from 'src/utils/exportsFn';
import { customizeNumerFormat, reorganizeDataForTable } from 'src/utils/functionsUtils';
// import { Paginator } from 'primereact/paginator';
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from 'primereact/multiselect';



export default function CommuneDataTable({
  isLoading,
  data,
}) {
  const filterListInitial = [
    { name: "Marque", code: "marque" },
  ];
  const exportDataRef = useRef(null);
  const columns = [
    { field: "district", header: "District" },
    { field: "region", header: "Région" },
    { field: "commune", header: "Commune" },
  ];
  const [communeData, setCommuneData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("marque");
  const [filterList, setLilterList] = useState(filterListInitial);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState(columns);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const cols = [
    { field: "district", header: "District" },
    { field: "region", header: "Région" },
    { field: "commune", header: "Commune" },
    { field: "marque", header: "Marque" },
    { field: "state", header: "Type" },
    { field: "nombre_total", header: "NB Total" },
    { field: "somme_montant_total_tsp", header: "Montant TSP" },
    { field: "somme_montant_total_odp", header: "Montant ODP" },
    { field: "somme_montant_total", header: "TOTAL" },
  ];

  

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));


   const onColumnToggle = (event) => {
     let selectedColumns = event.value;
     let orderedSelectedColumns = columns.filter((col) =>
       selectedColumns.some((sCol) => sCol.field === col.field)
     );

     setVisibleColumns(orderedSelectedColumns);
   };

   const getLabelFilter = (value) => {
    const finded= filterList?.find(item=> item.code === value)
    return finded?.name;
   }

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

      const headerTemplate = (data, field) => {
        console.log("data?.[selectedFilter]", data?.[field]);
        return (
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">{getLabelFilter(selectedFilter)}</span>
            <span className="fw-bold">{data?.[selectedFilter]}</span>
          </div>
        );
      };


  const formatNumeric = (value) => customizeNumerFormat(value||0)

  const renderHeader = () => {
    return (
      <div className="row align-items-center">
        <div className="col-md-2">
          <div className="d-flex align-items-center justify-content-start gap-2">
            <Button
              className="rounded-pill p-button-outlined"
              tooltip="Exporter en CSV"
              icon="pi pi-file"
              rounded
              onClick={() => exportCSV(false, exportDataRef)}
              data-pr-tooltip="CSV"
            />
            <Button
              className="rounded-pill p-button-outlined"
              tooltip="Exporter en EXCEL"
              icon="pi pi-file-excel"
              severity="success"
              rounded
              onClick={() => exportExcel(communeData, "commune_support")}
              data-pr-tooltip="XLS"
            />
            <Button
              className="rounded-pill p-button-outlined"
              tooltip="Exporter en PDF"
              icon="pi pi-file-pdf"
              severity="warning"
              rounded
              onClick={() =>
                exportPdf(exportColumns, communeData, "commune_supports.pdf")
              }
              data-pr-tooltip="PDF"
            />
          </div>
        </div>
        <div className="col-md-3">
          <MultiSelect
            value={visibleColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            className="w-100 rounded-pill"
            display="chip"
            placeholder="Afficher colonne "
            maxSelectedLabels={2}
          />
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-start align-items-center w-100">
            <label className="fw-bold">Grouper par </label>
            <Dropdown
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.value)}
              options={filterList}
              optionLabel="name"
              optionValue="code"
              placeholder="Grouper par "
              className="w-100 rounded-pill"
            />
          </div>
        </div>

        <div className="col-md-3">
          <span className="p-input-icon-left w-100">
            <i className="pi pi-search" />
            <InputText
              className="rounded-pill w-100"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Rechercher ..."
            />
          </span>
        </div>
      </div>
    );
  };
  
  const header = renderHeader();

  

  useEffect(() => {
    const customizedData = reorganizeDataForTable(data);
    setCommuneData(customizedData);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps




  useEffect(() => {
    if (visibleColumns?.length){
      const column = visibleColumns?.map(column =>({name: column.header,code: column.field}))
      const findedItem = column.find(item => item.code === selectedFilter)
      if(!findedItem?.code){
        setSelectedFilter(filterListInitial[0]?.code);
      }
        setLilterList([
          ...filterListInitial,
          ...column,
        ]);
    }else{
       setSelectedFilter(filterListInitial[0]?.code);
       setLilterList([
         ...filterListInitial
       ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns?.length]);


  

  return (
    <div className="mt-2 shadow p-3">
      <DataTable
        ref={exportDataRef}
        filters={filters}
        loading={isLoading}
        filterDisplay="row"
        globalFilterFields={[
          "district",
          "region",
          "commune",
          "marque",
          "state",
          "nombre_total",
          "somme_montant_total_tsp",
          "somme_montant_total_odp",
          "somme_montant_total",
        ]}
        header={header}
        emptyMessage="Aucune donnée trouvée."
        value={communeData}
        rowGroupMode="subheader"
        groupRowsBy={selectedFilter}
        sortMode="single"
        sortField={selectedFilter}
        size="large"
        sortOrder={1}
        resizableColumns
        stripedRows
        showGridlines
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        scrollHeight="600px"
        rowGroupHeaderTemplate={(data) => headerTemplate(data, selectedFilter)}
      >
        <Column
          header="N°"
          field="id"
          headerStyle={{ width: "3rem" }}
          body={(data, options) => options?.rowIndex + 1}
        ></Column>
        {visibleColumns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}

        <Column
          bodyClassName="fw-bolder"
          field="marque"
          header="Marque"
        ></Column>
        <Column field="state" header="Type"></Column>
        <Column
          body={(row) => formatNumeric(row["nombre_total"])}
          header="NB Total"
        ></Column>
        <Column
          body={(row) => formatNumeric(row["somme_montant_total_tsp"])}
          header="Montant TSP"
        ></Column>
        <Column
          body={(row) => formatNumeric(row["somme_montant_total_odp"])}
          header="Montant ODP"
        ></Column>
        <Column
          headerClassName="py-2"
          body={(row) => formatNumeric(row["somme_montant_total"])}
          header="TOTAL"
        ></Column>
      </DataTable>

      {/* <Paginator
        first={firstPage}
        rows={rows}
        totalRecords={dashboardDataFilter?.count}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      /> */}
    </div>
  );
}
        