import { useQuery } from "@tanstack/react-query";
import { Button } from "primereact/button"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUtilisateursEntreprises } from "src/api/users";
// import UtilisateursOld from "./UtilisateursOld";
import UtilisateursDataTable from "src/components/dataTables/UtilisateursDataTable";
import TitleSyled from "src/components/others/TitleStyled";
import { main_app_path } from "src/router";


function Utilisateurs() {

  const navigate = useNavigate()
  const querykeys = ["utilisateurs-entreprises"];
  const labelHeader = "Utilisateurs Entreprises"

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
    console.log("event :::", event);
  };

  const { isLoading, data } = useQuery({
    queryKey: [...querykeys,page,rows],
    queryFn: async() => {
      const response = await getUtilisateursEntreprises(page,rows)
       const count = response?.count;
      setTotalItems(count);
      return response
    },
    },
  );

    return (
      <section className="">
        <div className="mb-5 d-flex justify-content-between align-items-center">
          <div className="">
            <TitleSyled title="Utilisateurs des entreprises" />
            <p> Gérer les utilisateurs des entreprises </p>
          </div>

          <div className="">
            <Button
              label={`Ajouter ${labelHeader}`}
              onClick={() =>
                navigate(`${main_app_path}/utilisateurs-create`, {
                  state: {
                    from: "entreprise",
                    goBack: "utilisateurs-entreprises",
                    title: "Utilisateurs Entreprise",
                    urlRequest: "uentreprise/",
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
          isLoading={isLoading}
          data={data}
          querykeys={querykeys}
          labelTable={labelHeader}
          first={first}
          rows={rows}
          onPageChange={onPageChange}
          totalItems={totalItems}
          states={{
            state: {
              from: "entreprise",
              goBack: "utilisateurs-entreprises",
              title: "Utilisateurs Entreprise",
              urlRequest: "uentreprise/",
            },
          }}
        />
        {/* <UtilisateursOld /> */}
      </section>
    );
}

export default Utilisateurs