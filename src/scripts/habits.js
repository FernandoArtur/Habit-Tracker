class Habit {
  constructor(habitData) {
    this.myId = habitData.myId;
    this.myInfo = habitData.myInfo;
    this.myFrequency = habitData.myFrequency;
    this.myCheck = habitData.myCheck;
    this.myDay = habitData.myDay;
    this.myMonth = habitData.myMonth;
    this.myYear = habitData.myYear;
    this.myHour = habitData.myHour;
    this.myMinute = habitData.myMinute;
    this.myTime = habitData.myTime;

    // Created Elements

    this.habitContainer = document.createElement("div");
    this.habitContainer.id = `habitContainer_${this.myId}`;
    this.habitContainer.className = "my-habit";

    this.menuContainer = document.createElement("div");
    this.menuContainer.id = `menuContainer_${this.myId}`;
    this.menuContainer.className = "my-habit-menu";

    this.editButton = document.createElement("button");
    this.editButton.id = `editButton_${this.myId}`;
    this.editButton.textContent = "Edit";
    this.editButton.className = "primary-button";

    this.deleteButton = document.createElement("button");
    this.deleteButton.id = `deleteButton_${this.myId}`;
    this.deleteButton.textContent = "Delete";
    this.deleteButton.className = "secondary-button";

    this.infoContainer = document.createElement("div");
    this.infoContainer.id = `infoContainer_${this.myId}`;
    this.infoContainer.className = "my-habit-info";

    this.habitStatus = document.createElement("input");
    this.habitStatus.type = "checkbox";
    this.habitStatus.id = `habitStatus_${this.myId}`;
    this.habitStatus.className = "my-habit-check";

    this.habitTitle = document.createElement("label");
    this.habitTitle.id = `habitTitle_${this.myId}`;
    this.habitTitle.setAttribute("for", `habitStatus_${this.myId}`);
    this.habitTitle.textContent = `${this.myInfo}`;
    this.habitTitle.className = "my-habit-info-title";

    // Element Appends

    this.menuContainer.appendChild(this.editButton);
    this.menuContainer.appendChild(this.deleteButton);
    this.infoContainer.appendChild(this.habitStatus);
    this.infoContainer.appendChild(this.habitTitle);

    this.habitContainer.appendChild(this.menuContainer);
    this.habitContainer.appendChild(this.infoContainer);

    containerHabits.appendChild(this.habitContainer);

    // Event Listeners

    this.editButton.addEventListener("click", () => {
      this.habitEdit(this);
    });

    this.habitStatus.addEventListener("click", () => {
      this.habitCheck(this);
    });

    this.deleteButton.addEventListener("click", () => {
      this.habitDelete(this);
    });

    // called function on load
    
  }

  habitReset(target) {
    if(target.myCheck === false){
      return;
    }
    const frequencyDate = comparingDate(target);
    if(frequencyDate >= target.myFrequency){
      target.myCheck = false;
      target.habitStatus.checked = false;
      target.habitCheckAuto(target);
      return;
    }
  }

  habitCheck(target) {
    if (target.habitStatus.checked === true) {
      const currentTime = new Date();
      target.myDay = currentTime.getDate();
      const currentDay = formatTime(target.myDay);
      target.myMonth = currentTime.getMonth();
      const currentMonth = formatTime(target.myMonth + 1);
      target.myYear = currentTime.getFullYear();
      const currentYear = target.myYear;
      target.myHour = currentTime.getHours();
      const currentHour = formatTime(target.myHour);
      target.myMinute = currentTime.getMinutes();
      const currentMinute = formatTime(target.myMinute);

      target.myTime = `${currentHour}:${currentMinute} - ${currentDay}/${currentMonth}/${currentYear}`;

      const tempLogContainer = document.createElement("div");
      tempLogContainer.id = `historyLog_${target.myId}`;
      tempLogContainer.className = "history-log";

      const tempLogData = document.createElement("p");
      tempLogData.id = `historyData_${target.myId}`;
      tempLogData.className = "history-log-data";
      tempLogData.textContent = `${target.myInfo} - ${target.myTime}`;

      tempLogContainer.appendChild(tempLogData);
      historyContainer.appendChild(tempLogContainer);
      target.myCheck = true;

      for (let i = 0; i < listHabits.length; i++) {
        if (listHabits[i].myId === target.myId) {
          listHabits[i].myDay = target.myDay;
          listHabits[i].myMonth = target.myMonth;
          listHabits[i].myYear = target.myYear;
          listHabits[i].myHour = target.myHour;
          listHabits[i].myMinute = target.myMinute;
          listHabits[i].myCheck = target.myCheck;
          listHabits[i].myTime = target.myTime;

          i = listHabits.length;
        }
      }
      addingLog(target);
      recordingData();
    }
    if (target.habitStatus.checked === false) {
      const toRemoveHistory = document.querySelector(
        `#historyLog_${target.myId}`,
      );
      toRemoveHistory.remove();
      target.myDay = 0;
      target.myMonth = 0;
      target.myYear = 0;
      target.myHour = 0;
      target.myMinute = 0;
      target.myCheck = false;
      target.myTime = "";

      for (let i = 0; i < listHabits.length; i++) {
        if (listHabits[i].myId === target.myId) {
          listHabits[i].myDay = target.myDay;
          listHabits[i].myMonth = target.myMonth;
          listHabits[i].myYear = target.myYear;
          listHabits[i].myHour = target.myHour;
          listHabits[i].myMinute = target.myMinute;
          listHabits[i].myCheck = target.myCheck;
          listHabits[i].myTime = target.myTime;

          i = listHabits.length;
        }
      }
      deductingLog(target);
      recordingData();
    }
  }

  habitCheckAuto(target) {
    if (target.habitStatus.checked === true) {
      const tempLogContainer = document.createElement("div");
      tempLogContainer.id = `historyLog_${target.myId}`;
      tempLogContainer.className = "history-log";

      const tempLogData = document.createElement("p");
      tempLogData.id = `historyData_${target.myId}`;
      tempLogData.className = "history-log-data";
      tempLogData.textContent = `${target.myInfo} - ${target.myTime}`;

      tempLogContainer.appendChild(tempLogData);
      historyContainer.appendChild(tempLogContainer);
      target.myCheck = true;

      for (let i = 0; i < listHabits.length; i++) {
        if (listHabits[i].myId === target.myId) {
          listHabits[i].myDay = target.myDay;
          listHabits[i].myMonth = target.myMonth;
          listHabits[i].myYear = target.myYear;
          listHabits[i].myHour = target.myHour;
          listHabits[i].myMinute = target.myMinute;
          listHabits[i].myCheck = target.myCheck;
          listHabits[i].myTime = target.myTime;

          i = listHabits.length;
        }
      }
    }
    if (target.habitStatus.checked === false) {
      const toRemoveHistory = document.querySelector(
        `#historyLog_${target.myId}`,
      );
      toRemoveHistory.remove();
      target.myDay = 0;
      target.myMonth = 0;
      target.myYear = 0;
      target.myHour = 0;
      target.myMinute = 0;
      target.myCheck = false;
      target.myTime = "";

      for (let i = 0; i < listHabits.length; i++) {
        if (listHabits[i].myId === target.myId) {
          listHabits[i].myDay = target.myDay;
          listHabits[i].myMonth = target.myMonth;
          listHabits[i].myYear = target.myYear;
          listHabits[i].myHour = target.myHour;
          listHabits[i].myMinute = target.myMinute;
          listHabits[i].myCheck = target.myCheck;
          listHabits[i].myTime = target.myTime;

          i = listHabits.length;
        }
      }
    }
  }

  habitEdit(target) {
    target.menuContainer.style.display = "none";
    target.infoContainer.style.display = "none";

    const currentHabitDiv = document.querySelector(
      `#habitContainer_${target.myId}`,
    );

    // Elements Function

    const formTemporary = document.createElement("form");
    formTemporary.className = "my-habit-edit";

    const titleNamerTemporary = document.createElement("label");
    titleNamerTemporary.className = "my-edit-title";
    titleNamerTemporary.textContent = "Habit";
    titleNamerTemporary.setAttribute("for", `tempNamer_${target.myId}`);

    const namerTemporary = document.createElement("input");
    namerTemporary.id = `tempNamer_${target.myId}`;
    namerTemporary.className = "my-edit-input";
    namerTemporary.value = `${target.myInfo}`;
    namerTemporary.type = "text";

    const titleFrequencerTemporary = document.createElement("label");
    titleFrequencerTemporary.className = "my-edit-title";
    titleFrequencerTemporary.textContent = "Frequency";
    titleFrequencerTemporary.setAttribute(
      "for",
      `tempFrequencer_${target.myId}`,
    );

    const frequencerTemporary = document.createElement("input");
    frequencerTemporary.id = `tempFrequencer_${target.myId}`;
    frequencerTemporary.className = "my-edit-input";
    frequencerTemporary.value = `${target.myFrequency}`;
    frequencerTemporary.type = "number";

    const submitterTemporary = document.createElement("button");
    submitterTemporary.className = "primary-button";
    submitterTemporary.textContent = "Apply";

    // Event Listeners function

    submitterTemporary.addEventListener("click", (event) => {
      event.preventDefault();
      target.habitEditConfirm(
        target,
        formTemporary,
        namerTemporary,
        frequencerTemporary,
      );
    });

    formTemporary.appendChild(titleNamerTemporary);
    formTemporary.appendChild(namerTemporary);
    formTemporary.appendChild(titleFrequencerTemporary);
    formTemporary.appendChild(frequencerTemporary);
    formTemporary.appendChild(submitterTemporary);

    currentHabitDiv.appendChild(formTemporary);
  }

  habitEditConfirm(target, tempForm, namerForm, frequencerForm) {
    const tempNewName = namerForm.value;
    const tempNewFrequency = parseFloat(frequencerForm.value);
    const tempDecimal = decimalVerifier(tempNewFrequency);

    if (tempNewName === "" || frequencerForm.value === "") {
      alert("All fields must be filled");
      return;
    } else if (tempNewFrequency <= 0) {
      alert("Number must be higher than 0");
      return;
    } else if (tempDecimal === true) {
      alert("Number must be an integer");
      return;
    }

    savingChanges(target, namerForm, frequencerForm);
    tempForm.remove();
    target.menuContainer.style.display = "flex";
    target.infoContainer.style.display = "flex";
  }

  habitDelete(target) {
    target.menuContainer.style.display = "none";
    target.infoContainer.style.display = "none";

    const currentHabitDiv = document.querySelector(
      `#habitContainer_${target.myId}`,
    );

    // Elements Function

    const deletionInfo = document.createElement("div");
    deletionInfo.className = "deletion-info";

    const deletionMessage = document.createElement("p");
    deletionMessage.className = "deletion-message";
    deletionMessage.textContent = `Are you sure want to delete ${target.myInfo}?`;

    const deletionMenu = document.createElement("div");
    deletionMenu.className = "deletion-menu";

    const deletionConfirm = document.createElement("button");
    deletionConfirm.id = `tempDeleter_${target.myId}`;
    deletionConfirm.className = "primary-button";
    deletionConfirm.textContent = "Confirm";

    const deletionCancel = document.createElement("button");
    deletionCancel.id = `tempCanceler_${target.myId}`;
    deletionCancel.className = "secondary-button";
    deletionCancel.textContent = "Cancel";

    // Event Listeners Function

    deletionConfirm.addEventListener("click", () => {
      target.habitDeleteConfirm(target, deletionInfo, deletionMenu);
    });

    deletionCancel.addEventListener("click", () => {
      target.habitDeleteCancel(target, deletionInfo, deletionMenu);
    });

    // Element Attribution Function

    deletionInfo.appendChild(deletionMessage);
    deletionMenu.appendChild(deletionConfirm);
    deletionMenu.appendChild(deletionCancel);
    currentHabitDiv.appendChild(deletionInfo);
    currentHabitDiv.appendChild(deletionMenu);
  }

  habitDeleteConfirm(target, tempInfo, tempMenu) {
    erasingHabit(target);
    tempInfo.remove();
    tempMenu.remove();
    target.menuContainer.style.display = "flex";
    target.infoContainer.style.display = "flex";
  }

  habitDeleteCancel(target, tempInfo, tempMenu) {
    tempInfo.remove();
    tempMenu.remove();
    target.menuContainer.style.display = "flex";
    target.infoContainer.style.display = "flex";
  }
}

