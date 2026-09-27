import { NewsArticle } from '@/types';

export const mockNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Federal Reserve Maintains Policy Outlook Amid Mixed Labor Indicators',
    source: 'Reuters',
    timeAgo: '25 min ago',
    timestamp: '2026-09-24T09:45:00Z',
    impact: 'HIGH',
    currency: 'USD',
    relatedPairs: ['EUR/USD', 'GBP/USD', 'USD/JPY'],
    sentiment: 'Bearish for USD / Bullish for EUR/USD',
    score: -0.61,
    summary: 'Federal Reserve officials reiterated their measured approach to terminal rates, citing cooling wage pressures. Markets interpret comments as diminishing probabilities of aggressive near-term tightening.',
  },
  {
    id: 'news-2',
    title: 'Euro Area Inflation Data Shows Moderation Towards Target',
    source: 'Financial Times',
    timeAgo: '1 hour ago',
    timestamp: '2026-09-24T09:10:00Z',
    impact: 'MEDIUM',
    currency: 'EUR',
    relatedPairs: ['EUR/USD', 'EUR/GBP', 'EUR/JPY'],
    sentiment: 'Bullish for EUR/USD',
    score: 0.47,
    summary: 'Core European consumer price figures confirmed steady disinflation trajectory, alleviating stagflation fears and boosting regional risk sentiment across sovereign bond spreads.',
  },
  {
    id: 'news-3',
    title: 'Bank of Japan Hints at Further Rate Normalization in Autumn Meeting',
    source: 'Bloomberg',
    timeAgo: '2 hours ago',
    timestamp: '2026-09-24T08:15:00Z',
    impact: 'HIGH',
    currency: 'JPY',
    relatedPairs: ['USD/JPY', 'EUR/JPY', 'GBP/JPY'],
    sentiment: 'Bullish for JPY / Bearish for USD/JPY',
    score: -0.54,
    summary: 'Governor Ueda highlighted sustainable domestic wage growth and solid services inflation, pointing toward a possible 25 bps rate hike before Q4 conclusion.',
  },
  {
    id: 'news-4',
    title: 'UK Services PMI Beats Consensus, Alleviating Growth Headwinds',
    source: 'DailyFX',
    timeAgo: '3 hours ago',
    timestamp: '2026-09-24T07:20:00Z',
    impact: 'MEDIUM',
    currency: 'GBP',
    relatedPairs: ['GBP/USD', 'EUR/GBP'],
    sentiment: 'Bullish for GBP/USD',
    score: 0.48,
    summary: 'Purchasing managers index printed at 53.4 versus 52.1 forecast, reaffirming UK economic resilience and strengthening the pound against major G10 peers.',
  },
  {
    id: 'news-5',
    title: 'Swiss National Bank Signals Preparedness to Intervene on Excessive Franc Swings',
    source: 'WSJ',
    timeAgo: '4 hours ago',
    timestamp: '2026-09-24T06:30:00Z',
    impact: 'LOW',
    currency: 'CHF',
    relatedPairs: ['USD/CHF', 'EUR/CHF'],
    sentiment: 'Neutral to Mild Bearish for CHF',
    score: -0.15,
    summary: 'SNB governing board reaffirmed two-way intervention commitment to mitigate adverse export impacts from prolonged franc overvaluation.',
  }
];

export const mockSentimentOverview = {
  usdSentiment: -0.42,
  eurSentiment: 0.51,
  gbpSentiment: 0.38,
  jpySentiment: 0.45,
  eurUsdCombined: {
    score: 0.62,
    verdict: 'Bullish',
    breakdown: 'Euro area macro stabilization (+0.51) combined with cooling US dollar yield support (-0.42) produces a +0.62 net bullish bias.'
  },
  gbpUsdCombined: {
    score: 0.49,
    verdict: 'Bullish',
    breakdown: 'UK PMI resilience (+0.38) combined with mild USD softening produces a +0.49 net constructive posture.'
  },
  usdJpyCombined: {
    score: -0.58,
    verdict: 'Bearish',
    breakdown: 'BoJ normalization talk (+0.45 JPY) combined with US rate pullback creates strong downward pressure on USD/JPY.'
  }
};
