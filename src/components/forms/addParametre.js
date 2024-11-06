import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useState } from "react"
import { main_app_path } from "src/router"

import SuccesDialog from "../dialogs/succesDialog"
import ErrorDialog from "../dialogs/errorDialog"
import { Dropdown } from "primereact/dropdown"




const FormRowComponent = ({label,children})=>{

    return(
        <div className="col-md-12 my-3">
            <div className="">
                <h5 className="fw-bold h5 text-capitalize" > {label} </h5>
                { children}
            </div>
        </div>
    )
}


export default function AddParametre({
  parametreFn = () => {},
  typeRequest = "ADD",
  setFieldsData = () => {},
  fieldsData = {},
  updatedID = "",
  tableCols = [],
  dropdownFields = [],
  dropdownList = [],
}) {
  const tablesFislds = Object.keys(fieldsData);

  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleError, setVisibleError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    typeRequest === "ADD" && parametreFn?.mutate(fieldsData);
    typeRequest === "UPDATE" &&
      parametreFn?.mutate({ id: updatedID, body: fieldsData });
  };

  const getTitle = (field) => {
    const title = tableCols?.find((col) => col.field === field);
    return !!title ? title?.header : "";
  };

  const onChangeField = (value, field) => {
    setFieldsData((prev) => ({ ...prev, [field]: value }));
  };


  
  return (
    <section className="px-md-4 py-md-2 bg-white">
      <form onSubmit={onSubmit}>
        <div className="row justify-content-between">
          {tablesFislds?.map((field, index) => 
            dropdownFields?.includes(field) ?
              <FormRowComponent key={index} label={getTitle(field)}>
                <Dropdown
                  value={fieldsData[field]}
                  onChange={(e) => onChangeField(e.value, field)}
                  options={dropdownList[field]}
                  optionLabel="name"
                  optionValue="code"
                  placeholder={`Selectionnez ${getTitle(field)}`}
                  className="w-100"
                  checkmark={true}
                  highlightOnSelect={false}
                  filter
                  showClear
                />
              </FormRowComponent>
                :
              <FormRowComponent key={index} label={getTitle(field)}>
                <InputText
                  type="text"
                  required
                  value={fieldsData[field]}
                  onChange={(e) => onChangeField(e.target.value, field)}
                  className="w-100"
                  placeholder=""
                />
              </FormRowComponent>

          )}
        </div>

        <div className="mt-3 pt-3 d-flex justify-content-end align-items-center">
          {typeRequest === "ADD" && (
            <Button
              loading={parametreFn?.isPending}
              label="Enregistrer"
              type="submit"
              className="rounded-pill px-5"
              icon="pi pi-save"
            />
          )}
          {typeRequest === "UPDATE" && (
            <Button
              loading={parametreFn?.isPending}
              type="submit"
              label="Enregistrer les modifications"
              className="rounded-pill px-5"
              icon="pi pi-save"
            />
          )}
        </div>
      </form>
      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${main_app_path}/utilisateurs`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${main_app_path}/utilisateurs`}
        msg="Nouvel utilisateur enregistré avec succes."
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg="Une erreur est survenue. Réessayez!!"
      />
    </section>
  );
}