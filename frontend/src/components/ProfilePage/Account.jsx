import React from "react";

export default function Account({children}) {
  return (
    <section className="account">
        <div className="account-content-wrapper">
            <h3 className="account-title">{children[0]}</h3>
            <p className="account-amount">{children[1]}</p>
            <p className="account-amount-description">{children[2]}</p>
        </div>
        <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
        </div>
    </section>
  );
}