// variables

let listHabits = [];

// listLogs stores temporary log data to be committed to lostHistory

let listLogs = [];

// listHistory store daily logs separated by day

let listHistory = [];

let idCounter = 0;
let calendarTracker = {
  myYear: 0,
  myMonth: 0,
  myDay: 0,
}
let showCounter = false;

const containerHabits = document.querySelector("#container-habits");
const habitNamer = document.querySelector("#habit-namer");
const habitFrequencer = document.querySelector("#habit-frequencer");
const habitCreator = document.querySelector("#habit-creator");
const historyContainer = document.querySelector("#container-history");
const historyMonthContainer = document.querySelector(
  "#history-month-container",
);
const showHistoryButton = document.querySelector("#drop-button");
const logReceiver = document.querySelector("#log-receiver");

// Event Listener

habitCreator.addEventListener("click", (event) => {
  event.preventDefault();
  createHabit();
});

showHistoryButton.addEventListener("click", () => {
  if(showCounter === false){
    historyMonthContainer.style.display = "flex";
    showHistoryButton.textContent = "Hide History";
    showCounter = !showCounter;
    return;
  }
  historyMonthContainer.style.display = "none";
  showHistoryButton.textContent = "Show History";
  showCounter = !showCounter;
});

document.addEventListener("DOMContentLoaded", function () {

  let previousList =
    JSON.parse(localStorage.getItem("recordedHabitData")) || [];
  let previousCounter =
    JSON.parse(localStorage.getItem("recordedIdCounter")) || 0;

  let previousCalendar =
    JSON.parse(localStorage.getItem("recordedCalendar")) || {};

  let previousLog =
    JSON.parse(localStorage.getItem("recordedLog")) || [];
  let previousHistory =
    JSON.parse(localStorage.getItem("recordedHistory")) || [];

  listLogs = previousLog;
  listHistory = previousHistory;

  listHabits = previousList;
  idCounter = previousCounter;
  
  calendarTracker = previousCalendar;

  myCalendarUpdate();
  recordingCalendar();

  myLoadingBuilder();
  myLoadingHistory();
});

