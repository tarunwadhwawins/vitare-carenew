<template>
   <div id="box-droppable1" @drop="drop" @dragover="allowDrop">
    <h3>Draggaable area 1:</h3>
    <hr>
    
    <div class="" draggable="true" @dragstart="onDragging" id="123">
      <h2>Drag mee</h2>
      <p>this is a text</p>
    </div>
     
    <img id="img-draggable" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" draggable="true" @dragstart="drag" width="336">
  </div>
  
  <div id="box-droppable2" @drop="drop" @dragover="allowDrop">
    <h3>Droppable area 2:</h3>
    <hr>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    
  },
setup() {
    const onDragging = (ev) => {
        console.log(ev);
        ev.dataTransfer.setData("text", ev.target.id);
    };
    const allowDrop = (ev) => {
        ev.preventDefault();
    };
    const drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
    };
    const drop = (ev) => {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        console.log(data);
        ev.target.appendChild(document.getElementById(data));
    }
    return {
        onDragging,
        allowDrop,
        drag,
        drop,
    }
}
  

});
</script>
<style>

</style>