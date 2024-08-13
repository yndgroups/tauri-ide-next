// @ts-ignore
import { without } from 'lodash';

type AppInstance = { name: string; window: WindowProxy };
let currentRunningApp: AppInstance | null = null;
const boundedMap = new WeakMap<CallableFunction, boolean>();
let globalTaskPending = false;
const rawObjectDefineProperty = Object.defineProperty;
const variableWhiteListInDev = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' ? ['__REACT_ERROR_OVERLAY_GLOBAL_HOOK__', 'event'] : [];
const globalVariableWhiteList: string[] = ['System', '__cjsWrapper', ...variableWhiteListInDev];
const inTest = process.env.NODE_ENV === 'test';
const mockSafariTop = 'mockSafariTop';
const mockTop = 'mockTop';
const mockGlobalThis = 'mockGlobalThis';
const accessingSpiedGlobals = ['document', 'top', 'parent', 'eval'];
const overwrittenGlobals = ['window', 'self', 'globalThis', 'hasOwnProperty'].concat(inTest ? [mockGlobalThis] : []);
const nextTick: (cb: () => void) => void = typeof window.__zone_symbol__setTimeout === 'function' ? window.__zone_symbol__setTimeout : (cb) => Promise.resolve().then(cb);
const functionBoundedValueMap = new WeakMap<CallableFunction, CallableFunction>();
const callableFnCacheMap = new WeakMap<CallableFunction, boolean>();
const fnRegexCheckCacheMap = new WeakMap<any | FunctionConstructor, boolean>();
const frozenPropertyCacheMap = new WeakMap<any, Record<PropertyKey, boolean>>();
type SymbolTarget = 'target' | 'globalContext';
type FakeWindow = Window & Record<PropertyKey, any>;
const globalsInBrowser = [
  'AbortController',
  'AbortSignal',
  'addEventListener',
  'alert',
  'AnalyserNode',
  'Animation',
  'AnimationEffectReadOnly',
  'AnimationEffectTiming',
  'AnimationEffectTimingReadOnly',
  'AnimationEvent',
  'AnimationPlaybackEvent',
  'AnimationTimeline',
  'applicationCache',
  'ApplicationCache',
  'ApplicationCacheErrorEvent',
  'atob',
  'Attr',
  'Audio',
  'AudioBuffer',
  'AudioBufferSourceNode',
  'AudioContext',
  'AudioDestinationNode',
  'AudioListener',
  'AudioNode',
  'AudioParam',
  'AudioProcessingEvent',
  'AudioScheduledSourceNode',
  'AudioWorkletGlobalScope',
  'AudioWorkletNode',
  'AudioWorkletProcessor',
  'BarProp',
  'BaseAudioContext',
  'BatteryManager',
  'BeforeUnloadEvent',
  'BiquadFilterNode',
  'Blob',
  'BlobEvent',
  'blur',
  'BroadcastChannel',
  'btoa',
  'BudgetService',
  'ByteLengthQueuingStrategy',
  'Cache',
  'caches',
  'CacheStorage',
  'cancelAnimationFrame',
  'cancelIdleCallback',
  'CanvasCaptureMediaStreamTrack',
  'CanvasGradient',
  'CanvasPattern',
  'CanvasRenderingContext2D',
  'ChannelMergerNode',
  'ChannelSplitterNode',
  'CharacterData',
  'clearInterval',
  'clearTimeout',
  'clientInformation',
  'ClipboardEvent',
  'ClipboardItem',
  'close',
  'closed',
  'CloseEvent',
  'Comment',
  'CompositionEvent',
  'CompressionStream',
  'confirm',
  'console',
  'ConstantSourceNode',
  'ConvolverNode',
  'CountQueuingStrategy',
  'createImageBitmap',
  'Credential',
  'CredentialsContainer',
  'crypto',
  'Crypto',
  'CryptoKey',
  'CSS',
  'CSSConditionRule',
  'CSSFontFaceRule',
  'CSSGroupingRule',
  'CSSImportRule',
  'CSSKeyframeRule',
  'CSSKeyframesRule',
  'CSSMatrixComponent',
  'CSSMediaRule',
  'CSSNamespaceRule',
  'CSSPageRule',
  'CSSPerspective',
  'CSSRotate',
  'CSSRule',
  'CSSRuleList',
  'CSSScale',
  'CSSSkew',
  'CSSSkewX',
  'CSSSkewY',
  'CSSStyleDeclaration',
  'CSSStyleRule',
  'CSSStyleSheet',
  'CSSSupportsRule',
  'CSSTransformValue',
  'CSSTranslate',
  'CustomElementRegistry',
  'customElements',
  'CustomEvent',
  'DataTransfer',
  'DataTransferItem',
  'DataTransferItemList',
  'DecompressionStream',
  'defaultstatus',
  'defaultStatus',
  'DelayNode',
  'DeviceMotionEvent',
  'DeviceOrientationEvent',
  'devicePixelRatio',
  'dispatchEvent',
  'document',
  'Document',
  'DocumentFragment',
  'DocumentType',
  'DOMError',
  'DOMException',
  'DOMImplementation',
  'DOMMatrix',
  'DOMMatrixReadOnly',
  'DOMParser',
  'DOMPoint',
  'DOMPointReadOnly',
  'DOMQuad',
  'DOMRect',
  'DOMRectList',
  'DOMRectReadOnly',
  'DOMStringList',
  'DOMStringMap',
  'DOMTokenList',
  'DragEvent',
  'DynamicsCompressorNode',
  'Element',
  'ErrorEvent',
  'event',
  'Event',
  'EventSource',
  'EventTarget',
  'external',
  'fetch',
  'File',
  'FileList',
  'FileReader',
  'find',
  'focus',
  'FocusEvent',
  'FontFace',
  'FontFaceSetLoadEvent',
  'FormData',
  'FormDataEvent',
  'frameElement',
  'frames',
  'GainNode',
  'Gamepad',
  'GamepadButton',
  'GamepadEvent',
  'getComputedStyle',
  'getSelection',
  'HashChangeEvent',
  'Headers',
  'history',
  'History',
  'HTMLAllCollection',
  'HTMLAnchorElement',
  'HTMLAreaElement',
  'HTMLAudioElement',
  'HTMLBaseElement',
  'HTMLBodyElement',
  'HTMLBRElement',
  'HTMLButtonElement',
  'HTMLCanvasElement',
  'HTMLCollection',
  'HTMLContentElement',
  'HTMLDataElement',
  'HTMLDataListElement',
  'HTMLDetailsElement',
  'HTMLDialogElement',
  'HTMLDirectoryElement',
  'HTMLDivElement',
  'HTMLDListElement',
  'HTMLDocument',
  'HTMLElement',
  'HTMLEmbedElement',
  'HTMLFieldSetElement',
  'HTMLFontElement',
  'HTMLFormControlsCollection',
  'HTMLFormElement',
  'HTMLFrameElement',
  'HTMLFrameSetElement',
  'HTMLHeadElement',
  'HTMLHeadingElement',
  'HTMLHRElement',
  'HTMLHtmlElement',
  'HTMLIFrameElement',
  'HTMLImageElement',
  'HTMLInputElement',
  'HTMLLabelElement',
  'HTMLLegendElement',
  'HTMLLIElement',
  'HTMLLinkElement',
  'HTMLMapElement',
  'HTMLMarqueeElement',
  'HTMLMediaElement',
  'HTMLMenuElement',
  'HTMLMetaElement',
  'HTMLMeterElement',
  'HTMLModElement',
  'HTMLObjectElement',
  'HTMLOListElement',
  'HTMLOptGroupElement',
  'HTMLOptionElement',
  'HTMLOptionsCollection',
  'HTMLOutputElement',
  'HTMLParagraphElement',
  'HTMLParamElement',
  'HTMLPictureElement',
  'HTMLPreElement',
  'HTMLProgressElement',
  'HTMLQuoteElement',
  'HTMLScriptElement',
  'HTMLSelectElement',
  'HTMLShadowElement',
  'HTMLSlotElement',
  'HTMLSourceElement',
  'HTMLSpanElement',
  'HTMLStyleElement',
  'HTMLTableCaptionElement',
  'HTMLTableCellElement',
  'HTMLTableColElement',
  'HTMLTableElement',
  'HTMLTableRowElement',
  'HTMLTableSectionElement',
  'HTMLTemplateElement',
  'HTMLTextAreaElement',
  'HTMLTimeElement',
  'HTMLTitleElement',
  'HTMLTrackElement',
  'HTMLUListElement',
  'HTMLUnknownElement',
  'HTMLVideoElement',
  'IDBCursor',
  'IDBCursorWithValue',
  'IDBDatabase',
  'IDBFactory',
  'IDBIndex',
  'IDBKeyRange',
  'IDBObjectStore',
  'IDBOpenDBRequest',
  'IDBRequest',
  'IDBTransaction',
  'IDBVersionChangeEvent',
  'IdleDeadline',
  'IIRFilterNode',
  'Image',
  'ImageBitmap',
  'ImageBitmapRenderingContext',
  'ImageCapture',
  'ImageData',
  'indexedDB',
  'innerHeight',
  'innerWidth',
  'InputEvent',
  'IntersectionObserver',
  'IntersectionObserverEntry',
  'Intl',
  'isSecureContext',
  'KeyboardEvent',
  'KeyframeEffect',
  'KeyframeEffectReadOnly',
  'length',
  'localStorage',
  'location',
  'Location',
  'locationbar',
  'matchMedia',
  'MediaDeviceInfo',
  'MediaDevices',
  'MediaElementAudioSourceNode',
  'MediaEncryptedEvent',
  'MediaError',
  'MediaKeyMessageEvent',
  'MediaKeySession',
  'MediaKeyStatusMap',
  'MediaKeySystemAccess',
  'MediaList',
  'MediaMetadata',
  'MediaQueryList',
  'MediaQueryListEvent',
  'MediaRecorder',
  'MediaSettingsRange',
  'MediaSource',
  'MediaStream',
  'MediaStreamAudioDestinationNode',
  'MediaStreamAudioSourceNode',
  'MediaStreamEvent',
  'MediaStreamTrack',
  'MediaStreamTrackEvent',
  'menubar',
  'MessageChannel',
  'MessageEvent',
  'MessagePort',
  'MIDIAccess',
  'MIDIConnectionEvent',
  'MIDIInput',
  'MIDIInputMap',
  'MIDIMessageEvent',
  'MIDIOutput',
  'MIDIOutputMap',
  'MIDIPort',
  'MimeType',
  'MimeTypeArray',
  'MouseEvent',
  'moveBy',
  'moveTo',
  'MutationEvent',
  'MutationObserver',
  'MutationRecord',
  'name',
  'NamedNodeMap',
  'NavigationPreloadManager',
  'navigator',
  'Navigator',
  'NavigatorUAData',
  'NetworkInformation',
  'Node',
  'NodeFilter',
  'NodeIterator',
  'NodeList',
  'Notification',
  'OfflineAudioCompletionEvent',
  'OfflineAudioContext',
  'offscreenBuffering',
  'OffscreenCanvas',
  'OffscreenCanvasRenderingContext2D',
  'onabort',
  'onafterprint',
  'onanimationend',
  'onanimationiteration',
  'onanimationstart',
  'onappinstalled',
  'onauxclick',
  'onbeforeinstallprompt',
  'onbeforeprint',
  'onbeforeunload',
  'onblur',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'onclose',
  'oncontextmenu',
  'oncuechange',
  'ondblclick',
  'ondevicemotion',
  'ondeviceorientation',
  'ondeviceorientationabsolute',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onfocus',
  'ongotpointercapture',
  'onhashchange',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onlanguagechange',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onlostpointercapture',
  'onmessage',
  'onmessageerror',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onoffline',
  'ononline',
  'onpagehide',
  'onpageshow',
  'onpause',
  'onplay',
  'onplaying',
  'onpointercancel',
  'onpointerdown',
  'onpointerenter',
  'onpointerleave',
  'onpointermove',
  'onpointerout',
  'onpointerover',
  'onpointerup',
  'onpopstate',
  'onprogress',
  'onratechange',
  'onrejectionhandled',
  'onreset',
  'onresize',
  'onscroll',
  'onsearch',
  'onseeked',
  'onseeking',
  'onselect',
  'onstalled',
  'onstorage',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'ontoggle',
  'ontransitionend',
  'onunhandledrejection',
  'onunload',
  'onvolumechange',
  'onwaiting',
  'onwheel',
  'open',
  'openDatabase',
  'opener',
  'Option',
  'origin',
  'OscillatorNode',
  'outerHeight',
  'outerWidth',
  'OverconstrainedError',
  'PageTransitionEvent',
  'pageXOffset',
  'pageYOffset',
  'PannerNode',
  'parent',
  'Path2D',
  'PaymentAddress',
  'PaymentRequest',
  'PaymentRequestUpdateEvent',
  'PaymentResponse',
  'performance',
  'Performance',
  'PerformanceEntry',
  'PerformanceLongTaskTiming',
  'PerformanceMark',
  'PerformanceMeasure',
  'PerformanceNavigation',
  'PerformanceNavigationTiming',
  'PerformanceObserver',
  'PerformanceObserverEntryList',
  'PerformancePaintTiming',
  'PerformanceResourceTiming',
  'PerformanceTiming',
  'PeriodicWave',
  'Permissions',
  'PermissionStatus',
  'personalbar',
  'PhotoCapabilities',
  'Plugin',
  'PluginArray',
  'PointerEvent',
  'PopStateEvent',
  'postMessage',
  'Presentation',
  'PresentationAvailability',
  'PresentationConnection',
  'PresentationConnectionAvailableEvent',
  'PresentationConnectionCloseEvent',
  'PresentationConnectionList',
  'PresentationReceiver',
  'PresentationRequest',
  'print',
  'ProcessingInstruction',
  'ProgressEvent',
  'PromiseRejectionEvent',
  'prompt',
  'PushManager',
  'PushSubscription',
  'PushSubscriptionOptions',
  'queueMicrotask',
  'RadioNodeList',
  'Range',
  'ReadableByteStreamController',
  'ReadableStream',
  'ReadableStreamBYOBReader',
  'ReadableStreamBYOBRequest',
  'ReadableStreamDefaultController',
  'ReadableStreamDefaultReader',
  'registerProcessor',
  'RemotePlayback',
  'removeEventListener',
  'reportError',
  'Request',
  'requestAnimationFrame',
  'requestIdleCallback',
  'resizeBy',
  'ResizeObserver',
  'ResizeObserverEntry',
  'resizeTo',
  'Response',
  'RTCCertificate',
  'RTCDataChannel',
  'RTCDataChannelEvent',
  'RTCDtlsTransport',
  'RTCIceCandidate',
  'RTCIceGatherer',
  'RTCIceTransport',
  'RTCPeerConnection',
  'RTCPeerConnectionIceEvent',
  'RTCRtpContributingSource',
  'RTCRtpReceiver',
  'RTCRtpSender',
  'RTCSctpTransport',
  'RTCSessionDescription',
  'RTCStatsReport',
  'RTCTrackEvent',
  'screen',
  'Screen',
  'screenLeft',
  'ScreenOrientation',
  'screenTop',
  'screenX',
  'screenY',
  'ScriptProcessorNode',
  'scroll',
  'scrollbars',
  'scrollBy',
  'scrollTo',
  'scrollX',
  'scrollY',
  'SecurityPolicyViolationEvent',
  'Selection',
  'self',
  'ServiceWorker',
  'ServiceWorkerContainer',
  'ServiceWorkerRegistration',
  'sessionStorage',
  'setInterval',
  'setTimeout',
  'ShadowRoot',
  'SharedWorker',
  'SourceBuffer',
  'SourceBufferList',
  'speechSynthesis',
  'SpeechSynthesisEvent',
  'SpeechSynthesisUtterance',
  'StaticRange',
  'status',
  'statusbar',
  'StereoPannerNode',
  'stop',
  'Storage',
  'StorageEvent',
  'StorageManager',
  'structuredClone',
  'styleMedia',
  'StyleSheet',
  'StyleSheetList',
  'SubmitEvent',
  'SubtleCrypto',
  'SVGAElement',
  'SVGAngle',
  'SVGAnimatedAngle',
  'SVGAnimatedBoolean',
  'SVGAnimatedEnumeration',
  'SVGAnimatedInteger',
  'SVGAnimatedLength',
  'SVGAnimatedLengthList',
  'SVGAnimatedNumber',
  'SVGAnimatedNumberList',
  'SVGAnimatedPreserveAspectRatio',
  'SVGAnimatedRect',
  'SVGAnimatedString',
  'SVGAnimatedTransformList',
  'SVGAnimateElement',
  'SVGAnimateMotionElement',
  'SVGAnimateTransformElement',
  'SVGAnimationElement',
  'SVGCircleElement',
  'SVGClipPathElement',
  'SVGComponentTransferFunctionElement',
  'SVGDefsElement',
  'SVGDescElement',
  'SVGDiscardElement',
  'SVGElement',
  'SVGEllipseElement',
  'SVGFEBlendElement',
  'SVGFEColorMatrixElement',
  'SVGFEComponentTransferElement',
  'SVGFECompositeElement',
  'SVGFEConvolveMatrixElement',
  'SVGFEDiffuseLightingElement',
  'SVGFEDisplacementMapElement',
  'SVGFEDistantLightElement',
  'SVGFEDropShadowElement',
  'SVGFEFloodElement',
  'SVGFEFuncAElement',
  'SVGFEFuncBElement',
  'SVGFEFuncGElement',
  'SVGFEFuncRElement',
  'SVGFEGaussianBlurElement',
  'SVGFEImageElement',
  'SVGFEMergeElement',
  'SVGFEMergeNodeElement',
  'SVGFEMorphologyElement',
  'SVGFEOffsetElement',
  'SVGFEPointLightElement',
  'SVGFESpecularLightingElement',
  'SVGFESpotLightElement',
  'SVGFETileElement',
  'SVGFETurbulenceElement',
  'SVGFilterElement',
  'SVGForeignObjectElement',
  'SVGGElement',
  'SVGGeometryElement',
  'SVGGradientElement',
  'SVGGraphicsElement',
  'SVGImageElement',
  'SVGLength',
  'SVGLengthList',
  'SVGLinearGradientElement',
  'SVGLineElement',
  'SVGMarkerElement',
  'SVGMaskElement',
  'SVGMatrix',
  'SVGMetadataElement',
  'SVGMPathElement',
  'SVGNumber',
  'SVGNumberList',
  'SVGPathElement',
  'SVGPatternElement',
  'SVGPoint',
  'SVGPointList',
  'SVGPolygonElement',
  'SVGPolylineElement',
  'SVGPreserveAspectRatio',
  'SVGRadialGradientElement',
  'SVGRect',
  'SVGRectElement',
  'SVGScriptElement',
  'SVGSetElement',
  'SVGStopElement',
  'SVGStringList',
  'SVGStyleElement',
  'SVGSVGElement',
  'SVGSwitchElement',
  'SVGSymbolElement',
  'SVGTextContentElement',
  'SVGTextElement',
  'SVGTextPathElement',
  'SVGTextPositioningElement',
  'SVGTitleElement',
  'SVGTransform',
  'SVGTransformList',
  'SVGTSpanElement',
  'SVGUnitTypes',
  'SVGUseElement',
  'SVGViewElement',
  'TaskAttributionTiming',
  'Text',
  'TextDecoder',
  'TextDecoderStream',
  'TextEncoder',
  'TextEncoderStream',
  'TextEvent',
  'TextMetrics',
  'TextTrack',
  'TextTrackCue',
  'TextTrackCueList',
  'TextTrackList',
  'TimeRanges',
  'toolbar',
  'top',
  'Touch',
  'TouchEvent',
  'TouchList',
  'TrackEvent',
  'TransformStream',
  'TransformStreamDefaultController',
  'TransitionEvent',
  'TreeWalker',
  'UIEvent',
  'URL',
  'URLSearchParams',
  'ValidityState',
  'visualViewport',
  'VisualViewport',
  'VTTCue',
  'WaveShaperNode',
  'WebAssembly',
  'WebGL2RenderingContext',
  'WebGLActiveInfo',
  'WebGLBuffer',
  'WebGLContextEvent',
  'WebGLFramebuffer',
  'WebGLProgram',
  'WebGLQuery',
  'WebGLRenderbuffer',
  'WebGLRenderingContext',
  'WebGLSampler',
  'WebGLShader',
  'WebGLShaderPrecisionFormat',
  'WebGLSync',
  'WebGLTexture',
  'WebGLTransformFeedback',
  'WebGLUniformLocation',
  'WebGLVertexArrayObject',
  'WebSocket',
  'WheelEvent',
  'window',
  'Window',
  'Worker',
  'WritableStream',
  'WritableStreamDefaultController',
  'WritableStreamDefaultWriter',
  'XMLDocument',
  'XMLHttpRequest',
  'XMLHttpRequestEventTarget',
  'XMLHttpRequestUpload',
  'XMLSerializer',
  'XPathEvaluator',
  'XPathExpression',
  'XPathResult',
  'XSLTProcessor',
];
const cachedGlobalsInBrowser = array2TruthyObject(globalsInBrowser.concat(process.env.NODE_ENV === 'test' ? ['mockNativeWindowFunction'] : []));
const globalsInES2015 = window.Proxy
  ? [
      'Array',
      'ArrayBuffer',
      'Boolean',
      'constructor',
      'DataView',
      'Date',
      'decodeURI',
      'decodeURIComponent',
      'encodeURI',
      'encodeURIComponent',
      'Error',
      'escape',
      'eval',
      'EvalError',
      'Float32Array',
      'Float64Array',
      'Function',
      'hasOwnProperty',
      'Infinity',
      'Int16Array',
      'Int32Array',
      'Int8Array',
      'isFinite',
      'isNaN',
      'isPrototypeOf',
      'JSON',
      'Map',
      'Math',
      'NaN',
      'Number',
      'Object',
      'parseFloat',
      'parseInt',
      'Promise',
      'propertyIsEnumerable',
      'Proxy',
      'RangeError',
      'ReferenceError',
      'Reflect',
      'RegExp',
      'Set',
      'String',
      'Symbol',
      'SyntaxError',
      'toLocaleString',
      'toString',
      'TypeError',
      'Uint16Array',
      'Uint32Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'undefined',
      'unescape',
      'URIError',
      'valueOf',
      'WeakMap',
      'WeakSet',
    ].filter((p) => p in window)
  : [];
