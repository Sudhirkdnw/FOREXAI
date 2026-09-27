'use client';

import React, { useState } from 'react';
import { Candle } from '@/types';
import { BarChart3, TrendingUp, Sliders, Layers } from 'lucide-react';

interface TradingChartProps {
  symbol: string;
  candles: Candle[];
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
  supportPrice?: number;
  resistancePrice?: number;
  currentPrice: number;
}

export function TradingChart({
  symbol,
  candles,
  timeframe,
  onTimeframeChange,
  supportPrice,
  resistancePrice,
  currentPrice,
}: TradingChartProps) {
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles');
  const [showEma20, setShowEma20] = useState(true);
  const [showEma50, setShowEma50] = useState(true);
  const [activeSubIndicator, setActiveSubIndicator] = useState<'rsi' | 'macd' | 'volume'>('rsi');
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D'];

  if (!candles || candles.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center text-slate-500 bg-[#0b101c] rounded-xl border border-slate-800">
        No chart data available for {symbol}
      </div>
    );
  }

  // Calculate chart boundaries
  const prices = candles.flatMap(c => [c.high, c.low]);
  if (supportPrice) prices.push(supportPrice);
  if (resistancePrice) prices.push(resistancePrice);

  const minPrice = Math.min(...prices) * 0.9995;
  const maxPrice = Math.max(...prices) * 1.0005;
  const priceRange = maxPrice - minPrice || 1;

  // Chart coordinate helpers
  const svgWidth = 720;
  const mainHeight = 260;
  const subHeight = 90;
  const totalSvgHeight = mainHeight + subHeight + 30;

  const candleWidth = Math.max(4, Math.floor((svgWidth - 60) / candles.length) - 2);

  const getY = (val: number) => {
    return mainHeight - ((val - minPrice) / priceRange) * (mainHeight - 20) - 10;
  };

  const getX = (index: number) => {
    return 30 + index * ((svgWidth - 60) / candles.length) + candleWidth / 2;
  };

  // EMA Path builders
  const ema20Points = candles
    .map((c, i) => (c.ema20 ? `${getX(i)},${getY(c.ema20)}` : ''))
    .filter(Boolean)
    .join(' ');

  const ema50Points = candles
    .map((c, i) => (c.ema50 ? `${getX(i)},${getY(c.ema50)}` : ''))
    .filter(Boolean)
    .join(' ');

  const linePoints = candles
    .map((c, i) => `${getX(i)},${getY(c.close)}`)
    .join(' ');

  const areaPoints = `${getX(0)},${mainHeight} ` + linePoints + ` ${getX(candles.length - 1)},${mainHeight}`;

  const currentDisplayCandle = hoveredCandle || candles[candles.length - 1];

  return (
    <div className="flex flex-col bg-[#0b101d] rounded-xl border border-slate-800 p-4">
      {/* Chart Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-1 bg-[#0f172a] p-1 rounded-lg border border-slate-800">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-[#0f172a] p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setChartType('candles')}
              className={`px-2.5 py-1 rounded font-medium ${
                chartType === 'candles' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2.5 py-1 rounded font-medium ${
                chartType === 'line' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Line
            </button>
          </div>

          {/* Indicators Toggle */}
          <button
            onClick={() => setShowEma20(!showEma20)}
            className={`px-2 py-1 text-xs rounded border transition flex items-center gap-1 ${
              showEma20
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                : 'text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <span className="w-2 h-0.5 bg-cyan-400 inline-block"></span>
            EMA 20
          </button>

          <button
            onClick={() => setShowEma50(!showEma50)}
            className={`px-2 py-1 text-xs rounded border transition flex items-center gap-1 ${
              showEma50
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                : 'text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
          >
            <span className="w-2 h-0.5 bg-purple-400 inline-block"></span>
            EMA 50
          </button>
        </div>

        {/* Sub-indicator Toggles */}
        <div className="flex items-center bg-[#0f172a] p-0.5 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSubIndicator('rsi')}
            className={`px-2.5 py-1 rounded font-medium ${
              activeSubIndicator === 'rsi' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            RSI (14)
          </button>
          <button
            onClick={() => setActiveSubIndicator('macd')}
            className={`px-2.5 py-1 rounded font-medium ${
              activeSubIndicator === 'macd' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            MACD
          </button>
          <button
            onClick={() => setActiveSubIndicator('volume')}
            className={`px-2.5 py-1 rounded font-medium ${
              activeSubIndicator === 'volume' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Volume
          </button>
        </div>
      </div>

      {/* Live Candle Data Readout */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono py-2 text-slate-400 border-b border-slate-800/60">
        <div><span className="text-slate-500">TIME:</span> <span className="text-slate-200">{currentDisplayCandle.time}</span></div>
        <div><span className="text-slate-500">O:</span> <span className="text-slate-200">{currentDisplayCandle.open}</span></div>
        <div><span className="text-slate-500">H:</span> <span className="text-emerald-400">{currentDisplayCandle.high}</span></div>
        <div><span className="text-slate-500">L:</span> <span className="text-rose-400">{currentDisplayCandle.low}</span></div>
        <div><span className="text-slate-500">C:</span> <span className={currentDisplayCandle.close >= currentDisplayCandle.open ? 'text-emerald-400' : 'text-rose-400'}>{currentDisplayCandle.close}</span></div>
        {currentDisplayCandle.ema20 && showEma20 && (
          <div><span className="text-cyan-500">EMA20:</span> <span className="text-cyan-300">{currentDisplayCandle.ema20}</span></div>
        )}
        {currentDisplayCandle.ema50 && showEma50 && (
          <div><span className="text-purple-500">EMA50:</span> <span className="text-purple-300">{currentDisplayCandle.ema50}</span></div>
        )}
        <div><span className="text-slate-500">VOL:</span> <span className="text-slate-300">{currentDisplayCandle.volume.toLocaleString()}</span></div>
      </div>

      {/* Main SVG Interactive Chart */}
      <div className="relative w-full overflow-x-auto pt-2">
        <svg
          viewBox={`0 0 ${svgWidth} ${totalSvgHeight}`}
          className="w-full h-auto min-w-[620px] select-none"
          onMouseLeave={() => setHoveredCandle(null)}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="bullCandleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="bearCandleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
            const y = mainHeight * ratio;
            const priceLevel = (maxPrice - ratio * priceRange).toFixed(symbol.includes('JPY') ? 2 : 4);
            return (
              <g key={ratio}>
                <line x1="20" y1={y} x2={svgWidth - 20} y2={y} stroke="#1e293b" strokeDasharray="3 3" />
                <text x={svgWidth - 10} y={y + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                  {priceLevel}
                </text>
              </g>
            );
          })}

          {/* Support and Resistance Overlay Lines */}
          {resistancePrice && (
            <g>
              <line
                x1="20"
                y1={getY(resistancePrice)}
                x2={svgWidth - 20}
                y2={getY(resistancePrice)}
                stroke="#f43f5e"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <text x="35" y={getY(resistancePrice) - 4} fill="#f43f5e" fontSize="9" fontWeight="bold">
                RESISTANCE: {resistancePrice}
              </text>
            </g>
          )}

          {supportPrice && (
            <g>
              <line
                x1="20"
                y1={getY(supportPrice)}
                x2={svgWidth - 20}
                y2={getY(supportPrice)}
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <text x="35" y={getY(supportPrice) - 4} fill="#10b981" fontSize="9" fontWeight="bold">
                SUPPORT: {supportPrice}
              </text>
            </g>
          )}

          {/* Current Price Marker */}
          <line
            x1="20"
            y1={getY(currentPrice)}
            x2={svgWidth - 20}
            y2={getY(currentPrice)}
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <rect
            x={svgWidth - 65}
            y={getY(currentPrice) - 8}
            width="55"
            height="16"
            rx="3"
            fill="#2563eb"
          />
          <text
            x={svgWidth - 38}
            y={getY(currentPrice) + 3}
            fill="#ffffff"
            fontSize="9"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {currentPrice}
          </text>

          {/* Chart Rendering: Line / Area */}
          {chartType === 'line' && (
            <>
              <polygon points={areaPoints} fill="url(#areaGradient)" />
              <polyline points={linePoints} fill="none" stroke="#3b82f6" strokeWidth="2" />
            </>
          )}

          {/* Candlesticks */}
          {chartType === 'candles' &&
            candles.map((candle, idx) => {
              const x = getX(idx);
              const isBullish = candle.close >= candle.open;
              const yHigh = getY(candle.high);
              const yLow = getY(candle.low);
              const yOpen = getY(candle.open);
              const yClose = getY(candle.close);
              const candleTop = Math.min(yOpen, yClose);
              const candleHeight = Math.max(2, Math.abs(yClose - yOpen));
              const strokeColor = isBullish ? '#10b981' : '#f43f5e';

              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCandle(candle)}
                >
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={strokeColor}
                    strokeWidth="1.2"
                  />
                  {/* Real Body */}
                  <rect
                    x={x - candleWidth / 2}
                    y={candleTop}
                    width={candleWidth}
                    height={candleHeight}
                    rx="1"
                    fill={isBullish ? 'url(#bullCandleGrad)' : 'url(#bearCandleGrad)'}
                    stroke={strokeColor}
                    strokeWidth="0.8"
                  />
                </g>
              );
            })}

          {/* Indicator Overlays: EMA 20 & EMA 50 */}
          {showEma20 && ema20Points && (
            <polyline points={ema20Points} fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" />
          )}
          {showEma50 && ema50Points && (
            <polyline points={ema50Points} fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" />
          )}

          {/* Separator line between Main Chart and Sub Indicator */}
          <line
            x1="20"
            y1={mainHeight + 10}
            x2={svgWidth - 20}
            y2={mainHeight + 10}
            stroke="#1e293b"
            strokeWidth="1.5"
          />

          {/* Sub Indicator: RSI */}
          {activeSubIndicator === 'rsi' && (
            <g transform={`translate(0, ${mainHeight + 15})`}>
              {/* RSI reference levels: 70 and 30 */}
              <rect x="25" y="15" width={svgWidth - 50} height="40" fill="#1e1b4b" opacity="0.3" />
              <line x1="25" y1="15" x2={svgWidth - 25} y2="15" stroke="#f43f5e" strokeDasharray="3 3" opacity="0.6" />
              <line x1="25" y1="55" x2={svgWidth - 25} y2="55" stroke="#10b981" strokeDasharray="3 3" opacity="0.6" />
              <text x="30" y="13" fill="#f43f5e" fontSize="8" fontWeight="bold">70 OVERBOUGHT</text>
              <text x="30" y="65" fill="#10b981" fontSize="8" fontWeight="bold">30 OVERSOLD</text>

              {/* RSI Line */}
              <polyline
                points={candles
                  .map((c, i) => {
                    const rsiVal = c.rsi || 50;
                    const rsiY = 70 - ((rsiVal - 20) / 60) * 55;
                    return `${getX(i)},${rsiY}`;
                  })
                  .join(' ')}
                fill="none"
                stroke="#818cf8"
                strokeWidth="1.8"
              />
              <text x={svgWidth - 25} y="15" fill="#818cf8" fontSize="9" textAnchor="end" fontFamily="monospace">
                RSI(14): {currentDisplayCandle.rsi || 58.4}
              </text>
            </g>
          )}

          {/* Sub Indicator: MACD */}
          {activeSubIndicator === 'macd' && (
            <g transform={`translate(0, ${mainHeight + 15})`}>
              <line x1="25" y1="40" x2={svgWidth - 25} y2="40" stroke="#334155" strokeDasharray="2 2" />
              {/* Histogram bars */}
              {candles.map((c, i) => {
                const hist = c.macdHist || 0;
                const h = Math.min(30, Math.abs(hist * 20000));
                const y = hist >= 0 ? 40 - h : 40;
                return (
                  <rect
                    key={i}
                    x={getX(i) - 2}
                    y={y}
                    width="4"
                    height={Math.max(1, h)}
                    fill={hist >= 0 ? '#10b981' : '#f43f5e'}
                    opacity="0.8"
                  />
                );
              })}
              {/* MACD & Signal line */}
              <polyline
                points={candles.map((c, i) => `${getX(i)},${40 - (c.macd || 0) * 15000}`).join(' ')}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
              />
              <polyline
                points={candles.map((c, i) => `${getX(i)},${40 - (c.macdSignal || 0) * 15000}`).join(' ')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
              <text x={svgWidth - 25} y="15" fill="#06b6d4" fontSize="9" textAnchor="end" fontFamily="monospace">
                MACD: {currentDisplayCandle.macd || '+0.00142'}
              </text>
            </g>
          )}

          {/* Sub Indicator: Volume */}
          {activeSubIndicator === 'volume' && (
            <g transform={`translate(0, ${mainHeight + 15})`}>
              {candles.map((c, i) => {
                const maxVol = 8000;
                const h = (c.volume / maxVol) * 60;
                const isBull = c.close >= c.open;
                return (
                  <rect
                    key={i}
                    x={getX(i) - candleWidth / 2}
                    y={75 - h}
                    width={candleWidth}
                    height={h}
                    fill={isBull ? '#10b981' : '#f43f5e'}
                    opacity="0.65"
                  />
                );
              })}
              <text x={svgWidth - 25} y="15" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">
                VOL: {currentDisplayCandle.volume.toLocaleString()}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Chart Footer with Disclaimers and Indicators Note */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-800/80 text-[11px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            L1 Feed Active
          </span>
          <span>Time: UTC</span>
          <span>Bars: {candles.length}</span>
        </div>
        <div className="italic text-slate-400">
          Decision Support Overlay: Indicators calculated on closing prices
        </div>
      </div>
    </div>
  );
}
