import { fetchTraining } from "../../../common/reducers/training/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";
import { clearScore, clearRound } from "../../../common/reducers/training/trainingRoundSlice";
import { fetchTrainingPatch } from "../../../common/reducers/training/trainingSlice";
import { setAnswer, addScore, setIsViewResult, setIsCorrect, throwOneRoundState, setIsEnd, nextRound } from "../../../common/reducers/training/trainingRoundSlice";

export function getTrainig(dispatch, isEnd, patchLoading, localType, ) {
    if (!isEnd & !patchLoading) {
        dispatch(clearScore());
        dispatch(clearRound());
        dispatch(throwOneRoundState())

        dispatch(fetchTraining(localType));  
    }
}

export function getLeargingWord(dispatch, learning_words) {
    if (!learning_words) {
        dispatch(fetchHome());
    }
}

export function cleanAnswer(text){
    return text.trim().toLowerCase()
}

function checkAnswer(dispatch, answerWord, currentTraining, round) {
    const cleanWord = cleanAnswer(answerWord);
    const resultBool = currentTraining[round].word.text == cleanWord;
    dispatch(setIsCorrect(resultBool));
    return resultBool;
}

function checkRound(is_correct, dispatch, round, currentTraining, timeToViewResult) {
    if (is_correct) {
        dispatch(addScore());
        dispatch(setIsViewResult(true));
        const correctTime = timeToViewResult;
        const wrongTime = 0;
        const timeCallDown = is_correct ? correctTime : wrongTime;
        setTimeout(() => performRoundSwitch(dispatch, round, currentTraining), timeCallDown);
    } else {
        dispatch(setIsViewResult(true));
    }
}

export function handleFinalAnswer(answer, localType, currentTraining, round, dispatch, timeToViewResult) {
    if ((answer !== null) & (answer !== "")) {
        const is_correct = checkAnswer(dispatch, answer, currentTraining, round);
        const data = {
            type: localType,
            pk: currentTraining[round].training.pk,
            is_correct: is_correct,
        };

        dispatch(fetchTrainingPatch(data));

        dispatch(setAnswer(null));
        checkRound(is_correct, dispatch, round, currentTraining, timeToViewResult);
    } else {
        // Если ничего не выбрано, можно вывести предупреждение или сделать кнопку неактивной
    }
}

export function performRoundSwitch(dispatch, round, currentTraining) {
    if (round + 1 === currentTraining.length) {
        dispatch(setIsEnd(true));
    } else {
        dispatch(nextRound());
    }
    dispatch(throwOneRoundState())
}