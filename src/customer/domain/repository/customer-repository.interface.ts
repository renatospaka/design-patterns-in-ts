import Customer from "../entity/customer";
import RepositoryInterface from "../../../@shared/domain/repository/repository-interface";

export default interface CustomerRepositoryInterface 
  extends RepositoryInterface<Customer> {}
