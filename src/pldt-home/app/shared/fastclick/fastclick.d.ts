  // Type definitions for FastClick v1.0.3
// Project: https://github.com/ftlabs/fastclick
// Definitions by: Shinnosuke Watanabe <https://github.com/shinnn>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

export interface FastClickObject {
  lastTouchIdentifier: number;
  layer: Element;
  tapDelay: number;
  targetElement: any;
  touchBoundary: number;
  touchStartX: number;
  touchStartY: number;
  trackingClick: boolean;
  trackingClickStart: number;
  destroy(): void;
  determineEventType(targetElement: any): string;
  findControl(labelElement: any /* EventTarget | HTMLLabelElement */): any;
  focus(targetElement: any /* EventTarget | Element */): void;
  getTargetElementFromEventTarget(eventTarget: EventTarget): any;
  needsClick(target: any /* EventTarget | Element */): boolean;
  needsFocus(target: any /* EventTarget | Element */): boolean;
}

export interface FastClickOptions {
	touchBoundary?: number;
	tapDelay?: number;
}

export interface FastClickStatic {
	new(layer: any, options?: FastClickOptions): FastClickObject;
	attach(layer: any, options?: FastClickOptions): FastClickObject;
}