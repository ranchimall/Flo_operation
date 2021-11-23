let type;

let userMessage;
let objectName;
let demo = [
  "demoSendGeneralData",
  "demoRequestGeneralData",
  "demoSendApplicationData",
  "demoRequestApplicationData",
  "demoResetObjectData",
  "demoUpdateObjectData",
  "demoRequestObjectData",
];

// buttons
let sendUserMessage = document.getElementById("sendUserMessage");
let requestUserMessage = document.getElementById("requestUserMessage");
let resetObjectData = document.getElementById("resetObjectData");
let updateObjectData = document.getElementById("updateObjectData");
let requestObjectData = document.getElementById("requestObjectData");
let sendApplicationMessage = document.getElementById(
  "sendApplicationMessage"
);
let requestApplicationMessage = document.getElementById(
  "requestApplicationMessage"
);

resetObjectData.addEventListener("click", () => {
  console.log("sending message");

  resetData(demo[4]);
  setObjectName(demo[4]);
  let optionsObj = setOptions(demo[4]);

  let objName = generateObject("resetKeyValueBlock");

  floCloudAPI.resetObjectData(objName, optionsObj).then(
    function (value) {
      displayCode(value, 4);
    },
    function (error) {
      displaycode1("errreset");
    }
  )
});

updateObjectData.addEventListener("click", () => {
  console.log("sending message");

  resetData(demo[5]);
  setObjectName(demo[5]);
  let optionsObj = setOptions(demo[5]);

  let objName = generateObject("updateKeyValueBlock");

  floCloudAPI.updateObjectData(objName, optionsObj).then(
    function (value) {
      displayCode(value, 5);
    },
    function (error) {
      displaycode1("errobjupd");
    }
  );
});


requestObjectData.addEventListener("click", () => {
  console.log("sending message");

  resetData(demo[6]);
  setObjectName(demo[6]);

  let optionsObj = setOptions(demo[6]);

  floCloudAPI.requestObjectData(objectName, optionsObj).then(
    function (value) {
      let result = floGlobals.appObjects[objectName];
      displayCode(result, 6);
    },
    function (error) {
      displaycode1("reqerrobj")
    }
  );
});

  sendApplicationMessage.addEventListener("click", () => {
  console.log("sending message");

  resetData(demo[2]);
  
  setType(demo[2]);
  setMessage(demo[2]);
  let optionsObj = setOptions(demo[2]);

  floCloudAPI.sendApplicationData(userMessage, type, optionsObj).then(
    function (value) {
      displayCode(value, 2);
    },
    function (error) {
      displaycode1("demo-inner-blocks12")
    }
  );
});

requestApplicationMessage.addEventListener("click", () => {
  console.log("requesting message");

  resetData(demo[3]);
  let optionsObj = setOptions(demo[3]);

  floCloudAPI.requestApplicationData(optionsObj).then(
    function (value) {
      displayCode(value, 3);
    },
    function (error) {
      displaycode1("errrequest")
    }
  );
});

sendUserMessage.addEventListener("click", () => {
  console.log("sending message");
  resetData(demo[0]);
  setType(demo[0]);
  setMessage(demo[0]);
  let optionsObj = setOptions(demo[0]);

  floCloudAPI.sendGeneralData(userMessage, type, optionsObj).then(
    function (value) {
      displayCode(value, 0);
    },
    function (error) {
      displaycode1("errsendgen")
    }
  );
});

requestUserMessage.addEventListener("click", () => {
  console.log("requesting message");
  resetData(demo[1]);
  setType(demo[1]);

  let optionsObj = setOptions(demo[1]);

  floCloudAPI.requestGeneralData(type, optionsObj).then(
    function (value) {
      displayCode(value, 1);
    },
    function (error) {
      displaycode1("errreqgen");
    }
  );
});

