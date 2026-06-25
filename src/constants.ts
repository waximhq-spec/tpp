import { District, RooftopDetails } from './types';

// Precise solar characteristics for Kashmir valley districts
export const KASHMIRI_DISTRICTS: District[] = [
  { id: 'srinagar', name: 'Srinagar', sunHours: 4.2, ratePerUnit: 6.5, subsidyModifier: 1.0 },
  { id: 'anantnag', name: 'Anantnag', sunHours: 4.4, ratePerUnit: 6.0, subsidyModifier: 1.0 },
  { id: 'baramulla', name: 'Baramulla', sunHours: 4.1, ratePerUnit: 6.2, subsidyModifier: 1.0 },
  { id: 'pulwama', name: 'Pulwama', sunHours: 4.5, ratePerUnit: 5.8, subsidyModifier: 1.05 }, // Higher subsidy support
  { id: 'kupwara', name: 'Kupwara', sunHours: 3.9, ratePerUnit: 6.0, subsidyModifier: 1.0 },
  { id: 'budgam', name: 'Budgam', sunHours: 4.3, ratePerUnit: 6.1, subsidyModifier: 1.0 },
];

export const ROOFTOP_TYPES: RooftopDetails[] = [
  {
    id: 'tin',
    name: 'Tin Roof',
    iconName: 'roofing',
    multiplier: 1.0,
    description: 'Extremely popular in Kashmir. Needs robust metallic clamp mount structures that can withstand moving snow piles.'
  },
  {
    id: 'concrete',
    name: 'Concrete Flat',
    iconName: 'domain',
    multiplier: 1.05, // Slightly higher structural cost for ballast materials but optimal orientation freedom
    description: 'Flat layouts. High orientation flexibility to maximize dual-axis tracker angles during weak winter sun.'
  },
  {
    id: 'wooden',
    name: 'Sloped Wooden',
    iconName: 'chalet',
    multiplier: 0.95, // Lightweight, usually requires careful load validation and tailored slate brackets
    description: 'Traditional heritage wooden rafters. Shaded by surrounding Chinars, requires micro-inverter optimization.'
  }
];

export const BASE_COST_PER_KW = 68000; // Average cost per kW in J&K in INR
export const ANNUAL_GENERATION_PER_KW = 1250; // kWh generated annually per kW of solar in Kashmir

export function calculateSolarPotential(billAmount: number, districtId: string, roofType: string): {
  estimatedSize: number;
  subsidy: number;
  newBill: number;
  currentBill: number;
  annualGeneration: number;
  estimatedCostBeforeSubsidy: number;
  netInvestment: number;
  co2Offset: number;
  paybackPeriod: number;
} {
  const district = KASHMIRI_DISTRICTS.find(d => d.id === districtId) || KASHMIRI_DISTRICTS[0];
  const roof = ROOFTOP_TYPES.find(r => r.id === roofType) || ROOFTOP_TYPES[0];

  // Estimation: 1kW solar offset is approx 120 units per month, roughly equivalent to ~1000 INR bill
  // Safe math bounds
  let estimatedSize = billAmount / 1000;
  // Constraint system size between 1kW and 15kW for typical residential/light commercial
  estimatedSize = Math.max(1, Math.min(estimatedSize, 15));
  // Round to nearest 0.5 kW for realism
  estimatedSize = Math.round(estimatedSize * 2) / 2;

  // Formulate National PM Surya Ghar Subsidy Schema for J&K (Union Territory gets prime support):
  // Slab details:
  // - Up to 2 kW: ₹30,000/kW
  // - Additional kW up to 3 kW: ₹18,000/kW
  // - Capped above 3 kW at ₹78,000 total
  let subsidy = 0;
  if (estimatedSize <= 2) {
    subsidy = estimatedSize * 30000;
  } else if (estimatedSize <= 3) {
    subsidy = 60000 + (estimatedSize - 2) * 18000;
  } else {
    subsidy = 78000; // Capped max for standard residential
  }

  // Adjust subsidy slightly based on local region support boosters
  subsidy = Math.round(subsidy * district.subsidyModifier);

  // Bill reduction
  // Solar usually offsets up to 90% of electricity expense (fixed base charge remains)
  const newBill = Math.round(billAmount * 0.10);

  // Annual Generation (adjusted for district sun hours and roof type multiplier)
  const sunHoursRatio = district.sunHours / 4.2; // Srinagar as reference baseline (4.2 hours)
  const efficiency = roof.multiplier;
  const annualGeneration = Math.round(estimatedSize * ANNUAL_GENERATION_PER_KW * sunHoursRatio * efficiency);

  // Capital cost
  const estimatedCostBeforeSubsidy = Math.round(estimatedSize * BASE_COST_PER_KW * roof.multiplier);
  const netInvestment = Math.max(15000, estimatedCostBeforeSubsidy - subsidy);

  // Carbon footprint offsets: 0.82kg CO2 saved per kWh
  const co2Offset = Math.round(annualGeneration * 0.82);

  // Payback period computation: monthly savings = (billAmount - newBill)
  const monthlySavings = billAmount - newBill;
  const annualSavings = monthlySavings * 12;
  const paybackPeriod = Number((netInvestment / annualSavings).toFixed(1));

  return {
    estimatedSize,
    subsidy,
    newBill,
    currentBill: billAmount,
    annualGeneration,
    estimatedCostBeforeSubsidy,
    netInvestment,
    co2Offset,
    paybackPeriod
  };
}
