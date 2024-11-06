
import React from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
// import { useNavigate } from "react-router-dom";

export default function ErrorDialog({visible, setVisible,msg}) {
//    const navigate = useNavigate()
   

   const onClose = ()=>{
    // navigate(returnUrl)
    setVisible(false)
   }

    const footer =  ()=>{
        return(
            <div className="">
                 <Button
                    onClick={()=>onClose() }
                    label="Fermer"
                    className="rounded-pill p-button-danger"
                    icon="pi pi-times" />
                
            </div>
        )
    }

    return (
            <Dialog
                footer={footer}
                header={<div className="d-flex justify-content-start align-items-center">
                    <i className="pi pi-times text-danger"></i>
                    <h6 className="fw-bold ms-3" >Erreur</h6>
                </div>}
                visible={visible}
                style={{ width: 'auto' }}
                onHide={() => onClose()}>
                    <section className="text-center px-4" > 
                        <p className="fw-bolder text-danger ">
                          {msg}
                        </p>
                    </section>
                
            </Dialog>
        
    )
}
        