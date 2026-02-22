import React, { useMemo, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ConsumerContext } from "../context/ConsumerContextAPI";

export const PRICING_CONFIG = {
  industries: {
    "Core B2B & Professional Services": [
      "Accounting & Finance",
      "Advertising & Marketing",
      "Business Consulting",
      "Legal Services",
      "Real Estate & Property Management",
      "Human Resources / Staffing / Recruiting",
      "Insurance (Health, Auto, Life, Commercial)",
      "Banking & Financial Services"
    ],
    "Healthcare & Life Sciences": [
      "Hospitals & Health Systems",
      "Private Medical Practices",
      "Dental Services",
      "Mental Health & Counseling",
      "Pharmaceuticals & Biotech",
      "Home Health & Senior Care",
      "Medical Device & Equipment Suppliers",
      "Physical Therapy & Rehabilitation"
    ],
    "Technology & Digital": [
      "Software & SaaS",
      "IT Services / Managed Service Providers",
      "Data & Analytics Firms",
      "Web Development / Design",
      "Cybersecurity",
      "Artificial Intelligence / Machine Learning",
      "Telecommunications & Cloud Services"
    ],
    "Retail, E-Commerce & Consumer Goods": [
      "Apparel & Fashion",
      "Automotive Retail & Dealerships",
      "Home Goods & Furnishings",
      "Food & Beverage / Grocery",
      "E-Commerce & Online Retail",
      "Consumer Electronics",
      "Beauty, Wellness & Personal Care"
    ],
    "Education & Nonprofit": [
      "K-12 Education",
      "Higher Education (Colleges & Universities)",
      "Online Learning Platforms",
      "Nonprofit Organizations",
      "Faith-Based Organizations",
      "Foundations & Charitable Trusts"
    ],
    "Industrial & Manufacturing": [
      "Automotive Manufacturing",
      "Aerospace & Defense",
      "Construction & Building Materials",
      "Energy, Oil & Gas",
      "Engineering Services",
      "Logistics & Supply Chain",
      "Machinery & Heavy Equipment",
      "Plastics, Metals & Industrial Fabrication"
    ],
    "Hospitality, Travel & Entertainment": [
      "Restaurants & Food Service",
      "Hotels & Lodging",
      "Event Management",
      "Sports & Recreation",
      "Travel & Tourism",
      "Arts, Media & Entertainment"
    ],
    "Government, Public Sector & Utilities": [
      "Federal / State / Local Government",
      "Public Safety & Law Enforcement",
      "Transportation Authorities",
      "Utilities & Infrastructure",
      "Postal / Delivery Services"
    ],
    "Real Estate & Housing": [
      "Residential Real Estate",
      "Commercial Real Estate",
      "Property Development",
      "Mortgage & Lending",
      "Title & Escrow Services"
    ],
    "Specialty / Emerging Segments": [
      "Cannabis & CBD",
      "Renewable Energy / Sustainability",
      "Startups & Venture Capital",
      "Cryptocurrency / FinTech",
      "Logistics Tech / Delivery Platforms",
      "EV & Green Mobility"
    ]
  },

  // Updated with actual Cost Per Lead values from your data
  baseByCategoryIndustry: {
    "Core B2B & Professional Services": {
      "Accounting & Finance": 51.87,
      "Advertising & Marketing": 54.76,
      "Business Consulting": 53.66,
      "Legal Services": 52.99,
      "Real Estate & Property Management": 50.78,
      "Human Resources / Staffing / Recruiting": 50.78,
      "Insurance (Health, Auto, Life, Commercial)": 50.29,
      "Banking & Financial Services": 54.33
    },
    "Healthcare & Life Sciences": {
      "Hospitals & Health Systems": 29.51,
      "Private Medical Practices": 30.04,
      "Dental Services": 26.61,
      "Mental Health & Counseling": 31.35,
      "Pharmaceuticals & Biotech": 30.66,
      "Home Health & Senior Care": 27.56,
      "Medical Device & Equipment Suppliers": 27.41,
      "Physical Therapy & Rehabilitation": 27.41
    },
    "Technology & Digital": {
      "Software & SaaS": 44.02,
      "IT Services / Managed Service Providers": 45.13,
      "Data & Analytics Firms": 44.66,
      "Web Development / Design": 43.96,
      "Cybersecurity": 45.56,
      "Artificial Intelligence / Machine Learning": 43.19,
      "Telecommunications & Cloud Services": 43.96
    },
    "Retail, E-Commerce & Consumer Goods": {
      "Apparel & Fashion": 44.33,
      "Automotive Retail & Dealerships": 44.78,
      "Home Goods & Furnishings": 46.42,
      "Food & Beverage / Grocery": 43.5,
      "E-Commerce & Online Retail": 45.07,
      "Consumer Electronics": 45.46,
      "Beauty, Wellness & Personal Care": 42.73
    },
    "Education & Nonprofit": {
      "K-12 Education": 44.54,
      "Higher Education (Colleges & Universities)": 42.36,
      "Online Learning Platforms": 41.83,
      "Nonprofit Organizations": 46.24,
      "Faith-Based Organizations": 46.33,
      "Foundations & Charitable Trusts": 45.54
    },
    "Industrial & Manufacturing": {
      "Automotive Manufacturing": 44.02,
      "Aerospace & Defense": 42.99,
      "Construction & Building Materials": 45.92,
      "Energy, Oil & Gas": 44.7,
      "Engineering Services": 43.11,
      "Logistics & Supply Chain": 44.97,
      "Machinery & Heavy Equipment": 42.67,
      "Plastics, Metals & Industrial Fabrication": 47.04
    },
    "Hospitality, Travel & Entertainment": {
      "Restaurants & Food Service": 43.79,
      "Hotels & Lodging": 45.81,
      "Event Management": 44.06,
      "Sports & Recreation": 45.1,
      "Travel & Tourism": 45.24,
      "Arts, Media & Entertainment": 43.42
    },
    "Government, Public Sector & Utilities": {
      "Federal / State / Local Government": 47.35,
      "Public Safety & Law Enforcement": 46.37,
      "Transportation Authorities": 47.19,
      "Utilities & Infrastructure": 46.97,
      "Postal / Delivery Services": 45.49
    },
    "Real Estate & Housing": {
      "Residential Real Estate": 47.11,
      "Commercial Real Estate": 42.94,
      "Property Development": 43.48,
      "Mortgage & Lending": 42.73,
      "Title & Escrow Services": 44.13
    },
    "Specialty / Emerging Segments": {
      "Cannabis & CBD": 44.44,
      "Renewable Energy / Sustainability": 43.86,
      "Startups & Venture Capital": 46.64,
      "Cryptocurrency / FinTech": 44.29,
      "Logistics Tech / Delivery Platforms": 43.91,
      "EV & Green Mobility": 45.21
    }
  },

  states: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
  ],

  geoMultipliers: [
    { match: "NEW YORK", multiplier: 1.25 },
    { match: "CALIFORNIA", multiplier: 1.15 },
    { match: "FLORIDA", multiplier: 1.08 },
    { match: "TEXAS", multiplier: 1.05 },
    { match: "ILLINOIS", multiplier: 1.18 },
    { match: "MASSACHUSETTS", multiplier: 1.2 },
    { match: "WASHINGTON", multiplier: 1.12 },
    { match: "COLORADO", multiplier: 1.1 },
  ],

  membershipTiers: {
    none: { name: "None (Retail)", monthlyFee: 0, discount: 0 },
    silver: { name: "Silver", monthlyFee: 29, discount: 0.15 },
    gold: { name: "Gold", monthlyFee: 59, discount: 0.25 },
    platinum: { name: "Platinum", monthlyFee: 79, discount: 0.35 },
  },

  floors: { minRetail: 8.0, minMember: 6.5 },
};

