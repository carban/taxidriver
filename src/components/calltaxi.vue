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
               <b><h1><i>{{consultData}}</i></h1></b>
               <img src="@/assets/taxi2.png"></img>
               <div class="col">
                 <div class="col">
                   <h5><b>Name: </b>{{cliinfo.nombrecliente}} {{cliinfo.apellidocliente}}</h5>
                   <br>
                   <h5><b>phone: </b>{{cliinfo.telefonocliente}}</h5>
                 </div>
               </div>
              </b-modal>
              <div v-if="working" class="tag">
                <b>Travel: </b>
              </div>
                <b-btn v-if="working" v-b-modal.modalCharge class="btn btn-warning" >Finish Travel</b-btn>
                <b-modal id="modalCharge" @ok="finish_travel">
                  <div class="">
                    <b><h1>FINISH TRAVEL</h1></b>
                  </div>
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
        data = "NEW SERVICE"
      }else{
        data = 'No services';
      }
      return data;
    },
    youllbeawoman(){
      return this.$store.getters.youllbeawoman;
    },
    status(){
      return this.$store.getters.status_working;
    },
    cliinfo(){
      return this.$store.getters.cliinfo;
    }
  },
  data(){
    return {
      modalShow: false,
      working: false,
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
      if (!this.working) {
        if (this.status=='Available') {
          this.$store.commit('set_status_working', 'Busy');
          this.$store.dispatch('busyPosition')
          this.status_color = 'btn btn-danger';
        }else{
          this.$store.commit('set_status_working', 'Available');
          this.status_color = 'btn btn-success';
        }
      }
    },
    aceptarServicio(){
      this.toggle_action();
      this.working = true;
      this.$store.dispatch('service_accepted');
    },
    finish_travel(){
      this.working = false;
      this.toggle_action();
      this.$store.commit('myservice', null);
      this.$router.push({name: 'profile'})
    }

  },
  created(){
    if (this.youllbeawoman) {
      //Lo pongo falso para que no haga n consultas cada vez que se visita la pagina
      this.$store.commit('youllbeawoman');
      const localStore = this.$store;
      setInterval(function() {
        localStore.dispatch('infoService');
      }, 5 * 1000);
    }
  }
}
</script>

<style lang="css">
  .calltaxibg{
    //background: #8258FA;
    background: linear-gradient(to bottom, #8258FA 80%, #a8810000 100%);
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
