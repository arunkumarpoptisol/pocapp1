import React, { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";

import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import { useUsercontext } from "../Componet/userProvider";
import Head from "next/head";

export default function Login() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      {/* <p>User: {user ? JSON.stringify(user.attributes) : "None"}</p> */}

      {user ? (
        <button onClick={() => Auth.signOut()}>Sign Out</button>
      ) : (
        <div className="d-flex  justify-content-center">
          <div className="p-2">
            {" "}
            <button
              onClick={() =>
                Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Google,
                })
              }
            >
              Open Google
            </button>
          </div>
          <div className="p-2">
            <button onClick={() => Auth.federatedSignIn()}>
              Federated Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
