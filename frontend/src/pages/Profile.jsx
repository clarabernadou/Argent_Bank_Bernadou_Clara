import React from 'react';

import MainNav from '../components/mainNav';
import Footer from '../components/Footer';
import Header from '../components/ProfilePage/Header';
import Account from '../components/ProfilePage/Account';

export default function UserPage() {
  return (
    <div>
      <MainNav />
      <main className="main bg-dark">
        <Header />
        <h2 className="sr-only">Accounts</h2>
        <Account 
          title = "Argent Bank Checking (x8349)"
          amount = "$2,082.79"
          amountDescription = "Available Balance"
        />
        <Account 
          title = "Argent Bank Savings (x6712)"
          amount = "$10,928.42"
          amountDescription = "Available Balance"
        />
        <Account 
          title = "Argent Bank Credit Card"
          amount = "$184.30"
          amountDescription = "Current Balance"
        />
      </main>
      <Footer />
    </div>
  );
}
