<template>
	<v-container>
		<v-layout wrap row 
		v-for="item in meetups"
		:key="item.id"
		class = "mb-3">
			<v-flex xs12 sm10 offset-sm1>
				<v-card class = "teal darken-3">
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
					                	<div class="display-1 font-weight-light font-italic white--text mb0">{{item.title}}</div>
					                	<div> {{item.date | date}} </div>
					                </div>
					            </v-card-title>
					            <v-card-actions>
					            	<v-btn large flat dark :to= "'/meetup/' + item.id">
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
	</v-container>
</template>
<script>
	export default {
		computed : {
	  	meetups () {
	  		return this.$store.getters.loadedMeetups
	  	}
	  }, 
	}
</script>