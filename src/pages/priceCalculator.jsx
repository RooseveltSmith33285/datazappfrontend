import React, { useMemo, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Mock context for demo - replace with your actual ConsumerContext
const ConsumerContext = React.createContext();

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

  baseByCategoryIndustry: {
    "Core B2B & Professional Services": {
      "Accounting & Finance": 22.0,
      "Advertising & Marketing": 21.0,
      "Business Consulting": 23.0,
      "Legal Services": 28.0,
      "Real Estate & Property Management": 19.0,
      "Human Resources / Staffing / Recruiting": 18.5,
      "Insurance (Health, Auto, Life, Commercial)": 21.0,
      "Banking & Financial Services": 24.0
    },
    "Healthcare & Life Sciences": {
      "Hospitals & Health Systems": 26.0,
      "Private Medical Practices": 22.0,
      "Dental Services": 20.0,
      "Mental Health & Counseling": 19.5,
      "Pharmaceuticals & Biotech": 27.0,
      "Home Health & Senior Care": 18.0,
      "Medical Device & Equipment Suppliers": 25.0,
      "Physical Therapy & Rehabilitation": 19.0
    },
    "Technology & Digital": {
      "Software & SaaS": 23.0,
      "IT Services / Managed Service Providers": 21.0,
      "Data & Analytics Firms": 24.0,
      "Web Development / Design": 18.5,
      "Cybersecurity": 26.0,
      "Artificial Intelligence / Machine Learning": 28.0,
      "Telecommunications & Cloud Services": 22.0
    },
    "Retail, E-Commerce & Consumer Goods": {
      "Apparel & Fashion": 16.0,
      "Automotive Retail & Dealerships": 17.5,
      "Home Goods & Furnishings": 15.5,
      "Food & Beverage / Grocery": 14.0,
      "E-Commerce & Online Retail": 16.5,
      "Consumer Electronics": 17.0,
      "Beauty, Wellness & Personal Care": 15.0
    },
    "Education & Nonprofit": {
      "K-12 Education": 17.5,
      "Higher Education (Colleges & Universities)": 18.5,
      "Online Learning Platforms": 19.0,
      "Nonprofit Organizations": 16.0,
      "Faith-Based Organizations": 14.5,
      "Foundations & Charitable Trusts": 17.0
    },
    "Industrial & Manufacturing": {
      "Automotive Manufacturing": 24.0,
      "Aerospace & Defense": 28.0,
      "Construction & Building Materials": 19.5,
      "Energy, Oil & Gas": 26.0,
      "Engineering Services": 23.0,
      "Logistics & Supply Chain": 20.0,
      "Machinery & Heavy Equipment": 22.0,
      "Plastics, Metals & Industrial Fabrication": 21.0
    },
    "Hospitality, Travel & Entertainment": {
      "Restaurants & Food Service": 14.0,
      "Hotels & Lodging": 16.5,
      "Event Management": 17.0,
      "Sports & Recreation": 15.5,
      "Travel & Tourism": 16.0,
      "Arts, Media & Entertainment": 15.0
    },
    "Government, Public Sector & Utilities": {
      "Federal / State / Local Government": 25.0,
      "Public Safety & Law Enforcement": 24.0,
      "Transportation Authorities": 22.0,
      "Utilities & Infrastructure": 23.0,
      "Postal / Delivery Services": 20.0
    },
    "Real Estate & Housing": {
      "Residential Real Estate": 19.0,
      "Commercial Real Estate": 22.0,
      "Property Development": 24.0,
      "Mortgage & Lending": 21.0,
      "Title & Escrow Services": 18.5
    },
    "Specialty / Emerging Segments": {
      "Cannabis & CBD": 23.0,
      "Renewable Energy / Sustainability": 22.5,
      "Startups & Venture Capital": 25.0,
      "Cryptocurrency / FinTech": 26.0,
      "Logistics Tech / Delivery Platforms": 21.0,
      "EV & Green Mobility": 24.0
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
  const base = PRICING_CONFIG.baseByCategoryIndustry[category]?.[industry] ?? 18.0;
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

  const [category, setCategory] = useState(defaultCategory);
  const [industry, setIndustry] = useState(defaultIndustry);
  const [state, setState] = useState(defaultState);
  const [membership, setMembership] = useState(defaultMembership);
  const [qty, setQty] = useState(defaultMonthlyQty);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate=useNavigate();
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

  useEffect(() => {
    if (setContextState) {
      setContextState(prev => ({
        ...prev,
        state,
        industry_category: category,
        specific_industry: industry,
        monthly_lead_volume: qty,
        membership_tier: membership,
        plan: selectedPlan?.type || '',
        plan_price: selectedPlan ? (selectedPlan.type === 'retail' ? retail : member) : 0,
      }));
    }
  }, [state, category, industry, qty, membership, selectedPlan, setContextState]);

  const pricing = useMemo(() => priceFor(category, industry, state, membership), [category, industry, state, membership]);
  const { retail, member, discount, monthlyFee } = pricing;

  const safeQty = Math.max(10, Math.min(150, Math.floor(Number.isFinite(qty) ? qty : 10)));
  const retailTotal = +(retail * safeQty).toFixed(2);
  const memberTotal = +(member * safeQty).toFixed(2);
  const savings = +(retailTotal - memberTotal).toFixed(2);
  const totalWithFee = +(memberTotal + monthlyFee).toFixed(2);

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
  };

  function handleQtyChange(v) {
    let n = Number(v);
    if (!Number.isFinite(n)) n = 10;
    n = Math.max(10, Math.min(150, Math.floor(n)));
    setQty(n);
  }

  function handleSubmit(e) {
    if (!selectedPlan) return;
    
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
      timestamp: new Date().toISOString(),
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      // If no onSubmit handler, just update context and simulate completion
    navigate('/supression')
    }
  }

  function handleReset() {
    setCategory(defaultCategory);
    setIndustry(defaultIndustry);
    setState(defaultState);
    setMembership(defaultMembership);
    setQty(defaultMonthlyQty);
    setSelectedPlan(null);
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

          <div>
            <label style={styles.label} htmlFor="qty">Monthly Lead Volume (10-150 leads)</label>
            <input
              id="qty"
              type="number"
              min={10}
              max={150}
              step={1}
              inputMode="numeric"
              value={qty}
              onChange={(e) => handleQtyChange(e.target.value)}
              style={styles.input}
            />
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