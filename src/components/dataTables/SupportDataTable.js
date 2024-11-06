import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { exportCSV, exportExcel, exportPdf } from "src/utils/exportsFn";
import { Image } from "primereact/image";
import { Badge } from "primereact/badge";
import { useNavigate } from "react-router-dom";
import { customizeNumerFormat, formatDateToLiteral } from "src/utils/functionsUtils";
import { main_app_path } from "src/router";

import ShowSupportDetailDialog from "../dialogs/showSupportDetail";
import ShowSupportPlaceDialog from "../dialogs/showSupportPlace";
import { attacheImageUrl } from "src/api/axiosInstance";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteSupport } from "src/api/supports/supports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SuccesDialog from "../dialogs/succesDialog";
import ErrorDialog from "../dialogs/errorDialog";
import { Paginator } from "primereact/paginator";
import { MultiSelect } from "primereact/multiselect";

export default function SupportDataTable({
  supportsData,
  filtersPayload,
  totalItems,
  first,
  rows,
  selectedPage,
  onPageChange,
  isLoading,
}) {
  

  const exportDataRef = useRef(null);
  const navigate = useNavigate(null);
  const queryClient = useQueryClient();

  const [supportData, setSupportData] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [selectedSupportPlace, setSelectedSupportPlace] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [visiblePlaceModal, setVisiblePlaceModal] = useState(false);
  const [visibleSuccessDelete, setVisibleSuccessDelete] = useState(false);
  const [visibleSuccessError, setVisibleSuccessError] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [columns, setColumns] = useState([]);

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getTotalMontant = (rowdata) => {
    return `${
      customizeNumerFormat(Number(rowdata?.ODP_value) + Number(rowdata?.TSP)) ||
      0
    }`;
  };

  const deleteMutation = useMutation({
    mutationFn: async (id) => await deleteSupport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["supports", filtersPayload],
      });
      setVisibleSuccessDelete(true);
    },
    onError: () => {
      setVisibleSuccessError(true);
    },
  });

  const etatSupportBody = (rowdata) => {
    const severity = "success";
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Badge severity={severity} size="normal" value=""></Badge>
        <p className="my-0 ms-1"> {rowdata?.etat_support} </p>
      </div>
    );
  };

  const visibiliteSupportBody = (rowdata) => {
    const severity = "success";
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Badge severity={severity} size="normal" value=""></Badge>
        <p className="my-0 ms-1"> {rowdata?.visibilite} </p>
      </div>
    );
  };

  const customizeMontant = (rowdata, field) => {
    try {
      return `${customizeNumerFormat(Number(rowdata[field]))}`;
    } catch (error) {
      return 0;
    }
  };

  const setSelectedSupportedDataPlace = (data) => {
    setSelectedSupportPlace(data);
    setVisiblePlaceModal(true);
  };

  const emplacementBody = (data) => {
    return (
      <div className="text-center">
        <Button
          icon="pi pi-map-marker"
          onClick={() => setSelectedSupportedDataPlace(data)}
          className="p-button rounded-pill p-button-outlined  p-button-info p-button-text"
          aria-label="emplacement"
        />
      </div>
    );
  };
  const dateCollecteSupportBody = (data) => {
    return formatDateToLiteral(data?.date_collecte);
  }


  const rnomSupportBody= (data) =>{
    return (
      <div className="">
        <p className="my-0 py-0">
          {data?.Rprenom}
          {data?.Rnom}
        </p>
        <p className="my-0 py-0">{data?.Rcontact}</p>
      </div>
    );
  }

  const snomSupportBody = (data) => {
    return (
      <div className="">
        <p className="my-0 py-0">
          {data?.Sprenom} {data?.Snom}
        </p>
        <p className="my-0 py-0">{data?.Scontact}</p>
      </div>
    );
  };

const dureeBody = (data) => {
  return `${data?.duree} Mois`
}

