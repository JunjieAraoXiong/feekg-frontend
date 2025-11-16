/**
 * Mock data for development when backend is unavailable
 */

import type { GraphStats, Event, Entity } from './types';

export const MOCK_STATS: GraphStats = {
  totalNodes: 4416,
  totalEdges: 74238,
  totalEvents: 4398,
  totalEntities: 18,
  totalRelationships: 74238,
  evolutionLinks: 154,
  topEntities: [
    { label: 'Lehman Brothers', degree: 1234 },
    { label: 'Barclays', degree: 892 },
    { label: 'Federal Reserve', degree: 756 },
    { label: 'SEC', degree: 543 },
    { label: 'JP Morgan', degree: 421 },
  ],
};

export const MOCK_EVENTS: Event[] = [
  {
    eventId: 'evt_001',
    label: 'Lehman Brothers files for bankruptcy',
    type: 'Bankruptcy',
    date: '2008-09-15',
    severity: 'high',
    description: 'Lehman Brothers filed for Chapter 11 bankruptcy protection',
  },
  {
    eventId: 'evt_002',
    label: 'Bear Stearns acquisition by JP Morgan',
    type: 'Merger',
    date: '2008-03-16',
    severity: 'high',
    description: 'JP Morgan Chase acquired Bear Stearns for $2 per share',
  },
  {
    eventId: 'evt_003',
    label: 'AIG receives government bailout',
    type: 'Bailout',
    date: '2008-09-16',
    severity: 'high',
    description: 'Federal Reserve provided $85 billion credit facility to AIG',
  },
  {
    eventId: 'evt_004',
    label: 'Credit rating downgrade',
    type: 'CreditDowngrade',
    date: '2008-09-10',
    severity: 'medium',
    description: 'Major rating agencies downgraded Lehman Brothers credit rating',
  },
  {
    eventId: 'evt_005',
    label: 'Stock price plummets',
    type: 'MarketCrash',
    date: '2008-09-09',
    severity: 'high',
    description: 'Lehman Brothers stock fell 45% in one day',
  },
  {
    eventId: 'evt_006',
    label: 'Failed merger talks with Barclays',
    type: 'MergerFailure',
    date: '2008-09-14',
    severity: 'high',
    description: 'Negotiations with Barclays collapsed, leading to bankruptcy filing',
  },
  {
    eventId: 'evt_007',
    label: 'Federal Reserve emergency meeting',
    type: 'RegulatoryAction',
    date: '2008-09-13',
    severity: 'high',
    description: 'Fed officials convened emergency weekend meeting to prevent collapse',
  },
  {
    eventId: 'evt_008',
    label: 'Counterparty exposure revealed',
    type: 'RiskDisclosure',
    date: '2008-09-12',
    severity: 'medium',
    description: 'Banks disclosed billions in exposure to Lehman Brothers',
  },
  {
    eventId: 'evt_009',
    label: 'Subprime losses announced',
    type: 'FinancialLoss',
    date: '2008-06-15',
    severity: 'high',
    description: 'Lehman reported $2.8 billion loss from subprime mortgage exposure',
  },
  {
    eventId: 'evt_010',
    label: 'Liquidity crisis deepens',
    type: 'LiquidityCrisis',
    date: '2008-09-08',
    severity: 'high',
    description: 'Lehman faced severe liquidity shortage as clients withdrew funds',
  },
];

export const MOCK_ENTITIES: Entity[] = [
  { entityId: 'ent_001', label: 'Lehman Brothers', type: 'investment_bank' },
  { entityId: 'ent_002', label: 'Barclays', type: 'bank' },
  { entityId: 'ent_003', label: 'JP Morgan Chase', type: 'bank' },
  { entityId: 'ent_004', label: 'Federal Reserve', type: 'regulator' },
  { entityId: 'ent_005', label: 'SEC', type: 'regulator' },
  { entityId: 'ent_006', label: 'AIG', type: 'company' },
  { entityId: 'ent_007', label: 'Bear Stearns', type: 'investment_bank' },
  { entityId: 'ent_008', label: 'Moody\'s', type: 'company' },
];

// Flag to enable/disable mock data
// Set to false to use real AllegroGraph data via Flask API
export const USE_MOCK_DATA = false;
