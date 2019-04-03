import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { createFlashStore } from 'vuex-flash';
import jwtDecode from 'jwt-decode';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    token: localStorage.getItem('access_token') || null,
    carChosen: false,
    mapdata: [],
    profile: {first_name: null, last_name: null, phone: null},
    driverData: {first_name: null, last_name: null, phone: null},
    // cars: {title: null, coor: null},
    cars: [
      {placa: 200, marca: 'Lamborghini', modelo: 'Gallardo', soat: '123', anho: '2018'},
      {placa: 201, marca: 'Audi', modelo:'A4', soat: '123', anho: '2018'},
      {placa: 202, marca: 'Chevrolet', modelo: 'Camaro', soat: '123', anho: '2018'},
    ],
    //cars: null,
    origin: [3.42882159671311, -76.54704415637336],
    destiny: [3.4329340857995096, -76.48538692422893],
    destinyAndTime: [],
    firstTimeForAInterval: true,
    youllbeawoman: true
  },
  //Sirve para obtener datos del state
  getters: {
    token: state => {
      return state.token;
    },
    loggedIn: state => {
      return state.token !== null;
    },
    carChosen: state => {
      return state.carChosen;
    },
    profile: state => {
      return state.profile;
    },
    mapdata: state => {
      return state.mapdata;
    },
    cars: state => {
      return state.cars;
    },
    origin: state => {
      return state.origin;
    },
    destiny: state => {
      return state.destiny;
    },
    destinyAndTime: state => {
      return state.destinyAndTime;
    },
    firstTimeForAInterval: state => {
      return state.firstTimeForAInterval;
    },
    youllbeawoman: state => {
      return state.youllbeawoman;
    },
    driverData: state => {
      return state.driverData;
    }
  },
  //Modifican los datos del estado
  //Las mutiaciones son sincronas
  mutations: {
    tokenMutation: (state, token) => {
      state.token = token;
    },
    destroyToken: state => {
      state.token = null;
    },
    setCarChosen: state => {
      state.carChosen = !state.carChosen;
    },
    setProfile: (state, pro) => {
      state.profile = pro;
    },
    setcars: (state, fav) => {
      state.cars = fav;
    },
    removeProfile: state => {
      state.profile = null;
    },
    setOrigin: (state, coor) => {
      state.origin = coor;
    },
    setDestiny: (state, coor) => {
      state.destiny = coor;
    },
    removeMapdata: state => {
      state.mapdata = [];
    },
    mapinfo: (state, data) => {
      state.mapdata = data;
    },
    destinyAndTime: (state, arr) => {
      state.destinyAndTime = arr;
      state.firstTimeForAInterval = !state.firstTimeForAInterval;
    },
    firstTimeForAInterval: (state) => {
      state.firstTimeForAInterval = !state.firstTimeForAInterval;
    },
    youllbeawoman: (state) => {
      state.youllbeawoman = !state.youllbeawoman;
    },
    driverData: (state, data) => {
      state.driverData = data;
    }
  },
  //Se utiliza para hacer llamadas al servidor
  //Se llaman funciones de las mutaciones para cambiar los estados
  //Las acciones son asincronas
  actions: {
    api_register: (context, credentials) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/driver/signup', credentials)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            //console.log(err);
            reject(err);
          })
      })
    },
    api_login: (context, credentials) => {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:8000/api/driver/login',
        {phone: credentials.phone, password: credentials.password})
          .then(res => {
            console.log(res.data);
            const token = res.data;
            localStorage.setItem('access_token', token);
            context.commit('tokenMutation', token);
            const {phone} = jwtDecode(context.getters.token)
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    logout: context =>{
      if(context.getters.loggedIn){
        context.commit('removeMapdata');
        localStorage.removeItem('access_token');
        context.commit('removeProfile');
        context.commit('destroyToken');
      }
    },
    profileInfo: context => {
      return new Promise((resolve, reject) => {
        console.log('Profile consulted');
        const decoded = jwtDecode(context.getters.token);
        // console.log(decoded);
        axios.post('http://localhost:8000/api/driver/profile', decoded)
          .then(res => {
            console.log(res.data);
            context.commit('setProfile', res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    updateProfileInfo: (context, newProfile) => {
      return new Promise((resolve, reject) => {
        const decoded = jwtDecode(context.getters.token);
        const object = {newProfile: newProfile, phone: decoded.phone}
        axios.post('http://localhost:8000/api/driver/update-profile', object)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    carsInfo: context => {
      return new Promise((resolve, reject) => {
        console.log('cars consulted');
        const decoded = jwtDecode(context.getters.token);
        axios.post('http://localhost:8000/api/driver/cars', decoded)
          .then(res => {
            var data = res.data;
            var array = [];
            for(var i in data){
              var plate = data[i].placa;
              var brand = data[i].marca;
              var model = data[i].modelo;
              var asoat = data[i].soat;
              var aanho = data[i].anho;
              array.push({placa: plate, marca: brand, modelo: model, soat: asoat, anho: aanho});
            }
            context.commit('setcars', array);

            //context.commit('setcars', array);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    sendNewCar: (context, item) => {
      return new Promise((resolve, reject) => {
        //console.log(context.getters.token);
        const decoded = jwtDecode(context.getters.token);
        // const phoneNumber = context.getters.profile.phone;
        const obj = {f_item: item, phone: decoded.phone};
        axios.post('http://localhost:8000/api/driver/new-car', obj)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    deleteCar: (context, favID) => {
      return new Promise((resolve, reject) => {
        //console.log(context.getters.token);
        const decoded = jwtDecode(context.getters.token);
        const obj = {fav: favID, phone: decoded};
        axios.post('http://localhost:8000/api/profile/delete-favorite', obj)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    updateCar: (context, obj) => {
      return new Promise((resolve, reject) => {
        //console.log(context.getters.token);
        const decoded = jwtDecode(context.getters.token);
        const object = {fav: obj.id, phone: decoded, newTitle: obj.newtitle};
        axios.post('http://localhost:8000/api/profile/update-favorite', object)
          .then(res => {
            console.log(res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          })
      });
    },
    cercano: context => {
      axios.post('http://localhost:8000/api/service', {coordenada: context.getters.origin})
        .then(res => {
          // console.log(res.data.rows[0]);
          context.commit('driverData', res.data.rows[0]);
        })
        .catch(err => {
          console.log(err);
        })
    },
    infoMap: context => {
      axios.get('http://localhost:8000/api/map/info')
        .then(res => {
          console.log(res.data.mapdata);
          var data = res.data.mapdata;
          var array = []
          for(var i in data){
            var lat = data[i].geom.coordinates[0];
            var lng = data[i].geom.coordinates[1];
            var fname = data[i].first_name;
            var lname = data[i].last_name;
            var phone = data[i].phone;
            array.push({coor: [lat, lng], fname, lname, phone});
          }
          //console.log(array);
          context.commit('mapinfo', array);
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  plugins: [
    createFlashStore()
  ]
})
