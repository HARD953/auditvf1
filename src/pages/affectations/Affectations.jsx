import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button"; 
import { useState } from "react";
import { addAffectationUtilisateur, getAffectationUtilisateurs, updateAffectationUtilisateur } from "src/api/users";
import AffectationsDataTable from "src/components/dataTables/AffectationsDataTable";
import AffectionAgentDialog from "src/components/dialogs/AffectionAgentDialog";
import SuccesDialog from "src/components/dialogs/succesDialog";
import TitleSyled from "src/components/others/TitleStyled";
import { main_app_path } from "src/router";


function Affectations() {
  const queryClient = useQueryClient();
  
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [utilisateursSelected, setUtilisateursSelected] = useState({});
  const [visibleModalAffectation, setVisibleModalAffectation] = useState(false);
  const [visibleModalAffectationDetails, setVisibleModalAffectationDetails] =
    useState(false);
  const [visibleModalAffectationUpdate, setVisibleModalAffectationUpdate] =
    useState(false);
  const [visibleSuccessAffectation, setVisibleSuccessAffectation] =
    useState(false);
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  const querykeys = ["affectations"];

  const { isLoading, data } = useQuery({
    queryKey: [...querykeys, page, rows],
    queryFn: async () => {
      const response = await getAffectationUtilisateurs(page, rows);
      const count = response?.count;
      setTotalItems(count);
      return response;
    },
  });

  const mutationAffecttion = useMutation({
    mutationFn: async (body) => await addAffectationUtilisateur(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: querykeys,
      });
      setVisibleModalAffectation(false);
      setVisibleSuccessAffectation(true);
        setIsEmpty(true);
    },
  });

  const mutationAffecttionUpdate = useMutation({
    mutationFn: async (body) =>
      await updateAffectationUtilisateur(utilisateursSelected?.id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: querykeys,
      });
      setVisibleModalAffectation(false);
      setVisibleSuccessAffectation(true);
      setIsEmpty(true);
    },
  });

  const onSubmitAffectation = (body) => {
      mutationAffecttion?.mutate(body);
  };

  const onSubmitAffectationUpdate = (body) => {
      mutationAffecttionUpdate?.mutate(body);
  };

  const showUpdatedData = (data)=>{
    setUtilisateursSelected(data)
    setVisibleModalAffectationUpdate(true);
  }

  const   showDetailData = (data) => {
    setUtilisateursSelected(data);
    setVisibleModalAffectationDetails(true);
  };

  return (
    <section className="">
      <div className="mb-5 d-flex justify-content-between align-items-center">
        <div className="">
          <TitleSyled title="Affectations agents recenseurs" />
          <p> Gérer les agents recenseurs affectés </p>
        </div>

        <div className="">
          <Button
            label={`Nouvelle affectation `}
            onClick={() => {
              setVisibleModalAffectation(true);
            }}
            icon="pi pi-plus"
            iconPos="right"
            className="rounded-pill"
          />
        </div>
      </div>
      <AffectationsDataTable
        first={first}
        rows={rows}
        onPageChange={onPageChange}
        totalItems={totalItems}
        isLoading={isLoading}
        data={data}
        querykeys={querykeys}
        showUpdatedData={showUpdatedData}
        showDetailData={showDetailData}
      />
      {/* <UtilisateursOld /> */}

      <AffectionAgentDialog
        visible={visibleModalAffectation}
        setVisible={setVisibleModalAffectation}
        agentData={utilisateursSelected}
        mutationAffecttion={mutationAffecttion}
        onSubmitAffectation={onSubmitAffectation}
        isEmpty={isEmpty}
        isMainAffectation={true}
      />

      <AffectionAgentDialog
        visible={visibleModalAffectationUpdate}
        setVisible={setVisibleModalAffectationUpdate}
        agentData={utilisateursSelected}
        mutationAffecttion={mutationAffecttionUpdate}
        onSubmitAffectation={onSubmitAffectationUpdate}
        isEmpty={isEmpty}
        isMainAffectation={true}
        isUpdate={true}
      />

      <AffectionAgentDialog
        visible={visibleModalAffectationDetails}
        setVisible={setVisibleModalAffectationDetails}
        agentData={utilisateursSelected}
        mutationAffecttion={mutationAffecttionUpdate}
        onSubmitAffectation={onSubmitAffectationUpdate}
        isEmpty={isEmpty}
        isMainAffectation={true}
        isUpdate={true}
        isDetails={true}
      />

      <SuccesDialog
        visible={visibleSuccessAffectation}
        setVisible={setVisibleSuccessAffectation}
        returnUrl={`${main_app_path}/affectations`}
        msg="Affection effectuée avec succès."
      />
    </section>
  );
}

export default Affectations;