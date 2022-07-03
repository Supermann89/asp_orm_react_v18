import React from "react";
import { Link } from "react-router-dom";

const RestrictedAdminPage = () => {
  return (
    <div>
      <h2>Данная страница доступна только администраторам.</h2>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default RestrictedAdminPage;