const cachedGlobals = Array.from(new Set(without(globalsInES2015.concat(overwrittenGlobals).concat('requestAnimationFrame'), ...accessingSpiedGlobals)));
const cachedGlobalObjects = array2TruthyObject(cachedGlobals as any);
const unscopables = array2TruthyObject(without(cachedGlobals, ...accessingSpiedGlobals.concat(overwrittenGlobals)));
const useNativeWindowForBindingsProps = new Map<PropertyKey, boolean>([
  ['fetch', true],
  ['mockDomAPIInBlackList', process.env.NODE_ENV === 'test'],
]);
let activeSandboxCount = 0;
const nativeGlobal = new Function('return this')();

enum SandBoxType {
  Proxy = 'Proxy',
  Snapshot = 'Snapshot',
  LegacyProxy = 'LegacyProxy',
}

type SandBox = {
  /** 沙箱的名字 */
  name: string;
  /** 沙箱的类型 */
  type: SandBoxType;
  /** 沙箱导出的代理实体 */
  proxy: WindowProxy;
  /** 沙箱是否在运行中 */
  sandboxRunning: boolean;
  /** latest set property */
  latestSetProp?: PropertyKey | null;
  patchDocument: (doc: Document) => void;
  /** 启动沙箱 */
  active: () => void;
  /** 关闭沙箱 */
  inactive: () => void;
};