const currency = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

const normalize = (s) => (s || "").trim().toUpperCase();

function geoMultiplier(geo) {
  const g = normalize(geo);
  if (!g) return 1;
  for (const rule of PRICING_CONFIG.geoMultipliers) {
    if (g.includes(rule.match)) return rule.multiplier;
  }
  return 1;
}

function priceFor(category, industry, geo, membershipTier) {
  const base = PRICING_CONFIG.baseByCategoryIndustry[category]?.[industry] ?? 45.0;
  const mult = geoMultiplier(geo);

  let retail = +(base * mult).toFixed(2);
  retail = Math.max(retail, PRICING_CONFIG.floors.minRetail);

  const tier = PRICING_CONFIG.membershipTiers[membershipTier];
  const discountedPrice = +(retail * (1 - tier.discount)).toFixed(2);
  const member = Math.max(discountedPrice, PRICING_CONFIG.floors.minMember);

  return { retail, member, discount: tier.discount, monthlyFee: tier.monthlyFee };
}

export default function LeadPricingCalculator({
  defaultCategory = "Core B2B & Professional Services",
  defaultIndustry = "Real Estate & Property Management",
  defaultState = "New York",
  defaultMembership = "none",
  defaultMonthlyQty = 50,
  compact = false,
  onSubmit = null,
}) {
  const contextData = useContext(ConsumerContext) || { state: {}, setState: () => {} };
  const { state: contextState, setState: setContextState } = contextData;

  console.log('🔵 LeadPricingCalculator - Context Data:', contextData);
  console.log('🔵 LeadPricingCalculator - contextState:', contextState);
  console.log('🔵 LeadPricingCalculator - setContextState type:', typeof setContextState);

  const [category, setCategory] = useState(defaultCategory);
  const [industry, setIndustry] = useState(defaultIndustry);
  const [state, setState] = useState(defaultState);
  const [membership, setMembership] = useState(defaultMembership);
  const [qty, setQty] = useState(defaultMonthlyQty);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Leads purchase options
  const [totalPurchaseLeads, setTotalPurchaseLeads] = useState(50);
  const leadsOptions = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

  const navigate = useNavigate();

  // Initialize context with default values on mount
  useEffect(() => {
    console.log('🟢 MOUNT - Initializing context with defaults...');
    console.log('🟢 MOUNT - setContextState exists?', !!setContextState);
    console.log('🟢 MOUNT - Default values:', {
      state: defaultState,
      industry_category: defaultCategory,
      specific_industry: defaultIndustry,
      monthly_lead_volume: defaultMonthlyQty,
      membership_tier: defaultMembership,
      total_purchase_leads: 50,
    });
    
    if (setContextState) {
      setContextState(prev => {
        console.log('🟢 MOUNT - Previous context state:', prev);
        const newState = {
          ...prev,
          state: defaultState,
          industry_category: defaultCategory,
          specific_industry: defaultIndustry,
          monthly_lead_volume: defaultMonthlyQty,
          membership_tier: defaultMembership,
          total_purchase_leads: 50,
          plan: '',
          plan_price: 0,
        };
        console.log('🟢 MOUNT - New context state:', newState);
        return newState;
      });
    } else {
      console.log('🔴 MOUNT - setContextState is NOT available!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount

  function handleBack() {
    window.history.back();
  }

  const categories = useMemo(
    () => Object.keys(PRICING_CONFIG.industries),
    []
  );

  const industriesForCategory = useMemo(
    () => PRICING_CONFIG.industries[category] || [],
    [category]
  );

  useEffect(() => {
    if (!industriesForCategory.includes(industry)) {
      setIndustry(industriesForCategory[0] || "");
    }
  }, [category, industry, industriesForCategory]);

  const pricing = useMemo(() => priceFor(category, industry, state, membership), [category, industry, state, membership]);
  const { retail, member, discount, monthlyFee } = pricing;

  // Update context whenever any value changes
  useEffect(() => {
    console.log('🟡 UPDATE - Context update triggered');
    console.log('🟡 UPDATE - Current form values:', {
      state,
      category,
      industry,
      qty,
      membership,
      selectedPlan,
      totalPurchaseLeads,
      retail,
      member
    });
    
    if (setContextState) {
      setContextState(prev => {
        console.log('🟡 UPDATE - Previous context state:', prev);
        const newState = {
          ...prev,
          state,
          industry_category: category,
          specific_industry: industry,
          monthly_lead_volume: qty,
          membership_tier: membership,
          plan: selectedPlan?.type || '',
          plan_price: selectedPlan ? (selectedPlan.type === 'retail' ? retail : member) : 0,
          total_purchase_leads: totalPurchaseLeads,
        };
        console.log('🟡 UPDATE - New context state:', newState);
        return newState;
      });
    } else {
      console.log('🔴 UPDATE - setContextState is NOT available!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, category, industry, qty, membership, selectedPlan, totalPurchaseLeads, retail, member]);

  // Debug: Log context state
  useEffect(() => {
    console.log('🔍 DEBUG - Current Context State from LeadPricingCalculator:', {
      state,
      industry_category: category,
      specific_industry: industry,
      monthly_lead_volume: qty,
      membership_tier: membership,
      plan: selectedPlan?.type || '',
      plan_price: selectedPlan ? (selectedPlan.type === 'retail' ? retail : member) : 0,
      total_purchase_leads: totalPurchaseLeads,
    });
    console.log('🔍 DEBUG - Full contextState from Context:', contextState);
  }, [state, category, industry, qty, membership, selectedPlan, totalPurchaseLeads, retail, member, contextState]);

  const safeQty = Math.max(10, Math.min(150, Math.floor(Number.isFinite(qty) ? qty : 10)));
  const retailTotal = +(retail * safeQty).toFixed(2);
  const memberTotal = +(member * safeQty).toFixed(2);
  const savings = +(retailTotal - memberTotal).toFixed(2);
  const totalWithFee = +(memberTotal + monthlyFee).toFixed(2);

  const handleLeadsChange = (leadCount) => {
    setTotalPurchaseLeads(leadCount);
  };

  const styles = {
    wrap: {
      width: "100%",
      minHeight: "100vh",
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      color: "#e6eef6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      boxSizing: "border-box",
      background: "#0b0f14",
    },
    card: {
      background: "#121823",
      border: "1px solid #1e2733",
      borderRadius: 12,
      padding: compact ? 16 : 24,
      boxShadow: "0 10px 24px rgba(0,0,0,.35)",
      maxWidth: 900,
      width: "100%",
    },
    backButton: {
      background: "transparent",
      color: "#9bb4cf",
      border: "none",
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
      padding: "0 0 16px 0",
      transition: "color 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8,
    },
    h1: { fontSize: 24, margin: 0, marginBottom: 6, fontWeight: 700 },
    sub: { color: "#9bb4cf", margin: 0, marginBottom: 24, fontSize: 14, lineHeight: 1.5 },
    grid: {
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
      gap: 16,
    },
    label: { display: "block", fontSize: 13, color: "#a9bfd6", marginBottom: 6, fontWeight: 500 },
    input: {
      width: "100%",
      padding: 14,
      borderRadius: 10,
      border: "1px solid #2a3545",
      background: "#0f141d",
      color: "#e6eef6",
      outline: "none",
      fontSize: 14,
      boxSizing: "border-box",
    },
    hr: { border: "none", height: 1, background: "#1e2733", margin: "24px 0" },
    resultGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
    pill: {
      background: "#0f1520",
      border: "1px solid #223045",
      borderRadius: 12,
      padding: 18,
    },
    kpi: { fontSize: 28, fontWeight: 700, marginTop: 4 },
    kpiSmall: { fontSize: 14, fontWeight: 500, color: "#9bb4cf", marginLeft: 8 },
    muted: { color: "#839ab5", fontSize: 12, marginBottom: 2 },
    tierInfo: {
      background: "#0a0e15",
      border: "1px solid #1e2733",
      borderRadius: 10,
      padding: 16,
      marginTop: 16,
    },
    tierGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 12,
      marginTop: 12,
    },
    tierCard: {
      background: "#121823",
      border: "1px solid #2a3545",
      borderRadius: 8,
      padding: 12,
    },
    tierTitle: { fontSize: 14, fontWeight: 600, color: "#e6eef6", marginBottom: 6 },
    tierDetail: { fontSize: 12, color: "#9bb4cf", marginBottom: 4 },
    savingsBadge: {
      display: "inline-block",
      background: "#1a4d2e",
      color: "#4ade80",
      padding: "4px 10px",
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 600,
      marginTop: 8,
    },
    planSelectionSection: {
      background: "#0a0e15",
      border: "1px solid #1e2733",
      borderRadius: 10,
      padding: 20,
      marginTop: 24,
    },
    planSelectionGrid: {
      display: "grid",
      gridTemplateColumns: compact ? "1fr" : "1fr 1fr",
      gap: 16,
      marginTop: 16,
    },
    planCard: {
      background: "#121823",
      border: "2px solid #2a3545",
      borderRadius: 10,
      padding: 16,
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
    },
    planCardSelected: {
      background: "#1a2f3f",
      border: "2px solid #00d9ff",
      boxShadow: "0 0 12px rgba(0, 217, 255, 0.2)",
    },
    planName: {
      fontSize: 16,
      fontWeight: 600,
      color: "#e6eef6",
      marginBottom: 8,
    },
    planPrice: {
      fontSize: 20,
      fontWeight: 700,
      color: "#00d9ff",
      marginBottom: 8,
    },
    planDescription: {
      fontSize: 12,
      color: "#9bb4cf",
      marginBottom: 12,
    },
    checkmark: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 24,
      height: 24,
      background: "#00d9ff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
      fontWeight: "bold",
    },
    buttonContainer: {
      marginTop: 24,
      display: "flex",
      gap: 12,
      justifyContent: "flex-end",
    },
    submitBtn: {
      padding: "12px 28px",
      background: "#00d9ff",
      color: "#000",
      border: "none",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      opacity: isSubmitting || !selectedPlan ? 0.5 : 1,
      pointerEvents: isSubmitting || !selectedPlan ? "none" : "auto",
    },
    resetBtn: {
      padding: "12px 28px",
      background: "transparent",
      color: "#9bb4cf",
      border: "1px solid #2a3545",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    leadsPurchaseSection: {
      background: "#0a0e15",
      border: "1px solid #1e2733",
      borderRadius: 10,
      padding: 20,
      marginBottom: 24,
    },
    leadsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
      gap: "12px",
      maxWidth: "600px",
      margin: "16px auto 0 auto",
    },
    leadOption: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 8px",
      backgroundColor: "#121823",
      border: `2px solid #2a3545`,
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontWeight: "500",
      color: "#e6eef6",
      fontSize: "14px",
    },
    leadOptionSelected: {
      backgroundColor: "#00d9ff",
      border: `2px solid #00d9ff`,
      color: "#000",
      fontWeight: "600",
    },
  };

  function handleQtyChange(v) {
    let n = Number(v);
    if (!Number.isFinite(n)) n = 10;
    n = Math.max(10, Math.min(150, Math.floor(n)));
    setQty(n);
  }

  function handleSubmit(e) {
    if (!selectedPlan) return;
    
    console.log('🚀 SUBMIT - Starting submission...');
    console.log('🚀 SUBMIT - Selected Plan:', selectedPlan);
    console.log('🚀 SUBMIT - Context State at submit:', contextState);
    
    setIsSubmitting(true);

    const payload = {
      state,
      industry_category: category,
      specific_industry: industry,
      monthly_lead_volume: qty,
      membership_tier: membership,
      retail_price_per_lead: retail,
      member_price_per_lead: member,
      retail_total: retailTotal,
      member_total: memberTotal,
      monthly_fee: monthlyFee,
      total_with_fee: totalWithFee,
      savings: savings,
      discount_percentage: (discount * 100),
      selected_plan: selectedPlan.type,
      plan: selectedPlan.type,
      plan_price: selectedPlan.type === 'retail' ? retail : member,
      plan_total: selectedPlan.type === 'retail' ? retailTotal : totalWithFee,
      total_purchase_leads: totalPurchaseLeads,
      timestamp: new Date().toISOString(),
    };

    console.log('🚀 SUBMIT - Payload being sent:', payload);
    console.log('🚀 SUBMIT - Full context state:', contextState);

    if (onSubmit) {
      console.log('🚀 SUBMIT - Calling onSubmit callback');
      onSubmit(payload);
    } else {
      console.log('🚀 SUBMIT - Navigating to /supression');
      navigate('/supression');
    }
  }

  function handleReset() {
    console.log('🔄 RESET - Resetting form to defaults');
    setCategory(defaultCategory);
    setIndustry(defaultIndustry);
    setState(defaultState);
    setMembership(defaultMembership);
    setQty(defaultMonthlyQty);
    setSelectedPlan(null);
    setTotalPurchaseLeads(50);
    console.log('🔄 RESET - Form reset complete');
  }

  const currentTier = PRICING_CONFIG.membershipTiers[membership];

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <button
          onClick={handleBack}
          style={styles.backButton}
          onMouseOver={(e) => e.currentTarget.style.color = "#e6eef6"}
          onMouseOut={(e) => e.currentTarget.style.color = "#9bb4cf"}
        >
          ← Back
        </button>

        <h1 style={styles.h1}>Lead Pricing Calculator</h1>
        <p style={styles.sub}>
          Calculate your custom lead pricing based on industry, location, and membership tier. 
          Save up to 35% with our Platinum membership.
        </p>

        {/* Leads Purchase Selection */}
        <div style={styles.leadsPurchaseSection}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#e6eef6",
            marginBottom: "16px",
            textAlign: "center"
          }}>
            How many leads would you like to purchase?
          </h3>
          <div style={styles.leadsGrid}>
            {leadsOptions.map((leadCount) => (
              <div
                key={leadCount}
                style={{
                  ...styles.leadOption,
                  ...(totalPurchaseLeads === leadCount ? styles.leadOptionSelected : {})
                }}
                onClick={() => handleLeadsChange(leadCount)}
                onMouseOver={(e) => {
                  if (totalPurchaseLeads !== leadCount) {
                    e.currentTarget.style.borderColor = "#00d9ff";
                    e.currentTarget.style.background = "#1a1f2b";
                  }
                }}
                onMouseOut={(e) => {
                  if (totalPurchaseLeads !== leadCount) {
                    e.currentTarget.style.borderColor = "#2a3545";
                    e.currentTarget.style.background = "#121823";
                  }
                }}
              >
                {leadCount}
              </div>
            ))}
          </div>
          {totalPurchaseLeads && (
            <p style={{
              textAlign: "center",
              marginTop: "16px",
              color: "#00d9ff",
              fontWeight: "500",
              fontSize: "14px"
            }}>
              Selected: {totalPurchaseLeads} leads
            </p>
          )}
        </div>

        <div style={styles.grid}>
          <div>
            <label style={styles.label} htmlFor="state">State</label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={styles.input}
            >
              {PRICING_CONFIG.states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label} htmlFor="category">Industry Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.input}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label} htmlFor="industry">Specific Industry</label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              style={styles.input}
            >
              {industriesForCategory.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

        
          <div style={{ gridColumn: compact ? "1" : "1 / -1" }}>
            <label style={styles.label} htmlFor="membership">Membership Tier</label>
            <select
              id="membership"
              value={membership}
              onChange={(e) => setMembership(e.target.value)}
              style={styles.input}
            >
              <option value="none">None (Retail Pricing)</option>
              <option value="silver">Silver - $29/mo (15% off)</option>
              <option value="gold">Gold - $59/mo (25% off)</option>
              <option value="platinum">Platinum - $79/mo (35% off)</option>
            </select>
          </div>
        </div>

        <div style={styles.hr} />

        <div style={styles.resultGrid}>
          <div style={styles.pill}>
            <div style={styles.muted}>Retail Price / Lead</div>
            <div style={styles.kpi}>
              {currency(retail)} <small style={styles.kpiSmall}>USD</small>
            </div>
            <div style={styles.muted}>Monthly total: {currency(retailTotal)}</div>
          </div>

          <div style={styles.pill}>
            <div style={styles.muted}>
              {membership === "none" ? "Your Price / Lead" : `${currentTier.name} Price / Lead`}
            </div>
            <div style={styles.kpi}>
              {currency(member)} <small style={styles.kpiSmall}>USD</small>
            </div>
            <div style={styles.muted}>
              Leads cost: {currency(memberTotal)}
              {membership !== "none" && ` + ${currency(monthlyFee)} membership`}
            </div>
            {membership !== "none" && (
              <>
                <div style={styles.muted}>Total monthly: {currency(totalWithFee)}</div>
                {savings > 0 && (
                  <div style={styles.savingsBadge}>
                    Save {currency(savings)}/month
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div style={styles.tierInfo}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e6eef6", marginBottom: 8 }}>
            Membership Benefits
          </div>
          <div style={styles.tierGrid}>
            <div style={styles.tierCard}>
              <div style={styles.tierTitle}>🥈 Silver</div>
              <div style={styles.tierDetail}>$29/month • 15% discount</div>
              <div style={{ fontSize: 11, color: "#839ab5", marginTop: 6 }}>
                Entry-level access for independent reps and small teams
              </div>
            </div>
            <div style={styles.tierCard}>
              <div style={styles.tierTitle}>🥇 Gold</div>
              <div style={styles.tierDetail}>$59/month • 25% discount</div>
              <div style={{ fontSize: 11, color: "#839ab5", marginTop: 6 }}>
                Mid-tier for active users with moderate lead volumes
              </div>
            </div>
            <div style={styles.tierCard}>
              <div style={styles.tierTitle}>💎 Platinum</div>
              <div style={styles.tierDetail}>$79/month • 35% discount</div>
              <div style={{ fontSize: 11, color: "#839ab5", marginTop: 6 }}>
                Premium tier with top discounts and dedicated support
              </div>
            </div>
          </div>
        </div>

        <div style={styles.planSelectionSection}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e6eef6" }}>
            Select Your Plan
          </div>
          <p style={{ color: "#9bb4cf", fontSize: 12, marginTop: 4 }}>
            Choose between Retail pricing or your Membership plan
          </p>
          
          <div style={styles.planSelectionGrid}>
            <div
              style={{
                ...styles.planCard,
                ...(selectedPlan?.type === 'retail' ? styles.planCardSelected : {})
              }}
              onClick={() => setSelectedPlan({ type: 'retail', price: retail })}
              onMouseOver={(e) => {
                if (selectedPlan?.type !== 'retail') {
                  e.currentTarget.style.borderColor = "#00d9ff";
                  e.currentTarget.style.background = "#1a1f2b";
                }
              }}
              onMouseOut={(e) => {
                if (selectedPlan?.type !== 'retail') {
                  e.currentTarget.style.borderColor = "#2a3545";
                  e.currentTarget.style.background = "#121823";
                }
              }}
            >
              {selectedPlan?.type === 'retail' && <div style={styles.checkmark}>✓</div>}
              <div style={styles.planName}>Retail Plan</div>
              <div style={styles.planPrice}>{currency(retail)}/lead</div>
              <div style={styles.planDescription}>
                No membership required. Pay standard retail pricing.
              </div>
              <div style={styles.muted}>Total: {currency(retailTotal)}</div>
            </div>

            <div
              style={{
                ...styles.planCard,
                ...(selectedPlan?.type === 'membership' ? styles.planCardSelected : {})
              }}
              onClick={() => setSelectedPlan({ type: 'membership', price: member })}
              onMouseOver={(e) => {
                if (selectedPlan?.type !== 'membership') {
                  e.currentTarget.style.borderColor = "#00d9ff";
                  e.currentTarget.style.background = "#1a1f2b";
                }
              }}
              onMouseOut={(e) => {
                if (selectedPlan?.type !== 'membership') {
                  e.currentTarget.style.borderColor = "#2a3545";
                  e.currentTarget.style.background = "#121823";
                }
              }}
            >
              {selectedPlan?.type === 'membership' && <div style={styles.checkmark}>✓</div>}
              <div style={styles.planName}>{currentTier.name} Plan</div>
              <div style={styles.planPrice}>{currency(member)}/lead</div>
              <div style={styles.planDescription}>
                {discount * 100}% discount • {currency(monthlyFee)}/month membership
              </div>
              <div style={styles.muted}>Total: {currency(totalWithFee)}</div>
            </div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={handleReset}
            style={styles.resetBtn}
            onMouseOver={(e) => e.target.style.borderColor = "#4ade80"}
            onMouseOut={(e) => e.target.style.borderColor = "#2a3545"}
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            style={styles.submitBtn}
            disabled={!selectedPlan || isSubmitting}
            onMouseOver={(e) => selectedPlan && !isSubmitting && (e.target.style.background = "#00b8d4")}
            onMouseOut={(e) => selectedPlan && !isSubmitting && (e.target.style.background = "#00d9ff")}
          >
            {isSubmitting ? "Submitting..." : "Get Quote"}
          </button>
        </div>
      </div>
    </div>
  );
}