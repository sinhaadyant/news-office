export interface AdBlockDetectionOptions {
  /** Custom class name for the test element (default: 'adsbox') */
  testElementClass?: string;
  /** Custom ID for the test element (default: 'adblock-test') */
  testElementId?: string;
  /** Delay before running detection in milliseconds (default: 100) */
  detectionDelay?: number;
  /** Whether to run detection only on client side (default: true) */
  clientSideOnly?: boolean;
  /** Custom callback when ad blocker is detected */
  onAdBlockDetected?: () => void;
  /** Custom callback when no ad blocker is detected */
  onAdBlockNotDetected?: () => void;
}

export interface AdBlockState {
  /** Whether ad blocker is detected */
  isAdBlocked: boolean;
  /** Whether detection is currently running */
  isDetecting: boolean;
  /** Whether detection has completed */
  hasDetected: boolean;
  /** Last detection error, if any */
  error: string | null;
}

export interface AdBlockWarningProps {
  /** Whether the warning modal is visible */
  isVisible: boolean;
  /** Callback when user dismisses the warning */
  onDismiss: () => void;
  /** Custom message to display */
  message?: string;
  /** Custom title for the modal */
  title?: string;
  /** Whether to show a subscribe button */
  showSubscribeButton?: boolean;
  /** Callback when subscribe button is clicked */
  onSubscribe?: () => void;
  /** Custom styling class */
  className?: string;
}

export interface AdBlockProviderProps {
  /** Configuration options for ad block detection */
  options?: AdBlockDetectionOptions;
  /** Whether to show warning modal by default */
  showWarning?: boolean;
  /** Custom warning message */
  warningMessage?: string;
  /** Custom warning title */
  warningTitle?: string;
  /** Whether to show subscribe button in warning */
  showSubscribeButton?: boolean;
  /** Callback when subscribe button is clicked */
  onSubscribe?: () => void;
  /** Children components */
  children: React.ReactNode;
}
