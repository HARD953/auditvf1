import AddSupport from "src/components/forms/addSupport";

export default function SupportsCreate() {

    return ( 
      <section className="">
          <div className="mb-5 p-md-4 text-center rounded d-flex justify-content-center shadow align-items-center">
              <h3
                className="fw-bolder h3"
                // style={{color:'var(--color-lanfia-primary)'}}
                >
                  Formulaire d'ajout Support publicitaire
              </h3>
          </div>
          <AddSupport typeRequest="ADD"  />
      </section>
     );
}