// functions

// loading and Habit data storage

const myLoadingBuilder = () => {
  const storedSize = listHabits.length;
  for (let i = 0; i < storedSize; i++) {
    const myHabit = new Habit(listHabits[i]);
    if (myHabit.myCheck === true) {
      myHabit.habitStatus.checked = true;
      myHabit.habitCheckAuto(myHabit);
      myHabit.habitReset(myHabit);
    }
  }
};

function myLoadingHistory() {
  let availableHistory =
    JSON.parse(localStorage.getItem("recordedHistory")) || [];
  if (availableHistory.length === 0) {
    const myEmptyDisclaimer = document.createElement("h2");
    myEmptyDisclaimer.className = "disclaimer-empty-log";
    myEmptyDisclaimer.textContent =
      "Currently there is no habit history available, on the following day after finishing a habit, it will be added to the history";
    historyMonthContainer.appendChild(myEmptyDisclaimer);
    return;
  }
  for (let i = 0; i < availableHistory.length; i++) {
    historyCreation(i, availableHistory);
  }
};

const recordingData = () => {
  localStorage.setItem("recordedHabitData", JSON.stringify(listHabits));
  localStorage.setItem("recordedIdCounter", JSON.stringify(idCounter));
};

// log related functions

function addingLog(target) {
  const indexTarget = target.myId;
  for(let iT = 0;iT < listLogs.length;iT++){
    if(indexTarget === listLogs[iT].myId){
      return;
    }
  }
  const logableElement = {
    myId: target.myId,
    myInfo: target.myInfo,
    myFrequency: target.myFrequency,
    myDay: target.myDay,
    myMonth: target.myMonth,
    myYear: target.myYear,
    myHour: target.myHour,
    myMinute: target.myMinute,
    myTime: target.myTime,
  };
  listLogs.push(logableElement);
  recordingLog();
};

