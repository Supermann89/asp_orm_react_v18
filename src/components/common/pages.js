import Home from "../admin/Home";
import KindPurpose from "../admin/KindPurpose";
import {
  KindPurposeEdit,
  KindPurposeNew,
} from "../admin/KindPurpose/KindPurposeDetail";
import UserRole from "../admin/UserRole";
import { UserRoleEdit, UserRoleNew } from "../admin/UserRole/UserRoleDetail";
import User from "../admin/User";
import { UserEdit, UserNew } from "../admin/User/UserDetail";
import {
  TerstructureEdit,
  TerstructureNew,
} from "../admin/Terstructure/TerstructureDetail";
import Terstructure from "../admin/Terstructure";
import React from "react";

const pages = {
  root: "/admin",
  childRoutes: [
    {
      path: "/",
      component: <Home />,
      exact: true,
      isMenuPage: true,
      title: "Главная",
    },
    {
      path: "/kind-purpose",
      component: <KindPurpose />,
      exact: true,
      isMenuPage: true,
      title: "Виды целей",
    },
    {
      path: "/kind-purpose/new",
      component: <KindPurposeNew />,
      exact: true,
      isMenuPage: false,
    },
    {
      path: "/kind-purpose/:id",
      component: <KindPurposeEdit />,
      exact: true,
      isMenuPage: false,
    },
    {
      path: "/user-role",
      component: <UserRole />,
      exact: true,
      isMenuPage: true,
      title: "Роли пользователей",
    },
    {
      path: "/user-role/new",
      component: <UserRoleNew />,
      exact: true,
      isMenuPage: false,
    },
    {
      path: "/user-role/:id",
      component: <UserRoleEdit />,
      exact: true,
      isMenuPage: false,
    },
    {
      path: "/user",
      component: <User />,
      exact: true,
      isMenuPage: true,
      title: "Пользователи",
    },
    {
      path: "/user/new",
      component: <UserNew />,
      exact: true,
      isMenuPage: false,
    },
    {
      path: "/user/:id",
      component: <UserEdit />,
      exact: true,
      isMenuPage: false,
    },
    {
      path: "/terstructure",
      component: <Terstructure />,
      exact: true,
      isMenuPage: true,
      title: "Территориальная структура",
    },
    {
      path: "/terstructure/new",
      component: <TerstructureNew />,
      exact: true,
      isMenuPage: false,
    },
    {
      path: "/terstructure/:id",
      component: <TerstructureEdit />,
      exact: true,
      isMenuPage: false,
    },
  ],
};

export default pages;
