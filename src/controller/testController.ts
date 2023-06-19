import {Request, Response} from "express";
import testService from "../service/testService";


class TestController {
    all = async (req: Request, res: Response) => {
        try {
            let tests = await testService.all(req.query)
            res.status(201).json({
                data: tests,
                success: true
            });
        } catch (e) {
            console.log("error in show all tests:", e)
            res.status(500).json({
                message: "get tests failed",
                success: false
            })
        }
    }

    one = async (req: Request, res: Response) => {
        try {
            let test = await testService.one(req.params.id);
            res.status(200).json({
                success: true,
                data: test
            });
        } catch (e) {
            console.log("error in get one test:", e)
            res.status(500).json({
                message: 'error in get one test',
                success: false
            })
        }
    }
    save = async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            await testService.save(req.body);

            res.status(201).json({
                success: true,
                data: 'Add test success!'
            });
        } catch (e) {
            console.log("error in add test:", e)
            res.status(500).json({
                message: 'error in add test',
                success: false
            })
        }
    }
    // update = async (req: Request, res: Response) => {
    //     try {
    //         console.log("update test:", req.body)
    //         await testService.update(req.params.id, req.body);
    //         res.status(200).json({
    //             success: true,
    //             data: 'update test success!'
    //         });
    //     } catch (e) {
    //         console.log("error in update test:", e)
    //         res.status(500).json({
    //             message: 'error in update test',
    //             success: false
    //         })
    //     }
    // }
    delete = async (req: Request, res: Response) => {
        try {
            await testService.delete(req.params.id);
            res.status(200).json({
                success: true,
                data: 'delete test success!'
            });
        } catch (e) {
            console.log("error in delete test:", e)
            res.status(500).json({
                message: 'error in delete test',
                success: false
            })
        }
    }
}

export default new TestController();
