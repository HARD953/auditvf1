import { lazy } from 'react';

import ErrorPage from 'src/pages/others/error-page';
import ProtectedRoute from './components/ProtectedRout';
import MainLayout from './components/MainLayout';

// import { auditValue } from './api/axiosInstance';



// Importez vos composants de page ici
const Login = lazy(() => import('./pages/login/Login'));

const Accueil = lazy(() => import("./pages/accueil/Accueil"));
const Affectations = lazy(() => import("./pages/affectations/Affectations"));

const Supports = lazy(() => import('./pages/supports/Supports'));
const SupportsCreate = lazy(() => import('./pages/supports/SupportsCreate'));
const SupportsUpdate = lazy(() => import('./pages/supports/SupportsUpdate'));

const Collectivites = lazy(() => import('./pages/collectivites/Collectivites'));
const Statistiques = lazy(() => import('./pages/statistiques/Statistiques'));

const UtilisateursLanfi = lazy(() =>
  import("./pages/utilisateurs/UtilisateursLanfi")
);
const Utilisateurs = lazy(() => import("./pages/utilisateurs/Utilisateurs"));
const UtilisateursRecenseurs = lazy(() =>
  import("./pages/utilisateurs/UtilisateursRecenseurs")
);
;
const UtilisateursCreate = lazy(() => import('./pages/utilisateurs/UtilisateursCreate'));
const UtilisateursUpdate = lazy(() => import('./pages/utilisateurs/UtilisateursUpdate'));
const UtilisateursShow = lazy(() => import('./pages/utilisateurs/UtilisateursShow'));

const SauvegardeArchivage = lazy(() => import('./pages/sauvegardeArchivage/SauvegardeArchivage'));
const LogFlux = lazy(() => import('./pages/log/LogFlux'));
const MyMap = lazy(() => import('./pages/map/MapLocal'));
const Parametres = lazy(() => import('./pages/parametres/Parametres'));
const Documentation = lazy(() => import('./pages/documentation/Documentation'));



export const main_app_path = "/auditvisibilites"

// const auditID = localStorage.getItem("auditID");
const auditvalue = true ; 

export const appRouter = [
  {
    path: `${main_app_path}`,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `${main_app_path}/accueil`,
        element: (
          <ProtectedRoute>
            <Accueil />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/supports`,
        element: (
          <ProtectedRoute>
            <Supports />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/supports-create`,
        element: (
          <ProtectedRoute>
            <SupportsCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/affectations`,
        element: (
          <ProtectedRoute>
            <Affectations />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/supports-update/:id`,
        element: (
          <ProtectedRoute>
            <SupportsUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/collectivites`,
        element: (
          <ProtectedRoute>
            <Collectivites />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/statistiques`,
        element: (
          <ProtectedRoute>
            <Statistiques />
          </ProtectedRoute>
        ),
      },
      auditvalue && {
        path: `${main_app_path}/Utilisateurs-lanfiatech`,
        element: (
          <ProtectedRoute>
            <UtilisateursLanfi />
          </ProtectedRoute>
        ),
      },
      auditvalue && {
        path: `${main_app_path}/utilisateurs-recenseurs`,
        element: (
          <ProtectedRoute>
            <UtilisateursRecenseurs />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/utilisateurs-entreprises`,
        element: (
          <ProtectedRoute>
            <Utilisateurs />
          </ProtectedRoute>
        ),
      },

      {
        path: `${main_app_path}/utilisateurs-create`,
        element: (
          <ProtectedRoute>
            <UtilisateursCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/utilisateurs-update/:id`,
        element: (
          <ProtectedRoute>
            <UtilisateursUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/utilisateurs-show/:id`,
        element: (
          <ProtectedRoute>
            <UtilisateursShow />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/sauvegardes`,
        element: (
          <ProtectedRoute>
            <SauvegardeArchivage />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/logs`,
        element: (
          <ProtectedRoute>
            <LogFlux />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/cartographie`,
        element: (
          <ProtectedRoute>
            <MyMap />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/parametres`,
        element: (
          <ProtectedRoute>
            <Parametres />
          </ProtectedRoute>
        ),
      },
      {
        path: `${main_app_path}/documentation`,
        element: (
          <ProtectedRoute>
            <Documentation />
          </ProtectedRoute>
        ),
      },
      // {
      //     path: `${main_app_path}/accueil`,
      //     element: <Accueil />,
      // },
    ],
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
];