function deductingLog(target) {
  const indexTarget = target.myId;
  for(let iT = 0;iT < listLogs.length;iT++){
    if(indexTarget === listLogs[iT].myId){
      listLogs.splice(iT, 1);
      recordingLog();
      return;
    }
  }
}

function addingHistory() {
  if (listLogs.length === 0) {
    return;
  }
  const copyLogs = listLogs;
  if(listHistory.length === 31){
    listHistory.pop();
    listHistory.unshift(copyLogs);
    recordingHistory();
    listLogs.length = 0;
    recordingLog();
    return;
  }
  listHistory.unshift(copyLogs);
  recordingHistory();
  listLogs.length = 0;
  recordingLog();
}

function recordingLog() {
  localStorage.setItem("recordedLog", JSON.stringify(listLogs));
  // testing without localStorage.setItem("recordedHistory", JSON.stringify(listHistory));
}

function recordingHistory(){
  localStorage.setItem("recordedHistory", JSON.stringify(listHistory));
}

// calendar Related functions

function recordingCalendar() {
  localStorage.setItem("recordedCalendar", JSON.stringify(calendarTracker));
}

function myCalendarUpdate() {
  const calendarDifference = comparingDate(calendarTracker);
  if(calendarDifference === 0){
    return;
  };
  const currentCalendar = new Date();
  calendarTracker.myYear = currentCalendar.getFullYear();
  calendarTracker.myMonth = currentCalendar.getMonth();
  calendarTracker.myDay = currentCalendar.getDate();
  addingHistory();
}

