import { EventSubscriber, On } from 'event-dispatch';
import acctServices from '../../services/acctServices';
import FundData from './webhookData';

@EventSubscriber()
export default class AccountEventSubscriber {
  @On('charge.completed')
  async updateBalance(chargeData: FundData) {
    return chargeData.status === 'successful' ? await acctServices.UpdateAccBal(chargeData.customer.email, chargeData.amount) : null;
  }
}
