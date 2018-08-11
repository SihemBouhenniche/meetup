<template>
	<v-dialog max-width = "500px" persistent v-model = "dialog">
		<v-btn floating slot = "activator">
			<v-icon left>edit</v-icon>
			Edit Date
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
							Edit Meetup date 
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row wrap>
					<v-flex xs12>
						<v-card-text>
							<v-layout row>
								<v-flex xs12 class = "text-xs-center mb-3" style = "width: 100%">
									<v-date-picker v-model = "editedDate"  color = "teal" actions>
										<template scope = " {cancel, confirm} ">
											<v-btn flat color="teal" @click.native="dialog = false">Cancel</v-btn>
											<v-btn flat color="teal" @click.native = "saveChange">Confirm</v-btn>
										</template>
									</v-date-picker>
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
				editedDate : null,
				error : false
			}
		},
		methods : {
			saveChange () {
				console.log(this.editedDate)
				const newDate = new Date(this.meetup.date)
				const newDay = new Date(this.editedDate).getUTCDate()
				const newMonth = new Date(this.editedDate).getUTCMonth()
				const newYear = new Date(this.editedDate).getUTCFullYear()
				newDate.setUTCDate(newDay)
				newDate.setUTCMonth(newMonth)
				newDate.setUTCFullYear(newYear)
				this.$store.dispatch('updateMeetupData',{
					id : this.meetup.id,
					date : newDate
				})
				this.dialog = false
			}
		},
		created () {
			const day = new Date(this.meetup.date).getUTCDate()
			const month = new Date(this.meetup.date).getUTCMonth() +1
			const year = new Date(this.meetup.date).getUTCFullYear()
			this.editedDate = year +'-' + month + '-' +day
			console.log(this.editedDate)
	    }﻿
	}
</script>