// habit creation and feature functions

const decimalVerifier = (number) => {
  return number % 1 !== 0;
};

const formatTime = (timeComponent) => {
  if (timeComponent < 10) {
    return `0${timeComponent}`;
  }
  return `${timeComponent}`;
};

function comparingDate(target) {
  const storedDate = new Date(target.myYear, target.myMonth, target.myDay);
  const presentDay = new Date();

  const differenceDays = presentDay - storedDate;
  return Math.floor(differenceDays / (1000 * 60 * 60 * 24));
}

const savingChanges = (target, infoChanger, frequencyChanger) => {
  const updatedInfo = infoChanger.value;
  const updatedFrequency = parseFloat(frequencyChanger.value);

  target.myInfo = updatedInfo;
  target.myFrequency = updatedFrequency;

  for (i = 0; i < listHabits.length; i++) {
    if (listHabits[i].myId === target.myId) {
      const toChangeTitle = document.querySelector(
        `#habitTitle_${target.myId}`,
      );

      if (target.habitStatus.checked === true) {
        const toChangeLog = document.querySelector(
          `#historyData_${target.myId}`,
        );
        toChangeLog.textContent = `${updatedInfo} - ${target.myTime}`;
      }

      listHabits[i].myInfo = updatedInfo;
      listHabits[i].myFrequency = updatedFrequency;
      toChangeTitle.textContent = updatedInfo;
      recordingData();

      i = listHabits.length;
    }
  }
};

