export interface District {
  id: string;
  name: string;
  sunHours: number; // average peak daily sun hours in Kashmir (varies with terrain/fog)
  ratePerUnit: number; // local electricity price per unit (INR)
  subsidyModifier: number; // any district specific local updates
}

export type RooftopType = 'tin' | 'concrete' | 'wooden';

export interface RooftopDetails {
  id: RooftopType;
  name: string;
  iconName: string;
  multiplier: number; // efficiency or structure stability multiplier
  description: string;
}

export interface CalculationResults {
  estimatedSize: number; // in kW
  subsidy: number; // in INR
  newBill: number; // in INR
  currentBill: number; // in INR
  annualGeneration: number; // in kWh
  estimatedCostBeforeSubsidy: number; // total capital cost
  netInvestment: number; // cost after subsidy
  co2Offset: number; // kg of CO2 offset annually
  paybackPeriod: number; // years
}

export interface SubsidyInquiry {
  name: string;
  phone: string;
  email: string;
  district: string;
  bill: number;
  roofType: RooftopType;
  systemSize: number;
  subsidy: number;
}
