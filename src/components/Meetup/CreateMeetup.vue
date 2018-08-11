<template>
	<v-container>
		<v-layout row>
			<v-flex xs12>
				<h2 class="headline font-weight-medium teal--text mb-3 text-xs-center">Create A New Meetup</h2>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<form @submit.prevent = "onCreateMeetup">
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name = "title"
								color = "teal"
					            label="Title"
					            id = "title"
					            required
					            v-model = "title"
					        ></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name = "location"
								color = "teal"
					            label="Location"
					            id = "location"
					            required
					            v-model = "location"
					        ></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
					        <v-btn raised class = "teal darken-3 white--text" @click = "onPickFile">Upload Image</v-btn>
					        <input 
						        type="file" 
						        style="display: none;" 
						        ref= "fileInput" 
						        accept="Image/*"
						        @change = "onFilePicked"
					        >
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<img :src="src" style="width: 100%">
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3 class = "text-xs-center mb-3">
							<h3 class="teal--text">Choose a date & time</h3>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3 class = "text-xs-center mb-3">
							<v-date-picker v-model = "date" color = "teal"></v-date-picker>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3 class = "text-xs-center mb-3">
							<v-time-picker v-model = "time" color = "teal"></v-time-picker>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-textarea
								name = "description"
								color = "teal"
					            label="Description"
					            id = "description"
					            required
					            v-model = "description"
					        ></v-textarea>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3 class = "text-xs-center">
							<v-btn class = "teal darken-3 white--text" :disabled = "!formIsValid" type="submit">Create The Meetup</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		data () {
			return {
				title : '',
				location : '',
				src : '',
				description : '',
				date : null,
				time : new Date(),
				image : null
			}
		},
		computed : {
			formIsValid () {
				return this.title != '' && this.location !='' && this.src != '' && this.description != ''
			},
			submitableDateTime() {
				const date = new Date(this.date)
		        if (typeof this.time === 'string') {
		          const hours = this.time.match(/^(\d+)/)[1]
		          const minutes = this.time.match(/:(\d+)/)[1]
		          date.setHours(hours)
		          date.setMinutes(minutes)
		        } else {
		          date.setHours(this.time.getHours())
		          date.setMinutes(this.time.getMinutes())
		        }
				console.log(date)
				return date
			}
		},
		methods : {
			onCreateMeetup () {
				if(!this.formIsValid){
					return 0 
				}
				if(!this.image){
					return 0
				}
				const meetupData = {
					title : this.title,
					location : this.location,
					image : this.image,
					description : this.description,
					date : this.submitableDateTime
				}
				this.$store.dispatch('createMeetup',meetupData)
				this.$router.push('/meetup/meetups');
			},
			onPickFile (){
				this.$refs.fileInput.click()
			},
			onFilePicked (event){
				const files = event.target.files
				var filename = files[0].name
				if (filename.lastIndexOf('.')<=0){
					return alert('please add a valide file !!')
				}else{
					const fileReader = new FileReader() 
					fileReader.addEventListener('load', ()=>{
						this.src = fileReader.result
					})
					fileReader.readAsDataURL(files[0])
					this.image = files[0]
				}
			}
		}
	}
</script>
<style>

</style>