const erasingHabit = (target) => {
  for (i = 0; i < listHabits.length; i++) {
    if (listHabits[i].myId === target.myId) {
      const toBeRemoved = document.querySelector(
        `#habitContainer_${target.myId}`,
      );

      if (target.habitStatus.checked === true) {
        const toBeRemoveHistory = document.querySelector(
          `#historyLog_${target.myId}`,
        );
        toBeRemoveHistory.remove();
      }

      toBeRemoved.remove();
      listHabits.splice(i, 1);
      recordingData();
      i = listHabits.length;
    }
  }
};

const createHabit = () => {
  const nameGiven = habitNamer.value;
  const frequencyGiven = parseFloat(habitFrequencer.value);

  const decimalinstance = decimalVerifier(frequencyGiven);

  if (nameGiven === "" || habitFrequencer.value === "") {
    alert("All fields must be filled");
    return;
  } else if (frequencyGiven <= 0) {
    alert("Number must be higher than 0");
    return;
  } else if (decimalinstance === true) {
    alert("Number must be an integer");
    return;
  }

  const habitCreated = {
    myId: idCounter,
    myInfo: nameGiven,
    myFrequency: frequencyGiven,
    myCheck: false,
    myDay: 0,
    myMonth: 0,
    myYear: 0,
    myHour: 0,
    myMinute: 0,
    myTime: "",
  };

  listHabits.push(habitCreated);
  const myHabit = new Habit(habitCreated);

  idCounter = idCounter + 1;
  recordingData();
};

// history script

function historyCreation(target, historyList) {
  const containerDay = document.createElement("div");
  containerDay.id = `containerDay_${historyList[target][0].myDay}
    /${historyList[target][0].myMonth}/${historyList[target][0].myYear}`;
  containerDay.className = "container-log-data";

  const containerDayInfo = document.createElement("div");
  containerDayInfo.id = `containerDayInfo_${historyList[target][0].myDay}
        /${historyList[target][0].myMonth}/${historyList[target][0].myYear}`;
  containerDayInfo.className = "container-day";

  const convertedDay = converterNumbers(historyList[target][0].myDay);
  const convertedMonth = converterNumbers(historyList[target][0].myMonth);
  const convertedYear = converterNumbers(historyList[target][0].myMonth);

  const myCurrentDay = document.createElement("h2");
  myCurrentDay.id = `myCurrentDay_${historyList[target][0].myDay}
            /${historyList[target][0].myMonth}/${historyList[target][0].myYear}`;
  myCurrentDay.textContent = `${convertedDay}/${convertedMonth}/${
    historyList[target][0].myYear
  }`;

  containerDayInfo.appendChild(myCurrentDay);
  containerDay.appendChild(containerDayInfo);

  const containerDailyLog = document.createElement("div");
  containerDailyLog.id = `containerDailyLog_${historyList[target][0].myDay}
        /${historyList[target][0].myMonth}/${historyList[target][0].myYear}`;
  containerDailyLog.className = "container-daily-log";

  for (let j = 0; j < historyList[target].length; j++) {
    const myLogInfo = document.createElement("p");
    myLogInfo.className = "daily-data";

    const convertedHour = converterNumbers(historyList[target][j].myHour);
    const convertedMinute = converterNumbers(historyList[target][j].myMinute);

    myLogInfo.textContent = `${historyList[target][j].myInfo} 
                - ${convertedHour}:
                ${convertedMinute}`;
    containerDailyLog.appendChild(myLogInfo);
  }

  containerDay.appendChild(containerDailyLog);
  historyMonthContainer.appendChild(containerDay);
}

function converterNumbers(target) {
  if (target < 10) {
    return `0${target}`;
  }
  return target;
}




