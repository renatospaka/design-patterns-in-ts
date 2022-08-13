import EventInterface from "../../../@shared/domain/event/event.interface";

export default class CustomerChangedAddress implements EventInterface{
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
