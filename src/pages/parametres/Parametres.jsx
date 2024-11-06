import React, { useEffect, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { useQuery } from "@tanstack/react-query";

import ParametrageDatable from "src/components/dataTables/ParametrageDatable";
import {
  addCanal,
  addMarque,
  deleteCanal,
  deleteMarque,
  getCanals,
  getMarques,
  getSites,
  updateCanal,
  updateMarque,
  addSite,
  updateSite,
  deleteSite,
  getEtats,
  addEtat,
  updateEtat,
  deleteEtat,
  getVisibilites,
  addVisibilite,
  updateVisibilite,
  deleteVisibilite,
  getCommunes,
  addCommune,
  updateCommune,
  deleteCommune,
  deleteTypeSupport,
  updateTypeSupport,
  addTypeSupport,
  getTypeSupportParams,
  addQuartier,
  updateQuartier,
  deleteQuartier,
  getQuartiersList,
  getVilles,
  deleteVille,
  updateVille,
  addVille,
  addDistrict,
  updateDistrict,
  deleteDistrict,
  addRegion,
  updateRegion,
  deleteRegion,
  updateVillage,
  deleteVillage,
  addVillage,
  getVillages,
  getDistrictsList,
  getRegionsList,
} from "src/api/parametres/parametres";
import {
  getCommunes as getCommunesFromOther,
  getDistricts,
  getEntreprisesFiltre,
  getRegions,
} from "src/api/other";
import { getDateAndTimeInFr } from "src/utils/functionsUtils";
import { getVillesFiltre } from "src/api/other";

import "src/assets/css/parametres.css";
import TitleSyled from "src/components/others/TitleStyled";

// const dateBodyCreate = (rowdata) => getDateAndTimeInFr(rowdata?.create);
const dateBodyUpdated = (rowdata) => getDateAndTimeInFr(rowdata?.updated_at);

//Marque
const marquesCols = [
  { field: "marque", header: "Marque" },
  { field: "entreprise", header: "Entreprise" },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const marqueFieldsState = {
  marque: "",
  entreprise: "",
};
const marqueDropdownFields = ["entreprise"];

//Canal
const canalsCols = [
  { field: "canal", header: "Canal" },
  // { field: 'canal', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const canalFieldsState = {
  canal: "",
};

//Site
const sitesCols = [
  { field: "site", header: "Site" },
  // { field: 'site', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const siteFieldsState = {
  site: "",
};

//Etat
const etatsCols = [
  { field: "etat", header: "Etat" },
  // { field: 'etat', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const etatFieldsState = {
  etat: "",
};

//Visibilité
const visibilitesCols = [
  { field: "visibilite", header: "Visibilité" },
  // { field: 'etat', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const visibiliteFieldsState = {
  visibilite: "",
};

//Regions
const regionsCols = [
  { field: "district", header: "District" },
  { field: "region", header: "Région" },
  { field: "tauxODP", header: "Taux ODP" },
  { field: "tauxTSP", header: "Taux TSP" },
  { field: "tauxAP", header: "Taux AP" },
  { field: "tauxAPA", header: "Taux APA" },
  { field: "tauxAPT", header: "Taux APT" },
  { field: "tauxAE", header: "Taux AE" },
  { field: "tauxAEA", header: "Taux AEA" },
  { field: "tauxAET", header: "Taux AET" },
  // { field: 'commune', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const regionFieldsState = {
  district: "",
  region: "",
  tauxODP: "",
  tauxTSP: "",
  tauxAP: "",
  tauxAPA: "",
  tauxAPT: "",
  tauxAE: "",
  tauxAEA: "",
  tauxAET: "",
};
const regionsDropdownFields = ["district"];

//District
const districtsCols = [
  { field: "district", header: "District" },
  { field: "tauxODP", header: "Taux ODP" },
  { field: "tauxTSP", header: "Taux TSP" },
  { field: "tauxAP", header: "Taux AP" },
  { field: "tauxAPA", header: "Taux APA" },
  { field: "tauxAPT", header: "Taux APT" },
  { field: "tauxAE", header: "Taux AE" },
  { field: "tauxAEA", header: "Taux AEA" },
  { field: "tauxAET", header: "Taux AET" },
  // { field: 'commune', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const districtFieldsState = {
  district: "",
  tauxODP: "",
  tauxTSP: "",
  tauxAP: "",
  tauxAPA: "",
  tauxAPT: "",
  tauxAE: "",
  tauxAEA: "",
  tauxAET: "",
};

//Villes
const villesCols = [
  { field: "ville", header: "Ville" },
  { field: "tauxODP", header: "Taux ODP" },
  { field: "tauxTSP", header: "Taux TSP" },
  { field: "tauxAP", header: "Taux AP" },
  { field: "tauxAPA", header: "Taux APA" },
  { field: "tauxAPT", header: "Taux APT" },
  { field: "tauxAE", header: "Taux AE" },
  { field: "tauxAEA", header: "Taux AEA" },
  { field: "tauxAET", header: "Taux AET" },
  // { field: 'commune', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const villeFieldsState = {
  ville: "",
  tauxODP: "",
  tauxTSP: "",
  tauxAP: "",
  tauxAPA: "",
  tauxAPT: "",
  tauxAE: "",
  tauxAEA: "",
  tauxAET: "",
};

//Commune
const communesCols = [
  { field: "district", header: "District" },
  { field: "region", header: "Région" },
  { field: "ville", header: "Ville" },
  { field: "commune", header: "Commune / Localité" },
  { field: "tauxODP", header: "Taux ODP" },
  { field: "tauxTSP", header: "Taux TSP" },
  { field: "tauxAP", header: "Taux AP" },
  { field: "tauxAPA", header: "Taux APA" },
  { field: "tauxAPT", header: "Taux APT" },
  { field: "tauxAE", header: "Taux AE" },
  { field: "tauxAEA", header: "Taux AEA" },
  { field: "tauxAET", header: "Taux AET" },
  // { field: 'commune', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const communeFieldsState = {
  district: "",
  region: "",
  ville: "",
  commune: "",
  tauxODP: "",
  tauxTSP: "",
  tauxAP: "",
  tauxAPA: "",
  tauxAPT: "",
  tauxAE: "",
  tauxAEA: "",
  tauxAET: "",
};
const communesDropdownFields = ["ville", "region", "district"];

//Quartiers
const quartiersCols = [
  { field: "quartier", header: "Quartier" },
  { field: "commune", header: "Commune" },
  // { field: 'commune', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const quartiersFieldsState = {
  commune: "",
  quartier: "",
};
const quartiersDropdownFields = ["commune"];

//Villages
const villagesCols = [
  { field: "village", header: "Village" },
  { field: "commune", header: "Commune" },
  // { field: 'commune', header: 'Auteur' },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const villagesFieldsState = {
  commune: "",
  village: "",
};
const villagesDropdownFields = ["commune"];

//Type de Support
const typeSupportsCols = [
  { field: "type_support", header: "Type de support" },
  { field: "entreprise", header: "Entreprise" },
  { field: "surface", header: "Surface" },
  { field: "nombre_face", header: "Nombre de face" },
  {
    field: "updated_at",
    header: "Denière modification",
    body: dateBodyUpdated,
  },
  // { field: "create", header: "Date enregistrement", body: dateBodyCreate },
];
const typeSupportFieldsState = {
  type_support: "",
  surface: "",
  nombre_face: "",
  entreprise: "",
};
const typeSupportDropdownFields = ["entreprise"];

const ParametresPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [communesdropdownList, setCommunesdropdownList] = useState([]);
  const [quartiersdropdownList, setQuartiersdropdownList] = useState([]);
  const [districtsdropdownList, setDistrictsdropdownList] = useState([]);
  const [villagesdropdownList, setVillagesdropdownList] = useState([]);
  const [entreprisedropdownList, setEntreprisedropdownList] = useState([]);

  const { data: communesData } = useQuery({
    queryKey: ["param-get-communes"],
    queryFn: async () => await getCommunesFromOther(),
  });

  const { data: villesData } = useQuery({
    queryKey: ["param-get-villes"],
    queryFn: async () => await getVillesFiltre(),
  });

  const { data: districtsData } = useQuery({
    queryKey: ["param-get-district"],
    queryFn: async () => await getDistricts(),
  });

  const { data: regionsData } = useQuery({
    queryKey: ["param-get-regions"],
    queryFn: async () => await getRegions(),
  });

  const { data: entreprisesData } = useQuery({
    queryKey: ["entreprisesDataParams"],
    queryFn: async () => await getEntreprisesFiltre(),
  });

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

  useEffect(() => {
    const data = customizeDataToDorpdownType(communesData, "commune");
    setQuartiersdropdownList({
      commune: data,
    });
    setVillagesdropdownList({
      commune: data,
    });
  }, [communesData]);

  useEffect(() => {
    const dataDistrict = customizeDataToDorpdownType(
      districtsData,
      "district"
    );

    const dataEntreprise = customizeDataToDorpdownType(
      entreprisesData,
      "entreprise"
    );
    const data = customizeDataToDorpdownType(villesData, "ville");
    const dataRegions = customizeDataToDorpdownType(
      regionsData,
      "region"
    );

    setCommunesdropdownList({
      ville: data,
      region: dataRegions,
      district: dataDistrict,
    });

    setDistrictsdropdownList({
      district: data,
    });
    setEntreprisedropdownList({
      entreprise: dataEntreprise,
    });
  }, [villesData, regionsData, districtsData, entreprisesData]);

  return (
    <>
      <section className="parametre-conteneur">
        <div className="mb-5 justify-content-between align-items-center">
          <TitleSyled title="Interface de paramètrage" />
          <p> Paramètrer les données de vos supports </p>
        </div>

        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel
            header="Marque"
            key="parametre-marque"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"marque"}
              tableCols={marquesCols}
              queryFunction={getMarques}
              dropdownFields={marqueDropdownFields}
              dropdownList={entreprisedropdownList}
              addFunction={addMarque}
              updateFunction={updateMarque}
              deleteFunction={deleteMarque}
              marqueFieldsState={marqueFieldsState}
            />
          </TabPanel>

          <TabPanel
            header="Canal"
            key="parametre-canal"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"canal"}
              tableCols={canalsCols}
              marqueFieldsState={canalFieldsState}
              queryFunction={getCanals}
              addFunction={addCanal}
              updateFunction={updateCanal}
              deleteFunction={deleteCanal}
            />
          </TabPanel>

          <TabPanel
            header="Site"
            key="parametre-site"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"site"}
              tableCols={sitesCols}
              marqueFieldsState={siteFieldsState}
              queryFunction={getSites}
              addFunction={addSite}
              updateFunction={updateSite}
              deleteFunction={deleteSite}
            />
          </TabPanel>

          <TabPanel
            header="Etat"
            key="parametre-etat"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"etat"}
              tableCols={etatsCols}
              marqueFieldsState={etatFieldsState}
              queryFunction={getEtats}
              addFunction={addEtat}
              updateFunction={updateEtat}
              deleteFunction={deleteEtat}
            />
          </TabPanel>

          <TabPanel
            header="Visibilité"
            key="parametre-visibilite"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"visibilité"}
              tableCols={visibilitesCols}
              marqueFieldsState={visibiliteFieldsState}
              queryFunction={getVisibilites}
              addFunction={addVisibilite}
              updateFunction={updateVisibilite}
              deleteFunction={deleteVisibilite}
            />
          </TabPanel>

          <TabPanel
            header="District"
            key="parametre-district"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"district"}
              tableCols={districtsCols}
              marqueFieldsState={districtFieldsState}
              queryFunction={getDistrictsList}
              addFunction={addDistrict}
              updateFunction={updateDistrict}
              deleteFunction={deleteDistrict}
            />
          </TabPanel>

          <TabPanel
            header="Région"
            key="parametre-region"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"region"}
              tableCols={regionsCols}
              marqueFieldsState={regionFieldsState}
              dropdownFields={regionsDropdownFields}
              dropdownList={districtsdropdownList}
              queryFunction={getRegionsList}
              addFunction={addRegion}
              updateFunction={updateRegion}
              deleteFunction={deleteRegion}
            />
          </TabPanel>

          <TabPanel
            header="Ville"
            key="parametre-ville"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"ville"}
              tableCols={villesCols}
              marqueFieldsState={villeFieldsState}
              queryFunction={getVilles}
              addFunction={addVille}
              updateFunction={updateVille}
              deleteFunction={deleteVille}
            />
          </TabPanel>

          <TabPanel
            header="Commune"
            key="parametre-commune"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"commune"}
              tableCols={communesCols}
              marqueFieldsState={communeFieldsState}
              dropdownFields={communesDropdownFields}
              dropdownList={communesdropdownList}
              queryFunction={getCommunes}
              addFunction={addCommune}
              updateFunction={updateCommune}
              deleteFunction={deleteCommune}
            />
          </TabPanel>

          <TabPanel
            header="Quartier"
            key="parametre-quartier"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"quartier"}
              tableCols={quartiersCols}
              marqueFieldsState={quartiersFieldsState}
              dropdownFields={quartiersDropdownFields}
              dropdownList={quartiersdropdownList}
              queryFunction={getQuartiersList}
              addFunction={addQuartier}
              updateFunction={updateQuartier}
              deleteFunction={deleteQuartier}
            />
          </TabPanel>

          <TabPanel
            header="Village"
            key="parametre-village"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"village"}
              tableCols={villagesCols}
              marqueFieldsState={villagesFieldsState}
              dropdownFields={villagesDropdownFields}
              dropdownList={villagesdropdownList}
              queryFunction={getVillages}
              addFunction={addVillage}
              updateFunction={updateVillage}
              deleteFunction={deleteVillage}
            />
          </TabPanel>

          <TabPanel
            header="Type support"
            key="parametre-type-support"
            headerClassName="text-decoration-none"
          >
            <ParametrageDatable
              querysKeysLabel={"type support"}
              tableCols={typeSupportsCols}
              marqueFieldsState={typeSupportFieldsState}
              queryFunction={getTypeSupportParams}
              dropdownFields={typeSupportDropdownFields}
              dropdownList={entreprisedropdownList}
              addFunction={addTypeSupport}
              updateFunction={updateTypeSupport}
              deleteFunction={deleteTypeSupport}
            />
          </TabPanel>
        </TabView>
      </section>
    </>
  );
};

export default ParametresPage;
