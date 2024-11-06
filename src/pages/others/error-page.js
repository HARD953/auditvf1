import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="text-center pt-5 mt-5">
      <h1 className="fw-bold text-center" >Oops!</h1>
      <p>Une Erreur est survenue.</p>
      <div className="mx-auto mt-5 text-center" >
        <p className="text-danger" >{error.statusText || error.message}</p>
      </div>
    </div>
  );
}