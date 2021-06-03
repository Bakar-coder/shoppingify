import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Dashboard from "../../../components/admin/dashbord";
import Layout from "../../../components/layouts";
import { isAdmin, isAuth } from "../../../hocs/requireAuth";
import { createUrqlClient } from "../../../utils/urqlClient";

interface AdminDashboardTypes {}

const AdminDashboard: FC<AdminDashboardTypes> = ({}) => {
  return <Dashboard />;
};

export default withUrqlClient(createUrqlClient)(isAuth(AdminDashboard));
