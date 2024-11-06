import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Upload, message } from "antd"
// import { Avatar } from "primereact/avatar"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { RadioButton } from "primereact/radiobutton"
import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { addUtilisateur, getStatAgent, updateUtilisateur } from "src/api/users"
import { main_app_path } from "src/router"
import {  capitalizeWords, getDateEnglishFormatYearMonthDay } from "src/utils/functionsUtils"
import SuccesDialog from "../dialogs/succesDialog"
import ErrorDialog from "../dialogs/errorDialog"
// import CommuneDataTable from "../dataTables/CommunesDataTable"
import { Calendar } from "primereact/calendar"
import { addLocale } from "primereact/api"
import CommunesDataTableUser from "../dataTables/CommunesDataTableUser"
import { attacheImageUrl } from "src/api/axiosInstance"
import { Image } from "primereact/image"




const FormRowComponent = ({label,children})=>{

    return(
        <div className="col-md-6 my-3">
            <div className="">
                <h5 className="fw-bold h5" > {label} </h5>
                { children}
            </div>
        </div>
    )
}


export default function AddUser({
  disableInputs = false,
  noHeader = false,
  setIsloading = () => {},
  typeRequest = "ADD",
  userData = {},
}) {

  const today = new Date();
  const debutMois = new Date(today.getFullYear(), today.getMonth(), 1);

  const isNotAdding = !!Object.keys(userData).length;
  const querykeys = ["utilisateurs", "ajout"];
  const querykeysUpdate = ["utilisateurs", "modification"];

    const location = useLocation();
    // const { from, goBack, urlRequest } = location?.state;
    const {
      from = "",
      goBack,
      urlRequest,
    } = location?.state ?? { from: "" };
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [dateStart, setDateStart] = useState(debutMois);
  const [dateEnd, setDateEnd] = useState(today);

  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleError, setVisibleError] = useState(false);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [civilite, setCivilite] = useState("");
  const [email, setEmail] = useState("");
  const [adresse, setAdresse] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");
  const [departement, setDepartement] = useState("");
  const [sousPrefecture, setSousPrefecture] = useState("");
  const [commune, setCommune] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [isRecenseur, setIsRecenseur] = useState(
    from === "recenseur" ? true : false
  );
  const [isLanfia, setIsLanfia] = useState(
    from === "lanfiatech" ? true : false
  );
  const [isEntreprise, setIsEntreprise] = useState(
    from === "entreprise" ? true : false
  );
  const [entreprise, setEntreprise] = useState("");
  const [imageProfile, setImagedProfile] = useState("");


  const {
    isLoading: isLoadingSupportCommuneAgent,
    data: dataSupportCommuneAgent,
  } = useQuery({
    queryKey: ["supports-communes-agent-recenseur",dateStart,dateEnd],
    queryFn: async () =>
      await getStatAgent(
        params?.id,
        getDateEnglishFormatYearMonthDay(dateStart),
        getDateEnglishFormatYearMonthDay(dateEnd)
      ),
  });


  const mutation = useMutation({
    mutationKey: querykeys,
    mutationFn: (newUser) => {
      return addUtilisateur(urlRequest, newUser);
    },
    onSuccess: () => {
      setVisibleAdd(true);
      queryClient.invalidateQueries({
        queryKey: [goBack],
      });
    },
    onError: (err) => {
      setVisibleError(true);
    },
  });

  const mutationUpdate = useMutation({
    mutationKey: ["utilisateurs", "modification", params?.id],
    mutationFn: (newUser) => {
      return updateUtilisateur(params?.id, newUser);
    },
    onSuccess: () => {
      setVisibleUpdate(true);
      queryClient.invalidateQueries({
        queryKey: querykeysUpdate,
      });
    },
    onError: (err) => {
      setVisibleError(true);
    },
  });

  const onChangeFirstName = (evnt) => {
    const value = (evnt?.target.value || "").toUpperCase();
    setFirstName(value);
  };

  const onChangeLastName = (evnt) => {
    const value = capitalizeWords(evnt?.target.value || "");
    setLastName(value);
  };

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
      // Stockez le fichier d'image dans l'état local
      setImagedProfile(file);
    }
    return false; // Retournez false pour empêcher le téléchargement automatique du fichier
  };

   addLocale("fr", {
     firstDayOfWeek: 1,
     dayNames: [
       "dimanche",
       "lundi",
       "mardi",
       "mercredi",
       "jeudi",
       "vendredi",
       "samédi",
     ],
     dayNamesShort: ["Dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
     dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
     monthNames: [
       "janvier",
       "février",
       "mars",
       "avril",
       "mai",
       "juin",
       "juillet",
       "août",
       "septembre",
       "octobre",
       "novembre",
       "décembre",
     ],
     monthNamesShort: [
       "jan",
       "fév",
       "mar",
       "avr",
       "mai",
       "jui",
       "juil",
       "aoû",
       "sep",
       "oct",
       "nov",
       "déc",
     ],
     today: "Aujourd'hui",
     clear: "Effacer",
   });

   
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("adresse", adresse);
    formData.append("district", district);
    formData.append("region", region);
    formData.append("departement", departement);
    formData.append("sous_prefecture", sousPrefecture);
    formData.append("commune", commune);
    // formData.append('is_agent',isAgent)
    formData.append("entreprise", entreprise);
    formData.append("password", password);
    formData.append("civilite", civilite);
    if (typeRequest === "ADD"){
      formData.append("profile_image", imageProfile);
    }

      formData.append("is_agent", isLanfia);
    formData.append("is_recenseur", isRecenseur);
    formData.append("is_entreprise", isEntreprise);

    typeRequest === "ADD" && mutation?.mutate(formData);
    typeRequest === "UPDATE" && mutationUpdate?.mutate(formData);
  };

  useEffect(() => {
    if (isNotAdding) {
      setFirstName(userData?.first_name);
      setLastName(userData?.last_name);
      setAdresse(userData?.adresse);
      setDistrict(userData?.district);
      setEmail(userData?.email);
      setRegion(userData?.region);
      setDepartement(userData?.departement);
      setSousPrefecture(userData?.sous_prefecture);
      setCommune(userData?.commune);
      setPassword(userData?.password);
      setPasswordConf(userData?.password);
      setImagedProfile(!!userData?.profile_image??"");
      setIsLanfia(userData?.is_agent);
      setIsRecenseur(userData?.is_recenseur);
      setIsEntreprise(userData?.is_entreprise);
      setEntreprise(userData?.entreprise);
      setCivilite(userData?.last_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    setIsloading(mutationUpdate?.isPending || mutation?.isPending);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutationUpdate?.isPending, mutation?.isPending]);

  return (
    <section className="shadow px-md-4 py-md-5 mb-5 bg-white">
      <Divider>
        <h6> informations personnelles </h6>
      </Divider>
      <div className="text-center mb-4">
        {typeRequest === "SHOW" ? (
          <div className="">
            <Image
              src={`${attacheImageUrl(imageProfile)}`}
              className="flex align-items-center justify-content-center mr-2 rounded-pill"
              size="xlarge"
            />

            <h5 className="h5 fw-bold"> Photo utilisateur </h5>
          </div>
        ) : (
          <Upload
            name="disableInputs_image"
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
        <FormRowComponent label="Nom">
          <InputText
            type="text"
            value={firstName}
            disabled={disableInputs}
            onChange={(e) => onChangeFirstName(e)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Prénom">
          <InputText
            type="text"
            value={lastName}
            disabled={disableInputs}
            onChange={(e) => onChangeLastName(e)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>

      <div className="row justify-content-between">
        <FormRowComponent label="Civilité">
          <div className="d-flex flex-wrap gap-5">
            <div className="d-flex align-items-center">
              <RadioButton
                inputId="masculin"
                name="civilite"
                disabled={disableInputs}
                value="masculin"
                onChange={(e) => setCivilite(e.value)}
                checked={civilite === "masculin"}
              />
              <label htmlFor="masculin" className="ms-2">
                Masculin
              </label>
            </div>
            <div className="d-flex align-items-center">
              <RadioButton
                inputId="feminin"
                name="civilite"
                value="feminin"
                disabled={disableInputs}
                onChange={(e) => setCivilite(e.value)}
                checked={civilite === "feminin"}
              />
              <label htmlFor="masculin" className="ms-2">
                Féminin
              </label>
            </div>
          </div>
        </FormRowComponent>
        {/* <FormRowComponent label="Agent ?" >
                    <div className="d-flex flex-wrap gap-5">
                        <div className="d-flex align-items-center">
                            <RadioButton
                                inputId="oui"
                                name="agent"
                                disabled={disableInputs}
                                value={true}
                                onChange={(e) => setIsAgent(e.value)} checked={isAgent===true} />
                            <label htmlFor="oui" className="ms-2">Oui</label>
                        </div>
                        <div className="d-flex align-items-center">
                            <RadioButton
                                inputId="non"
                                name="agent"
                                value={false}
                                disabled={disableInputs}
                                onChange={(e) => setIsAgent(e.value)} checked={isAgent === false} />
                            <label htmlFor="non" className="ms-2">Non</label>
                        </div>
                    </div>
                </FormRowComponent> */}
      </div>
      <div className="row justify-content-between">
        <FormRowComponent label="Email">
          <InputText
            type="email"
            value={email}
            disabled={disableInputs}
            onChange={(e) => setEmail(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Entreprise">
          <InputText
            type="text"
            value={entreprise}
            disabled={disableInputs}
            onChange={(e) => setEntreprise(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>

      <div className="row justify-content-between">
        <FormRowComponent label="Adresse">
          <InputText
            type="text"
            disabled={disableInputs}
            value={adresse}
            onChange={(e) => setAdresse(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Commune">
          <InputText
            type="text"
            value={commune}
            disabled={disableInputs}
            onChange={(e) => setCommune(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>

      <div className="row justify-content-between">
        <FormRowComponent label="District">
          <InputText
            type="text"
            value={district}
            disabled={disableInputs}
            onChange={(e) => setDistrict(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Région">
          <InputText
            type="text"
            value={region}
            disabled={disableInputs}
            onChange={(e) => setRegion(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>

      <div className="row justify-content-between">
        <FormRowComponent label="Département">
          <InputText
            type="text"
            disabled={disableInputs}
            value={departement}
            onChange={(e) => setDepartement(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
        <FormRowComponent label="Sous-préfectur">
          <InputText
            type="text"
            disabled={disableInputs}
            value={sousPrefecture}
            onChange={(e) => setSousPrefecture(e?.target?.value)}
            className="w-100"
            placeholder=""
          />
        </FormRowComponent>
      </div>
      {typeRequest !== "SHOW" && (
        <>
          <Divider>
            <h6> informations d'accès </h6>
          </Divider>
          <div className="row justify-content-between">
            <FormRowComponent label="Mot de passe">
              <Password
                value={password}
                disabled={disableInputs}
                inputClassName="w-100"
                className="w-100"
                toggleMask
                onChange={(e) => setPassword(e.target.value)}
                promptLabel="Saisissez un mot de passe"
                weakLabel="Mot de passe trop simple"
                mediumLabel="Mot de passe moyen "
                strongLabel="Mot de passe robuste"
              />
            </FormRowComponent>
            <FormRowComponent label="Confirmer le mot de passe">
              <Password
                value={passwordConf}
                inputClassName="w-100"
                className="w-100"
                toggleMask
                disabled={disableInputs}
                onChange={(e) => setPasswordConf(e.target.value)}
                promptLabel="Saisissez un mot de passe"
                weakLabel="Mot de passe trop simple"
                mediumLabel="Mot de passe moyen "
                strongLabel="Mot de passe robuste"
              />
            </FormRowComponent>
          </div>
        </>
      )}

      {(typeRequest === "SHOW" && from === "recenseur") && (
        <div className="mt-5">
          <Divider>Detatils supports recensés </Divider>
          <div className="text-end">
            <div className="d-flex justify-content-end align-items-center gap-4">
              <div className="flex-auto">
                <label
                  htmlFor="dateStart"
                  className="fw-bolder me-2 block mb-2"
                >
                  Date debut
                </label>
                <Calendar
                  id="dateStart"
                  dateFormat="dd/mm/yy"
                  locale="fr"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.value)}
                  showIcon
                />
              </div>
              <div className="flex-auto">
                <label htmlFor="dateEnd" className="fw-bolder block  me-2 mb-2">
                  Date fin
                </label>
                <Calendar
                  id="dateEnd"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.value)}
                  dateFormat="dd/mm/yy"
                  locale="fr"
                  showIcon
                />
              </div>
            </div>
          </div>
          <CommunesDataTableUser
            isLoading={isLoadingSupportCommuneAgent}
            data={
              !!dataSupportCommuneAgent?.length
                ? dataSupportCommuneAgent[0]?.communes
                : []
            }
          />
        </div>
      )}

      <Divider></Divider>
      {!noHeader && (
        <div className="mt-5 pt-5 d-flex justify-content-between align-items-center">
          <Button
            onClick={() => navigate(`${main_app_path}/${goBack}`)}
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
          {typeRequest === "SHOW" && (
            <Button
              loading={mutation?.isPending}
              onClick={() =>
                navigate(
                  `${main_app_path}/utilisateurs-update/${userData?.id} `
                )
              }
              label="Editer"
              className="rounded-pill px-5"
              icon="pi pi-pencil"
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
      )}

      <SuccesDialog
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        returnUrl={`${main_app_path}/${goBack}`}
        msg="Informations Modifiée avec succes."
      />
      <SuccesDialog
        visible={visibleAdd}
        setVisible={setVisibleAdd}
        returnUrl={`${main_app_path}/${goBack}`}
        msg="Nouvel utilisateur enregistré avec succes."
      />
      <ErrorDialog
        visible={visibleError}
        setVisible={setVisibleError}
        msg="Une erreur est survenue. Réessayez!!"
      />
    </section>
  );
}