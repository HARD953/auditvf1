
import { useLocation } from "react-router-dom";
import AddUser from "src/components/forms/addUser";


function UtilisateursCreate() {
    const location = useLocation()
    const {title} = location?.state

    return ( 
        <section className="">
            <div className="mb-5 p-md-4 text-center rounded d-flex justify-content-center shadow align-items-center">
                <h3
                  className="fw-bolder h3"
                  // style={{color:'var(--color-lanfia-primary)'}}
                  >
                    Formulaire d'ajout {title}
                </h3>
            </div>
            <AddUser />
        </section>
     );
}

export default UtilisateursCreate