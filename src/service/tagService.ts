import {AppDataSource} from "../data-source";
import {Tag} from "../entity/Tag";

class TagService {
    private tagRepository = AppDataSource.getRepository(Tag)
    all = async () => {
        return await this.tagRepository.find({
           order:{
               id:"ASC"
           }
        })
    }

    allWithQuestions = async () => {
        return await this.tagRepository.find({
            relations: {
                questions:true
            },
            order:{
                id:"ASC"
            }
        })
    }

    save = async (tag) => {
        console.log(await this.tagRepository.save(tag))
    }

    update = async (id, tag) => {
        await this.tagRepository.update({id: id}, tag)
    }

    delete = async (id) => {
        await this.tagRepository.delete({id: id})
    }

}

export default new TagService();