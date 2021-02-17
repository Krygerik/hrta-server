import {Request, Response} from "express";
import {insufficientParameters, mongoError, successResponse} from "../modules/common/services";
import {MappingNicknameToGame} from "../modules/mapping-nickname-to-game/service";
import {IMappingNicknameToGame} from "../modules/mapping-nickname-to-game/model";

export class MappingNicknameToGameController {
    private mappingNicknameToGameService: MappingNicknameToGame = new MappingNicknameToGame();

    public createRecord(req: Request, res: Response) {
        if (!req.body.combat_id || !req.body.nickname) {
            return insufficientParameters(res);
        }

        const recordParams: IMappingNicknameToGame = {
            combat_id: req.body.combat_id,
            nickname: req.body.nickname
        }

        this.mappingNicknameToGameService.createEntity(
            recordParams,
            (err: any, recordData: IMappingNicknameToGame) => {
                if (err) {
                    return mongoError(err, res);
                }

                successResponse('create record of mapping nickname to game', recordData, res);
            }
        )
    }
}