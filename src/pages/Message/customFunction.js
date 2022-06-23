import firebase from "./../../../src/Firebase/firebase";

export const SendMessage = async (currentUserid, guestUserid, msgValue,name,threadId) => {
    try {
        let test = {
            sender: currentUserid,
            reciever: guestUserid,
            msg: msgValue,
            createdDate: new Date(),
            threadId: threadId
            //userName:nameValue
        }
        return await firebase
            .database()
            .ref()
            .child('messages')
            .push(test)
    } catch (error) {
        return error;
    }

}

export const RecieveMessage = async (currentUserid, guestUserid, msgValue) => {
    try {
        return await firebase
            .database()
            .ref("messages/" + guestUserid)
            .child(currentUserid)
            .push({
                messege: {
                    sender: currentUserid,
                    reciever: guestUserid,
                    msg: msgValue,
                    //userName:nameValue
                }
            })
    } catch (error) {
        return error;
    }

}