export interface DebugLogger {
  debug(message: string): Promise<void>;
}
