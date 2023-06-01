import {AppDataSource} from "../data-source";
import {Booking} from "../entity/Booking";
import {Ticket} from "../entity/Ticket";

class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket)
    allOfABooking = async (id) => {
        return await this.ticketRepository.find({
            relations: {
                booking: true
            },
            where: {
                booking: {
                    id: id
                }
            }
        })
    }

    one = async (id) => {
        return await this.ticketRepository.findOneBy({
            id: id
        })
    }

    save = async (ticket) => {
        await this.ticketRepository.save(ticket)
    }

    update = async (id, ticket) => {
        await this.ticketRepository.update({id: id}, ticket)
    }

    delete = async (id) => {
        await this.ticketRepository.delete({id: id})
    }

}

export default new TicketService();