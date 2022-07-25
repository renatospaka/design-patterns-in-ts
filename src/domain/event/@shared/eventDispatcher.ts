import EventInterface from "./event.interface";
import EventDispatcherInterface from "./eventDispatcher.interface";
import EventHandlerInterface from "./eventHandler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): {[eventName: string]: EventHandlerInterface[]} {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {}

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {}

  unregisterAll(): void {}
}
