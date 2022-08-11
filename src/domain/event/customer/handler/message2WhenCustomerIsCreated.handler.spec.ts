import EventDispatcher from "../../@shared/eventDispatcher";
import CustomerCreatedEvent from "../customerCreatedEvent";
import Message2WhenCustomerIsCreated from "./message2WhenCustomerIsCreated.handler";

describe("Log 1 event test", () => {
  it("should register the event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new Message2WhenCustomerIsCreated();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister the event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new Message2WhenCustomerIsCreated();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new Message2WhenCustomerIsCreated();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBe(undefined);
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new Message2WhenCustomerIsCreated(); 
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      id: "c1",
    });

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
