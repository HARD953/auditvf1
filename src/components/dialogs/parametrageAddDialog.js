
import React from "react";
import { Dialog } from 'primereact/dialog';
import AddParametre from "../forms/addParametre";




export default function ParametrageAddDialog({
  visible,
  setVisible,
  addFunction,
  setFieldsData,
  fieldsData,
  tableCols,
  dropdownList,
  dropdownFields,
}) {
  return (
    <Dialog
      header="Formulaire d'ajout"
      visible={visible}
      position="top"
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
    >
      <section className="">
        <AddParametre
          parametreFn={addFunction}
          typeRequest="ADD"
          fieldsData={fieldsData}
          setFieldsData={setFieldsData}
          tableCols={tableCols}
          dropdownList={dropdownList}
          dropdownFields={dropdownFields}
        />
      </section>
    </Dialog>
  );
}
        