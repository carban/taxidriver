<template lang="html">
  <div class="container prof" id="content">
    <flash-message v-if="flashalert" class="" autoHide variant="success" transitionIn="animated rubberBand"></flash-message>
    <div class="row p-6">
      <div class="col-md-8  col-lg-10 mx-auto">
        <div class="card shadow-lg bg-white">
          <div class="card-header">
            <h2>Profile</h2>
          </div>
          <div class="card-body">
            <!-- AQUI -->
            <center>
            <div class="imgcontainer">
              <img v-bind:src="user.imagenconductor" alt="Avatar" class="img">
              <div class="middle">
                <b-btn v-b-modal.changePic class="btn btn-warning btn-block hovercolor">Change Pic</b-btn>
              </div>
            </div>
            <hr>
            </center>
            <div class="row">
              <button v-b-modal.chooseTaxi class="btn btn-primary btn-block"><img class="wheel" src="@/assets/wheel.gif">Start Working!</button>
            <div class="col-sm-6">
            <div class="form-group">
              <div>
              <form v-on:submit.prevent="updateProfileInfo()">
                <b>Basic Data</b>
                </br>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+57</div>
                  </div>
                  <input type="number" v-model="user.telefonoconductor" class="form-control" id="inlineFormInputGroupUsername" placeholder="Phone" disabled>
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.nombreconductor" class="form-control" placeholder="First Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.apellidoconductor" class="form-control" placeholder="Last Name">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.direccionconductor" class="form-control" placeholder="Direction">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.emailconductor" class="form-control" placeholder="Email">
                </div>
                <div class="form-group">
                  <input type="text" v-model="user.tarjetaconductor" class="form-control" placeholder="Credit-card Number">
                </div>
                <div class="form-group">
                  <button class="btn btn-outline-success btn-block">Update</button>
                </div>
                </form>

              <b-btn v-b-modal.changePassword class="btn btn-outline-warning btn-block">Change password</b-btn>
              <b-modal id="changePassword" title="Change your password" @ok="newPassword">
                <div class="form-group">
                  <input v-model='newpassword' class="form-control" type="password" name="" value="" placeholder="New Password">
                  </br>
                  <input v-model='confirmpassword' class="form-control" type="password" name="" value="" placeholder="Confirm Password">
                </div>
              </b-modal>

              <b-modal id="changePic" title="Change your Profile pic" @ok="changePic">
                <div class="form-group">
                  <input v-model="new_pic" class="form-control" type="text" name="" value="" placeholder="New Url">
                </div>
              </b-modal>

              <b-modal id="chooseTaxi" title="Select the car to work" @ok="">
                <div v-on:click="letsgo(item.placa)" class="alert alert-warning pointer" v-for="(item, index) in getCars" :key="index">
                  <b>{{item.placa}}</b>
                </div>
              </b-modal>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <b>Travels Information</b>
              </br>
              <div class="profileItems">
                <h4>Average Stars: {{travelsinfo.promedio}}</h4>
              </div>
              <div class="profileItems">
                <h4>Travels: {{travelsinfo.viajes}}</h4>
              </div>
              <div class="profileItems">
                <h4>KM of travel: {{travelsinfo.kms}}</h4>
              </div>
              <div class="profileItems">
                <h4>Money: ${{travelsinfo.dinero*0.4}}</h4>
              </div>
              <img class="aimage" src="@/assets/taxi2.png">
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    </div>

</template>

<script>
export default {
  computed:{
    user(){
      return this.$store.getters.profile;
    },
    getCars(){
      return this.$store.getters.cars;
    },
    travelsinfo(){
      return this.$store.getters.travelsinfo;
    }
  },
  data(){
    return{
      flashalert: false,
      newpassword: '',
      confirmpassword: '',
      new_pic: ''
    }
  },
  beforeCreate(){
    //Consult Profile Info
    this.$store.dispatch('profileInfo')
    this.$store.dispatch('carsInfo')

  },
  methods: {
    updateProfileInfo(){
      var newProfile = {
        first_name: this.user.nombreconductor,
        last_name: this.user.apellidoconductor,
        direction: this.user.direccionconductor,
        email: this.user.emailconductor,
        credit_card: this.user.tarjetaconductor
      }
      this.$store.dispatch('updateProfileInfo', newProfile)
        .then(res => {
          console.log(res.data.msg);
          this.$store.dispatch('profileInfo')
            .then(res => {
              this.flashalert = true;
              this.flashMe({ message: 'Profile Updated', variant: 'success' });
            })
        })
    },
    newPassword(){
      if (this.newpassword == this.confirmpassword) {
        this.$store.dispatch('changePassword', {new_pass:this.newpassword})
          .then(res => {
            this.newpassword = '';
            this.confirmpassword = '';
            this.flashalert = true;
            this.flashMe({ message: 'Password Updated', variant: 'success' });
          })
      }

    },
    changePic(){
      this.$store.dispatch('changePicture', {new_pic:this.new_pic})
        .then(res => {
          this.new_pic = '';
          this.flashalert = true;
          this.flashMe({ message: 'pic Updated', variant: 'success' });
        })
    },
    letsgo(placa){
      this.$store.commit('setCarChosenTrue');
      this.$store.commit('setActualCar', placa);
      this.$router.push({name: 'map'})
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
  .img{
    padding-bottom: 15px;
    width:240px;
    height:250px;
    opacity: 1;
    display: block;
    transition: .5s ease;
    backface-visibility: hidden;
    border-radius: 15%;
  }

  .imgcontainer {
    position: relative;
    width:240px;
    height:250px;
    border-radius: 15%;
  }

  .middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
  }

  .imgcontainer:hover .img {
    opacity: 0.3;
  }

  .imgcontainer:hover .middle {
    opacity: 1;
  }

  .text {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    padding: 16px 32px;
  }

  .profileItems{
    background-color:  #2c3e50 ;
    margin-bottom: 10px;
    height:50px;
    padding-top: 10px;
    color: white;
  }

  .profileItems:hover{
    background-color: #17A2B8;
  }

  .aimage{
    margin-top: 50px;
  }

  .optionImagen{
    width: 50px;
    height: 50px;
  }

  .wheel{
   width: 50px;
   height: 50px;
   margin-right: 10px;
  }

  .hovercolor:hover{
    background-color: black;
  }

  .pointer{
    cursor: pointer;
  }
</style>
