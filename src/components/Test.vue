<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file"  @change="upload($event)" id="file-input">
      </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        file: ''
      }
    },
    methods: {
      upload(event){
        let data = new FormData();
        let file = event.target.files[0];

        data.append('name', 'my-file')
        data.append('file', file)
        console.log(data)
        // let config = {
        //   header : {
        //     'Content-Type' : 'multipart/form-data'
        //   }
        // }

        // axios.post('/api', data, config).then(
        //   response => {

        //   }
        // )
      }
    }
  }
</script>