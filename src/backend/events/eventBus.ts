import { BackendEventMessage } from '../types/backendTypes';

type EventListener = (event: BackendEventMessage) => void;

export class EventBus {
  private static listeners: EventListener[] = [];
  private static history: BackendEventMessage[] = [];

  public static subscribe(listener: EventListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public static publish(event: BackendEventMessage) {
    this.history.unshift(event);
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (err) {
        console.error('EventBus listener error:', err);
      }
    });
  }

  public static getHistory(): BackendEventMessage[] {
    return [...this.history];
  }
}
