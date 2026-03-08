export interface HudParams {
  gridOpacity: number;
  gridSize: number;
  circleOpacity: number;
  circleSpeed: number;
  circleCount: number;
  scanLineCount: number;
  scanLineSpeed: number;
  scanLineWidth: number;
  particleCount: number;
  particleOpacity: number;
  particleSize: number;
  particleSpeed: number;
  brightness: number;
  blur: number;
  hue: number;
  tickMarks: boolean;
  crosshairs: boolean;
  radialLines: boolean;
  micReactive: boolean;
  micSensitivity: number;
}

export const DEFAULT_PARAMS: HudParams = {
  gridOpacity: 0.025,
  gridSize: 50,
  circleOpacity: 0.02,
  circleSpeed: 0.3,
  circleCount: 4,
  scanLineCount: 3,
  scanLineSpeed: 0.2,
  scanLineWidth: 1.5,
  particleCount: 30,
  particleOpacity: 0.15,
  particleSize: 1.5,
  particleSpeed: 0.3,
  brightness: 1.0,
  blur: 0,
  hue: 186,
  tickMarks: true,
  crosshairs: true,
  radialLines: true,
  micReactive: false,
  micSensitivity: 1.5,
};
