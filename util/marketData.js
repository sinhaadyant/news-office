// Market data utilities and configurations

export const MARKET_SYMBOLS = {
  STOCKS: [
    'AAPL',
    'GOOGL',
    'MSFT',
    'AMZN',
    'TSLA',
    'META',
    'NVDA',
    'NFLX',
    'ORCL',
    'ADBE',
  ],
  CRYPTO: ['BTC', 'ETH', 'ADA', 'SOL', 'DOT', 'MATIC', 'AVAX', 'LINK'],
  FOREX: ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD'],
  COMMODITIES: ['GOLD', 'SILVER', 'OIL', 'GAS', 'COPPER', 'PLATINUM'],
};

export const MARKET_SECTORS = [
  'Technology',
  'Healthcare',
  'Finance',
  'Energy',
  'Consumer',
  'Industrial',
  'Utilities',
  'Real Estate',
  'Materials',
  'Communication',
];

export const CHART_TYPES = {
  LINE: 'line',
  CANDLESTICK: 'candlestick',
  PIE: 'pie',
  COLUMN: 'column',
  AREA: 'area',
};

export const TIMEFRAMES = {
  '1D': '1 Day',
  '1W': '1 Week',
  '1M': '1 Month',
  '3M': '3 Months',
  '6M': '6 Months',
  '1Y': '1 Year',
  '5Y': '5 Years',
};

// Generate realistic market data
export const generateMarketData = (symbols = MARKET_SYMBOLS.STOCKS) => {
  return symbols.map(symbol => {
    const basePrice = Math.random() * 500 + 50;
    const change = (Math.random() - 0.5) * 20;
    const changePercent = (change / basePrice) * 100;
    const volume = Math.floor(Math.random() * 50000000) + 1000000;

    return {
      symbol,
      name: getCompanyName(symbol),
      price: basePrice.toFixed(2),
      change: change.toFixed(2),
      changePercent: changePercent.toFixed(2),
      volume: volume.toLocaleString(),
      marketCap: (
        basePrice * Math.floor(Math.random() * 1000000000)
      ).toLocaleString(),
      sector: MARKET_SECTORS[Math.floor(Math.random() * MARKET_SECTORS.length)],
      trend: change > 0 ? 'up' : 'down',
      pe: (Math.random() * 50 + 10).toFixed(1),
      dividend: (Math.random() * 5).toFixed(2),
    };
  });
};

// Get company name by symbol
export const getCompanyName = symbol => {
  const companies = {
    AAPL: 'Apple Inc.',
    GOOGL: 'Alphabet Inc.',
    MSFT: 'Microsoft Corp.',
    AMZN: 'Amazon.com Inc.',
    TSLA: 'Tesla Inc.',
    META: 'Meta Platforms Inc.',
    NVDA: 'NVIDIA Corp.',
    NFLX: 'Netflix Inc.',
    ORCL: 'Oracle Corp.',
    ADBE: 'Adobe Inc.',
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    ADA: 'Cardano',
    SOL: 'Solana',
    DOT: 'Polkadot',
    MATIC: 'Polygon',
    AVAX: 'Avalanche',
    LINK: 'Chainlink',
  };
  return companies[symbol] || symbol;
};

// Generate chart data for different timeframes
export const generateChartData = (
  symbol,
  timeframe = '1D',
  chartType = 'line'
) => {
  const basePrice = Math.random() * 500 + 50;
  const dataPoints = getDataPointsForTimeframe(timeframe);

  switch (chartType) {
    case CHART_TYPES.LINE:
      return generateLineData(basePrice, dataPoints);
    case CHART_TYPES.CANDLESTICK:
      return generateCandlestickData(basePrice, dataPoints);
    case CHART_TYPES.PIE:
      return generatePieData();
    default:
      return generateLineData(basePrice, dataPoints);
  }
};

const getDataPointsForTimeframe = timeframe => {
  const points = {
    '1D': 24, // Hourly data for 1 day
    '1W': 7, // Daily data for 1 week
    '1M': 30, // Daily data for 1 month
    '3M': 90, // Daily data for 3 months
    '6M': 180, // Daily data for 6 months
    '1Y': 365, // Daily data for 1 year
    '5Y': 1825, // Daily data for 5 years
  };
  return points[timeframe] || 30;
};

const generateLineData = (basePrice, points) => {
  return Array.from({ length: points }, (_, i) => {
    const variation = (Math.random() - 0.5) * 10;
    const trend = i * 0.1; // Slight upward trend
    return parseFloat((basePrice + variation + trend).toFixed(2));
  });
};

const generateCandlestickData = (basePrice, points) => {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  return Array.from({ length: points }, (_, i) => {
    const date = now - (points - 1 - i) * dayMs;
    const open = basePrice + (Math.random() - 0.5) * 10;
    const close = open + (Math.random() - 0.5) * 8;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;

    return [
      date,
      parseFloat(low.toFixed(2)),
      parseFloat(open.toFixed(2)),
      parseFloat(close.toFixed(2)),
      parseFloat(high.toFixed(2)),
    ];
  });
};

const generatePieData = () => {
  const sectors = MARKET_SECTORS.slice(0, 6);
  return sectors.map(sector => ({
    name: sector,
    y: Math.random() * 30 + 10,
  }));
};

// Market indicators
export const generateMarketIndicators = () => {
  return {
    sp500: {
      value: '4,567.89',
      change: '+2.34%',
      trend: 'up',
    },
    nasdaq: {
      value: '14,234.56',
      change: '-1.23%',
      trend: 'down',
    },
    dow: {
      value: '34,567.89',
      change: '+0.89%',
      trend: 'up',
    },
    crypto: {
      value: '$2.1T',
      change: '+5.67%',
      trend: 'up',
    },
    vix: {
      value: '18.45',
      change: '-2.1%',
      trend: 'down',
    },
    oil: {
      value: '$78.45',
      change: '+1.2%',
      trend: 'up',
    },
    gold: {
      value: '$1,845.67',
      change: '+0.8%',
      trend: 'up',
    },
  };
};

// News data for market stories
export const generateMarketNews = () => {
  const newsTemplates = [
    'Federal Reserve signals potential rate cut amid economic uncertainty',
    'Tech stocks rally as AI companies report strong earnings',
    'Oil prices surge following OPEC production cuts',
    'Cryptocurrency market shows signs of recovery after recent dip',
    'Healthcare sector gains on breakthrough drug approvals',
    'Energy companies face pressure from renewable transition',
    'Banking sector stability concerns grow amid regional bank failures',
    'Automotive industry shifts focus to electric vehicle production',
    'Real estate market shows mixed signals across major cities',
    'International trade tensions impact global supply chains',
  ];

  return newsTemplates.map((title, index) => ({
    id: index + 1,
    title,
    summary: `${title}. This development could have significant implications for market performance and investor sentiment.`,
    category: 'Markets',
    author: ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis'][
      index % 4
    ],
    date: new Date(
      Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    readTime: Math.floor(Math.random() * 5) + 3,
    trending: Math.random() > 0.7,
  }));
};

export default {
  MARKET_SYMBOLS,
  MARKET_SECTORS,
  CHART_TYPES,
  TIMEFRAMES,
  generateMarketData,
  getCompanyName,
  generateChartData,
  generateMarketIndicators,
  generateMarketNews,
};
