import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUtilisateursRecenseurs } from "src/api/users";
// import UtilisateursOld from "./UtilisateursOld";
import UtilisateursDataTable from "src/components/dataTables/UtilisateursDataTable";
import TitleSyled from "src/components/others/TitleStyled";
import { main_app_path } from "src/router";


function UtilisateursRecenseurs() {
  const navigate = useNavigate()

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

    const querykeys = ["utilisateurs-recenseurs"];
  const labelHeader = "Agents Recenseurs"

   const { isLoading, data } = useQuery({
     queryKey: [...querykeys, page, rows],
     queryFn: async () => {
       const response = await getUtilisateursRecenseurs(page, rows);
       const count = response?.count;
       setTotalItems(count);
       return response;
     },
   });


    return (
      <section className="">
        <div className="mb-5 d-flex justify-content-between align-items-center">
          <div className="">
            <TitleSyled
              title="Agents recenseurs"
            />
            <p> Gérer les agents recenseurs </p>
          </div>

          <div className="">
            <Button
              label={`Ajouter ${labelHeader} `}
              onClick={() =>
                navigate(`${main_app_path}/utilisateurs-create`, {
                  state: {
                    from: "recenseur",
                    goBack: "utilisateurs-recenseurs",
                    title: "Agent recenseur",
                    urlRequest: "urecenseur/",
                  },
                })
              }
              icon="pi pi-plus"
              iconPos="right"
              className="rounded-pill"
            />
          </div>
        </div>
        <UtilisateursDataTable
          first={first}
          rows={rows}
          onPageChange={onPageChange}
          totalItems={totalItems}
          isLoading={isLoading}
          data={data}
          querykeys={querykeys}
          labelTable={labelHeader}
          states={{
            state: {
              from: "recenseur",
              goBack: "utilisateurs-recenseurs",
              title: "Agent recenseur",
              urlRequest: "urecenseur/",
            },
          }}
        />
        {/* <UtilisateursOld /> */}
      </section>
    );
}

export default UtilisateursRecenseurs