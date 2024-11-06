import React from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SupportMapDetail from "../others/supportMapDetail";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import {
  customizeNumerFormat,
  formatDateToLiteral,
} from "src/utils/functionsUtils";
import { attacheImageUrl } from "src/api/axiosInstance";

import "src/assets/css/dialogSupportDetails.css";

const DetailsSupportPanel = ({ value, label }) => {
  if (!value) return;
  return (
    <div className="details-support-panel col-md-4 my-3">
      <p className="my-0 py-0"> {label} </p>
      <p className="fw-bolder my-0 py-0"> {value} </p>
    </div>
  );
};

export default function ShowSupportDetailDialog({
  visible,
  setVisible,
  selectedSupport,
}) {
  const header = () => {
    return (
      <div className="support-detail-dialog-header-sub">
        <h3 className="h3 fw-bold"> Détails support publicitaire </h3>
        <div className="supports-entreprise d-flex justify-content-start align-items-center gap-3">
          <div className="">
            <i className="pi pi-building fs-2"></i>
          </div>
          <div className="">
            <p className="my-0 py-0">Entreprise</p>
            <h5 className="h5 fw-bold"> {selectedSupport?.entreprise} </h5>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog
      headerClassName="support-detail-dialog-header"
      closeIcon={<i className="pi pi-times text-white"></i>}
      header={header}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
    >
      <section className="support-detail-dialog-body">
        <div className="d-flex justify-content-start align-items-center gap-3">
          <i className="pi pi-tags fs-4"></i>
          <h4 className="h4 fw-bold">Images support</h4>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-4 ">
          {!!selectedSupport?.image_support && (
            <Image
              src={`${attacheImageUrl(selectedSupport?.image_support)}`}
              alt={`support-${selectedSupport?.Marque}`}
              width="300"
              preview
              imageClassName="img-fluid shadow rounded my-0"
            />
          )}
          {!!selectedSupport?.image_support_s && (
            <Image
              src={`${attacheImageUrl(selectedSupport?.image_support_s)}`}
              alt={`support-${selectedSupport?.Marque}`}
              width="300"
              preview
              imageClassName="img-fluid shadow rounded my-0"
            />
          )}
        </div>

        <div className="d-flex justify-content-start align-items-center gap-3 mt-5">
          <i className="pi pi-tags fs-4"></i>
          <h4 className="h4 fw-bold">Informations support</h4>
        </div>
        <div className="mx-md-4 mx-1">
          <div className="d-flex flex-wrap justify-content-between pb-2 pt-2">
            <DetailsSupportPanel
              value={selectedSupport?.district}
              label="District"
            />
            <DetailsSupportPanel
              value={selectedSupport?.region}
              label="Région"
            />
            <DetailsSupportPanel
              value={selectedSupport?.commune}
              label="Commune"
            />
            <DetailsSupportPanel
              value={selectedSupport?.village}
              label="Village"
            />
            <DetailsSupportPanel
              value={selectedSupport?.quartier}
              label="Quartier"
            />
            <DetailsSupportPanel
              value={selectedSupport?.nomsite}
              label="Nom site"
            />
            <DetailsSupportPanel
              value={`${selectedSupport?.duree} Mois`}
              label="Durrée"
            />
            <DetailsSupportPanel
              value={selectedSupport?.surface}
              label="Surface (m) "
            />
            <DetailsSupportPanel
              value={selectedSupport?.surfaceODP}
              label="Surface ODP (m) "
            />
            <DetailsSupportPanel
              value={selectedSupport?.visibilite}
              label="Visibilité"
            />
            <DetailsSupportPanel
              value={selectedSupport?.type_support}
              label="Type de Support"
            />
            <DetailsSupportPanel
              value={selectedSupport?.nombre_support}
              label="Nombre de Support"
            />
            <DetailsSupportPanel
              value={selectedSupport?.nombre_face}
              label="Nombre de Face"
            />
            <DetailsSupportPanel
              value={selectedSupport?.etat_support}
              label="Etat Support"
            />
            <DetailsSupportPanel
              value={selectedSupport?.Marque}
              label="Marque"
            />
            <DetailsSupportPanel value={selectedSupport?.canal} label="Canal" />
            <DetailsSupportPanel
              value={selectedSupport?.typesite}
              label="Type de Site"
            />

            <DetailsSupportPanel
              value={selectedSupport?.description}
              label="Description"
            />
            <DetailsSupportPanel
              value={selectedSupport?.observation}
              label="Observations"
            />

            <DetailsSupportPanel
              value={!!selectedSupport?.tauxDistrict ? "OUI" : "NON"}
              label="Taxe District"
            />

            <DetailsSupportPanel
              value={!!selectedSupport?.tauxRegion ? "OUI" : "NON"}
              label="Taxe Région"
            />

            <DetailsSupportPanel
              value={!!selectedSupport?.tauxCommune ? "OUI" : "NON"}
              label="Taxe Commune"
            />

            {/* <DetailsSupportPanel
              value={!!selectedSupport?.anciennete ? "OUI" : "NON"}
              label="Anciene"
            /> */}

            <DetailsSupportPanel
              value={customizeNumerFormat(Number(selectedSupport?.TSP))}
              label="Montant TSP"
            />
            <DetailsSupportPanel
              value={customizeNumerFormat(Number(selectedSupport?.ODP_value))}
              label="Montant ODP"
            />
            <DetailsSupportPanel
              value={`${
                customizeNumerFormat(
                  Number(selectedSupport?.ODP_value) +
                    Number(selectedSupport?.TSP)
                ) || 0
              }`}
              label="Montant Total"
            />
            <DetailsSupportPanel
              value={formatDateToLiteral(selectedSupport?.date_collecte)}
              label="Date de collecte"
            />
          </div>

          <h6 className="fs-5 fw-bold mt-3">Informations Responsable</h6>
          <div className="d-flex justify-content-between pb-4 pt-2">
            <DetailsSupportPanel
              value={
                ` ${selectedSupport?.Rprenom} ${selectedSupport?.Rnom}` || ""
              }
              label="Responsable"
            />
            <DetailsSupportPanel
              value={selectedSupport?.Rcontact || ""}
              label="Contact"
            />

            <div className="col-md-4 justify-content-between pb-4 pt-2">
              <p style={{ color: "#919697", fontWeight: "600" }}>Signature</p>
              <Image
                src={`${attacheImageUrl(selectedSupport?.signature1)}`}
                alt={`Signature${selectedSupport?.Rnom}`}
                width="50"
                preview
                imageClassName="img-fluid shadow rounded my-0"
              />
            </div>
          </div>

          <h6 className="fs-5 fw-bold mt-3">Informations Superviseur</h6>
          <div className="d-flex justify-content-between pb-4 pt-2">
            <DetailsSupportPanel
              value={
                ` ${selectedSupport?.Sprenom} ${selectedSupport?.Snom}` || ""
              }
              label="Responsable"
            />
            <DetailsSupportPanel
              value={selectedSupport?.Scontact || ""}
              label="Contact"
            />

            <div className="col-md-4 justify-content-between pb-4 pt-2">
              <p style={{ color: "#919697", fontWeight: "600" }}>Signature</p>
              <Image
                src={`${attacheImageUrl(selectedSupport?.signature)}`}
                alt={`Signature${selectedSupport?.Snom}`}
                width="50"
                preview
                imageClassName="img-fluid shadow rounded my-0"
              />
            </div>
          </div>
        </div>
        <Divider align="center">
          <Button
            aria-label="Button"
            icon="pi pi-angle-double-down"
            className="p-button-outlined rounded-pill "
          ></Button>
        </Divider>

        <div className="d-flex justify-content-between pb-4 pt-2">
          <div className="d-flex justify-content-start align-items-center">
            <p className="my-0 me-3"> Longitude : </p>
            <p className="fw-bolder my-0"> {selectedSupport?.longitude} </p>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <p className="my-0 me-3"> Latitude : </p>
            <p className="fw-bolder my-0"> {selectedSupport?.latitude} </p>
          </div>
        </div>
        <div className="">
          <SupportMapDetail
            image={selectedSupport?.image_support}
            position={[selectedSupport?.latitude, selectedSupport?.longitude]}
          />
        </div>
      </section>
    </Dialog>
  );
}
