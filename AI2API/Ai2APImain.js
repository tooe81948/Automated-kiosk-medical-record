const api_serve = 'http://127.0.0.1:18000/predict_Classification_serve';
const api_YesNo = 'http://127.0.0.1:18000/predict_YesNo_model';
const api_QA = 'http://127.0.0.1:18000/predict_QuestionsAnswers';
const api_the68 = 'http://127.0.0.1:18000/Classification_dialog';

async function predict_the68(Data_Text_input) {
    const promise = await axios.get(api_the68, {
        params: {
            text: Data_Text_input
                }
    })
    const dataPromise = promise.data.Predict_model
    return dataPromise
    }

async function predict_Classification_serve(Data_Text_input) {
    const promise = await axios.get(api_serve, {
        params: {
            text: Data_Text_input
                }
    })
    const dataPromise = promise.data.Predict_model
    return dataPromise
}

async function predict_YesNo_model(Data_Text_input) {
    const promise = await axios.get(api_YesNo, {
        params: {
            text: Data_Text_input
                }
    })
    const dataPromise = promise.data.Predict_model
    return dataPromise
    }

function predict_QuestionsAnswers() {
    let input = document.getElementById('input_value');
    let prediction_text = document.getElementById('prediction_text');
    let sample_text = document.getElementById('sample_text');
    let inputdata = input.value;
    input.value = '';
    sample_text.innerHTML = inputdata;
    prediction_text.innerHTML = 'กำลังตรวจสอบ...';
    axios.get(api_YesNo, {
        params: {
            text: inputdata
        }
    }).then((response) => {
        prediction_text.innerHTML = response.data.Predict_model;
    }).catch((error) => {
        console.log(error);
    });
}