export default class ProxySandbox implements SandBox {
  private updatedValueSet = new Set<PropertyKey>();
  private document = document;
  name: string;
  type: SandBoxType;
  proxy: WindowProxy;
  sandboxRunning = true;
  latestSetProp: PropertyKey | null = null;

  active() {
    if (!this.sandboxRunning) activeSandboxCount++;
    this.sandboxRunning = true;
  }

  inactive() {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[sandbox] ${this.name} modified global properties restore...`, [...this.updatedValueSet.keys()]);
    }

    if (inTest || --activeSandboxCount === 0) {
      Object.keys(this.globalWhitelistPrevDescriptor).forEach((p) => {
        const descriptor = this.globalWhitelistPrevDescriptor[p];
        if (descriptor) {
          Object.defineProperty(this.globalContext, p, descriptor);
        } else {
          // @ts-ignore
          delete this.globalContext[p];
        }
      });
    }

    this.sandboxRunning = false;
  }

  public patchDocument(doc: Document) {
    this.document = doc;
  }

  globalWhitelistPrevDescriptor: { [p in (typeof globalVariableWhiteList)[number]]: PropertyDescriptor | undefined } = {};
  globalContext: typeof window;

  constructor(name: string, globalContext = window, opts?: { speedy: boolean }) {
    this.name = name;
    this.globalContext = globalContext;
    this.type = SandBoxType.Proxy;
    const { updatedValueSet } = this;
    const { speedy } = opts || {};
    const { fakeWindow, propertiesWithGetter } = createFakeWindow(globalContext, !!speedy);
    const descriptorTargetMap = new Map<PropertyKey, SymbolTarget>();
    const proxy = new Proxy(fakeWindow, {
      set: (target: FakeWindow, p: PropertyKey, value: any): boolean => {
        if (this.sandboxRunning) {
          this.registerRunningApp(name, proxy);
          if (typeof p === 'string' && globalVariableWhiteList.indexOf(p) !== -1) {
            this.globalWhitelistPrevDescriptor[p] = Object.getOwnPropertyDescriptor(globalContext, p);
            // @ts-ignore
            globalContext[p] = value;
          } else {
            if (!target.hasOwnProperty(p) && globalContext.hasOwnProperty(p)) {
              const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
              const { writable, configurable, enumerable, set } = descriptor!;
              if (writable || set) {
                Object.defineProperty(target, p, { configurable, enumerable, writable: true, value });
              }
            } else {
              target[p] = value;
            }
          }
          updatedValueSet.add(p);
          this.latestSetProp = p;
          return true;
        }

        if (process.env.NODE_ENV === 'development') {
          console.warn(`[qiankun] Set window.${p.toString()} while sandbox destroyed or inactive in ${name}!`);
        }
        return true;
      },

      get: (target: FakeWindow, p: PropertyKey): any => {
        this.registerRunningApp(name, proxy);

        if (p === Symbol.unscopables) return unscopables;
        if (p === 'window' || p === 'self') {
          return proxy;
        }

        if (p === 'globalThis' || (inTest && p === mockGlobalThis)) {
          return proxy;
        }

        if (p === 'top' || p === 'parent' || (inTest && (p === mockTop || p === mockSafariTop))) {
          if (globalContext === globalContext.parent) {
            return proxy;
          }
          return (globalContext as any)[p];
        }

        if (p === 'hasOwnProperty') {
          return hasOwnProperty;
        }

        if (p === 'document') {
          return this.document;
        }

        if (p === 'eval') {
          return eval;
        }

        if (p === 'string' && globalVariableWhiteList.indexOf(p) !== -1) {
          // @ts-ignore
          return globalContext[p];
        }

        const actualTarget = propertiesWithGetter.has(p) ? globalContext : p in target ? target : globalContext;
        const value = actualTarget[p as any];

        if (isPropertyFrozen(actualTarget, p)) {
          return value;
        }

        if (!isNativeGlobalProp(p as string) && !useNativeWindowForBindingsProps.has(p)) {
          return value;
        }
        const boundTarget = useNativeWindowForBindingsProps.get(p) ? nativeGlobal : globalContext;
        return rebindTarget2Fn(boundTarget, value);
      },

      has(target: FakeWindow, p: string | number | symbol): boolean {
        return p in cachedGlobalObjects || p in target || p in globalContext;
      },

      getOwnPropertyDescriptor(target: FakeWindow, p: string | number | symbol): PropertyDescriptor | undefined {
        if (target.hasOwnProperty(p)) {
          const descriptor = Object.getOwnPropertyDescriptor(target, p);
          descriptorTargetMap.set(p, 'target');
          return descriptor;
        }

        if (globalContext.hasOwnProperty(p)) {
          const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
          descriptorTargetMap.set(p, 'globalContext');
          if (descriptor && !descriptor.configurable) {
            descriptor.configurable = true;
          }
          return descriptor;
        }
        return undefined;
      },
      ownKeys(target: FakeWindow): ArrayLike<string | symbol> {
        return uniq(Reflect.ownKeys(globalContext).concat(Reflect.ownKeys(target)));
      },
      defineProperty: (target: Window, p: PropertyKey, attributes: PropertyDescriptor): boolean => {
        const from = descriptorTargetMap.get(p);
        switch (from) {
          case 'globalContext':
            return Reflect.defineProperty(globalContext, p, attributes);
          default:
            return Reflect.defineProperty(target, p, attributes);
        }
      },
      deleteProperty: (target: FakeWindow, p: string | number | symbol): boolean => {
        this.registerRunningApp(name, proxy);
        if (target.hasOwnProperty(p)) {
          // @ts-ignore
          delete target[p];
          updatedValueSet.delete(p);
          return true;
        }
        return true;
      },
      getPrototypeOf() {
        return Reflect.getPrototypeOf(globalContext);
      },
    });

    this.proxy = proxy;
    activeSandboxCount++;
    function hasOwnProperty(this: any, key: PropertyKey): boolean {
      if (this !== proxy && this !== null && typeof this === 'object') {
        return Object.prototype.hasOwnProperty.call(this, key);
      }
      return fakeWindow.hasOwnProperty(key) || globalContext.hasOwnProperty(key);
    }
  }

  private registerRunningApp(name: string, proxy: Window) {
    if (this.sandboxRunning) {
      const currentRunningApp = getCurrentRunningApp();
      if (!currentRunningApp || currentRunningApp.name !== name) {
        setCurrentRunningApp({ name, window: proxy });
      }
      nextTask(clearCurrentRunningApp);
    }
  }
}

function uniq(array: Array<string | symbol>) {
  return array.filter(function filter(this: PropertyKey[], element) {
    return element in this ? false : ((this as any)[element] = true);
  }, Object.create(null));
}

function array2TruthyObject(array: string[]): Record<string, true> {
  return array.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, Object.create(null));
}

function isNativeGlobalProp(prop: string): boolean {
  return prop in cachedGlobalsInBrowser;
}

function createFakeWindow(globalContext: Window, speedy: boolean) {
  const propertiesWithGetter = new Map<PropertyKey, boolean>();
  const fakeWindow = {} as FakeWindow;

  Object.getOwnPropertyNames(globalContext)
    .filter((p) => {
      const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
      return !descriptor?.configurable;
    })
    .forEach((p) => {
      const descriptor = Object.getOwnPropertyDescriptor(globalContext, p);
      if (descriptor) {
        const hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');
        if (p === 'top' || p === 'parent' || p === 'self' || p === 'window' || (p === 'document' && speedy) || (inTest && (p === mockTop || p === mockSafariTop))) {
          descriptor.configurable = true;
          if (!hasGetter) {
            descriptor.writable = true;
          }
        }

        if (hasGetter) propertiesWithGetter.set(p, true);
        rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
      }
    });

  return {
    fakeWindow,
    propertiesWithGetter,
  };
}

function setCurrentRunningApp(appInstance: { name: string; window: WindowProxy }) {
  currentRunningApp = appInstance;
}

function clearCurrentRunningApp() {
  currentRunningApp = null;
}

function getCurrentRunningApp() {
  return currentRunningApp;
}

function isBoundedFunction(fn: CallableFunction) {
  if (boundedMap.has(fn)) {
    return boundedMap.get(fn);
  }
  const bounded = fn.name.indexOf('bound ') === 0 && !fn.hasOwnProperty('prototype');
  boundedMap.set(fn, bounded);
  return bounded;
}

function isCallable(fn: any): boolean {
  if (callableFnCacheMap.has(fn)) {
    return true;
  }

  const callable = typeof fn === 'function' && fn instanceof Function;
  if (callable) {
    callableFnCacheMap.set(fn, callable);
  }
  return callable;
}

function rebindTarget2Fn(target: any, fn: any): any {
  if (isCallable(fn) && !isBoundedFunction(fn) && !isConstructable(fn)) {
    const cachedBoundFunction = functionBoundedValueMap.get(fn);
    if (cachedBoundFunction) {
      return cachedBoundFunction;
    }

    const boundValue = Function.prototype.bind.call(fn, target);

    // some callable function has custom fields, we need to copy the own props to boundValue. such as moment function.
    Object.getOwnPropertyNames(fn).forEach((key) => {
      // boundValue might be a proxy, we need to check the key whether exist in it
      if (!boundValue.hasOwnProperty(key)) {
        Object.defineProperty(boundValue, key, Object.getOwnPropertyDescriptor(fn, key)!);
      }
    });

    if (fn.hasOwnProperty('prototype') && !boundValue.hasOwnProperty('prototype')) {
      Object.defineProperty(boundValue, 'prototype', { value: fn.prototype, enumerable: false, writable: true });
    }

    if (typeof fn.toString === 'function') {
      const valueHasInstanceToString = fn.hasOwnProperty('toString') && !boundValue.hasOwnProperty('toString');
      const boundValueHasPrototypeToString = boundValue.toString === Function.prototype.toString;

      if (valueHasInstanceToString || boundValueHasPrototypeToString) {
        const originToStringDescriptor = Object.getOwnPropertyDescriptor(valueHasInstanceToString ? fn : Function.prototype, 'toString');

        Object.defineProperty(boundValue, 'toString', Object.assign({}, originToStringDescriptor, originToStringDescriptor?.get ? null : { value: () => fn.toString() }));
      }
    }

    functionBoundedValueMap.set(fn, boundValue);
    return boundValue;
  }

  return fn;
}

function isConstructable(fn: () => any | FunctionConstructor) {
  const hasPrototypeMethods = fn.prototype && fn.prototype.constructor === fn && Object.getOwnPropertyNames(fn.prototype).length > 1;

  if (hasPrototypeMethods) return true;

  if (fnRegexCheckCacheMap.has(fn)) {
    return fnRegexCheckCacheMap.get(fn);
  }

  let constructable = hasPrototypeMethods;
  if (!constructable) {
    const fnString = fn.toString();
    const constructableFunctionRegex = /^function\b\s[A-Z].*/;
    const classRegex = /^class\b/;
    constructable = constructableFunctionRegex.test(fnString) || classRegex.test(fnString);
  }

  fnRegexCheckCacheMap.set(fn, constructable);
  return constructable;
}

function nextTask(cb: () => void): void {
  if (!globalTaskPending) {
    globalTaskPending = true;
    nextTick(() => {
      cb();
      globalTaskPending = false;
    });
  }
}

function isPropertyFrozen(target: any, p?: PropertyKey): boolean {
  if (!target || !p) {
    return false;
  }

  const targetPropertiesFromCache = frozenPropertyCacheMap.get(target) || {};

  if (targetPropertiesFromCache[p]) {
    return targetPropertiesFromCache[p];
  }

  const propertyDescriptor = Object.getOwnPropertyDescriptor(target, p);
  const frozen = Boolean(propertyDescriptor && propertyDescriptor.configurable === false && (propertyDescriptor.writable === false || (propertyDescriptor.get && !propertyDescriptor.set)));

  targetPropertiesFromCache[p] = frozen;
  frozenPropertyCacheMap.set(target, targetPropertiesFromCache);

  return frozen;
}
