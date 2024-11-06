import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dropdown } from "primereact/dropdown";
import { getDateEnglishFormatYearMonthDay } from "src/utils/functionsUtils";
import { useQuery } from "@tanstack/react-query";
import { getCanaux, getCommunes, getDistricts, getEntreprisesFiltre, getEtatSupports, getMarques, getQuartiers, getRegions, getTypeSites, getTypeSupports, getVillesFiltre, getVisibilites } from "src/api/other";
import { InputText } from "primereact/inputtext";


const FilterFormInputElement = ({children,title})=>{


    return(
        <div className="my-4">
            <h5 className="h5 fw-bolder"> {title} </h5>
            <div className="mt-2">
                {children}
            </div>
        </div>
    )
}

export default function AccueilFiltresDialog({
  visible,
  setVisible,
  filtersPayload,
  mutationFilterGeo,
  setFiltersPayload,
  mutationFilter,
  initialFilters,
}) {
  const [entreprises, setEntreprises] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [villes, setVilles] = useState([]);
  const [marques, setMarques] = useState([]);
  const [quartiers, setQuartiers] = useState([]);
  const [typeSupports, setTypeSupports] = useState([]);
  const [canaux, setCanaux] = useState([]);
  const [etatSupports, setEtatSupports] = useState([]);
  const [typeSites, setTypeSites] = useState([]);
  const [visibilites, setVisibilites] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [regions, setRegions] = useState([]);

  addLocale("fr", {
    firstDayOfWeek: 1,
    dayNames: [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samédi",
    ],
    dayNamesShort: ["Dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
    dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
    monthNames: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
    monthNamesShort: [
      "jan",
      "fév",
      "mar",
      "avr",
      "mai",
      "jui",
      "juil",
      "aoû",
      "sep",
      "oct",
      "nov",
      "déc",
    ],
    today: "Aujourd'hui",
    clear: "Effacer",
  });

  const { data: entreprisesData } = useQuery({
    queryKey: ["entreprisesData"],
    queryFn: async () => await getEntreprisesFiltre(),
  });
  const { data: villesData } = useQuery({
    queryKey: ["villesData"],
    queryFn: async () => await getVillesFiltre(),
  });
  const { data: communesData } = useQuery({
    queryKey: ["communesData"],
    queryFn: async () => await getCommunes(),
  });

  const { data: marquesData } = useQuery({
    queryKey: ["marquesData"],
    queryFn: async () => await getMarques(),
  });

  const { data: quartiersData } = useQuery({
    queryKey: ["quartiersData"],
    queryFn: async () => await getQuartiers(),
  });

  const { data: typeSupportsData } = useQuery({
    queryKey: ["typeSupportsData"],
    queryFn: async () => await getTypeSupports(),
  });

  const { data: canauxData } = useQuery({
    queryKey: ["canauxData"],
    queryFn: async () => await getCanaux(),
  });

  const { data: etatSupportsData } = useQuery({
    queryKey: ["etatSupportsData"],
    queryFn: async () => await getEtatSupports(),
  });

  const { data: typeSitesData } = useQuery({
    queryKey: ["typeSitesData"],
    queryFn: async () => await getTypeSites(),
  });

  const { data: visibilitesData } = useQuery({
    queryKey: ["visibilitesData"],
    queryFn: async () => await getVisibilites(),
  });

  const { data: districsData } = useQuery({
    queryKey: ["districsData"],
    queryFn: async () => await getDistricts(),
  });

  const { data: regionsData } = useQuery({
    queryKey: ["regionsData"],
    queryFn: async () => await getRegions(),
  });

  const onChangeFilterFormData = (value, field) => {
    const filtersPayloadCopie = { ...filtersPayload };
    filtersPayloadCopie[field] = value;
    setFiltersPayload(filtersPayloadCopie);
    mutationFilter?.mutate({
      ...filtersPayloadCopie,
      start_date: getDateEnglishFormatYearMonthDay(
        filtersPayloadCopie?.start_date
      ),
      end_date: getDateEnglishFormatYearMonthDay(filtersPayloadCopie?.end_date),
    });

    mutationFilterGeo?.mutate({
      ...filtersPayloadCopie,
      start_date: getDateEnglishFormatYearMonthDay(
        filtersPayloadCopie?.start_date
      ),
      end_date: getDateEnglishFormatYearMonthDay(filtersPayloadCopie?.end_date),
    });
    
  };

  const cancelFiltered = () => {
    setFiltersPayload(initialFilters);
    mutationFilter?.mutate({
      ...initialFilters,
      start_date: getDateEnglishFormatYearMonthDay(initialFilters?.start_date),
      end_date: getDateEnglishFormatYearMonthDay(initialFilters?.end_date),
    });
  };

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

  const customizeDataToDorpdownType = (data, field) => {
    try {
      const newData = (data || [])?.map((item) => ({
        name: item[field],
        code: item[field],
      }));
      return newData;
    } catch (error) {
      return [];
    }
  };

  const footerContent = (
    <div className="d-flex justify-content-between align-items-center pt-2">
      <Button
        type="button"
        label="Annuler les Filtres"
        severity="secondary"
        outlined
        className="rounded px-4"
        onClick={() => cancelFiltered()}
      >
      </Button>
      <Button
        label={`Afficher Résultats`}
        onClick={() => setVisible(false)}
        autoFocus
        className="rounded px-4"
        loading={mutationFilter?.isPending}
      />
    </div>
  );

  useEffect(() => {
    const newEntreprisesData = customizedDropdownData(
      entreprisesData,
      "entreprise"
    );
    const newVillesData = customizeDataToDorpdownType(villesData, "ville");
    const newCommunesData = customizeDataToDorpdownType(
      communesData,
      "commune"
    );
    const newMarquesData = customizedDropdownData(marquesData, "marque");
    const newQuartiersData = customizeDataToDorpdownType(
      quartiersData,
      "quartier"
    );
    const newTypeSupportsData = customizedDropdownData(
      typeSupportsData,
      "type_support"
    );
    const newCanauxData = customizedDropdownData(canauxData, "canal");
    const newEtatSupportsData = customizedDropdownData(
      etatSupportsData,
      "etat"
    );
    const newTypeSitesData = customizedDropdownData(typeSitesData, "site");
    const newVisibilitesData = customizedDropdownData(
      visibilitesData,
      "visibilite"
    );
    const newdistricsData = customizedDropdownData(districsData, "district");
    const newregionsData = customizedDropdownData(regionsData, "region");

    setEntreprises(newEntreprisesData);
    setVilles(newVillesData);
    setCommunes(newCommunesData);
    setMarques(newMarquesData);
    setQuartiers(newQuartiersData);
    setTypeSupports(newTypeSupportsData);
    setCanaux(newCanauxData);
    setEtatSupports(newEtatSupportsData);
    setTypeSites(newTypeSitesData);
    setVisibilites(newVisibilitesData);
    setDistricts(newdistricsData);
    setRegions(newregionsData);
  }, [
    canauxData,
    villesData,
    communesData,
    entreprisesData,
    etatSupportsData,
    marquesData,
    quartiersData,
    typeSitesData,
    typeSupportsData,
    visibilitesData,
    districsData,
    regionsData,
  ]);


   useEffect(() => {
     mutationFilter?.mutate({
       ...filtersPayload,
       start_date: getDateEnglishFormatYearMonthDay(filtersPayload?.start_date),
       end_date: getDateEnglishFormatYearMonthDay(filtersPayload?.end_date),
     });

     mutationFilterGeo?.mutate({
       ...filtersPayload,
       start_date: getDateEnglishFormatYearMonthDay(filtersPayload?.start_date),
       end_date: getDateEnglishFormatYearMonthDay(filtersPayload?.end_date),
     });
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


  return (
    <Dialog
      visible={visible}
      modal
      position="top"
      header={<h2 className="fw-bold h2">Filtres</h2>}
      footer={footerContent}
      style={{ width: "50rem" }}
      onHide={() => setVisible(false)}
    >
      <div className="">
        <FilterFormInputElement title="Période">
          <div className="d-flex mx-2 justify-content-between align-items-center gap-4">
            <div className="flex-auto">
              <label htmlFor="dateStart" className="me-2 block mb-2">
                Date debut
              </label>
              <Calendar
                id="dateStart"
                dateFormat="dd/mm/yy"
                locale="fr"
                value={filtersPayload?.start_date}
                onChange={(e) => onChangeFilterFormData(e.value, "start_date")}
                showIcon
              />
            </div>
            <div className="flex-auto">
              <label htmlFor="dateEnd" className="block  me-2 mb-2">
                Date fin
              </label>
              <Calendar
                id="dateEnd"
                value={filtersPayload?.end_date}
                onChange={(e) => onChangeFilterFormData(e.value, "end_date")}
                dateFormat="dd/mm/yy"
                locale="fr"
                showIcon
              />
            </div>
          </div>
        </FilterFormInputElement>
        <FilterFormInputElement title="Entréprise">
          <Dropdown
            value={filtersPayload?.entreprise}
            onChange={(e) => onChangeFilterFormData(e.value, "entreprise")}
            options={entreprises}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez une entreprise"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Nom Site">
          <InputText
            placeholder="Spécifiez le nom du site"
            className="w-100"
            value={filtersPayload?.nomsite}
            onChange={(e) => onChangeFilterFormData(e.target.value, "nomsite")}
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Marque">
          <Dropdown
            value={filtersPayload?.Marque}
            onChange={(e) => onChangeFilterFormData(e.value, "Marque")}
            options={marques}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez une marque"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="District">
          <Dropdown
            value={filtersPayload?.district}
            onChange={(e) => onChangeFilterFormData(e.value, "district")}
            options={districts}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez un district"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Région">
          <Dropdown
            value={filtersPayload?.region}
            onChange={(e) => onChangeFilterFormData(e.value, "region")}
            options={regions}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez une région"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Ville">
          <Dropdown
            value={filtersPayload?.ville}
            onChange={(e) => onChangeFilterFormData(e.value, "ville")}
            options={villes}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez une ville"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Commune">
          <Dropdown
            value={filtersPayload?.commune}
            onChange={(e) => onChangeFilterFormData(e.value, "commune")}
            options={communes}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez une commune"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Quartier">
          <Dropdown
            value={filtersPayload?.quartier}
            onChange={(e) => onChangeFilterFormData(e.value, "quartier")}
            options={quartiers}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez un quartier"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Type de Support">
          <Dropdown
            value={filtersPayload?.type_support}
            onChange={(e) => onChangeFilterFormData(e.value, "type_support")}
            options={typeSupports}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez un type de support"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Canal">
          <Dropdown
            value={filtersPayload?.canal}
            onChange={(e) => onChangeFilterFormData(e.value, "canal")}
            options={canaux}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez un canal"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Etat du Support">
          <Dropdown
            value={filtersPayload?.etat_support}
            onChange={(e) => onChangeFilterFormData(e.value, "etat_support")}
            options={etatSupports}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez un état du Support"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Type de Visite">
          <Dropdown
            value={filtersPayload?.typesite}
            onChange={(e) => onChangeFilterFormData(e.value, "typesite")}
            options={typeSites}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez un type de site"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Visibilité">
          <Dropdown
            value={filtersPayload?.visibilite}
            onChange={(e) => onChangeFilterFormData(e.value, "visibilite")}
            options={visibilites}
            optionLabel="name"
            optionValue="code"
            placeholder="Selectionnez une visibilité"
            className="w-100"
            checkmark={true}
            highlightOnSelect={false}
            filter
            showClear
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Durée">
          <InputText
            className="w-100"
            value={filtersPayload?.duree}
            onChange={(e) => onChangeFilterFormData(e.target.value, "duree")}
            placeholder="Spécifiez une durée"
          />
        </FilterFormInputElement>
        <FilterFormInputElement title="Surface">
          <InputText
            placeholder="Spécifiez une surface"
            className="w-100"
            value={filtersPayload?.surface}
            onChange={(e) => onChangeFilterFormData(e.target.value, "surface")}
          />
        </FilterFormInputElement>
      </div>
    </Dialog>
  );
}
