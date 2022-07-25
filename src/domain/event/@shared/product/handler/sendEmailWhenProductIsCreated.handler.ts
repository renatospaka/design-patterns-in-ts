import EventHandlerInterface from "../../eventHandler.interface";
import ProductCreatedEvent from "../productCreatedEvent";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ${event.eventData}`);
  }
}
