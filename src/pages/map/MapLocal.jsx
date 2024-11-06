/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Importez les styles CSS de Leaflet
// import markerIcon from '../../images/map-marker.342x512.png'; // Importez votre propre image de marqueur
// import { Col, Divider } from 'antd';
// import Carto from './Cartographie';
import NewMapsContainer from './NewMaps';
import { Button } from 'primereact/button';
import SupportFiltresDialog from 'src/components/dialogs/SupportFiltresDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getSupportsFilters, getSupportsMap } from 'src/api/supports/supports';
import { getDateEnglishFormatYearMonthDay } from 'src/utils/functionsUtils';
import { Badge } from 'primereact/badge';
import TitleSyled from 'src/components/others/TitleStyled';

const Map = () => {


  const queryClient = useQueryClient();
  const today = new Date()
  const debutMois = new Date(today.getFullYear(), today.getMonth(),1)

  const initialFilters = {
    start_date: debutMois,
    end_date: today,
    entreprise: '',
    Marque: '',
    commune: '',
    quartier: '',
    type_support: '',
    canal: '',
    etat_support: '',
    typesite: '',
    visibilite: '',
    duree: '',
    surface: ''
  }
  
  const [supportsData, setSupportsData] = useState([]);
  
  const [filtersPayload, setFiltersPayload] = useState(initialFilters);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


    const [visibleSupportFiltresDialog, setVisibleSupportFiltresDialog] = useState(false);
  // const navigate = useNavigate()
  const [nbFiltres, setNbFiltres] = useState(0);
  const mutationFilter = useMutation({
    mutationKey: ["supports", filtersPayload],
    mutationFn: async (body) => await getSupportsMap(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["supports"],
      });
      console.log("data ::::::",data);
   
      setSupportsData(data);
      // setTotalItems(count);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });



  const dateFormat= (date)=>{
    const _date = !!date ? date : new Date()
    return new Date(_date)?.toLocaleDateString()

  }


  const checkEmptyFilter = (data) => {
    const filtersPayloadCopie = { ...data };
    const entriesData = Object.entries(filtersPayloadCopie);
    return entriesData.filter(
      (item) =>
        item[1] !== "" && item[0] !== "start_date" && item[0] !== "end_date"
    ).length;
  };

  useEffect(()=>{
    mutationFilter?.mutate({
      ...filtersPayload,
      start_date: getDateEnglishFormatYearMonthDay(
        filtersPayload?.start_date
      ),
      end_date: getDateEnglishFormatYearMonthDay(filtersPayload?.end_date),
    
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page,rows])

    useEffect(() => {
    const emptyLength = checkEmptyFilter(filtersPayload);
    setNbFiltres(emptyLength);
  }, [filtersPayload]);


    return (
      <>
        <section className="">
          <div className="mb-5 d-flex justify-content-between align-items-center">
            <div className="">
              <TitleSyled title="Carte des supports" />
              <p>
                support pulicitaires du {dateFormat(filtersPayload?.start_date)}{" "}
                au {dateFormat(filtersPayload?.end_date)}{" "}
              </p>
            </div>

            <div className="">
              <Button
                label="Filtres"
                onClick={() => setVisibleSupportFiltresDialog(true)}
                icon="pi pi-filter"
                iconPos="left"
                className="rounded-pill px-4 p-button-outlined"
              >
                {!!nbFiltres && (
                  <Badge value={nbFiltres} severity="danger"></Badge>
                )}
              </Button>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-end align-items-end">
            <h3 className="fw-bolder h3">
              {supportsData?.data?.length} supports{" "}
            </h3>
            <div className="d-flex justify-content-end flex-column align-items-center">
              <h6 className=" h6">
                {supportsData?.total_site} supports avec site
              </h6>
              <h6 className=" h6">
                {supportsData?.total_support_sans_site} supports sans site
              </h6>
            </div>
          </div>
          <div className="shadow p-3 mb-5">
            {/* <Carto/> */}
            <NewMapsContainer
              filtersPayload={filtersPayload}
              supportsData={supportsData?.data}
            />
          </div>
        </section>

        <SupportFiltresDialog
          visible={visibleSupportFiltresDialog}
          setVisible={setVisibleSupportFiltresDialog}
          filtersPayload={filtersPayload}
          setFiltersPayload={setFiltersPayload}
          mutationFilter={mutationFilter}
          initialFilters={initialFilters}
          supportsData={supportsData}
          nbFiltres={nbFiltres}
        />
      </>
    );
  };
  
  export default Map;
  