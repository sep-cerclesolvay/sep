export interface AsyncState<T> {
  isLoading: boolean;
  data?: T;
  error?: unknown;
}
