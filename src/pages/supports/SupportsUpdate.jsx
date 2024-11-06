import { useQuery } from "@tanstack/react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import { useState } from "react";
import {useParams } from "react-router-dom";
import { getSupport } from "src/api/supports/supports";
import AddSupport from "src/components/forms/addSupport";


function SupportsUpdate() {
    const params = useParams()
    const querykeys = ["support"]
    const [isLoading,setIsloading] = useState(false)
    const {isLoading: getIsLoading,data} = useQuery({
        queryKey: querykeys,
        queryFn: async()=> await getSupport(params?.id)
    })

    return ( 
        <section className="">
            <div className="mb-5 p-md-4 text-center rounded d-flex justify-content-center shadow align-items-center">
                <h3
                  className="fw-bolder h3"
                  // style={{color:'var(--color-lanfia-primary)'}}
                  >
                  Mettre à jour des informations support publicitaire
                </h3>
            </div>
            { (isLoading || getIsLoading) && (
                <div className="text-center mt-5">
                    <ProgressSpinner
                        style={{width: '50px', height: '50px'}} 
                        strokeWidth="8" fill="var(--surface-ground)" 
                        animationDuration=".5s" />
                </div>
                )
            }
            
            <AddSupport supportData={data} setIsloading={setIsloading} isLoading={isLoading} typeRequest="UPDATE" />
        </section>
     );
}

export default SupportsUpdate