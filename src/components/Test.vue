<template>
<div class="container">
    <table border=0 width=100%>

        <td>Goal</td>
        <td><select>
                <option>Blood Pressure</option>
                <option>Medication</option>
            </select>
        </td>
        <td>Frequency
        </td>
        <td><input size=1 type=text> &nbsp;
            <select>
                <option>Daily</option>
                <option>Week</option>
                <option>2 Weeks</option>
                <option>Month</option>
                <option>2 Months</option>
                <option>3 Months</option>
            </select>
        </td>
        <td>Duration
        </td>
        <td><select v-model="duration" @change="showHideDropDowns($event)">
                <option value=0> Specific Time</option>
                <option value=1> Time Range</option>
                <option value=2> Any Time</option>
            </select>

            &nbsp;
            &nbsp;
            <select id="dropDownSpecificTime" v-if="duration==0">
                <option>01:00</option>
                <option>02:00</option>
                <option>03:00</option>
                <option>04:00</option>
                <option>05:00</option>
                <option>06:00</option>
                <option>07:00</option>
                <option>08:00</option>
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>12:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
                <option>18:00</option>
                <option>19:00</option>
                <option>20:00</option>
                <option>21:00</option>
                <option>22:00</option>
                <option>23:00</option>
            </select>

            <div v-if="duration==1">
                from
                <select id="dropDownSpecificTime" >
                    <option>01:00</option>
                    <option>02:00</option>
                    <option>03:00</option>
                    <option>04:00</option>
                    <option>05:00</option>
                    <option>06:00</option>
                    <option>07:00</option>
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>13:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                    <option>23:00</option>
                </select>

                to

                <select id="dropDownSpecificTime" >
                    <option>01:00</option>
                    <option>02:00</option>
                    <option>03:00</option>
                    <option>04:00</option>
                    <option>05:00</option>
                    <option>06:00</option>
                    <option>07:00</option>
                    <option>08:00</option>
                    <option>09:00</option>
                    <option>10:00</option>
                    <option>11:00</option>
                    <option>12:00</option>
                    <option>13:00</option>
                    <option>14:00</option>
                    <option>15:00</option>
                    <option>16:00</option>
                    <option>17:00</option>
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                    <option>22:00</option>
                    <option>23:00</option>
                </select>
            </div>

        </td>
        <td>Notes</td>
        <td>
            <textarea cols=40></textarea>
        </td>
    </table>

</div>
</template>

<script>
import {
    ref
} from '@vue/reactivity'

export default {

    setup() {
        const duration = ref()
        const showHideDropDowns = () => {
          console.log('duration',duration.value)
            duration.value 
        }
        return {
            duration,
            showHideDropDowns
        }
    }

}
</script>
