import EventDispatcher from "./eventDispatcher";
import SendEmailWhenProductIsCreatedHandler from "./product/handler/sendEmailWhenProductIsCreated.handler";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();  // TBD
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();  // TBD
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
  });
});
