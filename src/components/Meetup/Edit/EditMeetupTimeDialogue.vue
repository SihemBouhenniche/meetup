<template>
	<v-dialog max-width = "500px" persistent v-model = "dialog">
		<v-btn floating slot = "activator">
			<v-icon left>edit</v-icon>
			Edit Time
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
							Edit Meetup time
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-text>
							<v-layout row>
								<v-flex xs12 class = "text-xs-center mb-3" style = "width: 100%">
									<v-time-picker v-model = "editedTime" color = "teal" actions>
										<template scope = " {cancel, confirm} ">
											<v-btn flat color="teal" @click.native="dialog = false">Cancel</v-btn>
											<v-btn flat color="teal" @click.native = "saveChange">Confirm</v-btn>
										</template>
									</v-time-picker>
								</v-flex>
							</v-layout>
						</v-card-text>
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
				message : '',
				dialog : false,
				editedTime : null,
				error : false
			}
		},
		methods : {
			saveChange () {
				const newDate = new Date(this.meetup.date)
				const hours = this.editedTime.match(/^(\d+)/)[1]
		        const minutes = this.editedTime.match(/:(\d+)/)[1]
		        newDate.setHours(hours)
		        newDate.setMinutes(minutes)
				this.$store.dispatch('updateMeetupData',{
					id : this.meetup.id,
					date : newDate
				})
				this.dialog = false
			}
		},
		created() {
			let date = new Date(this.meetup.date);
			let hours = date.getHours();
			let minutes = date.getMinutes();
			console.log(hours + ":" + minutes)
			this.editedTime = hours + ":" + minutes;
		}﻿
	}
</script>