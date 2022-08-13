import EventHandlerInterface from "../../../../@shared/domain/event/eventHandler.interface";
import CustomerCreatedEvent from "../customerCreatedEvent";

export default class Log1WhenCustomerIsCreated implements EventHandlerInterface {
  handle(event: CustomerCreatedEvent): void {
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}
