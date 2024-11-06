
import React from "react";
import { Dialog } from 'primereact/dialog';

export default function ShowSupportDeleteDialog({visible, setVisible,selectedSupport}) {
   
    return (
            <Dialog
                header={` Confirmation de Suppresion`}
                visible={visible}
                style={{ width: 'auto' }}
                onHide={() => setVisible(false)}>
                    <section className="text-center py-3" > 
                        <p className="fw-bolder ">
                            Etes-vous sûr de supprimer cet'utilisateur ?
                        </p>

                    </section>
                
            </Dialog>
        
    )
}
        