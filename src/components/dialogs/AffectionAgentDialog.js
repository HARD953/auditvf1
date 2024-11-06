import React, { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";

import "src/assets/css/dialogAffectationAgent.css";
import { useQuery } from "@tanstack/react-query";
import { getCommunes, getEntreprisesFiltre } from "src/api/other";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { getAffectationUtilisateurList } from "src/api/users";

const FilterFormInputElement = ({ children, title }) => {
  return (
    <div className="my-4">
      <h5 className="h5 fw-bolder"> {title} </h5>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default function AffectionAgentDialog({
  visible,
  setVisible,
  agentData,
  mutationAffecttion,
  onSubmitAffectation,
  isMainAffectation = false,
  isEmpty=false,
  isUpdate=false,
  isDetails=false,
}) {
  const initialPayload = {
    commune: "",
    entreprise: "",
    agent: "",
  };
  const [entreprises, setEntreprises] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [agents, setAgents] = useState([]);
  const [showErrorsCommune, setShowErrorsCommune] = useState(false);
  const [showErrorsEntreprise, setShowErrorsEntreprise] = useState(false);
  const [showErrorsAgent, setShowErrorsAgent] = useState(false);
  const [affectationPayload, setAffectationPayload] = useState(initialPayload);

  const onSubmit = () => {
    if (isMainAffectation) {
      if (!affectationPayload?.agent) setShowErrorsAgent(true);
    } else {
      setShowErrorsAgent(false);
    }
    if (!affectationPayload?.commune) {
      setShowErrorsCommune(true);
    } else if (!affectationPayload?.entreprise) {
      setShowErrorsEntreprise(true);
    } else {
      onSubmitAffectation(affectationPayload);
    }
  };

  const header = () => {
    return (
      <div className="affectation-dialog-header-sub">
        <h3 className="h3 fw-bold"> Formulaire d'affectation Agent </h3>
        {!isMainAffectation && (
          <div className="affectation-agent d-flex justify-content-start align-items-center gap-3">
            <div className="">
              <i className="pi pi-user fs-2"></i>
            </div>
            <div className="">
              <p className="my-0 py-0">Agent</p>
              <h5 className="h5 fw-bold">
                {agentData?.first_name} {agentData?.last_name}
              </h5>
              <h6 className="h6 fw-bold">{agentData?.email}</h6>
            </div>
          </div>
        )}
      </div>
    );
  };

  const footer = () => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <Button
          label="Annuler"
          className="mr-2 rounded p-button-danger py-2 p-button-outlined"
          onClick={() => setVisible(false)}
        />
        {!isDetails && (
          <Button
            label="Confirmer"
            type="submit"
            loading={mutationAffecttion?.isPending}
            className="mr-2 rounded p-button-info py-2"
            onClick={() => onSubmit()}
          />
        )}
      </div>
    );
  };

  // const { data: dataAggentAffecte } = useQuery({
  //   queryKey: ["dataAggentAffecte"],
  //   queryFn: async () => await getAffectationUtilisateur(),
  // });

  const { data: agentsData } = useQuery({
    queryKey: ["agentsData"],
    queryFn: async () => await getAffectationUtilisateurList(),
  });
  const { data: entreprisesData } = useQuery({
    queryKey: ["entreprisesData"],
    queryFn: async () => await getEntreprisesFiltre(),
  });

  const { data: communesData } = useQuery({
    queryKey: ["communesData"],
    queryFn: async () => await getCommunes(),
  });

  const customizedDropdownData = (data, field) => {
    try {
      if (!!data?.length) {
        const newData = data;
        return newData?.map((item) => ({
          name: `${item[field]}`,
          code: `${item[field]}`,
        }));
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  const onChangeFilterFormData = (value, field) => {
    const filtersPayloadCopie = { ...affectationPayload };
    filtersPayloadCopie[field] = value;
    setAffectationPayload(filtersPayloadCopie);
  };

  useEffect(() => {
    const newEntreprisesData = customizedDropdownData(
      entreprisesData,
      "entreprise"
    );
    const newAgentsData = customizedDropdownData(agentsData, "email");
    const newCommunesData = customizedDropdownData(communesData, "commune");

    setAgents(newAgentsData);
    setEntreprises(newEntreprisesData);
    setCommunes(newCommunesData);
  }, [communesData, entreprisesData, agentsData]);

  useEffect(() => {
    if (!isMainAffectation) {
      setAffectationPayload((prev) => ({ ...prev, agent: agentData?.email }));
    }
  }, [agentData?.email, isMainAffectation]);


  useEffect(() => {
    if (isEmpty) {
      setAffectationPayload(initialPayload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmpty, agentData]);

  useEffect(() => {
    if (isUpdate) {
      setAffectationPayload(agentData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate,agentData]);



  return (
    <Dialog
      headerClassName="affectation-dialog-header"
      closeIcon={<i className="pi pi-times text-white"></i>}
      header={header}
      footer={footer}
      visible={visible}
      style={{ width: "35vw" }}
      onHide={() => setVisible(false)}
    >
      <form className="my-5">
        {isMainAffectation && (
          <FilterFormInputElement title="Agent">
            {showErrorsAgent && (
              <Message severity="error" text="Ce champ est obligatoire." />
            )}
            <Dropdown
              value={affectationPayload?.agent}
              onChange={(e) => onChangeFilterFormData(e.value, "agent")}
              options={agents}
              optionLabel="name"
              optionValue="code"
              required
              placeholder="Selectionnez un agent"
              className="w-100"
              checkmark={true}
              highlightOnSelect={false}
              filter
              showClear
              readOnly={isDetails}
            />
          </FilterFormInputElement>
        )}
        <FilterFormInputElement title="Entréprise">
          {showErrorsEntreprise && (
            <Message severity="error" text="Ce champ est obligatoire." />
          )}
          <Dropdown
            value={affectationPayload?.entreprise}
            onChange={(e) => onChangeFilterFormData(e.value, "entreprise")}
            options={entreprises}
            optionLabel="name"
            optionValue="code"
            required
            placeholder="Selectionnez une entreprise"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
            readOnly={isDetails}
          />
        </FilterFormInputElement>

        <FilterFormInputElement title="Commune">
          {showErrorsCommune && (
            <Message severity="error" text="Ce champ est obligatoire." />
          )}
          <Dropdown
            value={affectationPayload?.commune}
            onChange={(e) => onChangeFilterFormData(e.value, "commune")}
            options={communes}
            optionLabel="name"
            optionValue="code"
            required
            placeholder="Selectionnez une commune"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
            readOnly={isDetails}
          />
        </FilterFormInputElement>
      </form>
    </Dialog>
  );
}
