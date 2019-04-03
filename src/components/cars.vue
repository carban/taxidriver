<template lang="html">
  <div class="container prof" id="content">
    <flash-message v-if="flashalert" class="" autoHide variant="success" transitionIn="animated rubberBand"></flash-message>
    <div class="row">
      <div class="col-md-12  col-lg-12 mx-auto">
        <div class="card shadow-lg bg-white">
          <div class="card-header">
            <h2>Cars</h2>
          </div>
          <div class="card-body">
            <!-- <b-table hover :items="getCars"></b-table> -->
            <table class="table">
              <thead>
                <th scope="col">Plate</th>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Soat</th>
                <th scope="col">Year</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </thead>
              <tbody>
                <tr v-for="(item, index) in getCars" :key="index">
                  <td><img class="taxiimage" src="@/assets/taxi2.png"><b>{{item.placa}}</b></td>
                  <td>{{item.marca}}</td>
                  <td>{{item.modelo}}</td>
                  <td>{{item.soat}}</td>
                  <td>{{item.anho}}</td>
                  <td><b-button v-on:click="setEditingCar(item.marca, item.modelo, item.soat, item.anho)" v-b-modal.myEditModal variant="info"><img src="@/assets/edit3.png"></b-button></td>
                  <td><b-button variant="danger"><span aria-hidden="true">&times;</span></b-button></td>
                </tr>
              </tbody>
            </table>
            <b-button v-b-modal.myCreateCarModal variant="success"><b>+</b> New</b-button>
          </div>
        </div>
      </div>

    </div>
   </b-table>
        <!-- the modal -->
        <b-modal id="myEditModal" ref="myEditModal" title="Edit Car" @ok="">
          <form @submit.stop.prevent="">
            <b>Plate</b>
            <b-form-input type="text" placeholder="Plate" v-model="editingCar.brand" autofocus></b-form-input>
            <b>model</b>
            <b-form-input type="text" placeholder="Model" v-model="editingCar.model" autofocus></b-form-input>
            <b>soat</b>
            <b-form-input type="text" placeholder="soat" v-model="editingCar.soat" autofocus></b-form-input>
            <b>year</b>
            <b-form-input type="text" placeholder="year" v-model="editingCar.year" autofocus></b-form-input>
          </form>
        </b-modal>

        <b-modal id="myCreateCarModal" ref="myEditModal" title="Edit Car" @ok="">
          <form @submit.stop.prevent="">
            <b>Plate</b>
            <b-form-input type="text" placeholder="brand" v-model="editingCar.brand" autofocus></b-form-input>
            <b>brand</b>
            <b-form-input type="text" placeholder="brand" v-model="editingCar.brand" autofocus></b-form-input>
            <b>model</b>
            <b-form-input type="text" placeholder="Model" v-model="editingCar.model" autofocus></b-form-input>
            <b>soat</b>
            <b-form-input type="text" placeholder="soat" v-model="editingCar.soat" autofocus></b-form-input>
            <b>year</b>
            <b-form-input type="text" placeholder="year" v-model="editingCar.year" autofocus></b-form-input>
          </form>
        </b-modal>
      </div>
</template>

<script>

export default {
  name: 'cars',
  components: {

  },
  computed:{
    getCars(){
      return this.$store.getters.cars;
    }
  },
  data(){
    return{
      flashalert: false,
      editingCar: {brand: null, model: null, soat: null, year: null}
    }
  },
  beforeCreate(){

    this.$store.dispatch('carsInfo');

  },
  methods: {
    setEditingCar(brand, model, soat, year){
      this.editingCar = {brand: brand, model: model, soat: soat, year: year};
    }
  },
  updated(){
    setTimeout(() => {
      this.flashalert = false;
    }, 2000);
  }
}
</script>

<style lang="css">
  .prof{
    margin-top: 25px;
  }
  #profileMap{
    height: 600px;
  }
  .myclose{
    margin-right: 50px;
    width:12px;
  }

  thead{
    background-color: black;
    color: white;
  }

  .taxiimage{
    width: 50px;
    height: 50px;
  }

</style>
