
import React from "react";
import { Dialog } from 'primereact/dialog';
import AddParametre from "../forms/addParametre";




export default function ParametrageUpdateDialog({visible, setVisible,updateFunction,setFieldsData,fieldsData,updatedID,
  tableCols,
  dropdownList,
  dropdownFields,}) {

   
    return (
      <Dialog
        header="Formulaire de modification"
        visible={visible}
        position="top"
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <section className="">
          <AddParametre
            updatedID={updatedID}
            parametreFn={updateFunction}
            typeRequest="UPDATE"
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
        