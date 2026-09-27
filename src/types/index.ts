export type TrendType = 'Bullish' | 'Bearish' | 'Neutral' | 'Strong Bullish' | 'Strong Bearish';

export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema20?: number;
  ema50?: number;
  rsi?: number;
  macd?: number;
  macdSignal?: number;
  macdHist?: number;
}

export interface PairTechnical {
  rsi: number;
  rsiStatus: 'Bullish' | 'Bearish' | 'Overbought' | 'Oversold' | 'Neutral';
  macd: string;
  macdStatus: 'Positive' | 'Negative' | 'Neutral';
  emaCrossover: string;
  adx: number;
  trendStrength: 'Strong' | 'Moderate' | 'Weak';
  atr: number;
  volatility: 'Low' | 'Moderate' | 'High';
  bollingerBands: string;
  support: number;
  resistance: number;
  trend: TrendType;
  candlestickPattern: string;
  liquidity: 'High' | 'Moderate' | 'Low';
  technicalScore: number; // 0-100
}

export interface ForexPair {
  symbol: string;
  name: string;
  price: number;
  change: number; // percentage
  changePoints: number;
  high24h: number;
  low24h: number;
  trend: TrendType;
  aiConfidence: number; // 0-100
  volatility: 'Low' | 'Moderate' | 'High';
  spread: number; // in pips
  timeframeData: Record<string, Candle[]>;
  technical: PairTechnical;
  aiSummary: {
    text: string;
    newsSentiment: number; // -1.0 to +1.0
    marketRegime: 'Trending' | 'Ranging' | 'Breakout' | 'High Volatility';
    recommendedBias: 'Long' | 'Short' | 'Wait';
  };
}

export interface Signal {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  status: 'ACTIVE' | 'TRIGGERED' | 'TARGET_HIT' | 'STOPPED_OUT';
  entry: number;
  stopLoss: number;
  takeProfit: number;
  riskReward: string;
  riskRewardRatio: number;
  confidence: number;
  technicalScore: number;
  newsScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  time: string;
  checklist: {
    item: string;
    passed: boolean;
    status: 'bullish' | 'bearish' | 'neutral' | 'warning';
  }[];
  explanation: string;
  regime: string;
}

export interface ModelPrediction {
  modelName: string;
  prediction: 'Bullish' | 'Bearish' | 'Neutral';
  confidence: number; // 0-100
  accuracyHistorical: number; // e.g. 74.2%
  weights: number; // 0.25
  architecture: string;
  status: 'Online' | 'Retraining' | 'Degraded';
}

export interface PipelineStep {
  id: number;
  name: string;
  subtitle: string;
  status: 'completed' | 'processing' | 'pending';
  output: string;
  confidenceOrValue: string;
  icon: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  timestamp: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  currency: string;
  relatedPairs: string[];
  sentiment: string;
  score: number; // -1.0 to +1.0
  summary: string;
  url?: string;
}

export interface EconomicEvent {
  id: string;
  time: string;
  date: string;
  currency: string;
  event: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  previous: string;
  forecast: string;
  actual: string;
  marketReaction: string;
  reactionBias: 'bullish' | 'bearish' | 'neutral';
}

export interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  lots: number;
  openPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  pnl: number;
  pnlPercentage: number;
  openTime: string;
  aiSuggested: boolean;
}

export interface PortfolioSummary {
  balance: number;
  equity: number;
  marginUsed: number;
  freeMargin: number;
  todayPnl: number;
  todayPnlPercent: number;
  totalPnl: number;
  totalPnlPercent: number;
  drawdown: number;
  winRate: number;
  openPositions: Position[];
  equityHistory: { date: string; equity: number; balance: number; benchmark: number }[];
}

export interface AlertItem {
  id: string;
  type: 'AI_SIGNAL' | 'ECONOMIC_EVENT' | 'VOLATILITY' | 'PRICE';
  title: string;
  message: string;
  pair?: string;
  timeAgo: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  read: boolean;
}

export interface SystemService {
  name: string;
  type: 'API' | 'Database' | 'ML Service' | 'NLP Service' | 'Notification';
  status: 'Connected' | 'Operational' | 'Degraded' | 'Offline';
  latency: string;
  uptime: string;
}

export interface RegisteredModel {
  name: string;
  version: string;
  type: string;
  lastTraining: string;
  validationScore: number;
  datasetSize: string;
  status: 'Online' | 'Staging' | 'Training';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Trader' | 'Risk Manager' | 'Analyst' | 'Admin';
  status: 'Active' | 'Suspended' | 'Pending';
  lastActive: string;
  signalsReceived: number;
}

export interface ResearchExperimentModel {
  id: string;
  name: string;
  features: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  falseSignalRate: number;
  winRate: number;
  profitFactor: number;
  maxDrawdown: number;
  sharpeRatio: number;
  verdict: string;
}
