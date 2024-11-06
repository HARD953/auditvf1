import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, message } from "antd";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addSupport, updateSupport } from "src/api/supports/supports";
import { main_app_path } from "src/router";
import SuccesDialog from "../dialogs/succesDialog";
import ErrorDialog from "../dialogs/errorDialog";
import { Image } from "primereact/image";

const FormRowComponent = ({ label, children }) => {
  return (
    <div className="col-md-6 my-3">
      <div className="">
        <h5 className="fw-bold h5"> {label} </h5>
        {children}
      </div>
    </div>
  );
};

export default function AddSupport({
  setIsloading = () => {},
  typeRequest = "ADD",
  supportData = {},
}) {
  const isNotAdding = !!Object.keys(supportData).length;
  const params = useParams();

  const querykeys = ["supports", "ajout"];
  const querykeysUpdate = ["supports", "modification-support", params?.id];

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [odpIsloading, setODPIsloading] = useState("");

  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleError, setVisibleError] = useState(false);

  const [entreprise, setEntreprise] = useState("");
  const [commune, setCommune] = useState("");
  const [description, setDescription] = useState("");
  const [canal, setCanal] = useState("");
  const [typeSupport, setTypeSupport] = useState("");
  const [surface, setSurface] = useState("");
  const [marque, setMarque] = useState("");
  const [etatSupport, setEtatSupport] = useState("");
  const [visibilite, setVisibilite] = useState("");
  const [tsp, setTsp] = useState("");
  const [duree, setDurree] = useState("");
  const [odp, setOdp] = useState(false);
  const [surfaceODP, setSurfaceODP] = useState("");
  const [ODP_value, setOdpValue] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [observation, setObservation] = useState("");
  const [imageProfile, setImageProfile] = useState(null);
  const [signature1, setSignature1] = useState(null);
  const [signature, setSignature] = useState(null);
  const [Rnom, setRnom] = useState("");
  const [Rprenom, setRprenom] = useState("");
  const [Rcontact, setRcontact] = useState("");
  const [Snom, setSnom] = useState("");
  const [Sprenom, setSprenom] = useState("");
  const [Scontact, setScontact] = useState("");

  const mutation = useMutation({
    mutationKey: querykeys,
    mutationFn: (newSupport) => {
      return addSupport(newSupport);
    },
    onSuccess: () => {
      setVisibleAdd(true);
      queryClient.invalidateQueries(querykeys);
    },
    onError: (err) => {
      console.error(err);
      setVisibleError(true);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["supports", "modification-support", params?.id],
    mutationFn: (newSupport) => {
      return updateSupport(params?.id, newSupport);
    },
    onSuccess: () => {
      setVisibleUpdate(true);
      queryClient.invalidateQueries(querykeys);
    },
    onError: (err) => {
      console.error(err);
      setVisibleError(true);
    },
  });

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(
        "Vous pouvez uniquement télécharger des fichiers JPG/PNG !"
      );
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("L'image doit être inférieure à 2 Mo !");
    }
    if (isJpgOrPng && isLt2M) {
      setImageProfile(file);
    }
    return false;
  };

  const beforeUploadSignature = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(
        "Vous pouvez uniquement télécharger des fichiers JPG/PNG !"
      );
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("L'image doit être inférieure à 2 Mo !");
    }
    if (isJpgOrPng && isLt2M) {
      setSignature1(file);
    }
    return false;
  };

  const beforeUploadSignature2 = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(
        "Vous pouvez uniquement télécharger des fichiers JPG/PNG !"
      );
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("L'image doit être inférieure à 2 Mo !");
    }
    if (isJpgOrPng && isLt2M) {
      setSignature(file);
    }
    return false;
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("canal", canal);
    formData.append("type_support", typeSupport);
    formData.append("surface", surface);
    formData.append("Marque", marque);
    formData.append("etat_support", etatSupport);
    formData.append("commune", commune);
    formData.append("visibilite", visibilite);
    formData.append("TSP", tsp);
    formData.append("duree", duree);
    formData.append("ODP", odp);
    formData.append("observation", observation);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("entreprise", entreprise);
    formData.append("signature1", signature1);
    formData.append("Rnom	", Rnom);
    formData.append("Rprenom	", Rprenom);
    formData.append("Rcontact	", Rcontact);
    formData.append("Snom	", Snom);
    formData.append("Sprenom	", Sprenom);
    formData.append("Scontact	", Scontact);
    formData.append("signature	", signature);
