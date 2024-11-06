import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { getSupportsFilters } from "src/api/supports/supports";
// import { useNavigate } from "react-router-dom";
import SupportDataTable from "src/components/dataTables/SupportDataTable";
import SupportFiltresDialog from "src/components/dialogs/SupportFiltresDialog";
import TitleSyled from "src/components/others/TitleStyled";
import { getDateEnglishFormatYearMonthDay } from "src/utils/functionsUtils";
// import { main_app_path } from "src/router";

function Supports() {
   const queryClient = useQueryClient();
  const today = new Date()
  const debutMois = new Date(today.getFullYear(), today.getMonth(),1)

  const initialFilters = {
    start_date: debutMois,
    end_date: today,
    entreprise: "",
    Marque: "",
    nomsite: "",
    district: "",
    region: "",
    ville: "",
    commune: "",
    quartier: "",
    type_support: "",
    canal: "",
    etat_support: "",
    typesite: "",
    visibilite: "",
    duree: "",
    surface: "",
    signature1: null,
    Rnom: "",
    Rprenom: "",
    Rcontact: "",
    Snom: "",
    Sprenom: "",
    Scontact: "",
  };
 
  
  const [supportsData, setSupportsData] = useState([]);
  
  const [nbFiltres, setNbFiltres] = useState(0);
  const [filtersPayload, setFiltersPayload] = useState(initialFilters);

    const [visibleSupportFiltresDialog, setVisibleSupportFiltresDialog] = useState(false);
  // const navigate = useNavigate()
  


  const [firstPage, setFirstPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);


  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

 
     const onPageChange = (event) => {
       setFirstPage(event.first);
       setRows(event.rows);
       setSelectedPage(event.page + 1);
     };

  const mutationFilter = useMutation({
    mutationKey: ["supports", filtersPayload, selectedPage],
    mutationFn: async (body) =>
      await getSupportsFilters(body, selectedPage, rows),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["supports"],
      });
      const supports = !!data?.results.length ? data?.results : [];
      const count = data?.count || 0;
      setSupportsData(supports);
      setTotalItems(count);
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

  useEffect(() => {
    const emptyLength = checkEmptyFilter(filtersPayload);
    setNbFiltres(emptyLength);
  }, [filtersPayload]);

  useEffect(() => {
    setIsLoading(true);
    mutationFilter?.mutate({
      ...filtersPayload,
      start_date: getDateEnglishFormatYearMonthDay(filtersPayload?.start_date),
      end_date: getDateEnglishFormatYearMonthDay(filtersPayload?.end_date),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage, rows]);

    return (
      <>
        <section className="">
          <div className="mb-5 d-flex justify-content-between align-items-center">
            <div className="">
              <TitleSyled title="Supports publicitaires" />
              <p>
                Gérer vos support pulicitaires du{" "}
                {dateFormat(filtersPayload?.start_date)} au
                {dateFormat(filtersPayload?.end_date)}
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
            {/* <div className="">
                  <Button
                    label="Ajouter Support"
                    onClick={()=> navigate(`${main_app_path}/supports-create`)}
                    icon="pi pi-plus"
                    iconPos="right"
                    className="rounded-pill"
                  />
                </div> */}
          </div>
          <SupportDataTable
            first={firstPage}
            rows={rows}
            selectedPage={selectedPage}
            onPageChange={onPageChange}
            totalItems={totalItems}
            supportsData={supportsData}
            filtersPayload={filtersPayload}
            isLoading={isLoading}
          />
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
}

export default Supports