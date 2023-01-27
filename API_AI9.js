function apiAI9(Text){
  try{
    requestOptions = raw_data(Text)
    
    fetch("https://dev.ai9.co.th/cuicui/interns/engine/api/v1.1/analyze", requestOptions)
      .then(response => response.json())
      .then(result => {
          try {
            document.getElementById("response_text_input").innerHTML = result.input;
            document.getElementById("response_text_output").innerHTML = result.intent+"-  "+result.response_text;
            document.getElementById("input_value").innerHTML = "";
          }
          catch(err) {
            console.log("error ",err)
          }
          if (result.intent === "G1") {
            Sound_Dialog(result.response_voice);
          }
          else if (result.intent === "1" || result.intent === "End"){
            Sound_Dialog(result.response_voice);
          }
          else if (result.intent !== "G1" || result.intent !== "1") {
            condition_Personal_Life(result.intent,sex,age, result.response_voice)
          }
      })}
  catch (error){
    console.log("error ",error)
  }
}

function Sound_Dialog(music){
  var audio = new Audio(music);
  audio.play();
}

function raw_data(Text){
  var raw = JSON.stringify({
    "sid": "0000","text": Text
  });
  requestOptions = requestOptions_data(raw)
  return requestOptions
}

function retrun_data_text(Text){
  var raw_data = [Text]
  return raw_data
}

function requestOptions_data(raw){
  var requestOptions = {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      "x-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoyLCJvcmdfaWQiOjEyOCwib3JnIjoiaW50ZXJucyIsIm9yZ19uYW1lIjoiQWk5LUludGVybnMiLCJib3QiOiJCX3QiLCJpc3MiOiJhaTkgY28uLGx0ZC4iLCJzZXJ2aWNlIjoiY3VpY3VpIiwiaWF0IjoxNjY2MTY5NzM2LCJleHAiOjE5OTc3MDU3MzZ9.wpXV5oF9EFr2zy32TNRrNk-ZWecsWGINKVz63C8zVsc"
    },body: raw,redirect: 'follow'
  };
  return requestOptions
}


async function apiAI9cheque(){
  try{
    requestOptions = raw_data("cheque")
    const promise = await fetch("https://dev.ai9.co.th/cuicui/interns/engine/api/v1.1/analyze", requestOptions).then(response => response.json())
    return promise.intent
    }
  catch (error){
    console.log("error ",error)
  }
}

async function predict_asdserve(Text,s) {
  try{
      const textYesNo = await predict_YesNo_model(Text);
      const textS = await predict_Classification_serve(Text);
      const the68 = await predict_the68(Text);
      const dataAPI = await apiAI9cheque();

      console.log(dataAPI)

      if (Text == "จบ"){

        apiAI9(Text);
      }
      else if (dataAPI === "G1"){
        apiAI9(textS);
      }
      else if (dataAPI == "แผนภูมิ") {
        apiAI9(Text);
      }
      else if (dataAPI == "_unknown_"){
        apiAI9(the68);
      }
      else if (dataAPI !== "G1" || dataAPI !== "1"){
        apiAI9(textYesNo);
      }
  }
  catch (error){
    console.log("error ",error)
  }
  // var e = Date.now();
  // console.log(e)
  // console.log((e - s)/ 1000);
}
