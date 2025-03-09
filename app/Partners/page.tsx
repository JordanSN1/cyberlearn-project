"use client";

import React from "react";
import Image from "next/image";
import styles from "./partners.module.css";

// Interfaces
interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  website: string;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
  website: string;
}

// Données des grandes marques partenaires
const topBrands: Brand[] = [
  {
    id: 1,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
    website: "https://microsoft.com",
  },
  {
    id: 2,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
    website: "https://google.com",
  },
  {
    id: 3,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png",
    website: "https://amazon.com",
  },
  {
    id: 4,
    name: "Cisco",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/512px-Cisco_logo_blue_2016.svg.png",
    website: "https://cisco.com",
  },
  {
    id: 5,
    name: "IBM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png",
    website: "https://ibm.com",
  },
  {
    id: 6,
    name: "Oracle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/512px-Oracle_logo.svg.png",
    website: "https://oracle.com",
  },
  {
    id: 7,
    name: "Intel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/512px-Intel_logo_%282006-2020%29.svg.png",
    website: "https://intel.com",
  },
  {
    id: 8,
    name: "Nvidia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/512px-Nvidia_logo.svg.png",
    website: "https://nvidia.com",
  },
];

// Données des partenaires réguliers
const partners: Partner[] = [
  {
    id: 1,
    name: "CyberSec Institute",
    description: "Institut leader dans la formation en cybersécurité, offrant des certifications reconnues mondialement.",
    logo: "https://img.freepik.com/premium-vector/cyber-security-logo-design-template_316488-452.jpg",
    website: "https://example.com/cybersec",
  },
  {
    id: 2,
    name: "TechGuard Solutions",
    description: "Entreprise spécialisée dans les solutions de sécurité informatique pour les organisations.",
    logo: "https://img.freepik.com/premium-vector/shield-logo-design-security-logo-template_316488-1444.jpg",
    website: "https://example.com/techguard",
  },
  {
    id: 3,
    name: "DataShield Academy",
    description: "Académie proposant des formations avancées en protection des données et conformité RGPD.",
    logo: "https://img.freepik.com/premium-vector/data-security-logo-design-template_316488-967.jpg",
    website: "https://example.com/datashield",
  },
  {
    id: 4,
    name: "NetSafe Foundation",
    description: "Organisation à but non lucratif dédiée à la sensibilisation à la sécurité en ligne.",
    logo: "https://img.freepik.com/premium-vector/network-security-logo-design-template_316488-455.jpg",
    website: "https://example.com/netsafe",
  },
];

export default function PartnersPage() {
  // Dupliquer les marques pour créer un effet de défilement infini
  const duplicatedBrands = [...topBrands, ...topBrands];

  return (
    <div className={styles.container}>
      {/* Section Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}></div>
        <div className={styles.heroOverlay}>
          <div className={styles.header}>
            <h1 className={styles.title}>Nos Partenaires</h1>
            <p className={styles.subtitle}>
              Découvrez les organisations de premier plan qui collaborent avec CyberLearn pour offrir une éducation de qualité en cybersécurité et façonner l'avenir de la protection numérique.
            </p>
          </div>
        </div>
      </section>

      {/* Section Grandes Marques */}
      <section className={styles.brandsSection}>
        <h2 className={styles.brandsTitle}>Nos Partenaires Stratégiques</h2>
        <div className={styles.brandsCarousel}>
          <div className={styles.brandsTrack}>
            {duplicatedBrands.map((brand, index) => (
              <a 
                key={`${brand.id}-${index}`} 
                href={brand.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.brandItem}
              >
                {brand.logo ? (
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    width={200} 
                    height={100} 
                    className={styles.brandLogo}
                    unoptimized={true}
                  />
                ) : (
                  <div className={styles.brandPlaceholder}>
                    {brand.name.charAt(0)}
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section Partenaires Réguliers */}
      <section className={styles.partnersSection}>
        <h2 className={styles.partnersTitle}>Nos Partenaires Éducatifs</h2>
        <div className={styles.partnersGrid}>
          {partners.map((partner) => (
            <div key={partner.id} className={styles.partnerCard}>
              <div className={styles.logoContainer}>
                {partner.logo ? (
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={100} 
                    height={100} 
                    className={styles.partnerLogo}
                    unoptimized={true}
                  />
                ) : (
                  <div className={styles.logoPlaceholder}>
                    {partner.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className={styles.partnerName}>{partner.name}</h3>
              <p className={styles.partnerDescription}>{partner.description}</p>
              <a href={partner.website} target="_blank" rel="noopener noreferrer" className={styles.partnerLink}>
                Visiter le site
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Section Devenez Partenaire */}
      <section className={styles.becomePartner}>
        <div className={styles.becomePartnerContent}>
          <h2 className={styles.becomePartnerTitle}>Devenez Partenaire</h2>
          <p className={styles.becomePartnerText}>
            Vous souhaitez collaborer avec CyberLearn pour promouvoir l'éducation en cybersécurité et contribuer à un monde numérique plus sûr ? 
            Rejoignez notre réseau de partenaires prestigieux et participez à la formation de la prochaine génération d'experts en sécurité informatique.
          </p>
          <button className={styles.contactButton}>Nous Contacter</button>
        </div>
      </section>
    </div>
  );
} 