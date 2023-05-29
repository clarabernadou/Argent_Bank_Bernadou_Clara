import React from "react";

import MainNav from "../components/mainNav";
import Footer from "../components/Footer";
import Form from "../components/SignInPage/Form";

export default function SignIn() {
  return (
    <div>
      <MainNav />
      <main className="main bg-dark">
        <Form />
      </main>
      <Footer />
    </div>
  );
}
