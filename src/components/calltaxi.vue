<template lang="html">
  <div class="row-lg-12">
      <div class="calltaxibg">
        <div class="card-body">
          <div class="row">
            <div class="tag">
              <b>Status: </b>
            </div>
              <button v-on:click="toggle_action" class="btn mytoggle" v-bind:class="status_color" >{{status}}</button>
              <b-modal v-model="modalShow" @ok="aceptarServicio">
               {{consultData}}
              </b-modal>
              <div class="tag">
                <b>Travel: </b>
              </div>
                <b-btn v-b-modal.modalCharge class="btn btn-warning" >Finish Travel</b-btn>
                <b-modal id="modalCharge">
                 {{consultData}}
                </b-modal>
          </div>
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
      modalShow: false,
      status: 'Available',
      status_color: 'btn-success animated rubberBand'
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
    },
    toggle_action(){
      if (this.status=='Available') {
        this.status = 'Busy';
        this.status_color = 'btn btn-danger';
      }else{
        this.status = 'Available';
        this.status_color = 'btn btn-success';
      }
    },
    aceptarServicio(){
      this.$store.dispatch('service_accepted');
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
    margin-right: 35px;
    margin-left: 35px;
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
