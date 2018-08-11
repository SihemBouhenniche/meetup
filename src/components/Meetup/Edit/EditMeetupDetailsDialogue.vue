<template>
	<v-dialog max-width = "500px" persistent v-model = "dialog">
		<v-btn floating fab slot = "activator">
			<v-icon>edit</v-icon>
		</v-btn>
		<v-card>
			<v-container>
				<v-layout row >
					<v-flex xs12 v-if = "error">
						<app-alert :text = "message"></app-alert>
					</v-flex>
				</v-layout>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-title>
							Edit Meetup
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-text>
							<v-flex xs12 sm6 offset-sm3>
								<v-text-field
									name = "title"
									color = "teal"
						            label="Title"
						            id = "title"
						            required
						            v-model = "editedTitle"
						        ></v-text-field>
						        <v-textarea
									name = "description"
									color = "teal"
						            label="Description"
						            id = "description"
						            required
						            v-model = "editedDescription"
						        ></v-textarea>
							</v-flex>
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout wrap row>
					<v-flex xs12>
						<v-card-actions>
				          	<v-btn flat color="teal" @click.native="dialog = false">Cancel</v-btn>
				          	<v-btn flat color="teal" @click = "saveChange">Confirm</v-btn>
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
				editedTitle : this.meetup.title,
				editedDescription : this.meetup.description,
				dialog : false,
				message : '',
				error : false
			}
		},
		methods : {
			saveChange (){
				//
				if (this.editedTitle.trim() == '' || this.editedDescription.trim() == '') {
					this.error = true
					this.message = "Invalide values, Title or description can't be empty"
				}else {
					this.$store.dispatch('updateMeetupData',{
						id : this.meetup.id,
						title : this.editedTitle,
						description : this.editedDescription
					})
					this.dialog = false
				}
			}
		}
	}
</script>