<template lang="html">
  <div class="row-lg-12">
      <div class="calltaxibg">
        <h4>Disponible</h4>
        <div>
          <h1>{{consultData}}</h1>
          <button v-on:click="showPopUp" >show</button>
          <b-modal v-model="modalShow">
            {{consultData}}
          </b-modal>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    consultData(){
      var data = this.$store.getters.myservice;
      if (data != null) {
        this.showPopUp();
        data = "SERVICIO NUEVO"
      }else{
        data = 'No services';
      }
      return data;
    },
    youllbeawoman(){
      return this.$store.getters.youllbeawoman;
    }
  },
  data(){
    return {
      modalShow: false
    }
  },
  methods: {
    setOrigin(coor){
      console.log(coor)
      this.$store.commit('setOrigin', coor);
    },
    setDestiny(coor){
      console.log(coor)
      this.$store.commit('setDestiny', coor);
    },
    showPopUp(){
      this.modalShow = true;
    }

  },
  created(){
    if (this.youllbeawoman) {
      //Lo pongo falso para que no haga n consultas cada vez que se visita la pagina
      this.$store.commit('youllbeawoman');
      const localStore = this.$store;
      setInterval(function() {
        localStore.dispatch('infoService');
      }, 15 * 1000);
    }
  }
}
</script>

<style lang="css">
  .calltaxibg{
    background: #3FB27F;
    /* background-color: red; */
  }
  .tag{
    margin-right: 0px;
    width:40px;
  }

  table{
    text-align: left;
  }

  .tdstyle{
    text-align: right;
  }

  .modal-body{
    padding-top: 0px;
  }

  select > option{
    background-color: lime;
  }

  #cal{
      /* font-size: 15px; */
  }

  #hide2{
    display: none;
  }
</style>
