import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import DateFilter from './filters/date'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import Alert from './components/shared/Alert.vue'
import EditMeetupDetailsDialogue from './components/Meetup/Edit/EditMeetupDetailsDialogue.vue'
import EditMeetupDateDialogue from './components/Meetup/Edit/EditMeetupDateDialogue.vue'
import EditMeetupTimeDialogue from './components/Meetup/Edit/EditMeetupTimeDialogue.vue'
import RegisterDialogue from './components/Meetup/Registration/RegisterDialogue.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert',Alert)
Vue.component('app-edit-dialog',EditMeetupDetailsDialogue)
Vue.component('app-edit-date-dialog',EditMeetupDateDialogue)
Vue.component('app-edit-time-dialog',EditMeetupTimeDialogue)
Vue.component('app-register-dialog',RegisterDialogue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
  		apiKey: 'AIzaSyA8LDPxUvmVGsuary_uUPfEypa5_b-uDNQ',
	    authDomain: 'devmeetups-813b3.firebaseapp.com',
	    databaseURL: 'https://devmeetups-813b3.firebaseio.com',
	    projectId: 'devmeetups-813b3',
	    storageBucket: 'devmeetups-813b3.appspot.com',
  	})
  	firebase.auth().onAuthStateChanged((user)=> {
    // handle it
    	if(user){
    		this.$store.dispatch('autoSignIn',user)
        //this.$store.dispatch('fetchUserData')
    	}
	})
  	this.$store.dispatch('loadMeetups')
  }
})
