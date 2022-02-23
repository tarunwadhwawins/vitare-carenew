import {
  dateOnlyFormat,
  timerFromTimestamp,
  // dateOnlyFormatSImple,
  // timeFormatSimple
} from '../../commonMethods/commonMethod';
export const addTimeLogSuccess = async (state, timeLog) => {
  state.addTimeLog = timeLog;
}

export const timeLogsListSuccess = async (state, timeLogs) => {
  state.timeLogsList = timeLogs.map(timelog => {
    timelog.date = dateOnlyFormat(timelog.date);
    timelog.timeAmount = timerFromTimestamp(timelog.timeAmount);
    return timelog;
  })
}

export const deleteTimeLogSuccess = async (state, deleteTimeLog) => {
  state.deleteTimeLog = deleteTimeLog;
}

export const timeLogDetailsSuccess = async (state, timeLogDetails) => {
  // console.log('timeLogDetails in Mutation', timeLogDetails)
  // timeLogDetails.date = dateOnlyFormatSImple(timeLogDetails.date);
  // timeLogDetails.timeAmount = timeFormatSimple(timeLogDetails.timeAmount);
  state.timeLogDetails = timeLogDetails;
}

export const updateTimeLogSuccess = async (state, updateTimeLog) => {
  state.updateTimeLog = updateTimeLog;
}

export const latestTimeLogSuccess = async (state, latestTimeLog) => {
  latestTimeLog.date = dateOnlyFormat(latestTimeLog.date);
  state.latestTimeLog = latestTimeLog;
}