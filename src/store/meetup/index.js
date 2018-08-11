import * as firebase from 'firebase'

export default {
	state : {
		loadedMeetups : [
        {
          src : "https://cdn.pixabay.com/photo/2017/07/13/03/15/paris-2499022_960_720.jpg",
          id : "1",
          title : "Meetup in Paris",
          date : new Date(),
          location : 'Paris',
          description : 'a little descriptionof our meetup'
        },
        {
          src : "https://cdn.pixabay.com/photo/2014/07/10/10/20/golden-gate-bridge-388917_960_720.jpg",
          id : "2",
          title : "Meetup in San Fransisco",
          date : new Date(),
          location : 'San Fransisco' ,
          description : 'a little descriptionof our meetup'
        },
		{
          src : "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_960_720.jpg",
          id : "3",
          title : "Meetup in Japan",
          date : new Date(),
          location : 'Japan' ,
          description : 'a little descriptionof our meetup'
        },
      ]
	},
	mutations : {
		createMeetup (state, payload){
			state.loadedMeetups.push(payload)
		},
		updateMeetup(state, payload) {
			const meetup = state.loadedMeetups.find((item)=>{
				return item.id === payload.id
			})
			if (payload.title) {
				meetup.title = payload.title
			}
			if(payload.description){
				meetup.description = payload.description
			}
			if(payload.date){
				meetup.date = payload.date
			}
		},
		setLoadedMeetups(state,payload){
			state.loadedMeetups = payload
		}
	},
	actions : {
		loadMeetups ({commit}){
			commit('setLoading',true)
			firebase.database().ref('meetups').once('value')
			.then(
				(data) =>{
					const meetups = []
					const obj = data.val()
					for(let key in obj){
						meetups.push({
							id : key,
							title : obj[key].title,
							description : obj[key].description,
							location : obj[key].location,
							src : obj[key].src,
							date : obj[key].date,
							creatorId : obj[key].creatorId
						})
					}
					commit('setLoadedMeetups',meetups)
					commit('setLoading',false)
				}
			).catch(
				(error) =>{
					console.log(error)
					commit('setLoading',false)
				}
			)
		},
		createMeetup({commit, getters} , payload) {
			const meetupData = {
				title : payload.title,
				location : payload.location,
				description : payload.description,
				date : payload.date.toISOString(),
				creatorId : getters.user.id
			}
			var src
			var key
			console.log(meetupData.creatorId)
			firebase.database().ref('meetups').push(meetupData)
			.then(
				(data) =>{
					key = data.key
					return key
				}
			).then(key =>{
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('meetups'+key+'.'+ext).put(payload.image)
				}
			).then(filedata => {
  					let imagePath = filedata.metadata.fullPath;
  					// creating ref to our image file and get the url
  					return firebase.storage().ref().child(imagePath).getDownloadURL();
				}
			).then(url => {
  					src = url;
  					return firebase.database().ref('meetups').child(key).update({src: src});
				}
			).then( ()=> {
					meetupData.src = src
					console.log(src)
					commit('createMeetup',{...meetupData,
						id : key,
						src : src})
				}
			).catch(
				(error) =>{
					console.log(error)
				}
			)
			//
		},
		updateMeetupData ({commit},payload){
			commit('setLoading',true)
			const updateObj = {}
			if (payload.title) {
				updateObj.title = payload.title
			}
			if(payload.description){
				updateObj.description = payload.description
			}
			if(payload.date){
				updateObj.date = payload.date
			}
			firebase.database().ref('meetups').child(payload.id).update(updateObj)
			.then(()=>{
				commit('setLoading',false)
				commit('updateMeetup',payload)
			}).catch(error =>{
				console.log(error)
				commit('setLoading',false)
			})
		}
	},
	getters : {
		loadedMeetups (state) {
			return state.loadedMeetups.sort((meetupA,meetupB)=>{
				return meetupA.date>meetupB.date
			})
		},
		featuredMeetups (state, getters) {
			return getters.loadedMeetups.slice(0,5)
		},
		loadedMeetup (state) {
			return (meetupId)=>{
				return state.loadedMeetups.find((meetup)=>{
					return meetup.id === meetupId
				})
			}
		}
	}
}