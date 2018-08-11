<template>
	<v-dialog width = "500px" persistent v-model = "dialog">
		<v-btn floating slot = "activator" class="teal darken-3 white--text">
			{{userIsRegistred ? 'Unregister' : 'Register' }}
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title v-if = "userIsRegistred">
							Unregister from the meetup ?
						</v-card-title>
						<v-card-title v-else>
							Register for meetup ?
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-text>
							You can always change your decision layer
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-actions>
				          	<v-btn flat color="red" @click.native="dialog = false">Cancel</v-btn>
				          	<v-btn flat color="teal" @click = "onAgree">Confirm</v-btn>
				        </v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>
<script>
	export default {
		props : ['meetup'],
		data () {
			return {
				dialog : false,
			}
		},
		computed : {
			userIsRegistred(){
				console.log(this.$store.getters.user.registredMeetups + ' ' +this.meetup.id)
				return this.$store.getters.user.registredMeetups.findIndex(itemId =>{
					return itemId == this.meetup.id
				}) >= 0
			}
		},
		methods : {
			onAgree (){
				if (this.userIsRegistred) {
					this.$store.dispatch('unregisterUserFormMeetup',this.meetup.id)
				}else{
					this.$store.dispatch('registerUserForMeetup',this.meetup.id)
				}
			}
		}
	}
</script>