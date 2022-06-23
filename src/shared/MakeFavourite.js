import { apiCallWithOutToken } from '../Api/index';
import { MAKE_FAVOURITE } from '../shared/allApiUrl';
import { getToken } from '../Utils/Utils';



export const MakeFavourite = (projectId, index, isFav, favarray) => {

    let data = {
        user_id: getToken(),
        favid: projectId,
        is_active: isFav
    }
    let finalResult = apiCallWithOutToken(MAKE_FAVOURITE, 'post', data).then(res => {
        if (res.status = 200) {
            if (res.status = 200) {
                let tempArray = [...favarray];
                if (isFav == 0)
                    tempArray[index].isfav = 0
                else
                    tempArray[index].isfav = 1
                return tempArray
            }
        }

    }).catch(err => {
        console.log(err);
    })
    return finalResult
}