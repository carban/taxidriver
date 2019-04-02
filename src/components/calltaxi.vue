<template lang="html">
  <div class="row-lg-12">
      <div class="calltaxibg">
        <h4>Disponible</h4>
      </div>
  </div>
</template>

<script>
export default {
  computed: {

  },
  data(){
    return {

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
    travel(){}

  },
  beforeCreate(){

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
