import React from "react";

import MainNav from "../components/mainNav";
import Footer from "../components/Footer";
import Hero from "../components/HomePage/Hero";
import FeatureItem from "../components/HomePage/FeatureItem";

import iconChat from '../img/icon-chat.png';
import iconMoney from '../img/icon-money.png';
import iconSecurity from '../img/icon-security.png';

export default function Home() {
  return (
    <div>
      <MainNav />
      <main>
        <Hero />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem
            imgSrc={iconChat}
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem
            imgSrc={iconMoney}
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem
            imgSrc={iconSecurity}
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
