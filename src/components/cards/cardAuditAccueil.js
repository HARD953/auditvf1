

import { GrAnalytics } from "react-icons/gr";
import "src/assets/css/CardAuditAccueil.css"
import { customizeNumerFormat } from "src/utils/functionsUtils";
import { Skeleton } from "primereact/skeleton";


function CardAuditAccueil({title,value,isloading,Icon=GrAnalytics}) {
    return (
      <>
        {isloading ? (
          <Skeleton height="8rem" borderRadius="10px"></Skeleton>
        ) : (
          <div className="card_audit_accueil d-flex justify-content-start align-items-center px-4 py-4  shadow-lg rounded">
            <div className="card_audit_accueil__icon_container">
              <Icon className="card_audit_accueil__icon" size={50} />
            </div>
            <div className="card_audit_accueil__text_container text-center mx-auto">
              <h4 className="fw-bolder">
                {" "}
                {customizeNumerFormat(value || 0)}{" "}
              </h4>
              <h5 className="h5 mt-3 text-center fw-bolder"> {title} </h5>
            </div>
          </div>
        )}
      </>
    );
}

export default CardAuditAccueil;