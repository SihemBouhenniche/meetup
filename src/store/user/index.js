import * as firebase from 'firebase'

export default {
	state : {
      user : null,
	},
	mutations : {
		registerUserForMeetup(state, payload){
			const id = payload.id
			if(state.user.registredMeetups.findIndex(meetup =>{
				return meetup.id == id
			}) >= 0){
				return 0
			}
			state.user.registredMeetups.push(id)
			state.user.fbkeys[id] = payload.fbkey
		},
		unregisterUserFormMeetup(state, payload){
			const registredMeetups = state.user.registredMeetups
			registredMeetups.slice(state.user.registredMeetups.findIndex(meetup =>{
				return meetup.id == payload
			}),1)
			Reflect.deleteProperty(state.user.fbkeys,payload)
		},
		setUser (state, payload){
			state.user =payload
		}
	},
	actions : {
		registerUserForMeetup ({commit, getters},payload){
			commit('setLoading',true)
			const user = getters.user
			firebase.database().ref('/users/'+user.id).child('/registredMeetups/').push(payload)
			.then(data => {
				commit('setLoading',false)
				commit('registerUserForMeetup',{
					id : payload,
					fbkey : data.key
				})
			}).catch(error =>{
				commit('setLoading',false)
				console.log(error)
			})
		},
		unregisterUserFormMeetup ({commit, getters},payload){
			commit('setLoading',true)
			const user = getters.user
			if(!user.fbkeys){
				return 0
			}
			const fbkey = user.fbkeys[payload]
			firebase.database().ref('/users/' + user.id + '/registredMeetups/').child(fbkey).remove()
			.then(()=>{
				commit('setLoading',false)
				commit('unregisterUserFormMeetup',payload)
			}).then(error=>{
				commit('setLoading',false)
				console.log(error)
			})
		},
		signUserUp ({commit}, payload){
			commit('setLoading',true)
			commit('clearError')
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then(
				user =>{
					const newUser = {
						id : user.user.uid,
						registredMeetups : [],
						fbkeys : {},
						email : payload.email,
						fname : payload.fname,
						lname : payload.lname,
						imagep : payload.imagep
					}
					firebase.database().ref('/users/' + user.user.uid).push(newUser)
					.then(()=>{
						commit('setLoading',false)
					}).then(error=>{
						commit('setLoading',false)
						console.log(error)
					})
					commit('setUser', newUser)
				}
			)
			.catch(
				error =>{
					commit('setLoading',false)
					commit('setError',error)
					console.log(error)
				}
			)

		},
		signUserIn ({commit}, payload){
			commit('setLoading',true)
			commit('clearError')
			console.log(payload.email)
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then(
				user =>{
					const id = user.user.uid
					firebase.database().ref('users').child(id).once('value')
					.then((data) =>{
						commit('setLoading',false)
						const user = data.val()
						let email = ''
						let fname = ''
						let lname = ''
						let imagep = ''
						let registredMeetups = []
						let swapedValues = {}
						for(let key in user){
							email = user[key].email
							fname = user[key].fname
							lname = user[key].lname
							imagep = user[key].imagep
							console.log(1)
							break
						}
						firebase.database().ref('/users/' + id + '/registredMeetups/').once('value')
						.then(data =>{
							const values = data.val()
							for (var key in values) {
								registredMeetups.push(values[key])
								swapedValues[values[key]] = key
							}
						}).catch(error=>{
							console.log(error)
							commit('setLoading',false)
						})
						const newUser = {
							id : id,
							registredMeetups : registredMeetups,
							fbkeys : swapedValues,
							email : email,
							fname : fname,
							lname : lname,
							imagep : imagep
						}
						console.log(user.key)
						commit('setUser', newUser)
					}).catch((error) =>{
						console.log(error)
						commit('setLoading',false)
					})
				}
			)
			.catch(
				error =>{
					commit('setLoading',false)
					commit('setError',error)
					console.log(error)
				}
			)
		},
		autoSignIn ({commit}, payload){
			const id = payload.uid
			firebase.database().ref('users').child(id).once('value')
			.then((data) =>{
				const user = data.val()
				let email = ''
				let fname = ''
				let lname = ''
				let imagep = ''
				let registredMeetups = []
				let swapedValues = {}
				for(let key in user){
					email = user[key].email
					fname = user[key].fname
					lname = user[key].lname
					imagep = user[key].imagep
					console.log(1)
					break
				}
				firebase.database().ref('/users/' + id + '/registredMeetups/').once('value')
				.then(data =>{
					const values = data.val()
					for (var key in values) {
						registredMeetups.push(values[key])
						swapedValues[values[key]] = key
					}
				}).catch(error=>{
					console.log(error)
					commit('setLoading',false)
				})
				const newUser = {
					id : id,
					registredMeetups : registredMeetups,
					fbkeys : swapedValues,
					email : email,
					fname : fname,
					lname : lname,
					imagep : imagep,
				}
				console.log(newUser)
				commit('setLoading',false)
				commit('setUser', newUser)
			}).catch((error) =>{
				console.log(error)
				commit('setLoading',false)
			})
		},
		logout({commit}){
			firebase.auth().signOut()
			commit('setUser',null)
		}
	},
	getters : {
		user (state) {
			return state.user
		}
	}
}