<template>
<a-row class="mb-24" :gutter="24">
    <a-col :span="12">
        <h2>Specialization</h2>
        <a-row :gutter="24">
            <LongCard customClass="two" count="4" text="Wellness"></LongCard>
            <LongCard customClass="four" count="5" text="Behaviour"></LongCard>
        </a-row>
    </a-col>
    <a-col :span="12">
        <h2>Network</h2>
        <a-row :gutter="24">
            <LongCard customClass="six" count="5" text="In"></LongCard>
            <LongCard customClass="five" count="6" text="Out"></LongCard>
        </a-row>
    </a-col>
</a-row>

<CoordinatorTable></CoordinatorTable>
<!-- <template #action>
            <a class="icons"><EyeOutlined /></a>
            <a class="icons"><EditOutlined /></a>
            <a class="icons"> <DeleteOutlined /></a>
          </template> -->
</template>

<script>
import LongCard from "@/components/common/cards/LongCard";
import CoordinatorTable from "@/components/common/tables/CoordinatorTable";
// import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons-vue";
export default {
    components: {
        LongCard,
        CoordinatorTable,
        // DeleteOutlined,
        // EditOutlined,
        // EyeOutlined,
    },
};
</script>
