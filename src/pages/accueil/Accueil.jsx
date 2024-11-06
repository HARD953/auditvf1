/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { GrAnalytics,GrClipboard,GrCalculator,GrMultiple} from "react-icons/gr";
import CardAuditAccueil from 'src/components/cards/cardAuditAccueil';
import {CardAccueilChartBons} from 'src/components/cards/cardAccueilChart';

import { addLocale } from 'primereact/api';
import CommuneDataTable from 'src/components/dataTables/CommunesDataTable';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  accueilSupportFilter,
  accueilSupportFilterGeo,
} from "src/api/supports/supports";
// import { calculerSommesAccueilData, getDateEnglishFormatYearMonthDay } from 'src/utils/functionsUtils.js';
import "src/assets/css/accueil.css"
import { InputSwitch } from 'primereact/inputswitch';
import TitleSyled from 'src/components/others/TitleStyled';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import AccueilFiltresDialog from 'src/components/dialogs/AccueilFiltresDialog';
import { calculerSommesAccueilData } from 'src/utils/functionsUtils';



const Accueil = () => {
   const queryClient = useQueryClient();
  const today = new Date()
  const debutMois = new Date(today.getFullYear(), today.getMonth(),1)
  const initialFilters = {
    start_date: debutMois,
    end_date: today,
    entreprise: "",
    nomsite: "",
    Marque: "",
    district: "",
    region: "",
    commune: "",
    ville: "",
    quartier: "",
    type_support: "",
    canal: "",
    etat_support: "",
    typesite: "",
    visibilite: "",
    duree: "",
    surface: "",
  };
 

  // eslint-disable-next-line no-unused-vars
  const [firstPage, setFirstPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);


  const [filtersPayload, setFiltersPayload] = useState(initialFilters);
    const [visibleSupportFiltresDialog, setVisibleSupportFiltresDialog] =
      useState(false);

  const [dashboardData, setDashboardData] = useState({});
  const [dashboardDataFilter, setDashboardDataFilter] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  
  const mutationFilterGeo = useMutation({
    mutationKey: ["supports-geo", filtersPayload, selectedPage, rows],
    mutationFn: async (body) =>
      accueilSupportFilterGeo(body, selectedPage, rows),
    onSuccess: (data) => {
      setDashboardData(data?.total_aggregations || {});
      console.log("setTotalItems fata::", data);
    },
    onError: () => {
      // setIsLoading(false);
    },
  });
  const mutationFilter = useMutation({
    mutationKey: ["supports", filtersPayload, selectedPage, rows],
    mutationFn: async (body) => accueilSupportFilter(body, selectedPage, rows),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["supports"],
      });
      setDashboardDataFilter(data);
    },
    onError: () => {
      // setIsLoading(false);
    },
  });

  addLocale('fr', {
    firstDayOfWeek: 1,
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samédi'],
    dayNamesShort: ['Dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNames: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
    monthNamesShort:['jan','fév','mar','avr','mai','jui','juil','aoû','sep','oct','nov','déc'],
    today: "Aujourd'hui",
    clear: 'Effacer'
  });

    
  const dateFormat= (date)=>{
    const _date = !!date ? date : new Date()
    return new Date(_date)?.toLocaleDateString()

  }


 

  
  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center">
        <div className="mb-5 justify-content-between align-items-center">
          <TitleSyled title="Tableau de bord" />

          <p className="my-0 py-0">
            Données du {dateFormat(filtersPayload?.start_date)} au{" "}
            {dateFormat(filtersPayload?.end_date)}{" "}
          </p>
        </div>

        <Button
          label="Filtres"
          onClick={() => setVisibleSupportFiltresDialog(true)}
          icon="pi pi-filter"
          iconPos="left"
          className="rounded-pill px-4 p-button-outlined"
        >
        </Button>
      </div>

      <div className="ms-3">
        <div className="">
          <h2 className="fw-bolder mt-5 mb-2 h2">Données chiffrées</h2>
        </div>
        <div className="accueil_cards_audit_container">
          <CardAuditAccueil
            title="Nombre total"
            value={dashboardData?.Total?.nombre_total}
            Icon={GrAnalytics}
            isloading={mutationFilterGeo.isPending}
          />
          <CardAuditAccueil
            title="Coût total redevance TSP"
            value={dashboardData?.Total?.somme_montant_total_tsp}
            Icon={GrClipboard}
            isloading={mutationFilterGeo.isPending}
          />
          <CardAuditAccueil
            title="Coût total ODP"
            value={dashboardData?.Total?.somme_montant_total_odp}
            Icon={GrMultiple}
            isloading={mutationFilterGeo.isPending}
          />
          <CardAuditAccueil
            title="Coût total des supports"
            value={dashboardData?.Total?.somme_montant_total}
            Icon={GrCalculator}
            isloading={mutationFilterGeo.isPending}
          />
        </div>

        <div className="pt-5">
          <h2 className="fw-bolder mt-5 mb-2">Etat des supports</h2>
        </div>
        <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
          <p className="py-0 my-0">
            {showDetails ? "Masquer " : "Afficher "} détails supports
          </p>
          <InputSwitch
            checked={showDetails}
            onChange={(e) => setShowDetails(e.value)}
          />
        </div>
        <div className="accueil_cards_chart_container">
          <CardAccueilChartBons
            title="Bons"
            total_montant={dashboardData?.["Bon"]?.somme_montant_total}
            total={dashboardData?.["Bon"]?.nombre_total}
            values={[
              dashboardData?.["Bon"]?.somme_montant_total_tsp,
              dashboardData?.["Bon"]?.somme_montant_total_odp,
            ]}
            chartColors={["#00C49F", "#FFBB28"]}
            showDetails={showDetails}
            isloading={mutationFilter.isPending}
          />
          <CardAccueilChartBons
            title="Défraichis"
            total_montant={dashboardData?.["Défraichis"]?.somme_montant_total}
            total={dashboardData?.["Défraichis"]?.nombre_total}
            values={[
              dashboardData?.["Défraichis"]?.somme_montant_total_tsp,
              dashboardData?.["Défraichis"]?.somme_montant_total_odp,
            ]}
            chartColors={["#0088FE", "#FF8042"]}
            showDetails={showDetails}
            isloading={mutationFilter.isPending}
          />
          <CardAccueilChartBons
            title="Détérioré"
            total_montant={dashboardData?.["Détérioré"]?.somme_montant_total}
            total={dashboardData?.["Détérioré"]?.nombre_total}
            values={[
              dashboardData?.["Détérioré"]?.somme_montant_total_tsp,
              dashboardData?.["Détérioré"]?.somme_montant_total_odp,
            ]}
            chartColors={["#546E7A", "#546E23"]}
            showDetails={showDetails}
            isloading={mutationFilter.isPending}
          />
        </div>

        <div className="">
          <div className="pt-5">
            <h2 className="fw-bolder mt-5 mb-2 h2">Etat des supports</h2>
          </div>
          <CommuneDataTable
            isLoading={mutationFilter?.isPending}
            data={dashboardDataFilter?.results || []}
          />

        </div>
      </div>

      <AccueilFiltresDialog
        visible={visibleSupportFiltresDialog}
        setVisible={setVisibleSupportFiltresDialog}
        filtersPayload={filtersPayload}
        setFiltersPayload={setFiltersPayload}
        mutationFilter={mutationFilter}
        mutationFilterGeo={mutationFilterGeo}
        initialFilters={initialFilters}
      />
    </section>
  );
};

export default Accueil;


