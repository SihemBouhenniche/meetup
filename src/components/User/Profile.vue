<template>
	<v-container >
		<v-layout row wrap class = "teal darken-3 pa-3 white--text" >
			<v-flex xs12 md3>
				<v-card>
			        <v-card-media 
			        :src = "user.imagep"
			        height = "200px">	
			        </v-card-media>

			        <v-card-title primary-title>
			          <div>
			            <h3 class="headline mb-0">{{user.fname}} {{user.lname}}</h3>
			            <h3 class="subheading">{{user.email}}</h3>
			          </div>
			        </v-card-title>
			    </v-card>
			</v-flex>
			<v-flex xs12 md9>
				<v-layout wrap row 
				v-for="item in registredMeetups"
				:key="item.id"
				class = "mb-3">
					<h3 class="headline ml-5 pl-3 mb-3">Your Registrations for Meetups</h3>
					<v-flex offset-md1 xs12>
						<v-card>
							<v-container fluid>
								<v-layout>
									<v-flex xs5 sm4 md3>
										<v-card-media :src = "item.src"
										height = "150px"
										>	
										</v-card-media>
									</v-flex>
									<v-flex xs7 sm8 md9>
										<v-card-title primary-title>
							                <div>
							                	<div class="headline font-weight-light font-italic  mb0">{{item.title}}</div>
							                	<div> {{item.date | date}} </div>
							                </div>
							            </v-card-title>
							            <v-card-actions>
							            	<v-btn large flat :to= "'/meetup/' + item.id">
							            		<v-icon large left>arrow_right_alt</v-icon>
							            		View Meetup
							            	</v-btn>
							            </v-card-actions>
									</v-flex>
								</v-layout>
							</v-container>
						</v-card>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		data () {
			return {
				registredMeetups : []
			}
		},
		computed : {
			user () {
				return this.$store.getters.user
			}
		},
		created() {
			const meetupsId = this.$store.getters.user.registredMeetups
			for (var i = 0; i < meetupsId.length; i++) {
				console.log(this.$store.getters.loadedMeetup(meetupsId[i]))
				this.registredMeetups.push(this.$store.getters.loadedMeetup(meetupsId[i]))
			}
		}﻿
	}
</script>