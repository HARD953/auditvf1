
import React from "react";
import { Dialog } from 'primereact/dialog';
import AddUser from "../forms/addUser";




export default function ShowUserProfile({visible, setVisible,data}) {
    return (
            <Dialog
                header="DETAIL UTILISATEUR"
                visible={visible}
                position="top"
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}>
                    <section className="" > 
                        
                        <AddUser userData={data} noHeader={true} disableInputs={true} isLoading={false} typeRequest="SHOW" />
                    </section>
                
            </Dialog>
        
    )
}
        