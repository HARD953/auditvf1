
import React from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import SupportMapDetail from "../others/supportMapDetail";
import { Image } from "primereact/image";
import { Divider } from "primereact/divider";
import { attacheImageUrl } from "src/api/axiosInstance";

export default function ShowSupportPlaceDialog({visible, setVisible,selectedSupport}) {
   
    return (
      <Dialog
        header={`EMPLACEMENT DU SUPPORT ${selectedSupport?.Marque}`}
        visible={visible}
        style={{ width: "auto" }}
        onHide={() => setVisible(false)}
      >
        <section className="">
          <div className="text-center ">
            <Image
              src={`${attacheImageUrl(
                !!selectedSupport?.image_support_s
                  ? selectedSupport?.image_support_s
                  : selectedSupport?.image_support
              )}`}
              alt={`support-${selectedSupport?.Marque}`}
              width="300"
              preview
              imageClassName="img-fluid shadow rounded my-0"
            />
            ;
          </div>
          <div className="d-flex justify-content-between pb-4 pt-2">
            <div className="d-flex justify-content-start align-items-center">
              <p className="my-0 me-3"> Canal : </p>
              <p className="fw-bolder my-0"> {selectedSupport?.canal} </p>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <p className="my-0 me-3"> Dimension : </p>
              <p className="fw-bolder my-0"> {selectedSupport?.surface} </p>
            </div>
            <div className="d-flex justify-content-start align-items-center">
              <p className="my-0 me-3"> Visibilité : </p>
              <p className="fw-bolder my-0"> {selectedSupport?.visibilite} </p>
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
              image={`${attacheImageUrl(
                !!selectedSupport?.image_support_s
                  ? selectedSupport?.image_support_s
                  : selectedSupport?.image_support
              )}`}
              position={[selectedSupport?.latitude, selectedSupport?.longitude]}
            />
          </div>
        </section>
      </Dialog>
    );
}
        