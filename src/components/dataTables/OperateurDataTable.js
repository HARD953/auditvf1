
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { exportCSV, exportExcel, exportPdf } from 'src/utils/exportsFn';
import { useQuery } from '@tanstack/react-query';
import { getSupportsOperateurs } from 'src/api/supports/supports';



export default function OperateurDataTable({dateDebut,dateFin}) {
    
    const { isLoading, data } = useQuery({
      queryKey: ["supports-operateur", dateDebut, dateFin],
      queryFn: async () => await getSupportsOperateurs(dateDebut, dateFin),
    });
    const exportDataRef = useRef(null);
    const [operateurData, setOperateurData] = useState([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const cols = [
      // { field: 'id', header: 'N°' },
      { field: "marque", header: "Marque" },
      { field: "commune", header: "Commune" },
      { field: "type", header: "Category" },
      { field: "nombre_total", header: "NB Total" },
      { field: "montant_total_tsp", header: "Montant TSP" },
      { field: "montant_total_odp", header: "Montant ODP" },
      { field: "montant_total", header: "TOTAL" },
      { field: "entreprise", header: "Entreprise" },
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    function convertData(data) {
    let transformedData = [];

    data.forEach((entreprise) => {
        entreprise.communes.forEach((commune) => {
        commune.marques.forEach((marque) => {
            Object.keys(marque.etat).forEach((type) => {
            let entry = {
                entreprise: entreprise.entreprise,
                commune: commune.commune,
                marque: marque.marque,
                type: type,
                somme_montant_total_tsp: marque.etat[type].somme_montant_total_tsp,
                somme_montant_total_odp: marque.etat[type].somme_montant_total_odp,
                somme_montant_total: marque.etat[type].somme_montant_total,
                nombre_total: marque.etat[type].nombre_total,
            };
            
            transformedData.push(entry);
            });
        });
        });
    });

    return transformedData;
    }
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className='d-flex justify-content-between aling-items-center'>
                 <div className="d-flex align-items-center justify-content-end gap-2">
                    <Button
                        className="rounded-pill p-button-outlined"
                        tooltip="Exporter en CSV"
                        icon="pi pi-file"
                        rounded
                        onClick={() => exportCSV(false,exportDataRef)}
                        data-pr-tooltip="CSV" />
                    <Button
                        className="rounded-pill p-button-outlined"
                        tooltip="Exporter en EXCEL"
                        icon="pi pi-file-excel"
                        severity="success"
                        rounded
                        onClick={()=>exportExcel(operateurData,"operateur_support")}
                        data-pr-tooltip="XLS" />
                    <Button
                        className="rounded-pill p-button-outlined"
                        tooltip="Exporter en PDF"
                        icon="pi pi-file-pdf"
                        severity="warning"
                        rounded
                        onClick={()=>exportPdf(exportColumns,operateurData,"operateur_supports.pdf")}
                        data-pr-tooltip="PDF" />
                </div>
                <div className="flex justify-content-end">
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText 
                            className='rounded-pill'
                            value={globalFilterValue} 
                            onChange={onGlobalFilterChange} placeholder="Rechercher ..." />
                    </span>
                </div>
            </div>
        );
    };

    const header = renderHeader();


    useEffect(() => {
        // const customizedData = customizedoperateurData(data)
        const rest = convertData(data|| []);
        setOperateurData(rest);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
      <div className="mt-2 shadow p-3">
        <DataTable
          paginator
          rows={10}
          loading={isLoading}
          filters={filters}
          filterDisplay="row"
          globalFilterFields={[
            "commune",
            "type",
            "entreprise",
            "marque",
            "nombre_total",
            "montant_total_tsp",
            "montant_total_odp",
            "montant_total",
          ]}
          header={header}
          emptyMessage="Aucune donnée trouvée."
          value={operateurData}
          rowGroupMode="rowspan"
          groupRowsBy="marque"
          sortMode="single"
          sortField="operateur"
          size="large"
          sortOrder={1}
          resizableColumns
          showGridlines
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            header="N°"
            headerStyle={{ width: "3rem" }}
            body={(data, options) => options?.rowIndex + 1}
          ></Column>
          <Column
            bodyClassName="fw-bolder"
            field="marque"
            header="Marque"
          ></Column>

          <Column
            bodyClassName="fw-bolder"
            field="commune"
            header="Commune"
          ></Column>

          <Column field="type" header="TYPE"></Column>

          <Column field="nombre_total" header="NB Total"></Column>

          <Column field="somme_montant_total_tsp" header="Montant TSP"></Column>

          <Column field="somme_montant_total_odp" header="Montant ODP"></Column>

          <Column
            headerClassName="py-2"
            field="somme_montant_total"
            header="TOTAL"
          ></Column>
          <Column
            headerClassName="py-2"
            field="entreprise"
            header="Entreprise"
          ></Column>
        </DataTable>
      </div>
    );
}



// const data = [
//   {
//     entreprise: "Lanfiatech",
//     commune: "Abobo",
//     marque: "MOOV",
//     type: "Bon",
//     somme_montant_total_tsp: 0,
//     somme_montant_total_odp: 0,
//     somme_montant_total: 0,
//     nombre_total: 0,
//   },
//   {
//     entreprise: "Lanfiatech",
//     commune: "Abobo",
//     marque: "MOOV",
//     type: "Défraichis",
//     somme_montant_total_tsp: 0,
//     somme_montant_total_odp: 0,
//     somme_montant_total: 0,
//     nombre_total: 0,
//   },
//   {
//     entreprise: "Lanfiatech",
//     commune: "Abobo",
//     marque: "MOOV",
//     type: "Détérioré",
//     somme_montant_total_tsp: 0,
//     somme_montant_total_odp: 0,
//     somme_montant_total: 0,
//     nombre_total: 0,
//   },
// ];