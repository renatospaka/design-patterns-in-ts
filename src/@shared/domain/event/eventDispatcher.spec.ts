import SendEmailWhenProductIsCreatedHandler from "../../../product/domain/event/handler/sendEmailWhenProductIsCreated.handler";
import ProductCreatedEvent from "../../../product/domain/event/productCreatedEvent";
import EventDispatcher from "./eventDispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();   
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();  
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();   
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();  

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should register all event handlers", () => {
    const eventDispatcher = new EventDispatcher();   
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();  
    
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBe(undefined);
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();   
    const eventHandler = new SendEmailWhenProductIsCreatedHandler(); 
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Description",
      price: 10.0,
    });

    // quando o notify for executado, o SendEmailWhenProductIsCreatedHandler.handle() deve ser executado
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  })
});
