<template>
  <div>
    <n-tree multiple block-line :data="data" />
  </div>
</template>


<script>
import { defineComponent, ref } from "vue";
import { NTree, NDivider } from "naive-ui";


function createData() {
  return [
    {
      label: "Questionnaire de santé",
      key: "health",
      children: [
        {
          label: "Vertiges",
          key: "dizziness",
          children: [
            { label: "Vertiges matinaux", key: "morningDizziness" },
            { label: "Vertiges en position debout", key: "standingDizziness" }
          ]
        },
        {
          label: "Maux de tête",
          key: "headaches",
          children: [
            { label: "Migraines", key: "migraines" },
            { label: "Céphalées de tension", key: "tensionHeadaches" }
          ]
        },
        {
          label: "Douleurs abdominales",
          key: "abdominalPain",
          children: [
            { label: "Douleurs en bas du ventre", key: "lowerAbdominalPain" },
            { label: "Douleurs en haut du ventre", key: "upperAbdominalPain" }
          ]
        }
      ]
    }
  ];
}

export default defineComponent({
  components: {
    NTree,
    NDivider
  },
  
  setup() {
    const isMobileSidebar = ref(false);
    const toggleSidebar = () => {
      isMobileSidebar.value = !isMobileSidebar.value;
    };
    return {
      data: createData(),
      value: ref([]),
      isMobileSidebar,
      toggleSidebar,
    };
  }
});
</script>