;
    if (!odp) {
      formData.append("ODP_value", "");
      formData.append("surfaceODP", "");
    } else {
      formData.append("ODP_value", ODP_value);
      formData.append("surfaceODP", surfaceODP);
    }
    typeRequest === "ADD" && mutation?.mutate(formData);
    typeRequest === "UPDATE" && mutationUpdate?.mutate(formData);
  };

  useEffect(() => {
    if (isNotAdding) {
      setDescription(supportData?.description);
      setCanal(supportData?.canal);
      setTypeSupport(supportData?.type_support);
      setSurface(supportData?.surface);
      setMarque(supportData?.Marque);
      setEtatSupport(supportData?.etat_support);
      setVisibilite(supportData?.visibilite);
      setCommune(supportData?.commune);
      setTsp(supportData?.TSP);
      setOdp(supportData?.ODP);
      setLatitude(supportData?.latitude);
      setLongitude(supportData?.longitude);

      setDurree(supportData?.duree);
      setSurfaceODP(supportData?.surfaceODP);
      setObservation(supportData?.observation);
      setOdpValue(supportData?.ODP_value);
      setEntreprise(supportData?.entreprise);

      setImageProfile(supportData?.imageProfile);

      setSignature1(supportData?.signature1);
      setRnom(supportData?.Rnom);
      setRprenom(supportData?.Rprenom);
      setRcontact(supportData?.Rcontact);
      setSnom(supportData?.Snom);
      setSprenom(supportData?.Sprenom);
      setScontact(supportData?.Scontact);
      setSignature(supportData?.signature);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supportData]);

  useEffect(() => {
    setIsloading(mutationUpdate?.isPending || mutation?.isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationUpdate?.isPending, mutation?.isPending]);

  useEffect(() => {
    setODPIsloading(true);
    const timer = setTimeout(() => {
      setODPIsloading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [odp]);

  return (
    <section className="shadow px-md-4 py-md-5 mb-5 bg-white">
      <Divider>
        <h6> informations support publicitaire </h6>
      </Divider>
      <div className="text-center mb-4">
        {typeRequest === "SHOW" ? (
          <div className="">
            <Avatar
              image={imageProfile}
              className="flex align-items-center justify-content-center mr-2 rounded-pill"
              size="xlarge"
            />

            <h5 className="h5 fw-bold"> Photo utilisateur </h5>
          </div>
        ) : (
          <Upload
            name="profile_image"
            listType="picture"
            beforeUpload={beforeUpload}
          >
            <Button
              className="rounded-pill"
              icon={<i className="pi pi-upload mx-3"></i>}
            >
              Télécharger une image
            </Button>
          </Upload>
        )}
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Entreprise">
          <InputText
            type="text"
            value={entreprise}
            onChange={(e) => setEntreprise(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Commune">
          <InputText
            type="text"
            value={commune}
            onChange={(e) => setCommune(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Canal">
          <InputText
            type="text"
            value={canal}
            onChange={(e) => setCanal(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Type de support">
          <InputText
            type="text"
            value={typeSupport}
            onChange={(e) => setTypeSupport(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Surface">
          <InputText
            type="text"
            value={surface}
            onChange={(e) => setSurface(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Marque">
          <InputText
            type="text"
            value={marque}
            onChange={(e) => setMarque(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Etat du support">
          <InputText
            type="text"
            value={etatSupport}
            onChange={(e) => setEtatSupport(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Visibilité du support">
          <InputText
            type="text"
            value={visibilite}
            onChange={(e) => setVisibilite(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Montant TSP du support">
          <InputText
            type="text"
            value={tsp}
            onChange={(e) => setTsp(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Durée support">
          <InputText
            type="text"
            value={duree}
            onChange={(e) => setDurree(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <div className="d-flex justify-content-start align-items-center my-4">
        <h5 className="h5 me-3 fw-bold"> Support ODP ? </h5>
        <InputSwitch checked={odp} onChange={(e) => setOdp(e.value)} />
        {odpIsloading && (
          <ProgressSpinner
            className="ms-3"
            style={{ width: "25px", height: "25px" }}
            strokeWidth="8"
            animationDuration=".5s"
          />
        )}
      </div>
      {odp && (
        <>
          <div className="row justify-content-between">
            <FormRowComponent label="Surface ODP">
              <InputNumber
                value={surfaceODP}
                onValueChange={(e) => setSurfaceODP(e?.value)}
                className="w-100"
                locale="en-US"
                minFractionDigits={0}
                maxFractionDigits={20}
                placeholder=""
              />
            </FormRowComponent>
            <FormRowComponent label="Montant ODP du support">
              <InputText
                type="text"
                value={ODP_value}
                onChange={(e) => setOdpValue(e?.target?.value)}
                className="w-100"
                placeholder=""
              />
            </FormRowComponent>
          </div>

          <div className="row justify-content-between">
            <FormRowComponent label="Observations">
              <InputTextarea
                rows={5}
                value={observation}
                onChange={(e) => setObservation(e?.target?.value)}
                className="w-100"
                placeholder=""
              />
            </FormRowComponent>
            <FormRowComponent label="Description">
              <InputTextarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e?.target?.value)}
                className="w-100"
                placeholder=""
              />
            </FormRowComponent>
          </div>
        </>
      )}
      <Divider>
        <h6> Informations Responsable </h6>
      </Divider>
      <div className="row justify-content-between">
        <FormRowComponent label="Nom Responsable">
          <InputText
            type="text"
            value={Rnom}
            onValueChange={(e) => setRnom(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Prenom Responsable">
          <InputText
            type="text"
            value={Rprenom}
            onChange={(e) => setRprenom(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Contact Responsable">
          <InputText
            type="text"
            value={Rcontact}
            onValueChange={(e) => setRcontact(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>

        <div className="col-md-6 my-3">
          {typeRequest === "SHOW" ? (
            <div className="">
              <Avatar
                image={signature1}
                className="flex align-items-center justify-content-center mr-2 rounded-pill"
                size="xlarge"
              />

              <h5 className="h5 fw-bold"> Signature </h5>
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-4 align-items-end">
              <h5 className="h5 fw-bold"> Signature </h5>
              <Image
                src={signature1}
                className="flex align-items-center justify-content-center mr-2 rounded-pill"
                size="xlarge"
              />
              <Upload
                name="profile_image"
                listType="picture"
                beforeUpload={beforeUploadSignature}
              >
                <Button
                  className="rounded-pill"
                  icon={<i className="pi pi-upload mx-3"></i>}
                >
                  Télécharger une image
                </Button>
              </Upload>
            </div>
          )}
        </div>
      </div>
      <Divider>
        <h6> Informations Superviseur</h6>
      </Divider>

      <div className="row justify-content-between">
        <FormRowComponent label="Nom Superviseur">
          <InputText
            type="text"
            value={Snom}
            onValueChange={(e) => setSnom(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Prenom Superviseur">
          <InputText
            type="text"
            value={Sprenom}
            onChange={(e) => setSprenom(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Contat Superviseur">
          <InputText
            type="text"
            value={Scontact}
            onValueChange={(e) => setScontact(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <div className="col-md-6 my-3">
          {typeRequest === "SHOW" ? (
            <div className="">
              <Avatar
                image={signature1}
                className="flex align-items-center justify-content-center mr-2 rounded-pill"
                size="xlarge"
              />

              <h5 className="h5 fw-bold"> Signature </h5>
            </div>
          ) : (
            <div className="d-flex justify-content-center gap-4 align-items-center">
              <h5 className="h5 fw-bold"> Signature </h5>
              <Image
                src={signature1}
                className="flex align-items-center justify-content-center mr-2 rounded-pill"
                size="xlarge"
              />
              <Upload
                name="profile_image"
                listType="picture"
                beforeUpload={beforeUploadSignature2}
              >
                <Button
                  className="rounded-pill"
                  icon={<i className="pi pi-upload mx-3"></i>}
                >
                  Télécharger une image
                </Button>
              </Upload>
            </div>
          )}
        </div>
      </div>

      <Divider>
        <h6> Coordonnées Géographique du support </h6>
      </Divider>
      <div className="row justify-content-between">
        <FormRowComponent label="Longitude">
          <InputNumber
            value={longitude}
            onValueChange={(e) => setLongitude(e?.value)}
            className="w-100"
            locale="en-US"
            minFractionDigits={0}
            maxFractionDigits={20}
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Latitude">
          <InputNumber
            value={latitude}
            locale="en-US"
            onValueChange={(e) => setLatitude(e?.value)}
            className="w-100"
            minFractionDigits={0}
            maxFractionDigits={20}
            placeholder=""
          />
        </FormRowComponent>
      </div>
      <Divider></Divider>
      <div className="mt-5 pt-5 d-flex justify-content-between align-items-center">
        <Button
          onClick={() => navigate(`${main_app_path}/supports`)}
          label="Retour à la liste"
          className="rounded-pill px-5 p-button-outlined p-button-danger"
          icon="pi pi-arrow-left"
        />

        {typeRequest === "ADD" && (
          <Button
            loading={mutation?.isPending}
            onClick={() => onSubmit()}
            label="Enregistrer"
            className="rounded-pill px-5"
            icon="pi pi-save"
          />
        )}
        {typeRequest === "UPDATE" && (
          <Button
            loading={mutationUpdate?.isPending}
            onClick={() => onSubmit()}
            label="Enregistrer les modifications"
            className="rounded-pill px-5"
            icon="pi pi-save"
          />
        )}
      </div>
      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${main_app_path}/supports`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${main_app_path}/supports`}
        msg="Support enregistré avec succes."
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg="Une erreur est survenue. Réessayez!!"
      />
    </section>
  );
}
