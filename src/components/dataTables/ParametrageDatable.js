import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { FilterMatchMode } from 'primereact/api';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ParametrageAddDialog from '../dialogs/parametrageAddDialog';
import SuccesDialog from '../dialogs/succesDialog';
import ErrorDialog from '../dialogs/errorDialog';
import { main_app_path } from 'src/router';
import ParametrageUpdateDialog from '../dialogs/parametrageUpdateDialog';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Paginator } from 'primereact/paginator';



export default function ParametrageDatable({
  tableCols,
  queryFunction,
  addFunction,
  updateFunction,
  deleteFunction,
  querysKeysLabel,
  marqueFieldsState,
  dropdownList = [],
  dropdownFields=[],
}) {
  const queryClient = useQueryClient();
  const getQueryKey = [`parametre-${querysKeysLabel}`];
  

  const [firstPage, setFirstPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);

 const { data: dataQuery, isFetching: isFetchingQuery } = useQuery({
   queryKey: [...getQueryKey, selectedPage],
   queryFn: () => queryFunction(selectedPage),
   placeholderData: keepPreviousData,
 });
   
  
  const [parametreData, setParametreData] = useState([]);
  const [updatedID, setUpdatedID] = useState("");

  const [fieldsData, setFieldsData] = useState(marqueFieldsState);
  const [fieldsDataUpdate, setFieldsDataUpdate] = useState(marqueFieldsState);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [visibleAddForm, setVisibleAddForm] = useState(false);
  const [visibleUpdateForm, setVisibleUpdateForm] = useState(false);
  const [visibleSuccessDelete, setVisibleSuccessDelete] = useState(false);
  const [visibleSuccessUpdate, setVisibleSuccessUpdate] = useState(false);
  const [visibleSuccessAdd, setVisibleSuccessAdd] = useState(false);
  const [visibleSuccessError, setVisibleSuccessError] = useState(false);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });


     const onPageChange = (event) => {
      setFirstPage(event.first);
      setRows(event.rows);
      setSelectedPage(event.page + 1);
     };


  const addMutation = useMutation({
    mutationFn: async (body) => await addFunction(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey,
      });
      setVisibleAddForm(false);
      setVisibleSuccessAdd(true);
    },
    onError: () => {
      setVisibleSuccessError(true);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (param) => await updateFunction(param?.id, param?.body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey,
      });
      setVisibleUpdateForm(false);
      setVisibleSuccessUpdate(true);
    },
    onError: () => {
      setVisibleSuccessError(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await deleteFunction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getQueryKey,
      });
      setVisibleSuccessDelete(true);
    },
    onError: () => {
      setVisibleSuccessError(true);
    },
  });

  const handleUpdateRowData = (rowdata) => {
    const _marqueFieldsState = Object?.keys(fieldsDataUpdate);

    _marqueFieldsState.forEach(
      (element) => (fieldsDataUpdate[element] = rowdata[element])
    );
    setUpdatedID(rowdata?.id);
    setVisibleUpdateForm(true);
  };

  const handleDelete = (event, rowdata) => {
    confirmDeleted(event, rowdata?.id);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
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


  


  const actionsBody = (rowdata) => {
    return (
      <div className="d-flex justify-content-between align-items-center gap-4">
        <Button
          icon="pi pi-pencil"
          label="Modifier"
          className="mr-2 p-button-primary rounded-pill p-button-outlined p-button-raised py-2"
          onClick={() => handleUpdateRowData(rowdata)}
        />
        <Button
          icon="pi pi-times"
          label="Supprimer"
          className="mr-2 rounded-pill p-button-raised p-button-danger py-2"
          onClick={(event) => handleDelete(event, rowdata)}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="d-flex justify-content-between aling-items-center">
        <div className="">
          <Button
            icon="pi pi-plus"
            label={`Ajouter ${querysKeysLabel}`}
            className="mr-2 p-button-primary rounded-pill    p-button-raised"
            onClick={() => setVisibleAddForm(true)}
          />
        </div>
        <div className="flex justify-content-end">
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

  const footer = (event, id) => {
    const { reject } = event;
    return (
      <div  className="d-flex  py-3 px-3 justify-content-between align-items-center">
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

  const customizeQueryData = (data)=>{
    try {
      return (data || [])?.map((support, index) => ({
        ...support,
      }));
      
    } catch (error) {
      return []
    }
  }


  useEffect(() => {
    const dataResults = dataQuery?.results || []
    const dataReceive = customizeQueryData(dataResults);
    setParametreData(dataReceive);

  }, [dataQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="d-flex mt-3 justify-content-between align-items-center">
        <h4 className="fw-bolder h4"> Liste {querysKeysLabel} </h4>
        <h4 className="fw-bolder h4">
          {dataQuery?.count} {querysKeysLabel}s
        </h4>
      </div>
      <ConfirmPopup />
      <div className="mt-2 shadow p-3 rounded">
        <DataTable
          scrollable
          className="rounded"
          tableClassName='rounded bg-white'
          rows={10}
          loading={isFetchingQuery}
          filters={filters}
          filterDisplay="row"
          height="400px"
          globalFilterFields={Object?.keys(marqueFieldsState) ?? [""]}
          header={header}
          reorderableRows
          emptyMessage="Aucune donnée trouvée."
          value={parametreData}
          size="small"
          sortOrder={1}
          resizableColumns
          showGridlines={true}
        >
          <Column
            header="N°"
            headerStyle={{ width: "3rem" }}
            body={(_, options) => options?.rowIndex + firstPage + 1}
          ></Column>
          {tableCols?.map((col, i) => (
            <Column
              key={i}
              body={col?.body}
              field={col?.field}
              header={col?.header}
            ></Column>
          ))}
          <Column
            header="    "
            headerStyle={{ width: "3rem" }}
            body={actionsBody}
          ></Column>
        </DataTable>

        <Paginator
          first={firstPage}
          rows={rows}
          totalRecords={dataQuery?.count}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
        />

        <ParametrageAddDialog
          tableCols={tableCols}
          visible={visibleAddForm}
          dropdownFields={dropdownFields}
          dropdownList={dropdownList}
          setVisible={setVisibleAddForm}
          addFunction={addMutation}
          fieldsData={fieldsData}
          setFieldsData={setFieldsData}
        />
        <ParametrageUpdateDialog
          updatedID={updatedID}
          tableCols={tableCols}
          dropdownFields={dropdownFields}
          dropdownList={dropdownList}
          visible={visibleUpdateForm}
          setVisible={setVisibleUpdateForm}
          updateFunction={updateMutation}
          fieldsData={fieldsDataUpdate}
          setFieldsData={setFieldsDataUpdate}
        />

        <SuccesDialog
          visible={visibleSuccessUpdate}
          setVisible={setVisibleSuccessUpdate}
          returnUrl={`${main_app_path}/parametres`}
          msg="Informations Modifiée avec succes."
        />
        <SuccesDialog
          visible={visibleSuccessAdd}
          setVisible={setVisibleSuccessAdd}
          returnUrl={`${main_app_path}/parametres`}
          msg="Enregistremet effectuée avec succes."
        />
        <SuccesDialog
          visible={visibleSuccessDelete}
          setVisible={setVisibleSuccessDelete}
          returnUrl={`${main_app_path}/parametres`}
          msg="Enregistremet supprimé avec succes."
        />
        <ErrorDialog
          visible={visibleSuccessError}
          setVisible={setVisibleSuccessError}
          msg="Une erreur est survenue. Réessayez!!"
        />
      </div>
    </>
  );
}
        