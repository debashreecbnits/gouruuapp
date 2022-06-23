import { Toast } from "native-base";

const success = (text) => {
    Toast.show({
        text: text + "",
        buttonText: 'Okay',
        type: 'success',
        duration: 6000
    });
}

const danger = (text) => Toast.show({
    text: text + "",
    buttonText: 'Okay',
    type: 'danger',
    duration: 6000
});

const dangerWithoutOption = (text) => Toast.show({
    text: text + "",
    type: 'danger',
    duration: 2000
});

const show = (text) => Toast.show({
    text: text + "",
    buttonText: 'Okay',
    duration: 6000
});

export default {
    success,
    danger,
    dangerWithoutOption,
    show,
}
