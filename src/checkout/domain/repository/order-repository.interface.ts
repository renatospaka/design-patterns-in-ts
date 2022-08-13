import Order from "../entity/order";
import RepositoryInterface from "../../../@shared/domain/repository/repository-interface";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
