import { dateOnlyFormat, meridiemFormatFromTimestamp, dateOnlyFormatSImple, timeFormatSimple } from '../../commonMethods/commonMethod';
export const addTimeLogSuccess = async (state, timeLog) => {
  state.addTimeLog = timeLog;
}

export const timeLogsListSuccess = async (state, timeLogs) => {
  state.timeLogsList = timeLogs.map(timelog => {
    timelog.date = dateOnlyFormat(timelog.date);
    timelog.timeAmount = meridiemFormatFromTimestamp(timelog.timeAmount);
    return timelog;
  })
}

export const deleteTimeLogSuccess = async (state, deleteTimeLog) => {
  state.deleteTimeLog = deleteTimeLog;
}

export const timeLogDetailsSuccess = async (state, timeLogDetails) => {
  timeLogDetails.date = dateOnlyFormatSImple(timeLogDetails.date);
  timeLogDetails.timeAmount = timeFormatSimple(timeLogDetails.timeAmount);
  state.timeLogDetails = timeLogDetails;
}

export const updateTimeLogSuccess = async (state, updateTimeLog) => {
  state.updateTimeLog = updateTimeLog;
}