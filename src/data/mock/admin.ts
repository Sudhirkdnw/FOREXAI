import { AdminUser, SystemService } from '@/types';

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Alexander Wright',
    email: 'alex.wright@alphatrading.io',
    role: 'Trader',
    status: 'Active',
    lastActive: '3 mins ago',
    signalsReceived: 142,
  },
  {
    id: 'usr-2',
    name: 'Elena Rostova',
    email: 'elena.r@quantumfx.ch',
    role: 'Risk Manager',
    status: 'Active',
    lastActive: '12 mins ago',
    signalsReceived: 384,
  },
  {
    id: 'usr-3',
    name: 'Marcus Chen',
    email: 'm.chen@apexhedging.sg',
    role: 'Analyst',
    status: 'Active',
    lastActive: '45 mins ago',
    signalsReceived: 98,
  },
  {
    id: 'usr-4',
    name: 'Sarah Jenkins',
    email: 's.jenkins@forexai-internal.com',
    role: 'Admin',
    status: 'Active',
    lastActive: 'Just now',
    signalsReceived: 512,
  },
  {
    id: 'usr-5',
    name: 'David Keller',
    email: 'dkeller@legacycap.com',
    role: 'Trader',
    status: 'Suspended',
    lastActive: '4 days ago',
    signalsReceived: 19,
  },
];

export const mockSystemServices: SystemService[] = [
  {
    name: 'Forex Market Feed (L1/L2 FIX)',
    type: 'API',
    status: 'Operational',
    latency: '14 ms',
    uptime: '99.99%',
  },
  {
    name: 'Global Financial News Ingestion (Reuters/FT)',
    type: 'NLP Service',
    status: 'Operational',
    latency: '42 ms',
    uptime: '99.95%',
  },
  {
    name: 'Economic Calendar Sync Gateway',
    type: 'API',
    status: 'Operational',
    latency: '28 ms',
    uptime: '99.98%',
  },
  {
    name: 'Model Inference Server (Triton / ONNX)',
    type: 'ML Service',
    status: 'Operational',
    latency: '22 ms',
    uptime: '99.94%',
  },
  {
    name: 'TimescaleDB Financial Time-Series Cluster',
    type: 'Database',
    status: 'Operational',
    latency: '4 ms',
    uptime: '99.99%',
  },
  {
    name: 'Vector Database (RAG Knowledge Embeddings)',
    type: 'Database',
    status: 'Operational',
    latency: '19 ms',
    uptime: '99.92%',
  },
  {
    name: 'WebSocket Realtime Alert & Dispatcher',
    type: 'Notification',
    status: 'Operational',
    latency: '6 ms',
    uptime: '100.0%',
  },
];

export const mockAdminStats = {
  totalUsers: 1248,
  activeUsers: 982,
  newUsersToday: 38,
  suspendedUsers: 12,
  totalSignalsGenerated: 4892,
  apiCallsToday: '1.42M',
  avgInferenceLatency: '24ms',
  serverCpuUsage: '34%',
  memoryUsage: '58%',
};
