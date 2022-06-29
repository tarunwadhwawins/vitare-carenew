<template>
<div class="monthCalendarView">
    <FullCalendar v-if="appointments" :options="option" ref="cal">
    </FullCalendar>
</div>
</template>

<script>
import {
    dateFormat
} from "@/commonMethods/commonMethod"
import {
    reactive,
    ref,
    computed
} from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'
import moment from 'moment'
import {
    useStore
} from "vuex"


export default {
    components: {
        FullCalendar,

    },
    props: {
        seclectDate: {
            type: String
        },
        appointment: {
            type: Array
        }

    },
    setup(props, {
        emit
    }) {
        const linkTo = "patients-summary"
        const cal = ref(null);
        const store = useStore()
        const seclectDate = reactive(props.seclectDate)
        function handleDateClick(e) {
            emit("is-dateClick", e)

        }
        const appointments = computed(() => {
            return store.state.appointment.searchAppointmentRecords
        })
        const option = {
            plugins: [dayGridPlugin, interactionPlugin, TimeGridPlugin, ListPlugin],
            headerToolbar: {
                left: 'prev next',
                center: 'title',
                right: '',
            },
            initialDate: moment(seclectDate).format('YYYY-MM-DD'),
            initialView: 'dayGridMonth',
            timeZone: 'UTC',
            contentHeight: 'auto',
            dayMaxEvents: 2,
            moreLinkClick: function (e) {
                handleDateClick(e.date)
                return '+' + e.num + ' More items';
            },
            showNonCurrentDates: true,
            events: reactive(props.appointment),
            eventContent: renderEventContent,
            customButtons: {
                prev: { // this overrides the prev button
                    text: 'prev',
                    click: () => {
                        nextOrPrev('prev')

                    }
                },
                next: { // this overrides the next button
                    text: 'next',
                    click: () => {
                        nextOrPrev('next')

                    }
                }
            }

        }

        function renderEventContent(clickInfo) {

            var getData = clickInfo.event._def //<div class="itemWrapper"><div class="leftWrapper">Time Zone</div><div class="rightWrapper">` +getData.extendedProps.timezone?getData.extendedProps.timezone.data.UTCOffset:'' +`</div> </div>
            console.log("check",getData.extendedProps.timezone?getData.extendedProps.timezone.data:'')
            var customHtml = '';
            customHtml += `<div><a class="ant-dropdown-link one ant-dropdown-trigger custom" onclick="popupShow('monthCalendarDropDown` + getData.extendedProps.time + `')"><div class="dropdown"><p><strong><span>` + getData.extendedProps.appointmentType + `</span></strong><span>` + getData.extendedProps.patient + `</span></p></div></a></div>`
            customHtml += `<div id="monthCalendarDropDown` + getData.extendedProps.time + `" class="monthCalendarDropDown ant-dropdown valueItem ant-dropdown-placement-bottomLeft" style="display:none"><ul class="ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light ant-dropdown-content"><li class="ant-dropdown-menu-item ant-dropdown-menu-item-only-child" role="menuitem" tabindex="-1" data-menu-id="1" aria-disabled="false"><div class="calendarDropdown"><div class="itemWrapper"><div class="leftWrapper"> Appointment Type </div>`
            customHtml += `<div class="rightWrapper">` + getData.extendedProps.appointmentType + `</div></div><div class="itemWrapper"><div class="leftWrapper">Date Time</div><div class="rightWrapper">` + dateFormat(getData.extendedProps.time) + `</div></div><div class="itemWrapper"><div class="leftWrapper">Coordinator</div><div class="rightWrapper"><a href="#/coordinator-summary/`+getData.extendedProps.staff_id+`" class="">` + getData.extendedProps.staff + `</a></div></div><div class="itemWrapper"><div class="leftWrapper">Patient</div><div class="rightWrapper"><a href="#/patients-summary/`+getData.extendedProps.patient_id+`" class="">` + getData.extendedProps.patient + `</a></div></div>`
            customHtml += ` <div class="itemWrapper"><div class="leftWrapper">Start Time</div><div class="rightWrapper">` + moment(dateFormat(getData.extendedProps.time)).format('hh:mm A') +' '+getData.extendedProps?.abbr + `</div></div> `
           customHtml += ` <div class="itemWrapper"><div class="leftWrapper">Duration</div><div class="rightWrapper">` + getData.extendedProps.timeGet + `</div></div>`
            customHtml += `<div class="itemWrapper"><div class="leftWrapper">Flags</div><div class="rightWrapper"><span class="box" title="`+getData.extendedProps.flagName+`" style="background-color: `+getData.extendedProps.flags+`"></span></div></div><div class="notesWrapper"><span>Notes</span><p>`+getData.extendedProps.notes+`</p></div></div></li></ul></div>`
            
         
            return {
                html: customHtml
            }
        }

        function getDate(value) {
            console.log('check')
            store.state.appointment.searchAppointmentRecords = ''
            console.log("value", value)
            store.dispatch("searchAppointment", {
                fromDate: value,
                toDate: value,
                tabId: 4
            })
        }

        const linkToCoordinator = "coordinator-summary"

        function nextOrPrev(text) {
            let calendarApi = cal.value.getApi();
            if (text == "next") {
                calendarApi.next();
            } else {
                calendarApi.prev();
            }
            emit("is-month", moment(calendarApi.currentData.currentDate))
        }
        return {
            dayGridPlugin,
            interactionPlugin,
            TimeGridPlugin,
            ListPlugin,
            moment,
            linkToCoordinator,
            cal,
            getDate,
            appointments,
            renderEventContent,
            handleDateClick,
            nextOrPrev,
            linkTo,
            option,

        }
    }
}
</script>
