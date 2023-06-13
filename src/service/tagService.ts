import {AppDataSource} from "../data-source";
import {Tag} from "../entity/Tag";

class TagService {
    private tagRepository = AppDataSource.getRepository(Tag)
    all = async () => {
        return await this.tagRepository.find({
            relations: {
                questions:true
            },
           order:{
               id:"ASC"
           }
        })
    }

    save = async (ticket) => {
        await this.tagRepository.save(ticket)
    }

    update = async (id, ticket) => {
        await this.tagRepository.update({id: id}, ticket)
    }

    delete = async (id) => {
        await this.tagRepository.delete({id: id})
    }

}

export default new TagService();