<template>
  <a-modal width="1000px" title="Notes Detail" centered>
    <a-row :gutter="24">
      <a-col :sm="24" :xs="24">
        <div class="text-right mb-24">
          <a-button class="btn blueBtn" @click="showModal"
                    >Export to Excel/PDF</a-button
                  >
        </div>
        <a-table
          :columns="columns3"
          :data-source="data3"
          :pagination="false"
          @change="onChange"
        >
          <template #flags="{ text }">
            <span class="box" :class="text"></span>
            <span
              class="box"
              :class="(text = text.match(/yellowBgColor/g))"
              v-if="text.match(/yellowBgColor/g)"
            ></span>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
const columns3 = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Note",
    dataIndex: "note",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Added By",
    dataIndex: "addedby",
  },
  {
    title: "Flag",
    dataIndex: "flag",
    slots: {
      customRender: "flags",
    },
  },
];
const data3 = [
  {
    key: "1",
    date: "Nov 10, 2021",
    note:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatibus dolore, vel error harum porro totam eveniet modi iusto eos, dolorum provident aliquid earum corporis veritatis? Officiis molestiae amet ullam?",
    category: "Admin",
    addedby: "Steve Smith",
    flag: "blueBgColor",
  },
  {
    key: "2",
    date: "Nov 11, 2021",
    note:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptatibus dolore, vel error harum porro totam eveniet modi iusto eos, dolorum provident aliquid earum corporis veritatis? Officiis molestiae amet ullam?",
    category: "Clinical",
    addedby: "Jane Doe",
    flag: "redBgColor",
  },
];
export default defineComponent({
  components: {},
  setup() {
    return {
      data3,
      columns3,
    };
  },
});
</script>