function displayCode(value, index) {
  let demoBlock = document.querySelector("." + demo[index]);
  let frag = document.createDocumentFragment();
  let codeLabel = document.createElement("p");
  let outputLabel = document.createElement("p");
  let codeBlock = document.createElement("pre");
  let outputBlock = document.createElement("pre");

  outputBlock.classList.add("scroll");
  codeBlock.classList.add("scroll");
  outputBlock.classList.add("demo-inner-blocks1");
  codeBlock.classList.add("demo-inner-blocks1");

  codeLabel.innerHTML = "<b class='otpr'>Code:</b>";
  outputLabel.innerHTML = "<b class='otpr'>Output:</b>";
  outputBlock.innerHTML = JSON.stringify(value, undefined, 4);

  if (index == 0) {
    codeBlock.innerHTML = `floCloudAPI.sendGeneralData("${userMessage}", "${type}")`;
  } else if (index == 1) {
    codeBlock.innerHTML = `floCloudAPI.requestGeneralData("${type}"")`;
  } else if (index == 2) {
    codeBlock.innerHTML = `floCloudAPI.sendApplicationData("${userMessage}", "${type}")`;
  } else if (index == 3) {
    codeBlock.innerHTML = `floCloudAPI.requestApplicationData()`;
  } else if (index == 4) {
    codeBlock.innerHTML = `floCloudAPI.resetObjectData("${objectName}")`;
  } else if (index == 5) {
    codeBlock.innerHTML = `floCloudAPI.updateObjectData("${objectName}")`;
  } else if (index == 6) {
    codeBlock.innerHTML = `floCloudAPI.requestObjectData("${objectName}")`;
  }

  frag.appendChild(codeLabel);
  frag.appendChild(codeBlock);
  frag.appendChild(outputLabel);
  frag.appendChild(outputBlock);

  demoBlock.appendChild(frag);
}
function displaycode1(id6){
  document.getElementById(id6).innerHTML = "<br><b>Unsuccessfull!!<br>Kindly check if all the inputs are correct!</b><br>Also try restarting the page!";
}

function addKeyValuePairs(id, pairId, index) {
  let keyValueBlock = document.getElementById(id);
  let pairBlock = keyValueBlock.querySelector("#" + pairId);
  let pairClone = pairBlock.cloneNode(true);
  let plusBtn = pairBlock.querySelector(".plus");
  let plusBtnNew = pairClone.querySelector(".plus");

  pairBlock.removeChild(plusBtn);
  pairClone.setAttribute("id", "pair" + index);
  plusBtnNew.setAttribute(
    "onclick",
    `addKeyValuePairs('${id}' ,'pair${index}', ${index + 1})`
  );

  keyValueBlock.appendChild(pairClone);
}

function generateObject(id) {
  let keyValueBlock = document.getElementById(id);
  let pairs = keyValueBlock.querySelectorAll(".pairs");
  let objUser = objectName;
  let obj = {};

  pairs.forEach((pair) => {
    let key = pair.querySelector(".key").value;
    let value = pair.querySelector(".value111").value;

    obj[key] = value;
  });

  floGlobals.appObjects[objUser] = obj;

  return objUser;
}


function setType(blockID) {
  let block = document.querySelector("." + blockID);
  let messageType = block.querySelector(".messageType").value;

  console.log("type is ", messageType);

  if (!messageType) {
    type = "type2";
  } else {
    type = messageType;
  }
}

function setMessage(blockID) {
  let block = document.querySelector("." + blockID);
  let message = block.querySelector(".message").value;

  if (!message) {
    userMessage = "test message";
  } else {
    userMessage = message;
  }
}

function setObjectName(blockID) {
  let block = document.querySelector("." + blockID);
  let obj = block.querySelector(".objectName").value;

  if (!obj) {
    objectName = "objTest";
  } else {
    objectName = obj;
  }
}

function setOptions(blockID) {
  let block = document.querySelector("." + blockID);
  let comment = block.querySelector(".comment").value;
  let applicationName = block.querySelector(".applicationName").value;
  let receiverID = block.querySelector(".receiverID").value;
  let optionsType;
  let atVectorClock, lowerVectorClock, upperVectorClock;
  let optionsObj = {};

  if (
    blockID == "demoRequestApplicationData" ||
    blockID == "demoRequestGeneralData" ||
    blockID == "demoRequestObjectData"
  ) {
    optionsType = block.querySelector(".typeName").value;
    atVectorClock = block.querySelector(".atVectorClock").value;
    lowerVectorClock = block.querySelector(".lowerVectorClock").value;
    upperVectorClock = block.querySelector(".upperVectorClock").value;
  }

  if (comment) {
    optionsObj["comment"] = comment;
  }

  if (applicationName) {
    optionsObj["application"] = applicationName;
  }

  if (receiverID) {
    optionsObj["receiverID"] = applicationName;
  }

  if (optionsType) {
    optionsObj["Type"] = optionsType;
  }

  return optionsObj;
}

function resetData(blockID) {
  let block = document.querySelector("." + blockID);
  let p = block.querySelectorAll("p");
  let pre = block.querySelectorAll("pre");

  if (p && pre) {
    p.forEach((ele) => {
      ele.innerHTML = "";
    });

    pre.forEach((ele) => {
      ele.innerHTML = "";
    });
  }
}

function displayPopUp(id) {
  let popUp = document.getElementById(id);

  popUp.show();
}