const taxBodyDistrict= (data) => {
  return `${!!data?.taxDistrict ? "OUI" : "NON"}`;
}
const taxBodyRegion = (data) => {
  return `${!!data?.taxRegion ? "OUI" : "NON"}`;
};
const taxBodyCommune = (data) => {
  return `${!!data?.taxBodyCommune ? "OUI" : "NON"}`;
};

  const cols = [
    // { field: 'id', header: 'N°' },
    // { field: "nomsite", header: "Nom Site" },
    { field: "district", header: "District" },
    { field: "region", header: "Région" },
    { field: "commune", header: "Commune" },
    { field: "ville", header: "Ville" },
    { field: "village", header: "Village" },
    { field: "quartier", header: "Quartier" },
    { field: "taxDistrict", header: "Taxe District", body: taxBodyDistrict },
    { field: "taxRegion", header: "Taxe Régionale", body: taxBodyRegion },
    { field: "taxCommune", header: "Taxe Communale", body: taxBodyCommune },
    { field: "emplacement", header: "Emplacement", body: emplacementBody },
    { field: "entreprise", header: "Entreprise" },
    { field: "canal", header: "Canal" },
    { field: "type_support", header: "Type Support" },
    { field: "surface", header: "Dimension" },
    { field: "nombre_support", header: "Nombre Support" },
    { field: "nombre_face", header: "Nombre Face" },
    { field: "surfaceODP", header: "Surface ODP" },
    { field: "typesite", header: "Type Site" },
    { field: "duree", header: "Durée", body: dureeBody },
    { field: "Marque", header: "Marque" },
    { field: "etat_support", header: "État Support", body: etatSupportBody },
    { field: "visibilite", header: "Visibilité", body: visibiliteSupportBody },
    { field: "description", header: "Description" },
    { field: "observation", header: "Observation" },
    { field: "Rnom", header: "Responsable", body: rnomSupportBody },
    { field: "Snom", header: "Superviseur", body: snomSupportBody },

    {
      field: "TSP",
      header: "TSP",
      body: (data) => customizeMontant(data, "TSP"),
    },
    {
      field: "ODP_value",
      header: "ODP",
      body: (data) => customizeMontant(data, "ODP_value"),
    },
    { field: "montant_total", header: "Total", body: getTotalMontant },
    {
      field: "date_collecte",
      header: "Date Collecte",
      body: dateCollecteSupportBody,
    },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = cols.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };


  const getCustomizedData =(data)=>{
    if (data?.length){
    return data?.map((col) => ({
      field: col?.field,
      header: col?.header,
    }));}else{ return []}
  }

  const footer = (event, id) => {
    const { reject } = event;
    return (
      <div className="d-flex  py-3 px-3 justify-content-between align-items-center">
        <Button
          onClick={reject}
          className="px-4 rounded-pill p-button-outlined"
          label="Non"
        />
        <Button
          loading={deleteMutation?.isPending}
          onClick={() => deleteMutation?.mutate(id)}
          className="px-4 p-button-danger  p-button-outlined ms-4 rounded-pill"
          label="Oui"
        />
      </div>
    );
  };

  const handleDelete = (event, rowdata) => {
    confirmDeleted(event, rowdata?.id);
  };

  const setSelectedSupportedData = (data) => {
    setSelectedSupport(data);
    setVisibleModal(true);
  };

  const confirmDeleted = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      className: "fw-bolder py-3 text-danger",
      headerClassName: "text-danger",
      message: "Confirmer la suppression ?",
      header: "Confirmation Suppression",
      icon: "pi pi-info-circle",
      position: "top",
      footer: (footerEvent) => footer(footerEvent, id),
    });
  };

  const actionsBody = (data) => {
    return (
      <div className="d-flex justify-content-between align-items-center gap-3">
        <Button
          icon="pi pi-eye"
          tooltip="Détails"
          onClick={() => setSelectedSupportedData(data)}
          className="p-button rounded-pill p-button-outlined  p-button-info p-button-raised"
          aria-label="Détail"
        />
        <Button
          icon="pi pi-pencil"
          tooltip="Editer"
          onClick={() =>
            navigate(`${main_app_path}/supports-update/${data.id}`)
          }
          className="p-button rounded-pill p-button-outlined  p-button-success p-button-raised"
          aria-label="Détail"
        />
        <Button
          icon="pi pi-trash"
          tooltip="Supprimer"
          onClick={(event) => handleDelete(event, data)}
          className="p-button rounded-pill p-button-outlined  p-button-danger p-button-raised"
          aria-label="Supprimer"
        />
      </div>
    );
  };
  const imageBodyTemplate = (support) => {
    return (
      <Image
        src={`${attacheImageUrl(support?.image_support)}`}
        alt={`support-${support?.Marque}`}
        width="80"
        height="80"
        style={{ height: "80px", width: "80px" }}
        preview
        imageClassName="img-fluid shadow rounded my-0"
      />
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between aling-items-center">
        <div className="d-flex align-items-center justify-content-end gap-2">
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
            onClick={() => exportExcel(supportData, "liste_support")}
            data-pr-tooltip="XLS"
          />
          <Button
            className="rounded-pill p-button-outlined"
            tooltip="Exporter en PDF"
            icon="pi pi-file-pdf"
            severity="warning"
            rounded
            onClick={() =>
              exportPdf(exportColumns, supportData, "liste_support.pdf")
            }
            data-pr-tooltip="PDF"
          />
        </div>

        <div className="col-md-3">
          <MultiSelect
            value={getCustomizedData(visibleColumns)}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            className="w-100 rounded-pill"
            display="chip"
            placeholder="Afficher colonne "
            maxSelectedLabels={3}
          />
        </div>
        <div className="d-flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              className="rounded-pill"
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
    setSupportData(supportsData);
  }, [supportsData]); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(()=>{
    const coulumns = cols?.map(col => ({field: col?.field, header: col?.header}))
    setColumns(coulumns);
    setVisibleColumns(cols);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <div className="mb-5">
      <div className="d-flex justify-content-end align-items-center">
        <h4 className="fw-bolder h4"> {totalItems} supports </h4>
      </div>
      <ConfirmPopup />
      <div className="mt-2 shadow p-3">
        <DataTable
          scrollable
          ref={exportDataRef}
          filters={filters}
          loading={isLoading}
          filterDisplay="row"
          globalFilterFields={[
            "district",
            "region",
            "commune",
            "ville",
            "village,",
            "nomsite",
            "type",
            "quartier",
            "Marque",
            "etat_support",
            "visibilite",
            "surface",
            "entreprise",
          ]}
          header={header}
          emptyMessage="Aucune donnée trouvée."
          value={supportData}
          rowGroupMode="rowspan"
          groupRowsBy="comune"
          sortMode="single"
          sortField="comune"
          size="small"
          rows={rows}
          sortOrder={1}
          resizableColumns
          stripedRows
          showGridlines
        >
          <Column
            header="N°"
            field="id"
            headerStyle={{ width: "3rem" }}
            body={(data, options) => options?.rowIndex + first + 1}
          ></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column header="Nom Site" field="nomsite"></Column>
          {visibleColumns?.map((col, i) => (
            <Column
              key={i}
              // bodyClassName="fw-bolder"
              body={col?.body}
              field={col?.field}
              header={col?.header}
            ></Column>
          ))}

          <Column
            alignFrozen="right"
            frozen={true}
            header="    "
            headerStyle={{ width: "3rem" }}
            body={actionsBody}
          ></Column>
        </DataTable>

        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalItems}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />
      </div>
      <ShowSupportDetailDialog
        visible={visibleModal}
        setVisible={setVisibleModal}
        selectedSupport={selectedSupport}
      />

      <ShowSupportPlaceDialog
        visible={visiblePlaceModal}
        setVisible={setVisiblePlaceModal}
        selectedSupport={selectedSupportPlace}
      />
      <SuccesDialog
        visible={visibleSuccessDelete}
        setVisible={setVisibleSuccessDelete}
        returnUrl={`${main_app_path}/supports`}
        msg="Support supprimé avec succes."
      />
      <ErrorDialog
        visible={visibleSuccessError}
        setVisible={setVisibleSuccessError}
        msg="Une erreur est survenue lors de la suppression. Réessayez!!"
      />
    </div>
  );
}
