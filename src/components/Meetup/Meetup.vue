<template>
	<v-container>
		<v-layout row wrap class = "mt-3" v-if="loading">
			<v-flex xs12 class = "text-xs-center">
				<v-progress-circular :size="70" :width="7" color="teal" indeterminate ></v-progress-circular>
			</v-flex>
		</v-layout>
		<v-layout wrap row v-else>
			<v-flex xs12>
				<v-card>
					<v-card-title primary-title>
					    <div>
					        <h2 class="font-weight-light font-italic teal--text"> {{meetup.title}} </h2>
					    </div>
					    <template v-if="showDialog">
					        <v-spacer></v-spacer>
					        <app-edit-dialog :meetup = "meetup"></app-edit-dialog>
					    </template>
					</v-card-title>
					<v-card-media :src = "meetup.src"
					height = "400px">	
					</v-card-media>
					<v-card-text>
						<div class="blue--text"> 
							{{meetup.date | date}} - {{meetup.location}}
							<app-edit-date-dialog :meetup = "meetup" v-if="showDialog"></app-edit-date-dialog>
							<app-edit-time-dialog :meetup = "meetup" v-if="showDialog"></app-edit-time-dialog>
						</div>
						<div> {{meetup.description}} </div>
					</v-card-text>
					<v-card-actions class = "pr5">
						<v-spacer></v-spacer>
						<app-register-dialog :meetup = "meetup" v-if = "userIsAuthenticated && !showDialog"></app-register-dialog>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		props : ['id'],
		computed : {
			meetup () {
				return this.$store.getters.loadedMeetup(this.id)
			},
			userIsAuthenticated(){
				return this.$store.getters.user != null && this.$store.getters.user != undefined
			},
			showDialog(){
				if(this.userIsAuthenticated){
					return this.$store.getters.user.id == this.meetup.creatorId
				}else{
					return false
				}
			},
			loading () {
				return this.$store.getters.loading
			}
		}
	}
</script>