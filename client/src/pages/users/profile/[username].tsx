import { NextPage } from "next";
import React from "react";
import Layout from "../../../components/layouts";

const Profile: NextPage<{ username: string }> = ({ username }) => {
  return (
    <Layout>
      <p>Username is {username}</p>
    </Layout>
  );
};

Profile.getInitialProps = ({ query }) => ({
  username: query.username as string,
});

export default Profile;
